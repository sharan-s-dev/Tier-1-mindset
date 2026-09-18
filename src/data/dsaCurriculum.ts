import { Topic } from '../types';

export const DSA_CURRICULUM: Topic[] = [
  // --- LEVEL 0: NOOBIE FOUNDATIONS ---
  {
    id: 'complexity-analysis',
    title: 'Time & Space Complexity + STL/Collections',
    level: 'noobie',
    stageName: 'Phase 1: Foundations',
    category: 'Core Theory',
    estimatedHours: 12,
    recommendedDays: 4,
    coreConcepts: [
      'Big-O, Big-Theta, Big-Omega notation',
      'Amortized time complexity (Dynamic array resizing)',
      'Recursive stack frames and auxiliary space',
      'Deep dive into C++ STL / Java Collections / Python heapq internals'
    ],
    interviewTraps: [
      'Assuming hash map lookup is always O(1) without considering hash collisions (worst case O(n))',
      'Ignoring hidden space overhead in recursive calls or string slicing'
    ],
    patternTip: 'Whenever you see n <= 20, suspect O(2^n) or O(n!). When n <= 10^5, target O(n) or O(n log n). If n <= 10^9, target O(log n) or O(1).',
    problems: [
      {
        id: 'lc-contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        pattern: 'Hash Set Lookup',
        url: 'https://leetcode.com/problems/contains-duplicate/',
        microsoftFrequency: 'High',
        keyInsight: 'Trade O(n) memory for O(n) time instead of O(n^2) brute force.'
      },
      {
        id: 'lc-valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        pattern: 'Frequency Count Array',
        url: 'https://leetcode.com/problems/valid-anagram/',
        microsoftFrequency: 'High',
        keyInsight: 'A fixed 26-element array operates in O(1) auxiliary space compared to a general hash map.'
      }
    ]
  },
  {
    id: 'arrays-two-pointers',
    title: 'Arrays, In-Place Operations & Two Pointers',
    level: 'noobie',
    stageName: 'Phase 1: Foundations',
    category: 'Arrays & Strings',
    estimatedHours: 18,
    recommendedDays: 6,
    coreConcepts: [
      'Left-right convergent pointers',
      'Fast and slow runner pointers',
      'In-place element removal without reallocating arrays',
      'Prefix sums for instant range queries'
    ],
    interviewTraps: [
      'Index out of bounds on array edges when using pointer arithmetic',
      'Forgetting that two pointers require the array to be sorted for sum problems'
    ],
    patternTip: 'If the array is sorted and you need a pair with a specific condition, immediately test Convergent Two Pointers.',
    problems: [
      {
        id: 'lc-two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        pattern: 'Hash Map Complement',
        url: 'https://leetcode.com/problems/two-sum/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Store complement target - nums[i] in map to find partner in single pass.'
      },
      {
        id: 'lc-two-sum-ii',
        title: 'Two Sum II - Input Array Is Sorted',
        difficulty: 'Medium',
        pattern: 'Two Pointers Convergent',
        url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        microsoftFrequency: 'High',
        keyInsight: 'If current sum < target, left++ increases sum; if sum > target, right-- decreases it.'
      },
      {
        id: 'lc-move-zeroes',
        title: 'Move Zeroes',
        difficulty: 'Easy',
        pattern: 'Slow-Fast Reader/Writer',
        url: 'https://leetcode.com/problems/move-zeroes/',
        microsoftFrequency: 'High',
        keyInsight: 'One pointer tracks the insertion point for non-zeros, preserving order.'
      },
      {
        id: 'lc-3sum',
        title: '3Sum',
        difficulty: 'Medium',
        pattern: 'Sort + Two Pointers + Duplicate Skipped',
        url: 'https://leetcode.com/problems/3sum/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Sort first, fix element i, run two pointers on the remainder, and aggressively skip duplicate values.'
      }
    ]
  },
  {
    id: 'math-bit-manipulation',
    title: 'Bit Manipulation & Fast Math',
    level: 'noobie',
    stageName: 'Phase 1: Foundations',
    category: 'Math & Bits',
    estimatedHours: 14,
    recommendedDays: 5,
    coreConcepts: [
      'Bitwise AND, OR, XOR, NOT, Left/Right shifts',
      'Brian Kernighan algorithm for counting set bits (n & (n - 1))',
      'XOR properties: x ^ x = 0 and x ^ 0 = x',
      'Fast exponentiation (Binary Exponentiation)'
    ],
    interviewTraps: [
      'Operator precedence: == has higher precedence than bitwise & and | in C++ and Java!',
      '32-bit signed integer overflow when shifting bits or reversing integers'
    ],
    patternTip: 'Use n & (n - 1) to strip the lowest set bit. Check power of 2 with (n > 0) && (n & (n - 1)) == 0.',
    problems: [
      {
        id: 'lc-single-number',
        title: 'Single Number',
        difficulty: 'Easy',
        pattern: 'XOR Cancellation',
        url: 'https://leetcode.com/problems/single-number/',
        microsoftFrequency: 'High',
        keyInsight: 'XORing all numbers cancels duplicate pairs, leaving the single unique number.'
      },
      {
        id: 'lc-number-of-1-bits',
        title: 'Number of 1 Bits',
        difficulty: 'Easy',
        pattern: 'Brian Kernighan',
        url: 'https://leetcode.com/problems/number-of-1-bits/',
        microsoftFrequency: 'High',
        keyInsight: 'Iteratively unset lowest bit with n = n & (n - 1) in iterations equal to number of set bits.'
      },
      {
        id: 'lc-powx-n',
        title: 'Pow(x, n)',
        difficulty: 'Medium',
        pattern: 'Binary Exponentiation',
        url: 'https://leetcode.com/problems/powx-n/',
        microsoftFrequency: 'Very High',
        keyInsight: 'Halve exponent each step in O(log n). Handle negative integer overflow for INT_MIN.'
      }
    ]
  },
  {
    id: 'recursion-backtracking-101',
    title: 'Recursion & Basic Backtracking',
    level: 'noobie',
    stageName: 'Phase 1: Foundations',
    category: 'Recursion',
    estimatedHours: 20,
    recommendedDays: 7,
    coreConcepts: [
      'Base cases and recursive leap of faith',
      'State space tree visualization',
      'Choose, Explore, Un-choose paradigm',
      'Subsets, combinations, and permutations'
    ],
    interviewTraps: [
      'Missing base condition triggering StackOverflow error',
      'Mutating state without undoing it during backtracking'
    ],
    patternTip: 'Subsets branch into (Include vs Exclude) or (Loop over candidates starting at index). Always pop back what you pushed.',
    problems: [
      {
        id: 'lc-subsets',
        title: 'Subsets',
        difficulty: 'Medium',
        pattern: 'Backtracking Decision Tree',
        url: 'https://leetcode.com/problems/subsets/',
        microsoftFrequency: 'Very High',
        keyInsight: 'Add current path to result at every node of recursion tree, then iterate index to n.'
      },
      {
        id: 'lc-permutations',
        title: 'Permutations',
        difficulty: 'Medium',
        pattern: 'Backtracking with Visited Map',
        url: 'https://leetcode.com/problems/permutations/',
        microsoftFrequency: 'Very High',
        keyInsight: 'At each position, try all unused elements and backtrack.'
      },
      {
        id: 'lc-generate-parentheses',
        title: 'Generate Parentheses',
        difficulty: 'Medium',
        pattern: 'Constrained Backtracking',
        url: 'https://leetcode.com/problems/generate-parentheses/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Can add ( if open < n; can add ) only if close < open.'
      }
    ]
  },

  // --- LEVEL 1: CORE FIGHTER (MEDIUM) ---
  {
    id: 'sliding-window',
    title: 'Sliding Window & Variable Bounds',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Arrays & Strings',
    estimatedHours: 22,
    recommendedDays: 7,
    coreConcepts: [
      'Fixed window size vs Dynamically expanding/shrinking window',
      'Frequency counter state synchronization',
      'Character set constraints (ASCII 128 / 256)',
      'Shrinking condition triggers'
    ],
    interviewTraps: [
      'Shrinking the window with an if instead of a while loop when condition can be violated by multiple steps',
      'Updating optimal answer before window is valid vs after window is valid'
    ],
    patternTip: 'Expand right pointer until invalid or valid, shrink left pointer while maintaining or seeking optimal state.',
    problems: [
      {
        id: 'lc-longest-substring-without-repeating-characters',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        pattern: 'Dynamic Sliding Window',
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Store character latest index. When duplicate seen, jump left pointer to max(left, prev_idx + 1).'
      },
      {
        id: 'lc-minimum-size-subarray-sum',
        title: 'Minimum Size Subarray Sum',
        difficulty: 'Medium',
        pattern: 'Shrink-On-Valid Window',
        url: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
        microsoftFrequency: 'High',
        keyInsight: 'Expand right until sum >= target, then shrink left to find minimum length.'
      },
      {
        id: 'lc-minimum-window-substring',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        pattern: 'Match Count Sliding Window',
        url: 'https://leetcode.com/problems/minimum-window-substring/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Track count of satisfied unique character targets. Expand right, shrink left when satisfied == required.'
      }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists & Fast/Slow Pointers',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Linked Lists',
    estimatedHours: 18,
    recommendedDays: 6,
    coreConcepts: [
      'Dummy head node pattern (removes edge cases for head updates)',
      'Floyd cycle detection (Tortoise and Hare)',
      'Iterative in-place list reversal',
      'Merging sorted linked lists'
    ],
    interviewTraps: [
      'Losing node pointers during re-wiring (dangling pointers or infinite loops)',
      'Null pointer exceptions on fast.next when fast is null'
    ],
    patternTip: 'Always create a dummy node pointing to head: `ListNode dummy(0); dummy.next = head;`. Saves 80% of edge case bugs.',
    problems: [
      {
        id: 'lc-reverse-linked-list',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        pattern: 'Three Pointers (prev, curr, next)',
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Save next, point curr.next to prev, advance prev and curr.'
      },
      {
        id: 'lc-linked-list-cycle-ii',
        title: 'Linked List Cycle II',
        difficulty: 'Medium',
        pattern: 'Floyd Cycle + Mathematical Reset',
        url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
        microsoftFrequency: 'Critical',
        keyInsight: 'When slow meets fast, reset one pointer to head. Both take 1 step: they meet at cycle entrance.'
      },
      {
        id: 'lc-merge-k-sorted-lists',
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        pattern: 'Min-Heap or Divide & Conquer',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Push k list heads into min-heap. Pop min, attach to result, push popped node next into heap.'
      }
    ]
  },
  {
    id: 'stacks-and-queues',
    title: 'Stacks, Queues & Monotonic Stack',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Stacks & Queues',
    estimatedHours: 24,
    recommendedDays: 8,
    coreConcepts: [
      'LIFO vs FIFO properties',
      'Monotonic Increasing/Decreasing Stacks',
      'Next Greater Element / Previous Smaller Element pattern',
      'Circular queue implementation and Deque for sliding window max'
    ],
    interviewTraps: [
      'Popping from empty stack without validation check',
      'Pushing values instead of indices into monotonic stacks when distance/width is needed'
    ],
    patternTip: 'If problem asks for "next greater", "previous smaller", or "largest rectangle area", immediately use Monotonic Stack storing indices.',
    problems: [
      {
        id: 'lc-valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        pattern: 'Stack Matching',
        url: 'https://leetcode.com/problems/valid-parentheses/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Push closing bracket when opening bracket is seen for simple equality check.'
      },
      {
        id: 'lc-daily-temperatures',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        pattern: 'Monotonic Decreasing Stack',
        url: 'https://leetcode.com/problems/daily-temperatures/',
        microsoftFrequency: 'Very High',
        keyInsight: 'Keep stack of indices with decreasing temperatures. Pop when warmer day arrives.'
      },
      {
        id: 'lc-largest-rectangle-in-histogram',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        pattern: 'Monotonic Stack Width Expansion',
        url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Calculate max area with popped bar as smallest height. Width is right_boundary - left_boundary - 1.'
      }
    ]
  },
  {
    id: 'binary-search-patterns',
    title: 'Binary Search & Search Space Reduction',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Binary Search',
    estimatedHours: 20,
    recommendedDays: 7,
    coreConcepts: [
      'Standard template: while(low <= high) with mid = low + (high - low)/2',
      'Binary search on Answer / Solution Space (monotonic condition f(x))',
      'Search in rotated sorted arrays',
      'Finding lower_bound and upper_bound'
    ],
    interviewTraps: [
      'Integer overflow with (low + high)/2 in languages like Java/C++',
      'Off-by-one errors with < vs <= causing infinite loops'
    ],
    patternTip: 'If question asks for "Minimum maximum" or "Maximum minimum" or search target is bounded, binary search on the answer!',
    problems: [
      {
        id: 'lc-binary-search',
        title: 'Binary Search',
        difficulty: 'Easy',
        pattern: 'Classic Divide & Conquer',
        url: 'https://leetcode.com/problems/binary-search/',
        microsoftFrequency: 'High',
        keyInsight: 'Standard pristine template with no infinite loop bugs.'
      },
      {
        id: 'lc-search-in-rotated-sorted-array',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        pattern: 'Modified Binary Search',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        microsoftFrequency: 'Critical',
        keyInsight: 'At least one half is always sorted. Check if target lies in the sorted half.'
      },
      {
        id: 'lc-koko-eating-bananas',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        pattern: 'Binary Search on Answer Space',
        url: 'https://leetcode.com/problems/koko-eating-bananas/',
        microsoftFrequency: 'Very High',
        keyInsight: 'Speed range is 1 to max(piles). Monotonic boolean check: canEatAll(speed, h).'
      }
    ]
  },
  {
    id: 'binary-trees-and-bst',
    title: 'Binary Trees & Binary Search Trees (Microsoft Favorite)',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Trees & BST',
    estimatedHours: 32,
    recommendedDays: 10,
    coreConcepts: [
      'Recursive DFS: Preorder, Inorder (BST gives sorted array!), Postorder',
      'Iterative BFS with Queue (Level order traversal)',
      'Lowest Common Ancestor (LCA)',
      'Diameter, Max Path Sum, and Tree Serialization'
    ],
    interviewTraps: [
      'Validating BST by only comparing node with its immediate children instead of carrying (minVal, maxVal) bounds',
      'Modifying trees without returning updated sub-roots'
    ],
    patternTip: 'Trees are 90% postorder traversal (solve left, solve right, combine at root). Always define what your recursive helper returns.',
    problems: [
      {
        id: 'lc-maximum-depth-of-binary-tree',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        pattern: 'Bottom-Up Postorder',
        url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        microsoftFrequency: 'Critical',
        keyInsight: 'return 1 + max(dfs(node.left), dfs(node.right)).'
      },
      {
        id: 'lc-lowest-common-ancestor-of-a-binary-tree',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        pattern: 'Postorder Target Discovery',
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        microsoftFrequency: 'Critical',
        keyInsight: 'If left and right both return non-null, root is LCA. Else propagate the non-null child.'
      },
      {
        id: 'lc-binary-tree-level-order-traversal',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        pattern: 'Queue BFS with Level Size Snapshot',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Capture q.size() at start of each while loop to process strictly one layer.'
      },
      {
        id: 'lc-serialize-and-deserialize-binary-tree',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        pattern: 'Preorder Stream + Delimiter',
        url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Preorder DFS encoding null as # with delimiter. Rebuild recursively consuming tokens.'
      }
    ]
  },
  {
    id: 'heaps-priority-queues',
    title: 'Heaps & Priority Queues',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Heaps',
    estimatedHours: 18,
    recommendedDays: 6,
    coreConcepts: [
      'Complete binary tree array representation (2i + 1, 2i + 2)',
      'Min-heap vs Max-heap mechanics (heapify O(n), push/pop O(log n))',
      'Two-heap pattern for running median',
      'Top-K frequent elements'
    ],
    interviewTraps: [
      'Using a max-heap of size n for Top-K smallest instead of maintaining a min-heap of size K',
      'Sorting entire array O(n log n) when heap solves it in O(n log k)'
    ],
    patternTip: 'To find K largest elements, maintain a Min-Heap of size K. When size > K, pop minimum!',
    problems: [
      {
        id: 'lc-kth-largest-element-in-an-array',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        pattern: 'Min-Heap of Size K / Quickselect',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Min-heap holds K largest. Top element is the Kth largest.'
      },
      {
        id: 'lc-find-median-from-data-stream',
        title: 'Find Median from Data Stream',
        difficulty: 'Hard',
        pattern: 'Two Heaps Balance',
        url: 'https://leetcode.com/problems/find-median-from-data-stream/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Max-heap for small half, min-heap for large half. Balance size difference <= 1.'
      }
    ]
  },
  {
    id: 'matrix-manipulation',
    title: 'Matrix & 2D Grid In-Place Operations',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Arrays & Matrices',
    estimatedHours: 16,
    recommendedDays: 5,
    coreConcepts: [
      'Layer-by-layer traversal (top, right, bottom, left boundaries)',
      'Matrix transpose followed by column reflection for 90-degree rotations',
      'Using first row and first column as in-place O(1) space flag indicators',
      'Boundary guard conditions for safe grid traversal'
    ],
    interviewTraps: [
      'Iterating through cells and modifying them immediately, triggering cascading false mutations',
      'Row/Col dimension swap errors with non-square m x n matrices'
    ],
    patternTip: 'To rotate a matrix clockwise by 90 degrees in O(1) extra space: Transpose the matrix first, then reverse every row.',
    problems: [
      {
        id: 'lc-rotate-image',
        title: 'Rotate Image',
        difficulty: 'Medium',
        pattern: 'Transpose + Reverse Rows',
        url: 'https://leetcode.com/problems/rotate-image/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Swap matrix[i][j] with matrix[j][i], then reverse each row horizontally.'
      },
      {
        id: 'lc-spiral-matrix',
        title: 'Spiral Matrix',
        difficulty: 'Medium',
        pattern: 'Four Bounding Pointers',
        url: 'https://leetcode.com/problems/spiral-matrix/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Track top, bottom, left, right bounds. Traverse and contract bounds until pointers cross.'
      },
      {
        id: 'lc-set-matrix-zeroes',
        title: 'Set Matrix Zeroes',
        difficulty: 'Medium',
        pattern: 'First Row & Col as Flags',
        url: 'https://leetcode.com/problems/set-matrix-zeroes/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Use row 0 and col 0 to store zeroes for O(1) space instead of allocating extra O(m+n) arrays.'
      }
    ]
  },
  {
    id: 'intervals-and-greedy',
    title: 'Intervals & Greedy Scheduling (Microsoft Staple)',
    level: 'medium',
    stageName: 'Phase 2: Core Patterns',
    category: 'Intervals & Greedy',
    estimatedHours: 20,
    recommendedDays: 6,
    coreConcepts: [
      'Sorting intervals by start time vs end time',
      'Merging overlapping ranges: max(end1, end2)',
      'Meeting room allocation using Min-Heap or two sorted event arrays',
      'Greedy choice property: picking early finishing intervals'
    ],
    interviewTraps: [
      'Forgetting that interval [1, 4] and [4, 5] overlap if equal start and end count as collision (verify with interviewer)',
      'Not sorting before attempting to merge'
    ],
    patternTip: 'Always sort intervals by start time `a[0] - b[0]`. If `curr.start <= prev.end`, merge: `prev.end = max(prev.end, curr.end)`.',
    problems: [
      {
        id: 'lc-merge-intervals',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        pattern: 'Sort by Start + Merge Overlaps',
        url: 'https://leetcode.com/problems/merge-intervals/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Sort by interval[0]. If current start <= previous end, merge them by extending end time.'
      },
      {
        id: 'lc-insert-interval',
        title: 'Insert Interval',
        difficulty: 'Medium',
        pattern: 'Three-Phase Linear Scan',
        url: 'https://leetcode.com/problems/insert-interval/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Add all intervals before newInterval, merge all overlapping intervals, then append all remaining.'
      },
      {
        id: 'lc-non-overlapping-intervals',
        title: 'Non-overlapping Intervals',
        difficulty: 'Medium',
        pattern: 'Greedy Earliest End Time',
        url: 'https://leetcode.com/problems/non-overlapping-intervals/',
        microsoftFrequency: 'High',
        keyInsight: 'Sort by end time. Greedily pick intervals that end earliest to leave maximum room for future intervals.'
      }
    ]
  },

  // --- LEVEL 2: ADVANCED BEAST ---
  {
    id: 'graph-algorithms',
    title: 'Graphs: BFS, DFS, Dijkstra & Shortest Path',
    level: 'advanced',
    stageName: 'Phase 3: Advanced Algorithms',
    category: 'Graphs',
    estimatedHours: 35,
    recommendedDays: 11,
    coreConcepts: [
      'Adjacency list representation',
      'Breadth-First Search (Shortest path in unweighted graph)',
      'Depth-First Search (Connected components, cycle detection)',
      'Dijkstra algorithm with Min-Heap for weighted graphs'
    ],
    interviewTraps: [
      'Marking nodes as visited when popping from queue instead of when pushing (leads to exponential duplicate pushes in BFS)',
      'Applying Dijkstra on graphs with negative edge weights'
    ],
    patternTip: 'For matrix grid graphs, define directions: `int dir[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};`. Avoid 4 copy-paste branches.',
    problems: [
      {
        id: 'lc-number-of-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        pattern: 'Grid DFS / Flood Fill',
        url: 'https://leetcode.com/problems/number-of-islands/',
        microsoftFrequency: 'Critical',
        keyInsight: 'When land 1 is found, increment island count and sink all adjacent 1s to 0 with DFS.'
      },
      {
        id: 'lc-rotting-oranges',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        pattern: 'Multi-Source BFS',
        url: 'https://leetcode.com/problems/rotting-oranges/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Enqueue all initial rotten oranges simultaneously to simulate parallel time propagation.'
      },
      {
        id: 'lc-word-ladder',
        title: 'Word Ladder',
        difficulty: 'Hard',
        pattern: 'Shortest Path BFS',
        url: 'https://leetcode.com/problems/word-ladder/',
        microsoftFrequency: 'Very High',
        keyInsight: 'Transform word 1 letter at a time, check dictionary presence, BFS guarantees shortest mutation.'
      }
    ]
  },
  {
    id: 'topological-sort-dsu',
    title: 'Topological Sort & Disjoint Set Union (DSU)',
    level: 'advanced',
    stageName: 'Phase 3: Advanced Algorithms',
    category: 'Graphs',
    estimatedHours: 24,
    recommendedDays: 8,
    coreConcepts: [
      'Kahn algorithm (In-degree array + Queue)',
      'Cycle detection in Directed Acyclic Graphs (DAG)',
      'DSU with Path Compression and Union by Rank/Size',
      'Kruskal Minimum Spanning Tree (MST)'
    ],
    interviewTraps: [
      'Forgetting that if processed count in Kahn algorithm < total nodes, a cycle exists',
      'Writing DSU without path compression (degrades from nearly O(1) to O(N))'
    ],
    patternTip: 'If dependencies exist ("Task A must be completed before Task B"), model it as DAG and run Kahn’s Topological Sort.',
    problems: [
      {
        id: 'lc-course-schedule',
        title: 'Course Schedule',
        difficulty: 'Medium',
        pattern: 'Kahn Topological Sort / In-degree',
        url: 'https://leetcode.com/problems/course-schedule/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Build in-degree map. Push 0 in-degree nodes to queue. If all nodes cleared, schedule valid.'
      },
      {
        id: 'lc-course-schedule-ii',
        title: 'Course Schedule II',
        difficulty: 'Medium',
        pattern: 'Topological Ordering Construction',
        url: 'https://leetcode.com/problems/course-schedule-ii/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Collect order as nodes are popped. If order length != numCourses, return empty.'
      },
      {
        id: 'lc-redundant-connection',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        pattern: 'DSU Cycle Detection',
        url: 'https://leetcode.com/problems/redundant-connection/',
        microsoftFrequency: 'High',
        keyInsight: 'Iterate edges: if find(u) == find(v), this edge creates a cycle!'
      }
    ]
  },
  {
    id: 'dynamic-programming-1d-2d',
    title: 'Dynamic Programming: 1D, 2D Grid & Knapsack',
    level: 'advanced',
    stageName: 'Phase 3: Advanced Algorithms',
    category: 'Dynamic Programming',
    estimatedHours: 40,
    recommendedDays: 14,
    coreConcepts: [
      'Memoization (Top-Down) vs Tabulation (Bottom-Up)',
      'Identifying Subproblems and Transition States',
      'Space optimization (rolling variables or rolling 1D array)',
      '0/1 Knapsack, Unbounded Knapsack, Longest Common Subsequence (LCS)'
    ],
    interviewTraps: [
      'Over-complicating state space: try to keep state to 1 or 2 variables before adding more',
      'Not initializing base cases or boundary cells in 2D grids'
    ],
    patternTip: 'Step 1: Write recursive brute force. Step 2: Add memo table. Step 3: Convert to bottom-up DP. Step 4: Compress space.',
    problems: [
      {
        id: 'lc-climbing-stairs',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        pattern: 'Fibonacci State Transition',
        url: 'https://leetcode.com/problems/climbing-stairs/',
        microsoftFrequency: 'High',
        keyInsight: 'dp[i] = dp[i-1] + dp[i-2]. Optimize space to O(1) with two variables.'
      },
      {
        id: 'lc-coin-change',
        title: 'Coin Change',
        difficulty: 'Medium',
        pattern: 'Unbounded Knapsack Min-Value',
        url: 'https://leetcode.com/problems/coin-change/',
        microsoftFrequency: 'Critical',
        keyInsight: 'dp[i] = min(dp[i], 1 + dp[i - coin]) for each coin <= i.'
      },
      {
        id: 'lc-longest-common-subsequence',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        pattern: '2D String Matching DP',
        url: 'https://leetcode.com/problems/longest-common-subsequence/',
        microsoftFrequency: 'Critical',
        keyInsight: 'If s1[i] == s2[j], 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).'
      },
      {
        id: 'lc-edit-distance',
        title: 'Edit Distance',
        difficulty: 'Hard',
        pattern: '2D Transition Insert/Delete/Replace',
        url: 'https://leetcode.com/problems/edit-distance/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Three operations: 1 + min(insert, delete, replace). Essential classic for Microsoft.'
      }
    ]
  },
  {
    id: 'tries-advanced-strings',
    title: 'Tries & String Searching',
    level: 'advanced',
    stageName: 'Phase 3: Advanced Algorithms',
    category: 'Tries',
    estimatedHours: 18,
    recommendedDays: 6,
    coreConcepts: [
      'TrieNode with children array/map and isEndOfWord flag',
      'Prefix matching and autocomplete mechanics',
      'Bitwise Trie for Maximum XOR queries',
      'Wildcard searches with recursion'
    ],
    interviewTraps: [
      'Memory explosion: allocating 26 pointers per node without cleaning up or memory budgeting',
      'Assuming case sensitivity or forgetting non-lowercase alphabet input'
    ],
    patternTip: 'Whenever questions mention "Prefix Search", "Dictionary with wildcard * or .", or "Auto-suggest", use a Trie.',
    problems: [
      {
        id: 'lc-implement-trie-prefix-tree',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        pattern: 'Prefix Tree Node Class',
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Store children nodes in array or map; provide insert, search, and startsWith methods.'
      },
      {
        id: 'lc-design-add-and-search-words-data-structure',
        title: 'Design Add and Search Words Data Structure',
        difficulty: 'Medium',
        pattern: 'Trie with Backtracking Wildcard',
        url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
        microsoftFrequency: 'Critical',
        keyInsight: 'When . is encountered, recursively check all existing child branches.'
      }
    ]
  },

  // --- LEVEL 3: ELITE MICROSOFT & FAANG FINISHER ---
  {
    id: 'microsoft-signature-designs',
    title: 'Microsoft Signature Interview Problems & LLD',
    level: 'elite',
    stageName: 'Phase 4: Elite Finisher',
    category: 'System & Signature DSA',
    estimatedHours: 35,
    recommendedDays: 12,
    coreConcepts: [
      'LRU & LFU Cache data structure design',
      'In-Memory File System simulation',
      'Snapshot arrays and time-based key-value stores',
      'Thread safety considerations in system design'
    ],
    interviewTraps: [
      'Writing O(n) eviction for LRU instead of O(1) Doubly Linked List + Hash Map',
      'Failing to clean up dummy head/tail pointers in custom linked list implementations'
    ],
    patternTip: 'For LRU Cache, pair a Hash Map<Key, Node*> with a Doubly Linked List with head & tail sentinel nodes for clean O(1) mutations.',
    problems: [
      {
        id: 'lc-lru-cache',
        title: 'LRU Cache',
        difficulty: 'Medium',
        pattern: 'Hash Map + Doubly Linked List',
        url: 'https://leetcode.com/problems/lru-cache/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Fast lookup via map, O(1) splice/move-to-head via doubly linked list.'
      },
      {
        id: 'lc-design-in-memory-file-system',
        title: 'Design In-Memory File System',
        difficulty: 'Hard',
        pattern: 'Trie / Tree Directory Structure',
        url: 'https://leetcode.com/problems/design-in-memory-file-system/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Model directory as tree node with files map and subdirectories map.'
      },
      {
        id: 'lc-time-based-key-value-store',
        title: 'Time Based Key-Value Store',
        difficulty: 'Medium',
        pattern: 'Hash Map + Binary Search on Timestamps',
        url: 'https://leetcode.com/problems/time-based-key-value-store/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Store vector of {timestamp, val} in map. Run binary search (upper_bound) for query.'
      }
    ]
  },
  {
    id: 'mock-interviews-timed-oa',
    title: 'Online Assessment (OA) Simulation & Timed Contests',
    level: 'elite',
    stageName: 'Phase 4: Elite Finisher',
    category: 'Contest & Execution',
    estimatedHours: 25,
    recommendedDays: 10,
    coreConcepts: [
      'Handling 70-90 minute Codility / HackerRank test formats',
      'Stress testing with large randomized inputs (Edge cases: INT_MIN, empty arrays, repeated keys)',
      'Explaining approach out-loud before writing code (Dry run with sample trace)',
      'Code cleanliness, variable naming, and modular helper functions'
    ],
    interviewTraps: [
      'Writing code immediately without checking constraints or edge cases with the interviewer',
      'Freezing when a test case fails rather than using print/trace diagnostics methodically'
    ],
    patternTip: 'Always spend first 5 minutes clarifying constraints: What are array length limits? Can values be negative? Are values unique?',
    problems: [
      {
        id: 'lc-trapping-rain-water',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        pattern: 'Two Pointers / Prefix Max Arrays',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Water trapped at i is min(leftMax, rightMax) - height[i]. Two pointers calculate in O(1) space.'
      },
      {
        id: 'lc-word-search-ii',
        title: 'Word Search II',
        difficulty: 'Hard',
        pattern: 'Trie + Grid Backtracking Pruning',
        url: 'https://leetcode.com/problems/word-search-ii/',
        microsoftFrequency: 'Critical',
        keyInsight: 'Store words in Trie. Prune Trie branch when word found to prevent redundant DFS runs.'
      }
    ]
  }
];
