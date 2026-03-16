(async function initCoach() {
  if (window.__csawesomePrepCoachLoaded || !window.CSA_PREP_CONFIG) {
    return;
  }
  window.__csawesomePrepCoachLoaded = true;

  const config = window.CSA_PREP_CONFIG;
  const storage = createStorage();
  const state = await loadState(storage, config);

  let activeEntry = getSuggestedEntry(config.schedule, state.todayKey, state.progress);

  const root = document.createElement("aside");
  root.id = "csawesome-prep-coach";
  document.body.append(root);

  function render() {
    activeEntry = resolveActiveEntry(
      config.schedule,
      getTodayKey(config.timeZone),
      state.progress,
      state.ui.manualEntryId
    );
    root.innerHTML = buildPanelMarkup(config, state, activeEntry);
    attachEvents();
  }

  function attachEvents() {
    const openButton = root.querySelector("[data-action='open-target']");
    const openPreviousButton = root.querySelector("[data-action='open-previous']");
    const openNextButton = root.querySelector("[data-action='open-next']");
    const markButton = root.querySelector("[data-action='mark-mastered']");
    const resetButton = root.querySelector("[data-action='reset-goal']");
    const collapseButton = root.querySelector("[data-action='toggle-panel']");
    const autoAdvanceToggle = root.querySelector("[data-action='toggle-auto-advance']");
    const checklistInputs = root.querySelectorAll("[data-check-index]");
    const tabButtons = root.querySelectorAll("[data-action='switch-view']");

    openButton?.addEventListener("click", () => openScheduleTarget(activeEntry));
    openNextButton?.addEventListener("click", async () => {
      await openNextEntry(activeEntry);
    });
    markButton?.addEventListener("click", async () => {
      await markEntryComplete(activeEntry);
    });
    resetButton?.addEventListener("click", async () => {
      await resetEntry(activeEntry);
    });
    collapseButton?.addEventListener("click", async () => {
      state.ui.collapsed = !state.ui.collapsed;
      await storage.set({ prepCoachUi: state.ui });
      render();
    });
    autoAdvanceToggle?.addEventListener("change", async (event) => {
      state.settings.autoAdvance = Boolean(event.target.checked);
      await storage.set({ prepCoachSettings: state.settings });
    });
    checklistInputs.forEach((input) => {
      input.addEventListener("change", async (event) => {
        const index = Number(event.target.dataset.checkIndex);
        const checks = state.progress.checks[activeEntry.id] || [];
        const wasChecked = Boolean(checks[index]);
        const isChecked = Boolean(event.target.checked);
        checks[index] = Boolean(event.target.checked);
        state.progress.checks[activeEntry.id] = checks;
        await storage.set({ prepCoachProgress: state.progress });
        if (!wasChecked && isChecked) {
          launchChecklistCelebration(
            event.target,
            index,
            activeEntry.checklist.length,
            isChecklistComplete(checks, activeEntry.checklist.length)
          );
          flashToast(
            isChecklistComplete(checks, activeEntry.checklist.length)
              ? "Checklist complete. Mark this block mastered."
              : `Checklist progress: ${checks.filter(Boolean).length}/${activeEntry.checklist.length}`
          );
        }
        render();
      });
    });
    tabButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        state.ui.view = button.dataset.view;
        await storage.set({ prepCoachUi: state.ui });
        render();
      });
    });
    openPreviousButton?.addEventListener("click", async () => {
      await openPreviousEntry(activeEntry);
    });
  }

  async function markEntryComplete(entry) {
    if (!isChecklistComplete(state.progress.checks[entry.id], entry.checklist.length)) {
      flashToast("Finish the mastery checklist before marking this block mastered.");
      return;
    }

    const completionDate = getTodayKey(config.timeZone);
    const wasAlreadyComplete = Boolean(state.progress.completed[entry.id]);
    state.progress.completed[entry.id] = completionDate;
    state.progress.lastCompletedDate = completionDate;
    state.progress.streak = recalculateStreak(state.progress);
    state.progress.completedCount = Object.keys(state.progress.completed).length;

    const newlyUnlocked = config.achievements.filter(
      (achievement) =>
        achievement.count <= state.progress.completedCount &&
        !state.progress.unlockedAchievements.includes(achievement.title)
    );

    if (newlyUnlocked.length > 0) {
      state.progress.unlockedAchievements.push(...newlyUnlocked.map((item) => item.title));
      state.progress.latestAchievement = newlyUnlocked[newlyUnlocked.length - 1].title;
      flashAchievement(newlyUnlocked[newlyUnlocked.length - 1], entry);
    } else if (!wasAlreadyComplete) {
      flashToast("Goal mastered. Keep moving.");
    }

    await storage.set({ prepCoachProgress: state.progress });
    render();

    if (state.settings.autoAdvance) {
      openNextEntry(entry);
    }
  }

  async function resetEntry(entry) {
    delete state.progress.completed[entry.id];
    delete state.progress.checks[entry.id];
    state.progress.completedCount = Object.keys(state.progress.completed).length;
    state.progress.streak = recalculateStreak(state.progress);
    state.progress.latestAchievement = "";
    await storage.set({ prepCoachProgress: state.progress });
    flashToast(`Reset ${entry.phase} block.`);
    render();
  }

  function openScheduleTarget(entry) {
    const link = findTocLink(entry.targets);
    if (link) {
      window.location.href = link.href;
      return;
    }
    flashToast("No matching CSAwesome link was found on this page.");
  }

  async function openNextEntry(entry) {
    const nextEntry = getNextEntry(config.schedule, entry.id);
    if (!nextEntry) {
      flashToast("This was the final goal in the roadmap.");
      return;
    }
    await setManualEntry(nextEntry.id);
    const link = findTocLink(nextEntry.targets);
    if (link) {
      window.location.href = link.href;
      return;
    }
    render();
    flashToast("Showing the next roadmap block in the coach.");
  }

  async function openPreviousEntry(entry) {
    const previousEntry = getPreviousEntry(config.schedule, entry.id);
    if (!previousEntry) {
      flashToast("This is already the first goal in the roadmap.");
      return;
    }
    await setManualEntry(previousEntry.id);
    const link = findTocLink(previousEntry.targets);
    if (link) {
      window.location.href = link.href;
      return;
    }
    render();
    flashToast("Showing the previous roadmap block in the coach.");
  }

  async function setManualEntry(entryId) {
    state.ui.manualEntryId = entryId;
    await storage.set({ prepCoachUi: state.ui });
  }

  function findTocLink(targets) {
    const normalizedTargets = targets.map(normalizeText);
    const anchors = Array.from(document.querySelectorAll("a[href]"));
    return anchors.find((anchor) => {
      const label = normalizeText(anchor.textContent || "");
      return normalizedTargets.some(
        (target) => label.startsWith(target) || label.includes(`${target} `) || label === target
      );
    });
  }

  render();

  function flashAchievement(achievement, entry) {
      flashToast(`${achievement.title}: ${achievement.note} (${entry.phase})`, true);
  }

  function flashToast(message, achievement = false) {
    const toast = document.createElement("div");
    toast.className = `csawesome-prep-toast${achievement ? " is-achievement" : ""}`;
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.classList.add("is-visible"), 30);
    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 240);
    }, 3200);
  }
})();

