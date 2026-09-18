export interface PhaseZeroMilestone {
  id: string;
  category: string;
  title: string;
  description: string;
  checklistItems: string[];
  tutorialHellWarning: string;
  goldenHabit: string;
}

export const PHASE_ZERO_MILESTONES: PhaseZeroMilestone[] = [
  {
    id: 'p0-lang-memory',
    category: '1. Programming & Memory Model',
    title: 'Language Syntax, Memory & Pointers/References',
    description: 'Master your weapon of choice (C++, Java, or Python). Understand how variables exist in physical RAM.',
    checklistItems: [
      'Pointers, memory addresses, and dereferencing (if C++) or Reference semantics (Java/Python)',
      'Stack memory (local variables & frames) vs Heap memory (dynamically allocated objects)',
      'Pass-by-value vs Pass-by-reference and mutations inside helper functions',
      'Primitive types, 32-bit vs 64-bit integer overflow bounds (INT_MIN / INT_MAX)'
    ],
    tutorialHellWarning: 'Do NOT spend 3 weeks switching languages. Pick ONE (C++ or Java recommended for Microsoft/FAANG) and stick to it permanently.',
    goldenHabit: 'Always dry-run pointer swaps on a piece of paper before typing them.'
  },
  {
    id: 'p0-big-o',
    category: '2. Algorithmic Complexity',
    title: 'Big-O, Big-Omega & Auxiliary Space Analysis',
    description: 'The universal language of technical interviews. You must instantly tell why a loop is O(n), O(log n), or O(n^2).',
    checklistItems: [
      'Worst-case vs Average-case vs Best-case time complexity',
      'Identifying log(n) whenever search space or numbers are halved (binary search, binary representation)',
      'Space complexity: Differentiating between Auxiliary Space (extra structures) vs Input Space',
      'Recursion depth call-stack space overhead'
    ],
    tutorialHellWarning: 'Never memorize "Problem X is O(N log N)". Calculate it from scratch by counting operations.',
    goldenHabit: 'Look at LeetCode constraints: n <= 10^4 hints O(n) or O(n log n). n <= 20 hints O(2^n) backtracking.'
  },
  {
    id: 'p0-stl-collections',
    category: '3. Standard Data Structures',
    title: 'Built-in Collections & STL Mastery',
    description: 'You must know every standard library function and its time complexity by heart.',
    checklistItems: [
      'Dynamic arrays: C++ vector, Java ArrayList, Python list (amortized O(1) push_back, O(n) reallocation)',
      'Hash Table: unordered_map / HashMap / dict (O(1) average lookup, key collision mechanics)',
      'Ordered Map: std::map / TreeMap (O(log n) Red-Black Tree search, lower_bound / upper_bound)',
      'Queue, Deque, and Stack operations (push, pop, peek in O(1))',
      'Priority Queue / Min-Max Heap syntax and log(N) insertion/deletion'
    ],
    tutorialHellWarning: 'Do not re-invent standard maps in your interviews unless explicitly asked. Use standard collections with confidence.',
    goldenHabit: 'Know whether your map maintains insertion order, sorted order, or arbitrary order.'
  },
  {
    id: 'p0-scratch-build',
    category: '4. Implementation Mastery',
    title: 'Code Core Data Structures From Scratch (Once)',
    description: 'Before relying on libraries, code the underlying node pointers once to banish pointer anxiety forever.',
    checklistItems: [
      'Write a Singly Linked List class with insertAtHead, insertAtTail, deleteNode, and printList',
      'Write a Stack implementation using a raw fixed-size array and track top index',
      'Write a Queue using a custom Linked List with head and tail pointers',
      'Write a Binary Tree Node struct and print Inorder / Preorder traversals recursively'
    ],
    tutorialHellWarning: 'Only do this once for depth understanding. Do not get stuck building full custom libraries for weeks.',
    goldenHabit: 'If your custom linked list runs into null pointer exceptions, draw the nodes with arrows on paper.'
  },
  {
    id: 'p0-recursion-model',
    category: '5. Mental Models',
    title: 'Recursion Call-Stack & Tree Visualization',
    description: 'Recursion is the backbone of Trees, Graphs, Backtracking, and Dynamic Programming.',
    checklistItems: [
      'Base condition: The stopping point that prevents infinite StackOverflow',
      'The "Recursive Leap of Faith": Trusting subproblems return correct values before combining them',
      'Drawing the recursion state space tree on paper for Fibonacci, Factorial, and Array sum',
      'Understanding why tail recursion works and when recursion consumes O(depth) memory'
    ],
    tutorialHellWarning: 'Do not try to mentally compute 10 stack frames simultaneously in your head. Trust the sub-problem contract.',
    goldenHabit: 'Always write the base condition first. Then write the recursive step.'
  },
  {
    id: 'p0-elementary-sorting',
    category: '6. Algorithmic Patterns',
    title: 'Merge Sort, Quick Sort & Two Pointers Intro',
    description: 'Learn the two foundational divide-and-conquer algorithms that underpin all advanced algorithmic thinking.',
    checklistItems: [
      'Merge Sort: Divide array in halves, recursively sort, merge two sorted arrays in O(n)',
      'Quick Sort: Partition array around pivot, Lomuto or Hoare partition schemes',
      'Stable vs Unstable sorting mechanics',
      'Introductory Two Pointers: Left-right convergent pointers on a sorted array'
    ],
    tutorialHellWarning: 'Don’t just watch animated sorting gifs. Open your IDE and implement Merge Sort without looking at reference code.',
    goldenHabit: 'Notice how merging two sorted lists in Merge Sort is identical to the LeetCode "Merge Two Sorted Lists" problem.'
  },
  {
    id: 'p0-first-20-easy',
    category: '7. Problem Solving Gate',
    title: 'The "20 Easy Problems Solo" Confidence Gate',
    description: 'Before jumping into LeetCode Mediums or this 150-day countdown, prove you can solve 20 basic problems without video hints.',
    checklistItems: [
      'Two Sum (LC 1)',
      'Valid Palindrome (LC 125)',
      'Contains Duplicate (LC 217)',
      'Valid Anagram (LC 242)',
      'Best Time to Buy and Sell Stock (LC 121)',
      'Reverse Linked List (LC 206)',
      'Merge Two Sorted Lists (LC 21)',
      'Binary Search (LC 704)',
      'Maximum Depth of Binary Tree (LC 104)',
      'Invert Binary Tree (LC 226)'
    ],
    tutorialHellWarning: 'The 20-Minute Rule: Spend 20 minutes attempting the problem alone. Only if totally stuck, read the algorithm hint (not code).',
    goldenHabit: 'When you finish a problem, re-type it from scratch without copy-pasting to reinforce muscle memory.'
  },
  {
    id: 'p0-workflow-setup',
    category: '8. Professional Setup',
    title: 'Clean Coding Environment & Interview Habit Formation',
    description: 'Form the habits that pass live Microsoft screens from Day 1.',
    checklistItems: [
      'Set up VS Code or CLion/IntelliJ with strict auto-formatting and linting',
      'Practice meaningful variable naming (no single-letter names like `a`, `b`, `c` for complex variables)',
      'Learn how to write test cases and edge cases (empty input, 1 element, all duplicates, negative numbers)',
      'Practice explaining your thoughts out loud while writing code (critical for FAANG rounds)'
    ],
    tutorialHellWarning: 'Never practice coding inside a browser without knowing how to compile and run with custom inputs locally.',
    goldenHabit: 'Treat every LeetCode submission as if a Microsoft Principal Engineer is looking over your shoulder.'
  }
];

export const DSA_COURSE_BEST_PRACTICES = [
  {
    rule: 'The "Close The Video" Mandate',
    description: 'When your instructor finishes explaining a concept, immediately pause the video, close the browser, and implement it yourself. If you can only code while looking at the video, you did not learn it.'
  },
  {
    rule: 'The 20-Minute Struggle Rule',
    description: 'Never look at a solution in the first 20 minutes. Real neural pathways are built during the struggle. If you give up after 3 minutes, your brain learns helplessness, not problem solving.'
  },
  {
    rule: 'Pattern Over Syntax',
    description: 'Do not memorize code lines. Learn to recognize the trigger: "Array is sorted + find target" = Binary Search. "Subarray with condition" = Sliding Window. "Tree shortest path" = BFS.'
  },
  {
    rule: 'Write Complexities on Paper',
    description: 'Always annotate your code with `// Time: O(...)` and `// Space: O(...)` before clicking Submit. In real interviews, you are graded on this justification.'
  }
];
