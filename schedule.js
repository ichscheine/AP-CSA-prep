window.CSA_PREP_CONFIG = {
  examDate: "2026-05-15",
  timeZone: "America/New_York",
  achievements: [
    {
      count: 1,
      title: "Launch Day",
      note: "First goal mastered.",
      iconLabel: "L1",
      accent: "bronze"
    },
    {
      count: 3,
      title: "Momentum",
      note: "Three study blocks completed.",
      iconLabel: "M3",
      accent: "amber"
    },
    {
      count: 7,
      title: "Phase 1 Cleared",
      note: "Objects and encapsulation are stabilizing.",
      iconLabel: "P1",
      accent: "gold"
    },
    {
      count: 14,
      title: "Structure Builder",
      note: "Data-structure reps are stacking up.",
      iconLabel: "S4",
      accent: "teal"
    },
    {
      count: 21,
      title: "TJ Stretch",
      note: "Inheritance and recursion are in the mix.",
      iconLabel: "TJ",
      accent: "indigo"
    },
    {
      count: 28,
      title: "Mock-Test Ready",
      note: "Timed practice should feel normal now.",
      iconLabel: "MR",
      accent: "crimson"
    },
    {
      count: 35,
      title: "Exam Ready",
      note: "The full runway is complete.",
      iconLabel: "ER",
      accent: "emerald"
    }
  ],
  schedule: [
    {
      id: "2026-03-16-primitives",
      startDate: "2026-03-16",
      endDate: "2026-03-17",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Core Java refresh",
      targets: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"],
      task: "Complete the primitives, expressions, input, casting, and compound assignment lessons.",
      tip: "Memorize `(int) (x + 0.5)` for positive-number rounding. AP multiple choice uses it constantly.",
      checklist: [
        "Trace compound assignment without guessing.",
        "Explain truncation vs. rounding out loud.",
        "Finish at least one AP Practice set in this block."
      ]
    },
    {
      id: "2026-03-18-strings-objects",
      startDate: "2026-03-18",
      endDate: "2026-03-19",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Objects and strings",
      targets: ["1.12", "1.13", "1.14", "1.15"],
      task: "Drill object references plus `indexOf`, `substring`, `length`, and returned-string behavior.",
      tip: "Strings are immutable. Every method returns a new string; the original object does not change.",
      checklist: [
        "Predict outputs for 5 short string traces.",
        "State what a reference variable stores.",
        "Finish one object/constructor practice activity."
      ]
    },
    {
      id: "2026-03-20-math-review",
      startDate: "2026-03-20",
      endDate: "2026-03-21",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Math class and quick review",
      targets: ["1.11", "1.16"],
      task: "Lock in `Math.random()` ranges and use the Unit 1 summary to clean up weak spots fast.",
      tip: "Be precise about inclusive lower bounds and exclusive upper bounds in random-number formulas.",
      checklist: [
        "Write three random-range formulas from memory.",
        "Do one quick error-correction drill from the summary page.",
        "Review aliasing and reference confusion."
      ]
    },
    {
      id: "2026-03-22-unit1-review",
      startDate: "2026-03-22",
      endDate: "2026-03-22",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Unit 1 checkpoint",
      targets: ["1.15.12", "1.20", "7.1"],
      task: "Take a Unit 1-style practice block and review every miss before moving on.",
      tip: "The goal is 90% or better. If lower, rework object references and method-call tracing immediately.",
      checklist: [
        "Take the set timed.",
        "Write down every miss in an error log.",
        "Retake 3 missed questions without notes."
      ]
    },
    {
      id: "2026-03-23-class-design",
      startDate: "2026-03-23",
      endDate: "2026-03-24",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Class anatomy",
      targets: ["3.1", "3.2", "3.3"],
      task: "Define private instance variables, constructors, and a clean class interface.",
      tip: "For TJ-style grading, forgetting `private` on instance variables is an avoidable deduction.",
      checklist: [
        "Write one UML-to-Java translation.",
        "Declare at least two private fields and a constructor.",
        "Explain what abstraction hides from the caller."
      ]
    },
    {
      id: "2026-03-25-accessors-mutators",
      startDate: "2026-03-25",
      endDate: "2026-03-26",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Encapsulation",
      targets: ["3.4", "3.5"],
      task: "Write accessors and mutators and justify each method in terms of encapsulation.",
      tip: "If an accessor exposes a mutable object directly, you may have broken encapsulation.",
      checklist: [
        "Write one getter and one setter from scratch.",
        "State when validation belongs in a mutator.",
        "Explain why copies can protect state."
      ]
    },
    {
      id: "2026-03-27-static-instance",
      startDate: "2026-03-27",
      endDate: "2026-03-28",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Static vs. instance",
      targets: ["3.6", "3.7", "3.8", "3.9"],
      task: "Master `static` vs. instance members and use `this` correctly inside constructors and methods.",
      tip: "This is high-yield for AP class-design FRQs and for fast bug-spotting on TJ traces.",
      checklist: [
        "Label each variable in a sample class as class-level or object-level.",
        "Use `this` correctly in one constructor.",
        "Fix one buggy class-definition prompt."
      ]
    },
    {
      id: "2026-03-29-phase1-review",
      startDate: "2026-03-29",
      endDate: "2026-03-29",
      phase: "Phase 1",
      phaseTitle: "Objects, Classes, and Encapsulation",
      focusArea: "Phase 1 review",
      targets: ["3.16", "10.12"],
      task: "Finish a class-design style programming task and compare the solution to the rubric.",
      tip: "Treat naming, visibility, and constructor correctness as rubric items, not style choices.",
      checklist: [
        "Write one class completely from scratch.",
        "Check constructor, fields, accessors, and mutators against a rubric.",
        "Add misses to the error log."
      ]
    },
    {
      id: "2026-03-30-arraylist-methods",
      startDate: "2026-03-30",
      endDate: "2026-03-31",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "ArrayList methods",
      targets: ["4.8"],
      task: "Master `add`, `get`, `set`, `remove`, and `size` for ArrayLists.",
      tip: "Keep `list.size()` and `array.length` mentally separated. AP writes traps around that difference.",
      checklist: [
        "Write one short method using `add`, `get`, and `set`.",
        "Explain the return value of `remove(index)`.",
        "Do one FRQ warm-up that touches ArrayList indexing."
      ]
    },
    {
      id: "2026-04-01-arraylist-traversal",
      startDate: "2026-04-01",
      endDate: "2026-04-02",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "Traversal and deletion traps",
      targets: ["4.9", "4.10"],
      task: "Practice removing elements while iterating and compare forward, backward, and enhanced-for patterns.",
      tip: "Backward loops avoid the classic skip-a-value bug after `remove(index)`.",
      checklist: [
        "Write one backward-removal loop.",
        "Explain why enhanced-for is unsafe for indexed removal.",
        "Solve one duplicate-removal or filter problem."
      ]
    },
    {
      id: "2026-04-03-search-big-o",
      startDate: "2026-04-03",
      endDate: "2026-04-04",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "Search and algorithmic thinking",
      targets: ["4.10", "4.45"],
      task: "Implement linear-search style scans and reason about when binary search is faster.",
      tip: "Know the tradeoff: linear search is `O(n)`, binary search is `O(log n)` on sorted data.",
      checklist: [
        "Write one property-search loop from memory.",
        "State the precondition binary search needs.",
        "Trace one search question on paper."
      ]
    },
    {
      id: "2026-04-05-array-sprint",
      startDate: "2026-04-05",
      endDate: "2026-04-05",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "Sprint day",
      targets: ["4.34", "4.45"],
      task: "Use a short sprint to solve five array or ArrayList problems without pausing for notes.",
      tip: "Fast pattern recognition matters more than memorizing one perfect template.",
      checklist: [
        "Set a timer for a 30-minute sprint.",
        "Finish five short problems.",
        "Tag misses as indexing, condition, or loop-shape mistakes."
      ]
    },
    {
      id: "2026-04-06-2d-arrays-start",
      startDate: "2026-04-06",
      endDate: "2026-04-07",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "2D arrays",
      targets: ["4.11", "4.12", "4.13"],
      task: "Practice row-major traversal, nested loops, and accessing matrix-style data cleanly.",
      tip: "Separate row and column meaning mentally before writing any loop header.",
      checklist: [
        "Write one full 2D traversal from scratch.",
        "Explain row-major vs. column-major order.",
        "Trace one nested-loop output problem."
      ]
    },
    {
      id: "2026-04-08-2d-arrays-frq",
      startDate: "2026-04-08",
      endDate: "2026-04-09",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "2D array algorithms",
      targets: ["4.46", "4.51"],
      task: "Write a row/column algorithm such as a saddle-point style scan and do one 2D-array FRQ.",
      tip: "A 2D array FRQ is still one of the safest bets on both AP and TJ-style assessments.",
      checklist: [
        "Write a min-in-row or max-in-column helper.",
        "Finish one 2D-array FRQ part under time.",
        "Check loop bounds carefully."
      ]
    },
    {
      id: "2026-04-10-text-files",
      startDate: "2026-04-10",
      endDate: "2026-04-11",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "Files and Scanner",
      targets: ["4.6"],
      task: "Read text-file data with `Scanner`, handle checked exceptions, and store the results into arrays or objects.",
      tip: "File input is part of the 2026 AP CSA refresh. Do not leave it as optional background material.",
      checklist: [
        "Open a file with `Scanner` once from memory.",
        "Explain why `FileNotFoundException` matters.",
        "Read a small dataset into a structure."
      ]
    },
    {
      id: "2026-04-12-unit4-review",
      startDate: "2026-04-12",
      endDate: "2026-04-12",
      phase: "Phase 2",
      phaseTitle: "Data Structures and 2026 Updates",
      focusArea: "Data-structure review",
      targets: ["4.34", "4.51", "7.2"],
      task: "Do a data-heavy practice set and score it with special attention to indexing errors.",
      tip: "Timed accuracy matters more than raw volume here. Every off-by-one should be logged.",
      checklist: [
        "Take one mixed set timed.",
        "Categorize every miss.",
        "Redo all indexing misses cold."
      ]
    },
    {
      id: "2026-04-13-inheritance-core",
      startDate: "2026-04-13",
      endDate: "2026-04-14",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Inheritance basics",
      targets: ["5.1", "5.2", "5.3", "5.4"],
      task: "Learn `extends`, constructor chaining, overriding, and `super()`.",
      tip: "TJ uses inheritance to test whether the student can reason beyond the AP baseline.",
      checklist: [
        "Write one superclass and one subclass.",
        "Explain constructor chaining in order.",
        "Identify one real override vs. overload."
      ]
    },
    {
      id: "2026-04-15-polymorphism",
      startDate: "2026-04-15",
      endDate: "2026-04-16",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Polymorphism",
      targets: ["5.5", "5.6", "5.7", "5.8"],
      task: "Practice superclass references, `is-a` logic, and polymorphic method calls.",
      tip: "The substitution test is the cleanest mental model: `Person p = new Student();` works because a Student is a Person.",
      checklist: [
        "Explain one valid and one invalid assignment.",
        "Trace one polymorphism question.",
        "Read the inheritance-summary common mistakes."
      ]
    },
    {
      id: "2026-04-17-recursion-basics",
      startDate: "2026-04-17",
      endDate: "2026-04-18",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Recursion basics",
      targets: ["4.55", "4.56", "4.57"],
      task: "Practice base cases, recursive calls, and paper tracing before writing code.",
      tip: "Most recursion errors are not syntax errors. They are wrong base cases or bad progress toward them.",
      checklist: [
        "Trace factorial or sum by hand.",
        "State the base case before the recursive case.",
        "Finish one recursion mixed-up-code activity."
      ]
    },
    {
      id: "2026-04-19-recursion-tracing",
      startDate: "2026-04-19",
      endDate: "2026-04-19",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Tracing day",
      targets: ["4.59"],
      task: "Draw recursion trees and stack frames for five short methods, including one Fibonacci-style trace.",
      tip: "Tracing accuracy is what separates a solid answer from a guessed answer on both AP and TJ assessments.",
      checklist: [
        "Draw at least five traces on paper.",
        "Mark each return value explicitly.",
        "Explain the call stack to someone else."
      ]
    },
    {
      id: "2026-04-20-recursion-coding",
      startDate: "2026-04-20",
      endDate: "2026-04-21",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Recursion coding",
      targets: ["4.58", "4.59"],
      task: "Move from tracing to writing recursive methods and checking that each call reduces the problem.",
      tip: "Recursion without a shrinking subproblem is just a future stack overflow.",
      checklist: [
        "Write one recursive method from scratch.",
        "Verify the parameter moves toward the base case.",
        "Do one medium recursion MCQ set."
      ]
    },
    {
      id: "2026-04-22-sorting",
      startDate: "2026-04-22",
      endDate: "2026-04-23",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Search and sort",
      targets: ["4.45"],
      task: "Review selection and insertion sort and compare them conceptually with merge sort for TJ-style readiness.",
      tip: "Know the complexity contrast: selection and insertion are `O(n^2)`; merge sort is `O(n log n)`.",
      checklist: [
        "Trace one pass of selection sort.",
        "Trace one pass of insertion sort.",
        "State why merge sort scales better."
      ]
    },
    {
      id: "2026-04-24-frq-sprint",
      startDate: "2026-04-24",
      endDate: "2026-04-25",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "FRQ sprint",
      targets: ["10.5", "10.8", "10.9", "10.12"],
      task: "Complete four FRQ parts in 90 minutes with emphasis on class design and 2D arrays.",
      tip: "Write the method signature and loop skeleton early. It prevents blank-page drift.",
      checklist: [
        "Do the set under a hard time cap.",
        "Grade against the rubric, not instinct.",
        "Rewrite one weak solution cleanly."
      ]
    },
    {
      id: "2026-04-26-full-mock",
      startDate: "2026-04-26",
      endDate: "2026-04-26",
      phase: "Phase 3",
      phaseTitle: "TJ Gap: Inheritance and Recursion",
      focusArea: "Timed mock",
      targets: ["8.1"],
      task: "Take a full timed practice exam and analyze every mistake the same day.",
      tip: "If a miss was labeled 'silly,' re-trace the exact code path anyway. Sloppy tracing is still a skill gap.",
      checklist: [
        "Take the mock timed.",
        "Log every miss by category.",
        "Redo all misses without notes."
      ]
    },
    {
      id: "2026-04-27-error-log",
      startDate: "2026-04-27",
      endDate: "2026-04-28",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Error-log rebuild",
      targets: ["3.16", "4.46", "5.8"],
      task: "Use the mock-exam misses to rebuild only the weakest concepts instead of doing random extra volume.",
      tip: "A targeted reteach block is worth more than another unfocused full-length set.",
      checklist: [
        "Pick the top three miss categories.",
        "Review only those categories.",
        "Retest with 6 to 10 fresh questions."
      ]
    },
    {
      id: "2026-04-29-frq-set-2",
      startDate: "2026-04-29",
      endDate: "2026-04-30",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "FRQ set 2",
      targets: ["10.1", "10.5", "10.8", "10.12"],
      task: "Run another timed FRQ set with a cleaner pacing plan and stronger rubric awareness.",
      tip: "If one part stalls, leave a stub and move on. Partial credit beats unfinished perfectionism.",
      checklist: [
        "Use a visible timer.",
        "Annotate question requirements before coding.",
        "Compare pacing with the previous FRQ sprint."
      ]
    },
    {
      id: "2026-05-01-mcq-set",
      startDate: "2026-05-01",
      endDate: "2026-05-02",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Timed multiple choice",
      targets: ["8.2"],
      task: "Take a timed multiple-choice set and review each distractor that almost worked.",
      tip: "Close MCQ misses often come from rushing object references, bounds, or method side effects.",
      checklist: [
        "Take the set timed.",
        "For each miss, explain why the correct option wins.",
        "Flag recurring trap patterns."
      ]
    },
    {
      id: "2026-05-03-mock-2",
      startDate: "2026-05-03",
      endDate: "2026-05-03",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Mock exam 2",
      targets: ["8.3"],
      task: "Take a second full mock to verify that the weak-area cleanup is actually working.",
      tip: "Compare categories, not just total score. A stable score with fewer class-design misses is real progress.",
      checklist: [
        "Take the mock timed.",
        "Compare miss patterns with April 26.",
        "Choose the next two repair targets."
      ]
    },
    {
      id: "2026-05-04-class-design-rebuild",
      startDate: "2026-05-04",
      endDate: "2026-05-05",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Objects and class design cleanup",
      targets: ["3.16", "10.12"],
      task: "Do a short rebuild block on constructors, visibility, accessors, mutators, and class-design FRQs.",
      tip: "This is still one of the biggest leverage areas given the student profile.",
      checklist: [
        "Write one full class with no notes.",
        "Grade it against the rubric.",
        "Fix any `private` or constructor mistakes immediately."
      ]
    },
    {
      id: "2026-05-06-data-structures-rebuild",
      startDate: "2026-05-06",
      endDate: "2026-05-07",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Arrays, ArrayLists, and 2D arrays cleanup",
      targets: ["4.23", "4.34", "4.46", "10.8", "10.9"],
      task: "Rehearse the three biggest data-structure loop patterns until they are automatic.",
      tip: "Most data-structure misses are loop-shape problems, not concept problems.",
      checklist: [
        "Write one array loop, one ArrayList loop, and one 2D-array loop.",
        "Check each for bounds and update logic.",
        "Do one short FRQ follow-up."
      ]
    },
    {
      id: "2026-05-08-tj-stretch-mix",
      startDate: "2026-05-08",
      endDate: "2026-05-09",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "TJ stretch mix",
      targets: ["5.12", "4.59"],
      task: "Mix inheritance and recursion into one short session so TJ-only topics stay fresh without dominating AP review.",
      tip: "The goal is retention, not volume. Small but repeated exposure is enough at this point.",
      checklist: [
        "Do one inheritance MCQ set.",
        "Do one recursion tracing set.",
        "Log anything that still feels slow."
      ]
    },
    {
      id: "2026-05-10-mock-3",
      startDate: "2026-05-10",
      endDate: "2026-05-10",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Final full mock",
      targets: ["8.4"],
      task: "Take the last full mock and lock the final review priorities from real performance data.",
      tip: "Do not chase every miss now. Focus on the two categories still costing the most points.",
      checklist: [
        "Take the mock timed.",
        "Pick the top two remaining repair areas.",
        "Avoid adding new material."
      ]
    },
    {
      id: "2026-05-11-missed-question-notebook",
      startDate: "2026-05-11",
      endDate: "2026-05-12",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Mistake notebook",
      targets: ["7.3", "9.2", "9.4"],
      task: "Re-solve missed problems cleanly and keep one page of recurring rules and patterns.",
      tip: "The notebook should shrink thinking time, not become another textbook.",
      checklist: [
        "Rewrite solutions, not just read them.",
        "Keep the note sheet to one page.",
        "Retest at least five misses."
      ]
    },
    {
      id: "2026-05-13-light-review",
      startDate: "2026-05-13",
      endDate: "2026-05-14",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Light review and pacing",
      targets: ["7.4"],
      task: "Do a light-confidence review, skim the notebook, and keep sleep and energy normal.",
      tip: "Heavy cramming this late usually lowers accuracy more than it raises content coverage.",
      checklist: [
        "Review the one-page notebook.",
        "Do a few warm-up traces only.",
        "Stop before fatigue sets in."
      ]
    },
    {
      id: "2026-05-15-exam-day",
      startDate: "2026-05-15",
      endDate: "2026-05-15",
      phase: "Phase 4",
      phaseTitle: "Conversion to Exam Readiness",
      focusArea: "Exam day",
      targets: ["0.2"],
      task: "Keep the morning light, review only confidence notes, and go into the AP CSA exam at 12 PM local focused and rested.",
      tip: "No new material. Accuracy, pacing, and calm tracing matter more now than one extra practice set.",
      checklist: [
        "Read the one-page notebook once.",
        "Do not start a new full problem set.",
        "Show up early and stay settled."
      ]
    }
  ]
};