function createStorage() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    return {
      get(keys) {
        return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
      },
      set(values) {
        return new Promise((resolve) => chrome.storage.local.set(values, resolve));
      }
    };
  }

  return {
    async get(keys) {
      const keyList = Array.isArray(keys) ? keys : [keys];
      const result = {};
      keyList.forEach((key) => {
        const raw = localStorage.getItem(key);
        result[key] = raw ? JSON.parse(raw) : undefined;
      });
      return result;
    },
    async set(values) {
      Object.entries(values).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  };
}

async function loadState(storage, config) {
  const todayKey = getTodayKey(config.timeZone);
  const defaults = {
    progress: {
      completed: {},
      checks: {},
      completedCount: 0,
      streak: 0,
      lastCompletedDate: "",
      unlockedAchievements: [],
      latestAchievement: ""
    },
    ui: { collapsed: false, view: "focus", manualEntryId: "" },
    settings: { autoAdvance: true }
  };
  const stored = await storage.get(["prepCoachProgress", "prepCoachUi", "prepCoachSettings"]);
  return {
    todayKey,
    progress: { ...defaults.progress, ...(stored.prepCoachProgress || {}) },
    ui: { ...defaults.ui, ...(stored.prepCoachUi || {}) },
    settings: { ...defaults.settings, ...(stored.prepCoachSettings || {}) }
  };
}

