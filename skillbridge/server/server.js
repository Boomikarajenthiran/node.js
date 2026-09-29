import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { readDb, writeDb } from "./db.js";
import { calculateSkillGap, rankJobsForUser } from "./skillEngine.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Log request for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================= AUTH ENDPOINTS =================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email?.trim().toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { password: _, ...userSafe } = user;
  res.json({ success: true, user: userSafe });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role = "candidate", title = "Software Engineer" } = req.body;
  const db = readDb();

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  if (db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return res.status(400).json({ error: "User already exists with this email" });
  }

  const newUser = {
    id: `usr-${uuidv4().slice(0, 8)}`,
    name,
    email: email.trim(),
    password,
    role,
    title,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    location: "Remote",
    phone: "",
    summary: "Passionate professional ready for exciting technical opportunities.",
    education: "B.S. in Computer Science",
    experienceYears: 1,
    skills: []
  };

  db.users.push(newUser);
  writeDb(db);

  const { password: _, ...userSafe } = newUser;
  res.status(201).json({ success: true, user: userSafe });
});

app.get("/api/auth/demo-users", (req, res) => {
  const db = readDb();
  const safeUsers = db.users.map(({ password, ...rest }) => rest);
  res.json(safeUsers);
});

// ================= JOBS ENDPOINTS =================
app.get("/api/jobs", (req, res) => {
  const { userId, search, department, workType, minMatch } = req.query;
  const db = readDb();
  let user = null;

  if (userId) {
    user = db.users.find((u) => u.id === userId);
  }

  let jobs = user ? rankJobsForUser(user, db.jobs, db.skills) : db.jobs;

  if (search) {
    const q = search.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.requiredSkills.some((s) => s.name.toLowerCase().includes(q))
    );
  }

  if (department) {
    jobs = jobs.filter((j) => j.department.toLowerCase() === department.toLowerCase());
  }

  if (workType) {
    jobs = jobs.filter((j) => j.workType.toLowerCase() === workType.toLowerCase());
  }

  if (minMatch && user) {
    const min = parseInt(minMatch, 10) || 0;
    jobs = jobs.filter((j) => (j.matchScore || 0) >= min);
  }

  res.json(jobs);
});

app.get("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  const db = readDb();

  const job = db.jobs.find((j) => j.id === id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  let gapAnalysis = null;
  if (userId) {
    const user = db.users.find((u) => u.id === userId);
    if (user) {
      gapAnalysis = calculateSkillGap(user.skills || [], job.requiredSkills || [], db.skills);
    }
  }

  res.json({ job, gapAnalysis });
});

app.post("/api/jobs", (req, res) => {
  const db = readDb();
  const {
    title,
    company,
    department,
    location,
    workType = "Remote",
    salary,
    experienceLevel = "Mid-Level",
    description,
    responsibilities = [],
    requiredSkills = []
  } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: "Job title and company are required" });
  }

  const newJob = {
    id: `job-${uuidv4().slice(0, 8)}`,
    title,
    company,
    department: department || "Engineering",
    location: location || "Remote",
    workType,
    salary: salary || "Competitive",
    experienceLevel,
    postedDate: new Date().toISOString().split("T")[0],
    status: "Active",
    description: description || "Exciting engineering role.",
    responsibilities: Array.isArray(responsibilities)
      ? responsibilities
      : responsibilities ? [responsibilities] : [],
    requiredSkills: requiredSkills || []
  };

  db.jobs.unshift(newJob);
  writeDb(db);
  res.status(201).json(newJob);
});

app.put("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.jobs.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Job not found" });
  }

  db.jobs[index] = { ...db.jobs[index], ...req.body, id };
  writeDb(db);
  res.json(db.jobs[index]);
});

app.delete("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLength = db.jobs.length;
  db.jobs = db.jobs.filter((j) => j.id !== id);

  if (db.jobs.length === initialLength) {
    return res.status(404).json({ error: "Job not found" });
  }

  writeDb(db);
  res.json({ success: true, message: "Job deleted successfully" });
});

// ================= SKILLS ENDPOINTS =================
app.get("/api/skills", (req, res) => {
  const db = readDb();
  res.json(db.skills);
});

app.post("/api/skills", (req, res) => {
  const { name, category = "General", description = "", resources = [] } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Skill name is required" });
  }

  const db = readDb();
  const skillId = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (db.skills.some((s) => s.id === skillId)) {
    return res.status(400).json({ error: "Skill already exists" });
  }

  const newSkill = {
    id: skillId,
    name,
    category,
    description,
    resources
  };

  db.skills.push(newSkill);
  writeDb(db);
  res.status(201).json(newSkill);
});

app.put("/api/skills/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.skills.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Skill not found" });
  }

  db.skills[index] = { ...db.skills[index], ...req.body, id };
  writeDb(db);
  res.json(db.skills[index]);
});

