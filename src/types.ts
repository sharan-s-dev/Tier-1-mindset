export type DifficultyLevel = 'noobie' | 'medium' | 'advanced' | 'elite';

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  url: string;
  microsoftFrequency: 'High' | 'Very High' | 'Critical';
  keyInsight: string;
}

export interface Topic {
  id: string;
  title: string;
  level: DifficultyLevel;
  stageName: string;
  category: string;
  estimatedHours: number;
  recommendedDays: number;
  coreConcepts: string[];
  interviewTraps: string[];
  patternTip: string;
  problems: Problem[];
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Medium' | 'Hard' | 'Extreme';
  architecture: string[];
  techStack: string[];
  recruitersLoveReason: string;
  differentiators: string[];
  githubChecklist: string[];
}

export interface UserCustomProject {
  id: string;
  title: string;
  techStack: string;
  description: string;
  hasLiveDemo: boolean;
  hasUnitTests: boolean;
  hasCiCd: boolean;
  hasArchitectureDiagram: boolean;
  hasDockerOrCloud: boolean;
  hasComplexLogic: boolean; // Concurrency, caching, sockets, etc.
}

export interface CoreCsQuestion {
  id: string;
  subject: 'OS' | 'DBMS' | 'OOP' | 'CN' | 'SystemDesign';
  question: string;
  quickAnswer: string;
  depthNotes: string[];
  microsoftTag: boolean;
}

export interface UserProgressState {
  currentDay: number;
  targetTimelineDays: number; // 75, 120, 180
  startDate: string;
  dailyHoursGoal: number;
  hoursLoggedTotal: number;
  streakDays: number;
  lastActiveDate: string;
  
  // Profile metrics
  cgpa: number; // e.g. 8.2
  tierCollege: 'Tier 1' | 'Tier 2' | 'Tier 3';
  hasReferral: boolean;
  leetcodeContestRating: number; // e.g. 1650
  mockInterviewsDone: number;

  // Tracked IDs
  solvedProblemIds: string[];
  masteredTopicIds: string[];
  reviewedCsQuestionIds: string[];
  customProjects: UserCustomProject[];
  
  // Daily checklist completed tasks for current day
  dailyTasksCompleted: Record<string, boolean>; // e.g. "day-1-task-1": true

  // Phase 0 / Current DSA Course Trackers
  phaseZeroChecklist: Record<string, boolean>;
  dsaCourseNotes?: string;
}
