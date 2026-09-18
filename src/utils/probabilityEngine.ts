import { UserProgressState } from '../types';
import { DSA_CURRICULUM } from '../data/dsaCurriculum';
import { CORE_CS_QUESTIONS } from '../data/csCoreData';

export interface ProbabilityBreakdown {
  overallProbability: number; // 0 to 92%
  status: string;
  statusColor: 'emerald' | 'amber' | 'rose' | 'indigo';
  dsaScore: number; // out of 35
  projectScore: number; // out of 25
  cgpaScore: number; // out of 15
  coreCsScore: number; // out of 15
  mockAndContestScore: number; // out of 10
  fatalFlaws: string[];
  strengths: string[];
  highestLeverageActions: string[];
}

export function calculateSelectionProbability(state: UserProgressState): ProbabilityBreakdown {
  const fatalFlaws: string[] = [];
  const strengths: string[] = [];
  const highestLeverageActions: string[] = [];

  // 1. DSA SCORE (Max 35 points)
  const totalProblemsInCurriculum = DSA_CURRICULUM.reduce((acc, t) => acc + t.problems.length, 0);
  const solvedCount = state.solvedProblemIds.length;
  const topicsMastered = state.masteredTopicIds.length;
  const totalTopics = DSA_CURRICULUM.length;

  // Solving 25+ problems in our curated list gives high baseline, scaling up
  const problemFactor = Math.min(1, solvedCount / Math.max(1, totalProblemsInCurriculum));
  const topicFactor = Math.min(1, topicsMastered / Math.max(1, totalTopics));
  const dsaScore = Math.round((problemFactor * 22 + topicFactor * 13) * 10) / 10;

  if (solvedCount < 10) {
    fatalFlaws.push('Severe DSA Deficit: Solved fewer than 10 curated problems. Guaranteed elimination in Online Assessment.');
    highestLeverageActions.push('Solve at least 2 LeetCode Mediums daily from Phase 2 (Two Pointers, Sliding Window, Trees).');
  } else if (solvedCount >= 20) {
    strengths.push(`Solid DSA Baseline: ${solvedCount} core patterns solved.`);
  }

  // 2. PROJECT SCORE (Max 25 points)
  let projectScore = 0;
  if (state.customProjects.length === 0) {
    fatalFlaws.push('Missing Standout Project: 0 verified projects logged. Resume will fail the 6-second recruiter screen.');
    highestLeverageActions.push('Build 1 deep systems/real-time project (e.g. Distributed Cache or CRDT Collaborative Editor) with live deployment.');
  } else {
    // Score based on project engineering depth
    let bestProjectPoints = 0;
    for (const p of state.customProjects) {
      let currentPts = 6; // base for creating a project
      if (p.hasLiveDemo) currentPts += 4;
      if (p.hasUnitTests) currentPts += 4;
      if (p.hasCiCd) currentPts += 3;
      if (p.hasArchitectureDiagram) currentPts += 3;
      if (p.hasDockerOrCloud) currentPts += 2;
      if (p.hasComplexLogic) currentPts += 3;
      if (currentPts > bestProjectPoints) bestProjectPoints = currentPts;
    }
    projectScore = Math.min(25, bestProjectPoints);
    if (projectScore >= 20) {
      strengths.push('High-Caliber Portfolio: Live deployed project with unit tests and clear architecture.');
    } else {
      highestLeverageActions.push('Elevate your best project: Add automated unit tests, live deployment URL, and an architecture diagram.');
    }
  }

  // 3. CGPA & REFERRAL SCORE (Max 15 points)
  let cgpaScore = 0;
  if (state.cgpa >= 8.5) {
    cgpaScore = 15;
    strengths.push(`Safe Academic Tier: CGPA of ${state.cgpa} clears 99% of automated recruiter cutoff queries.`);
  } else if (state.cgpa >= 8.0) {
    cgpaScore = 13;
    strengths.push(`Solid CGPA (${state.cgpa}): Clears standard 8.0 campus and off-campus filters.`);
  } else if (state.cgpa >= 7.5) {
    cgpaScore = 10;
    if (!state.hasReferral) {
      fatalFlaws.push(`CGPA Risk (${state.cgpa}): Borderline filter zone. Without an employee referral, ATS has a 65% drop risk.`);
      highestLeverageActions.push('Secure an internal Microsoft or FAANG employee referral via LinkedIn networking to bypass CGPA filter.');
    }
  } else if (state.cgpa >= 7.0) {
    cgpaScore = 6;
    if (!state.hasReferral) {
      fatalFlaws.push(`Severe Cutoff Danger: CGPA ${state.cgpa} will be automatically filtered out by most campus drives without a referral.`);
      highestLeverageActions.push('Compensate for CGPA < 7.5 by winning an official hackathon or securing direct recruiter referrals.');
    }
  } else {
    cgpaScore = 3;
    fatalFlaws.push(`Critical CGPA Hazard (${state.cgpa}): High barrier for traditional entry. Direct employee referral is mandatory.`);
  }

  // Bonus for referral if CGPA is lower or Tier 3 college
  if (state.hasReferral) {
    cgpaScore = Math.min(15, cgpaScore + 3);
    strengths.push('Referral Secured: Bypasses standard job portal queues.');
  }

  // 4. CORE CS SUBJECTS (Max 15 points)
  const totalCsQuestions = CORE_CS_QUESTIONS.length;
  const reviewedCsCount = state.reviewedCsQuestionIds.length;
  const csRatio = Math.min(1, reviewedCsCount / Math.max(1, totalCsQuestions));
  const coreCsScore = Math.round(csRatio * 15 * 10) / 10;

  if (reviewedCsCount < 4) {
    fatalFlaws.push('Core CS Vulnerability: OS, DBMS, and OOP basics untested. Will fail Technical Round 2 cross-examination.');
    highestLeverageActions.push('Review operating systems (Paging, Deadlocks, Threads) and DBMS (Indexing, ACID) flashcards.');
  } else if (reviewedCsCount >= 8) {
    strengths.push('Strong CS Fundamentals: Ready for OS/DBMS deep dives.');
  }

  // 5. MOCK INTERVIEWS & CONTESTS (Max 10 points)
  let mockAndContestScore = 0;
  // Mocks (up to 5 points)
  const mockPts = Math.min(5, state.mockInterviewsDone * 1.5);
  // Contest rating (up to 5 points)
  let contestPts = 0;
  if (state.leetcodeContestRating >= 1800) contestPts = 5;
  else if (state.leetcodeContestRating >= 1650) contestPts = 4;
  else if (state.leetcodeContestRating >= 1500) contestPts = 2.5;
  else if (state.leetcodeContestRating > 0) contestPts = 1;

  mockAndContestScore = Math.round((mockPts + contestPts) * 10) / 10;

  if (state.mockInterviewsDone === 0) {
    fatalFlaws.push('0 Mock Interviews: High risk of freezing during live out-loud code explanation under stress.');
    highestLeverageActions.push('Conduct at least 3 peer mock interviews on platforms like Pramp or with peers.');
  }

  // Sum raw points
  const rawSum = dsaScore + projectScore + cgpaScore + coreCsScore + mockAndContestScore;
  
  // Max cap 92% (inherent market randomness, interviewer variance, headcount shifts)
  const overallProbability = Math.min(92, Math.max(5, Math.round(rawSum)));

  let status = 'Critical Danger (Elimination Risk)';
  let statusColor: 'emerald' | 'amber' | 'rose' | 'indigo' = 'rose';

  if (overallProbability >= 80) {
    status = 'Elite Interview Ready (80%+ Selection Target)';
    statusColor = 'emerald';
  } else if (overallProbability >= 65) {
    status = 'Strong Competitive Contender';
    statusColor = 'indigo';
  } else if (overallProbability >= 45) {
    status = 'Developing Candidate (High Variance)';
    statusColor = 'amber';
  } else {
    status = 'Critical Danger (Early Filter Discard)';
    statusColor = 'rose';
  }

  return {
    overallProbability,
    status,
    statusColor,
    dsaScore,
    projectScore,
    cgpaScore,
    coreCsScore,
    mockAndContestScore,
    fatalFlaws,
    strengths,
    highestLeverageActions: highestLeverageActions.slice(0, 3)
  };
}