app.delete("/api/skills/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLength = db.skills.length;
  db.skills = db.skills.filter((s) => s.id !== id);

  if (db.skills.length === initialLength) {
    return res.status(404).json({ error: "Skill not found" });
  }

  writeDb(db);
  res.json({ success: true, message: "Skill removed from catalog" });
});

// ================= USERS / PROFILES / CANDIDATE SKILLS =================
app.get("/api/users", (req, res) => {
  const db = readDb();
  const candidates = db.users
    .filter((u) => u.role === "candidate")
    .map(({ password, ...safe }) => safe);
  res.json(candidates);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const user = db.users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password, ...safeUser } = user;
  res.json(safeUser);
});

app.put("/api/users/:id/profile", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password, role, id: _, ...allowedUpdates } = req.body;
  db.users[index] = { ...db.users[index], ...allowedUpdates };
  writeDb(db);

  const { password: pw, ...safeUser } = db.users[index];
  res.json(safeUser);
});

app.put("/api/users/:id/skills", (req, res) => {
  const { id } = req.params;
  const { skills } = req.body;
  const db = readDb();
  const index = db.users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  db.users[index].skills = Array.isArray(skills) ? skills : [];
  writeDb(db);

  const { password, ...safeUser } = db.users[index];
  res.json({ success: true, user: safeUser });
});

// ================= APPLICATIONS ENDPOINTS =================
app.get("/api/applications", (req, res) => {
  const { userId, role } = req.query;
  const db = readDb();

  let applications = db.applications || [];

  if (role === "candidate" && userId) {
    applications = applications.filter((app) => app.userId === userId);
  }

  res.json(applications);
});

app.post("/api/applications", (req, res) => {
  const { jobId, userId, coverNote = "" } = req.body;
  const db = readDb();

  const user = db.users.find((u) => u.id === userId);
  const job = db.jobs.find((j) => j.id === jobId);

  if (!user || !job) {
    return res.status(400).json({ error: "Valid userId and jobId required" });
  }

  // Check if already applied
  const existing = db.applications.find(
    (a) => a.jobId === jobId && a.userId === userId
  );
  if (existing) {
    return res.status(400).json({ error: "You have already applied for this job" });
  }

  // Calculate current match score
  const gap = calculateSkillGap(user.skills || [], job.requiredSkills || [], db.skills);

  const newApp = {
    id: `app-${uuidv4().slice(0, 8)}`,
    jobId,
    userId,
    applicantName: user.name,
    applicantEmail: user.email,
    applicantTitle: user.title,
    jobTitle: job.title,
    company: job.company,
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    coverNote: coverNote.trim(),
    matchScore: gap.matchScore,
    notes: `Applicant matched on ${gap.matchedCount}/${gap.totalRequired} skills (${gap.matchScore}% score).`
  };

  db.applications.unshift(newApp);
  writeDb(db);

  res.status(201).json(newApp);
});

app.patch("/api/applications/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const db = readDb();

  const app = db.applications.find((a) => a.id === id);
  if (!app) {
    return res.status(404).json({ error: "Application not found" });
  }

  if (status) app.status = status;
  if (notes !== undefined) app.notes = notes;

  writeDb(db);
  res.json(app);
});

// ================= ANALYTICS ENDPOINTS =================
app.get("/api/analytics/admin", (req, res) => {
  const db = readDb();
  const jobs = db.jobs || [];
  const users = db.users.filter((u) => u.role === "candidate");
  const apps = db.applications || [];

  // Skill demand counts across all jobs
  const skillDemandMap = {};
  jobs.forEach((job) => {
    job.requiredSkills.forEach((req) => {
      skillDemandMap[req.name] = (skillDemandMap[req.name] || 0) + 1;
    });
  });

  const topSkillsDemanded = Object.entries(skillDemandMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const funnel = {
    applied: apps.filter((a) => a.status === "Applied").length,
    reviewing: apps.filter((a) => a.status === "Reviewing" || a.status === "Under Review").length,
    interview: apps.filter((a) => a.status === "Interview Scheduled").length,
    hired: apps.filter((a) => a.status === "Accepted").length,
    rejected: apps.filter((a) => a.status === "Rejected").length
  };

  res.json({
    totalJobs: jobs.length,
    totalCandidates: users.length,
    totalApplications: apps.length,
    totalSkillsCatalog: db.skills.length,
    funnel,
    topSkillsDemanded
  });
});

app.get("/api/analytics/user/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userApps = (db.applications || []).filter((a) => a.userId === userId);
  const rankedJobs = rankJobsForUser(user, db.jobs, db.skills);
  const highMatchJobs = rankedJobs.filter((j) => j.matchScore >= 70);

  res.json({
    totalApplications: userApps.length,
    activeInterviews: userApps.filter((a) => a.status === "Interview Scheduled").length,
    profileSkillsCount: (user.skills || []).length,
    recommendedJobsCount: highMatchJobs.length,
    topRecommendedJobs: highMatchJobs.slice(0, 3)
  });
});

app.listen(PORT, () => {
  console.log(`SkillBridge Backend running on http://localhost:${PORT}`);
});
