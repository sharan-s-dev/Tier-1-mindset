import { UserProgressState } from '../types';

const STORAGE_KEY = 'faang_microsoft_prep_state_v2';

export const DEFAULT_STATE: UserProgressState = {
  currentDay: 0, // Day 0: Pre-Flight & Current DSA Course Mode
  targetTimelineDays: 150,
  startDate: new Date().toISOString().split('T')[0],
  dailyHoursGoal: 3.5,
  hoursLoggedTotal: 0,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],

  // Realistic baseline for a student candidate starting their journey
  cgpa: 8.0,
  tierCollege: 'Tier 2',
  hasReferral: false,
  leetcodeContestRating: 0,
  mockInterviewsDone: 0,

  // Pristine Day 0: Completely clean slate
  solvedProblemIds: [],
  masteredTopicIds: [],
  reviewedCsQuestionIds: [],
  customProjects: [],
  dailyTasksCompleted: {},
  phaseZeroChecklist: {},
  dsaCourseNotes: 'Enrolled in DSA course — focusing on language fundamentals, pointers/memory model, Big-O complexity, and recursion before launching the active Day 1 countdown.'
};

export function loadUserProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveUserProgress(state: UserProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export function resetToDayZero(): UserProgressState {
  const cleanState: UserProgressState = {
    ...DEFAULT_STATE,
    currentDay: 0,
    hoursLoggedTotal: 0,
    streakDays: 0,
    solvedProblemIds: [],
    masteredTopicIds: [],
    reviewedCsQuestionIds: [],
    customProjects: [],
    dailyTasksCompleted: {},
    phaseZeroChecklist: {}
  };
  saveUserProgress(cleanState);
  return cleanState;
}

export function startDayOne(prevState: UserProgressState): UserProgressState {
  const activeState: UserProgressState = {
    ...prevState,
    currentDay: 1,
    streakDays: Math.max(1, prevState.streakDays),
    startDate: new Date().toISOString().split('T')[0],
    lastActiveDate: new Date().toISOString().split('T')[0]
  };
  saveUserProgress(activeState);
  return activeState;
}

export function exportProgressJson(state: UserProgressState): string {
  return JSON.stringify(state, null, 2);
}

export function importProgressJson(jsonString: string): UserProgressState | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const validated: UserProgressState = {
      ...DEFAULT_STATE,
      ...parsed
    };
    saveUserProgress(validated);
    return validated;
  } catch {
    return null;
  }
}

export function loadEliteDemoState(): UserProgressState {
  const eliteState: UserProgressState = {
    ...DEFAULT_STATE,
    currentDay: 135,
    targetTimelineDays: 150,
    dailyHoursGoal: 4.5,
    hoursLoggedTotal: 420,
    streakDays: 42,
    cgpa: 8.7,
    tierCollege: 'Tier 2',
    hasReferral: true,
    leetcodeContestRating: 1780,
    mockInterviewsDone: 6,
    solvedProblemIds: [
      'lc-contains-duplicate', 'lc-valid-anagram', 'lc-two-sum', 'lc-two-sum-ii', 'lc-move-zeroes', 'lc-3sum',
      'lc-single-number', 'lc-number-of-1-bits', 'lc-powx-n', 'lc-subsets', 'lc-permutations', 'lc-generate-parentheses',
      'lc-longest-substring-without-repeating-characters', 'lc-minimum-size-subarray-sum', 'lc-reverse-linked-list',
      'lc-linked-list-cycle-ii', 'lc-merge-k-sorted-lists', 'lc-valid-parentheses', 'lc-daily-temperatures',
      'lc-largest-rectangle-in-histogram', 'lc-search-in-rotated-sorted-array', 'lc-maximum-depth-of-binary-tree',
      'lc-lowest-common-ancestor-of-a-binary-tree', 'lc-kth-largest-element-in-an-array', 'lc-number-of-islands',
      'lc-rotting-oranges', 'lc-course-schedule', 'lc-climbing-stairs', 'lc-coin-change', 'lc-lru-cache'
    ],
    masteredTopicIds: [
      'complexity-analysis', 'arrays-two-pointers', 'math-bit-manipulation', 'recursion-backtracking-101',
      'sliding-window', 'linked-lists', 'stacks-and-queues', 'binary-search-patterns', 'binary-trees-and-bst',
      'heaps-priority-queues', 'graph-algorithms', 'topological-sort-dsu', 'dynamic-programming-1d-2d',
      'microsoft-signature-designs'
    ],
    reviewedCsQuestionIds: [
      'os-process-vs-thread', 'os-deadlock-conditions', 'os-virtual-memory-paging', 'os-mutex-vs-semaphore',
      'dbms-acid-properties', 'dbms-b-trees-indexing', 'dbms-indexing-cardinality', 'oop-solid-principles',
      'oop-design-patterns', 'cn-tcp-three-way-handshake', 'cn-http-dns-journey'
    ],
    customProjects: [
      {
        id: 'elite-1',
        title: 'Distributed Key-Value Store with Raft Consensus',
        techStack: 'Go, gRPC, Protobuf, Docker, Prometheus',
        description: 'Fault-tolerant distributed key-value store with leader election, WAL, and LRU eviction reaching 55k QPS.',
        hasLiveDemo: true,
        hasUnitTests: true,
        hasCiCd: true,
        hasArchitectureDiagram: true,
        hasDockerOrCloud: true,
        hasComplexLogic: true
      }
    ],
    dailyTasksCompleted: {
      'day-135-task-1': true,
      'day-135-task-2': true,
      'day-135-task-3': true
    }
  };
  saveUserProgress(eliteState);
  return eliteState;
}
