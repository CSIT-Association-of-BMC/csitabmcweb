import { BlogPost } from "@/lib/blogs";

export const fallbackBlogs: BlogPost[] = [
  {
    id: 1,
    reference: "blog-001",
    title: "How to Start Web Development as a CSIT Student in Nepal",
    slug: "how-to-start-web-development",
    author: {
      id: "auth-1",
      name: "Nischal Panthi",
      slug: "082JSNP5",
      image:
        "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/tilottama_mun_qbymbt.jpg",
    },
    author_name: "Nischal Panthi",
    excerpt:
      "A complete, practical roadmap designed specifically for BSc.CSIT students to break into modern web development without getting overwhelmed by tutorial hell.",
    content: `## Why Web Development in College Matters

Starting your tech journey while enrolled in BSc.CSIT gives you a massive advantage. While theoretical curriculum covers discrete mathematics, computer architecture, and automata, building practical software makes you hireable before graduation.

### 1. Master the Core Trio First

Before reaching for high-level frameworks like Next.js or Astro, establish deep foundations:

- **Semantic HTML5**: Understand page outlines, accessibility standards (WCAG 2.2), and search indexing.
- **Modern CSS**: Master Flexbox, CSS Grid, container queries, and standard layout behavior.
- **Vanilla JavaScript**: Deeply internalize closures, prototypes, asynchronous promises, and the event loop.

\`\`\`javascript
// Understanding async workflows
async function loadCommunityNotice(slug) {
  try {
    const res = await fetch(\`/api/notices/\${slug}\`);
    if (!res.ok) throw new Error("Notice not found");
    return await res.json();
  } catch (err) {
    console.error("Notice fetch error:", err);
    return null;
  }
}
\`\`\`

### 2. Move to TypeScript and Component Frameworks

Once vanilla JS is second nature, adopt **TypeScript**. Static typing catches 80% of runtime defects during compilation. Pair it with **React 18/19** and **Tailwind CSS**.

### 3. Build Real Projects for the Campus

Don't build another generic todo app. Build tools your classmates actually use:
- Exam routine reminders
- Subject syllabus reference viewers
- Community hackathon portals

Focus on building complete, usable projects over tutorials. Join the CSIT Association community sessions to connect with senior peers and accelerate your growth!`,
    featured_image_url:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191227/frontendworkshop_r24n64.jpg",
    featured_image_alt: "Web Development Roadmap",
    status: "published",
    published_at: "2026-11-01T10:00:00Z",
    created_at: "2026-10-28T09:00:00Z",
    updated_at: "2026-11-01T10:00:00Z",
    seo: {
      title: "How to Start Web Development: Roadmap for CSIT Students",
      description:
        "Step-by-step roadmap for BSc.CSIT students to master modern web development with HTML, CSS, JavaScript, React, and TypeScript.",
    },
  },
  {
    id: 2,
    reference: "blog-002",
    title: "Mastering Git & GitHub: The Practical Workflow for Student Teams",
    slug: "mastering-git-and-github-for-csit-students",
    author: {
      id: "auth-2",
      name: "Sabin Ghimire",
      slug: "082ATLSG10",
      image:
        "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/tilottama_mun_qbymbt.jpg",
    },
    author_name: "Sabin Ghimire",
    excerpt:
      "Learn how to collaborate smoothly on group semester projects using branching strategies, pull requests, conventional commits, and clean merge practices.",
    content: `## The Problem with Zipped Project Folders

Too many student project groups still share project files through messaging apps or flash drives, resulting in \`project_final_v2_reallyfinal.zip\`. Version control is not just for software enterprises; it is the fundamental tool for collaborative engineering.

### Essential Git Mental Model

Git stores snapshots of your working repository across time. A branch is simply a movable pointer to a specific commit.

\`\`\`bash
# Create and switch to a descriptive feature branch
git checkout -b feat/certificate-download-modal

# Stage and write structured commits
git commit -m "feat(certificate): add PDF generation with project eligibility"
\`\`\`

### The GitHub Feature-Branch Flow

1. **Pull Latest Main**: Always sync your local base before cutting branches (\`git pull origin main\`).
2. **Atomic Commits**: Keep each commit focused on one cohesive logical change.
3. **Pull Requests (PR)**: Open a PR on GitHub with clear descriptions and screenshots.
4. **Code Review**: Have at least one team member approve before merging.

### Avoiding Merge Conflicts

- Keep pull requests small and short-lived.
- Rebase your branch regularly against the upstream trunk.
- Never force push to shared branches (\`main\`, \`staging\`).`,
    featured_image_url:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191235/workshopNET_k188jd.jpg",
    featured_image_alt: "Git & GitHub Collaboration Workflow",
    status: "published",
    published_at: "2026-10-22T14:30:00Z",
    created_at: "2026-10-20T11:00:00Z",
    updated_at: "2026-10-22T14:30:00Z",
    seo: {
      title: "Mastering Git & GitHub: Collaboration Guide for Students",
      description:
        "Practical Git workflows, branch conventions, and GitHub collaboration strategies for student software teams.",
    },
  },
  {
    id: 3,
    reference: "blog-003",
    title: "Demystifying Data Structures & Algorithms for Technical Interviews",
    slug: "demystifying-data-structures-and-algorithms",
    author: {
      id: "auth-3",
      name: "Er. Ramesh Pandey",
      slug: "ramesh-pandey",
      image:
        "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/tilottama_mun_qbymbt.jpg",
    },
    author_name: "Er. Ramesh Pandey",
    excerpt:
      "An engineer's breakdown of how to connect academic DSA coursework in 3rd semester to real-world performance tuning and interview problem solving.",
    content: `## The Gap Between College Exams and Tech Interviews

In 3rd semester CSIT, students learn abstract data types, asymptotic complexity analysis, and tree traversals on paper. Yet when asked to optimize an API endpoint or solve a LeetCode medium problem, many struggle.

### The Core Problem: Pattern Recognition

Technical problem solving is not about memorizing 300 different solutions. It is about identifying algorithmic patterns:

- **Two Pointers & Sliding Window**: Subarray and string optimization problems ($O(n)$ time instead of $O(n^2)$).
- **Hash Maps**: Instant $O(1)$ lookup for frequency counts and caches.
- **Depth-First & Breadth-First Search**: Graph connectivity, route finding, and hierarchy traversal.
- **Dynamic Programming**: Breaking overlapping subproblems into memoized tables.

### Real-World Engineering Application

In the CSITABMC portal, efficient lookups and caching ensure that certificate verification queries resolve in under 15 milliseconds, even under traffic spikes.

Build the habit of solving 1 problem daily, and write clean, readable code with descriptive variable names.`,
    featured_image_url:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191232/mocktest_mqzpoi.jpg",
    featured_image_alt: "Data Structures & Algorithms Foundations",
    status: "published",
    published_at: "2026-10-15T09:15:00Z",
    created_at: "2026-10-12T16:00:00Z",
    updated_at: "2026-10-15T09:15:00Z",
    seo: {
      title: "DSA for Technical Interviews: A Practical Guide",
      description:
        "Connect academic algorithms to real-world software engineering and interview success.",
    },
  },
  {
    id: 4,
    reference: "blog-004",
    title: "How to Make Your First Open Source Contribution",
    slug: "open-source-contribution-guide-for-beginners",
    author: {
      id: "auth-4",
      name: "Rupesh Kharal",
      slug: "082EMRK15",
      image:
        "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/tilottama_mun_qbymbt.jpg",
    },
    author_name: "Rupesh Kharal",
    excerpt:
      "Step-by-step instructions for finding beginner-friendly issues, navigating large codebases, communicating with maintainers, and landing your first pull request.",
    content: `## Overcoming the Fear of the Public Repository

Many students believe that contributing to open source requires being a software architect. In reality, the vast majority of impactful contributions start with documentation fixes, test coverage, and small bug reproductions.

### Step 1: Find Good First Issues

Look for repositories with the label \`good-first-issue\` or \`help-wanted\`. Focus on technologies you already know:
- Next.js and React component libraries
- Documentation portals
- Community tools like the CSITABMC website

### Step 2: Read CONTRIBUTING.md

Every established project has contribution guidelines. Respect their branch naming, code formatting rules, and commit message structure.

### Step 3: Communicate Early

Before spending 3 days implementing a large refactor, comment on the issue and ask: *"I'd like to work on this issue. Is this approach aligned with project goals?"*

Landing your first merged PR builds verifiable engineering credibility that stands out on any resume!`,
    featured_image_url:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191233/reactEvent_jrvwjk.jpg",
    featured_image_alt: "Open Source Contribution Guide",
    status: "published",
    published_at: "2026-09-30T11:00:00Z",
    created_at: "2026-09-25T14:00:00Z",
    updated_at: "2026-09-30T11:00:00Z",
    seo: {
      title: "First Open Source Contribution: Beginner's Guide",
      description:
        "Practical tips for finding issues, navigating codebases, and submitting your first pull request.",
    },
  },
];