function getSuggestedEntry(schedule, todayKey, progress) {
  const current = getEntryForDate(schedule, todayKey) || getNextUnfinishedEntry(schedule, progress) || schedule[0];
  if (!current) {
    return null;
  }
  return progress.completed[current.id] ? getNextUnfinishedEntry(schedule, progress) || current : current;
}

function resolveActiveEntry(schedule, todayKey, progress, manualEntryId) {
  if (manualEntryId) {
    const manualEntry = schedule.find((entry) => entry.id === manualEntryId);
    if (manualEntry) {
      return manualEntry;
    }
  }
  return getSuggestedEntry(schedule, todayKey, progress);
}

function getEntryForDate(schedule, todayKey) {
  return schedule.find((entry) => todayKey >= entry.startDate && todayKey <= entry.endDate);
}

function getNextUnfinishedEntry(schedule, progress) {
  return schedule.find((entry) => !progress.completed[entry.id]) || null;
}

function getNextEntry(schedule, currentId) {
  const index = schedule.findIndex((entry) => entry.id === currentId);
  if (index === -1 || index === schedule.length - 1) {
    return null;
  }
  return schedule[index + 1];
}

function getPreviousEntry(schedule, currentId) {
  const index = schedule.findIndex((entry) => entry.id === currentId);
  if (index <= 0) {
    return null;
  }
  return schedule[index - 1];
}

function recalculateStreak(progress) {
  const dates = Object.values(progress.completed).sort();
  if (dates.length === 0) {
    return 0;
  }
  let streak = 1;
  for (let index = dates.length - 1; index > 0; index -= 1) {
    if (diffDays(dates[index - 1], dates[index]) <= 2) {
      streak += 1;
      continue;
    }
    break;
  }
  return streak;
}

