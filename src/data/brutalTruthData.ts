export interface BrutalRule {
  id: string;
  category: 'CGPA' | 'ATS Resume' | 'Online Assessment' | 'Interview Mindset' | 'Market Reality';
  title: string;
  brutalTruth: string;
  mitigationStrategy: string;
  fatalMistake: string;
}

export const BRUTAL_TRUTHS: BrutalRule[] = [
  {
    id: 'cgpa-filtration',
    category: 'CGPA',
    title: 'The Unspoken CGPA Filter Rules',
    brutalTruth: 'Campus placement cells and automated recruiter filters at Microsoft, Google, and Amazon routinely filter by hard cutoffs. If the cutoff is 7.5 or 8.0, your application with a 7.49 is discarded by an automated database query before any human ever sees your LeetCode rating or GitHub.',
    fatalMistake: 'Believing the internet myth that "GPA does not matter in tech at all". While this becomes true after 3 years of industry experience, for your FIRST internship, it is the cheapest sorting mechanism recruiters have for 50,000+ applicants.',
    mitigationStrategy: 'If your CGPA is between 7.0 and 7.9: DO NOT apply through generic job board forms. You MUST acquire employee referrals from Senior Engineers on LinkedIn, win prestigious hackathons (Smart India Hackathon, Imagine Cup, Major League Hacking), or contribute to recognized open-source projects to bypass the automated resume screen.'
  },
  {
    id: 'ats-6-second-scan',
    category: 'ATS Resume',
    title: 'The 6-Second ATS Discard',
    brutalTruth: 'Recruiters spend an average of 6 seconds per resume. Resumes that list 30 programming languages, generic weather apps, two-column visual designs with skill progress bars (e.g. "Java 80%"), or lack quantifiable metrics are binned instantly.',
    fatalMistake: 'Describing what the app does rather than what YOU engineered. Writing "Built an e-commerce website with React and Node" will get you rejected.',
    mitigationStrategy: 'Use the Google XYZ Formula: "Accomplished [X] as measured by [Y], by doing [Z]". Example: "Engineered real-time document sync reducing merge conflicts by 92% utilizing Yjs CRDTs and WebSockets across 500 simulated concurrent sessions."'
  },
  {
    id: 'oa-all-or-nothing',
    category: 'Online Assessment',
    title: 'Online Assessment (OA) Is 100% Binary',
    brutalTruth: 'On Codility or HackerRank, solving 2 out of 3 problems or passing 13 out of 15 test cases often equals a straight 0 score in the ranking algorithm. There are thousands of candidates with 100% scores on all test cases.',
    fatalMistake: 'Ignoring time limits during daily practice. Solving a LeetCode Medium in 90 minutes with 4 hints gives a false sense of security. In the OA, you have 70 minutes for 2-3 problems under web-cam proctoring.',
    mitigationStrategy: 'Simulate contest conditions weekly. Use LeetCode weekly contests and virtual contests. If a problem takes more than 35 minutes without a bug-free submission, classify it as a failure and re-attempt from scratch 3 days later.'
  },
  {
    id: 'cold-apply-death',
    category: 'Market Reality',
    title: 'The Cold Application Void',
    brutalTruth: 'Submitting resumes on the public Microsoft Careers portal without a referral gives you an estimated callback rate of under 1%. Thousands of bot-scripts spam every opening within 12 minutes of posting.',
    fatalMistake: 'Sending 200 generic applications with the same PDF and waiting for email notifications.',
    mitigationStrategy: 'Cold outreach to Microsoft Software Engineers and Engineering Managers on LinkedIn. Do not ask for a referral in the first message. Share a 2-sentence summary of your standout project with a live link, explain your technical alignment, and ask for a 5-minute critique of your architecture. Once they engage, request a referral.'
  },
  {
    id: 'growth-mindset-aa-round',
    category: 'Interview Mindset',
    title: 'The "As-Appropriate" (AA) Cultural Rejection',
    brutalTruth: 'Many candidates ace all 3 technical DSA problems with clean code and still receive a rejection letter 48 hours later. Microsoft has a dedicated Partner/Principal level interviewer in the final "AA Round" who screens specifically for arrogance, lack of curiosity, and defensiveness.',
    fatalMistake: 'Arguing with an interviewer when they drop a hint, or claiming you never make mistakes when asked about a project failure.',
    mitigationStrategy: 'Embody Satya Nadella’s core philosophy: "Learn-it-all, not Know-it-all". Welcome hints enthusiastically ("That is a sharp point, let me examine if that introduces an edge case in my pointer boundary"). Prepare 5 structured STAR-format stories detailing technical setbacks and how you owned the resolution.'
  }
];

export const DAILY_WAKEUP_MANTRAS = [
  "Someone with your exact dream and fewer resources is solving their 4th problem of the day right now.",
  "Consistent mediocrity beats sporadic genius. 2 problems a day for 150 days guarantees interview readiness; 20 problems on a Sunday burns you out.",
  "Your resume gets 6 seconds. If your projects don’t demonstrate real engineering, no amount of wishing will get you past the ATS.",
  "Mastering DSA is not about memorizing 500 solutions. It is about recognizing 15 core recurring patterns under pressure."
];
