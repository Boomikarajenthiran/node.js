const PROFICIENCY_LEVELS = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4
};

export function calculateSkillGap(userSkills = [], jobRequiredSkills = [], skillsCatalog = []) {
  const userSkillMap = new Map();
  for (const us of userSkills) {
    userSkillMap.set(us.skillId.toLowerCase(), {
      ...us,
      level: PROFICIENCY_LEVELS[us.proficiency] || 1
    });
  }

  const catalogMap = new Map();
  for (const sk of skillsCatalog) {
    catalogMap.set(sk.id.toLowerCase(), sk);
  }

  let totalWeight = 0;
  let earnedScore = 0;

  const matched = [];
  const levelGaps = [];
  const missing = [];

  for (const req of jobRequiredSkills) {
    const skillKey = req.skillId.toLowerCase();
    const reqLevel = PROFICIENCY_LEVELS[req.minProficiency] || 2;
    const weight = req.mandatory ? 1.5 : 1.0;
    totalWeight += weight;

    const userSkill = userSkillMap.get(skillKey);
    const catalogItem = catalogMap.get(skillKey) || {
      id: req.skillId,
      name: req.name,
      category: "General",
      resources: []
    };

    if (userSkill) {
      if (userSkill.level >= reqLevel) {
        // Full match
        earnedScore += weight * 1.0;
        matched.push({
          skillId: req.skillId,
          name: req.name,
          minProficiency: req.minProficiency,
          userProficiency: userSkill.proficiency,
          mandatory: req.mandatory,
          status: "MATCHED"
        });
      } else {
        // Partial proficiency
        const ratio = userSkill.level / reqLevel;
        earnedScore += weight * Math.max(0.4, ratio);
        levelGaps.push({
          skillId: req.skillId,
          name: req.name,
          minProficiency: req.minProficiency,
          userProficiency: userSkill.proficiency,
          mandatory: req.mandatory,
          status: "PROFICIENCY_GAP",
          resources: catalogItem.resources || []
        });
      }
    } else {
      // Completely missing
      missing.push({
        skillId: req.skillId,
        name: req.name,
        minProficiency: req.minProficiency,
        userProficiency: "None",
        mandatory: req.mandatory,
        status: "MISSING",
        resources: catalogItem.resources || []
      });
    }
  }

  const matchScore = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 100;

  // Curate roadmap / recommendations for missing and level gaps
  const recommendations = [];
  for (const gap of [...missing, ...levelGaps]) {
    for (const res of gap.resources) {
      recommendations.push({
        ...res,
        skillId: gap.skillId,
        skillName: gap.name,
        targetProficiency: gap.minProficiency,
        gapType: gap.status === "MISSING" ? "Acquire Skill" : "Level Up Skill"
      });
    }
  }

  // Identify extra skills the candidate brings that add value
  const requiredSkillIds = new Set(jobRequiredSkills.map((r) => r.skillId.toLowerCase()));
  const additionalUserSkills = userSkills.filter(
    (us) => !requiredSkillIds.has(us.skillId.toLowerCase())
  );

  return {
    matchScore,
    totalRequired: jobRequiredSkills.length,
    matchedCount: matched.length,
    levelGapCount: levelGaps.length,
    missingCount: missing.length,
    matched,
    levelGaps,
    missing,
    additionalUserSkills,
    recommendations
  };
}

export function rankJobsForUser(user, allJobs = [], skillsCatalog = []) {
  const scoredJobs = allJobs.map((job) => {
    const gap = calculateSkillGap(user?.skills || [], job.requiredSkills || [], skillsCatalog);
    return {
      ...job,
      matchScore: gap.matchScore,
      matchedCount: gap.matchedCount,
      missingCount: gap.missingCount,
      totalRequired: gap.totalRequired
    };
  });

  return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
}