function diffDays(olderDate, newerDate) {
  const start = new Date(`${olderDate}T00:00:00`);
  const end = new Date(`${newerDate}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function getTodayKey(timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function buildPanelMarkup(config, state, entry) {
  if (!entry) {
    return "";
  }

  const isCollapsed = state.ui.collapsed;
  const completedCount = Object.keys(state.progress.completed).length;
  const totalGoals = config.schedule.length;
  const isComplete = Boolean(state.progress.completed[entry.id]);
  const dayLabel = getBlockDayLabel(entry, getTodayKey(config.timeZone));
  const daysLeft = daysUntil(config.examDate, getTodayKey(config.timeZone));
  const currentChecks = state.progress.checks[entry.id] || [];
  const checkedCount = currentChecks.filter(Boolean).length;
  const allChecklistComplete = isChecklistComplete(currentChecks, entry.checklist.length);
  const nextAchievement = config.achievements.find((achievement) => achievement.count > completedCount);
  const readiness = Math.round((completedCount / totalGoals) * 100);
  const currentView = state.ui.view || "focus";
  const isManualView = Boolean(state.ui.manualEntryId);

  return `
    <div class="csawesome-prep-shell ${isCollapsed ? "is-collapsed" : ""}">
      <button class="csawesome-prep-collapse" data-action="toggle-panel" aria-label="Toggle prep coach">
        ${isCollapsed ? "Open Coach" : "Hide"}
      </button>
      <section class="csawesome-prep-card">
        <header class="csawesome-prep-header">
          <div>
            <p class="csawesome-prep-eyebrow">${entry.phase} · ${entry.focusArea}</p>
            <h2>CSAwesome Prep Coach</h2>
            <p class="csawesome-prep-mode">${isManualView ? "Manual roadmap view" : "Following today’s roadmap"}</p>
          </div>
          <div class="csawesome-prep-countdown">
            <strong>${daysLeft}</strong>
            <span>days to May 15</span>
          </div>
        </header>

        <div class="csawesome-prep-progress">
          <div>
            <span class="csawesome-prep-kicker">Roadmap</span>
            <strong>${completedCount}/${totalGoals} blocks</strong>
          </div>
          <div>
            <span class="csawesome-prep-kicker">Readiness</span>
            <strong>${readiness}%</strong>
          </div>
          <div>
            <span class="csawesome-prep-kicker">Streak</span>
            <strong>${state.progress.streak}</strong>
          </div>
        </div>

        <nav class="csawesome-prep-tabs" aria-label="Coach views">
          <button
            class="csawesome-prep-tab ${currentView === "focus" ? "is-active" : ""}"
            data-action="switch-view"
            data-view="focus"
          >
            Focus
          </button>
          <button
            class="csawesome-prep-tab ${currentView === "checklist" ? "is-active" : ""}"
            data-action="switch-view"
            data-view="checklist"
          >
            Checklist
          </button>
          <button
            class="csawesome-prep-tab ${currentView === "rewards" ? "is-active" : ""}"
            data-action="switch-view"
            data-view="rewards"
          >
            Achievements
          </button>
        </nav>

        <section class="csawesome-prep-panel-view">
          ${renderActiveView(
            entry,
            currentView,
            currentChecks,
            checkedCount,
            allChecklistComplete,
            isComplete,
            config,
            completedCount,
            nextAchievement,
            dayLabel,
            state.progress.latestAchievement
          )}
        </section>

        <div class="csawesome-prep-footer">
          <div class="csawesome-prep-primary-action">
            <button
              data-action="mark-mastered"
              class="is-primary"
              ${!isComplete && !allChecklistComplete ? "disabled" : ""}
            >
              ${
                isComplete
                  ? "Mastered"
                  : allChecklistComplete
                    ? "Mark mastered"
                    : "Complete checklist first"
              }
            </button>
          </div>

          <div class="csawesome-prep-actions">
            <button data-action="open-target">${isManualView ? "Open selected target" : "Open today’s target"}</button>
            <button data-action="open-previous">Previous target</button>
            <button data-action="open-next">Open next target</button>
            <button data-action="reset-goal" class="is-ghost">Reset block</button>
          </div>

          <label class="csawesome-prep-toggle">
            <input type="checkbox" data-action="toggle-auto-advance" ${state.settings.autoAdvance ? "checked" : ""}>
            <span>Auto-open the next roadmap target after mastery</span>
          </label>
        </div>
      </section>
    </div>
  `;
}

function renderActiveView(
  entry,
  currentView,
  currentChecks,
  checkedCount,
  allChecklistComplete,
  isComplete,
  config,
  completedCount,
  nextAchievement,
  dayLabel,
  latestAchievement
) {
  if (currentView === "checklist") {
    return `
      <section class="csawesome-prep-section is-panel-section">
        <p class="csawesome-prep-section-label">Mastery checklist</p>
        <div class="csawesome-prep-sparks">
          ${entry.checklist
            .map(
              (_, index) => `
                <span class="csawesome-prep-spark ${currentChecks[index] ? "is-earned" : ""}">
                  ${index + 1}
                </span>
              `
            )
            .join("")}
        </div>
        <p class="csawesome-prep-check-status ${allChecklistComplete ? "is-ready" : ""}">
          ${
            isComplete
              ? "This block is already mastered."
              : allChecklistComplete
                ? "Checklist complete. Mark this block mastered to record progress and advance."
                : `${checkedCount}/${entry.checklist.length} checklist items complete`
          }
        </p>
        <div class="csawesome-prep-checklist">
          ${entry.checklist
            .map(
              (item, index) => `
                <label class="csawesome-prep-check">
                  <input type="checkbox" data-check-index="${index}" ${currentChecks[index] ? "checked" : ""}>
                  <span>${item}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  if (currentView === "rewards") {
    return `
      <section class="csawesome-prep-section is-panel-section">
        <p class="csawesome-prep-section-label">Achievements</p>
        <div class="csawesome-prep-badges">
          ${config.achievements
            .map((achievement) => {
              const isUnlocked = achievement.count <= completedCount;
              const isNext = nextAchievement && nextAchievement.title === achievement.title;
              return `
                <article
                  class="csawesome-prep-badge ${isUnlocked ? "is-unlocked" : "is-locked"} ${isNext ? "is-next" : ""}"
                  title="${achievement.title}: ${achievement.note}"
                >
                  <div class="csawesome-prep-badge-icon accent-${achievement.accent}">
                    <span>${achievement.iconLabel}</span>
                  </div>
                  <p class="csawesome-prep-badge-title">${achievement.title}</p>
                  <p class="csawesome-prep-badge-threshold">${achievement.count} blocks</p>
                </article>
              `;
            })
            .join("")}
        </div>
        <p class="csawesome-prep-student">
          ${latestAchievement || "No achievement unlocked yet."}
        </p>
        <p class="csawesome-prep-gapline">
          ${
            nextAchievement
              ? `Next badge at ${nextAchievement.count} blocks: ${nextAchievement.title}`
              : "All milestones unlocked."
          }
        </p>
      </section>
    `;
  }

  return `
    <section class="csawesome-prep-section is-panel-section">
      <p class="csawesome-prep-section-label">Today</p>
      <h3>${entry.phaseTitle}</h3>
      <p class="csawesome-prep-block-date">${formatRange(entry.startDate, entry.endDate)} · ${dayLabel}</p>
      <p class="csawesome-prep-task">${entry.task}</p>
      <p class="csawesome-prep-tip"><span>Pro tip</span>${entry.tip}</p>
      <p class="csawesome-prep-section-label csawesome-prep-inline-label">Targets in CSAwesome</p>
      <div class="csawesome-prep-targets">
        ${entry.targets.map((target) => `<span>${target}</span>`).join("")}
      </div>
    </section>
  `;
}

function getBlockDayLabel(entry, todayKey) {
  const totalDays = diffDays(entry.startDate, entry.endDate) + 1;
  if (todayKey < entry.startDate) {
    const daysUntilStart = Math.abs(diffDays(entry.startDate, todayKey));
    return `Starts in ${daysUntilStart} day${daysUntilStart === 1 ? "" : "s"}`;
  }

  if (todayKey > entry.endDate) {
    const overdueDays = diffDays(entry.endDate, todayKey);
    return `Overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}`;
  }

  const currentDay = diffDays(entry.startDate, todayKey) + 1;
  return totalDays > 1 ? `Day ${currentDay} of ${totalDays}` : "Single-day checkpoint";
}

function formatRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return startDate === endDate ? startLabel : `${startLabel} to ${endLabel}`;
}

function daysUntil(targetDate, todayKey) {
  const diff = diffDays(todayKey, targetDate);
  return diff >= 0 ? diff : 0;
}

function isChecklistComplete(checks, totalItems) {
  if (totalItems === 0) {
    return true;
  }
  return checks.filter(Boolean).length >= totalItems;
}

function launchChecklistCelebration(sourceElement, checklistIndex, checklistLength, isFinalBurst) {
  const rect = sourceElement.getBoundingClientRect();
  const burst = document.createElement("div");
  burst.className = `csawesome-prep-burst${isFinalBurst ? " is-final" : ""}`;
  burst.style.left = `${rect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top + rect.height / 2}px`;

  const ring = document.createElement("span");
  ring.className = "csawesome-prep-burst-ring";
  burst.append(ring);

  const progressFactor = checklistLength > 1 ? checklistIndex / (checklistLength - 1) : 1;
  const particleCount = isFinalBurst ? 18 + checklistIndex * 4 : 8 + checklistIndex * 4;
  const palette = isFinalBurst
    ? ["#43b67a", "#5a70ca", "#f0c94c", "#ff8f6b", "#fdf2c6"]
    : ["#cf7147", "#f0c94c", "#ffb36a", "#fff2cf"];
  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / particleCount;
    const baseDistance = isFinalBurst ? 78 : 38;
    const distance = baseDistance + progressFactor * 38 + (index % 4) * (isFinalBurst ? 10 : 7);
    const size = (isFinalBurst ? 10 : 7) + Math.round(progressFactor * 6);
    const color = palette[index % palette.length];
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-size", `${size}px`);
    particle.style.setProperty("--particle-color", color);
    particle.style.animationDelay = `${index * 12}ms`;
    burst.append(particle);
  }

  const sparkleCount = isFinalBurst ? 8 : 4;
  for (let index = 0; index < sparkleCount; index += 1) {
    const sparkle = document.createElement("i");
    const angle = (Math.PI * 2 * index) / sparkleCount + Math.PI / 8;
    const distance = 22 + progressFactor * 20 + index * 4;
    sparkle.style.setProperty("--sx", `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty("--sy", `${Math.sin(angle) * distance}px`);
    sparkle.style.animationDelay = `${index * 40}ms`;
    burst.append(sparkle);
  }

  document.body.append(burst);
  window.setTimeout(() => burst.remove(), 900);
}
