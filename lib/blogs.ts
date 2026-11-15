export interface BlogAuthor {
  id?: number | string;
  name: string;
  slug?: string;
  image?: string | null;
}

export interface BlogSeo {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string | null;
}

export interface ContentImage {
  url: string;
  public_id?: string;
  alt?: string;
}

export interface BlogPost {
  id: number | string;
  reference?: string;
  title: string;
  slug: string;
  author?: BlogAuthor | null;
  author_name?: string | null;
  excerpt: string;
  content: string;
  content_images?: ContentImage[];
  featured_image_url?: string | null;
  featured_image_alt?: string;
  status: "draft" | "published";
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  seo?: BlogSeo;
  read_time?: string;
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${Math.max(1, minutes)} min read`;
}

export const DUMMY_BLOGS: BlogPost[] = [
  {
    id: 1,
    reference: "ART-0001",
    title: "How to Start Web Development in 2026: A Practical Roadmap",
    slug: "how-to-start-web-development",
    author: {
      id: 1,
      name: "Nischal Panthi",
      slug: "082JSNP5",
      image: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1753553493/1000013760_d95dff4598.jpg",
    },
    author_name: "Nischal Panthi",
    excerpt: "A complete step-by-step roadmap for CSIT students entering modern web engineering, from foundational internet concepts to full-stack Next.js and backend architectures.",
    content: `## Introduction to Modern Web Engineering

Web development in 2026 continues to evolve at a blistering pace. For undergraduate computer science students at Butwal Multiple Campus, navigating the sea of frameworks, build tools, and cloud providers can feel overwhelming.

The good news is that foundational computer science principles—data structures, network protocols, caching hierarchies, and modular system design—remain timeless.

---

### Phase 1: Solidifying Foundations

Before touching React, Next.js, or server frameworks, master the tripartite foundation:

1. **Semantic HTML5:** Understand document outline, accessibility (ARIA), heading hierarchy, and meta tags.
2. **Modern CSS & Layout Models:** Flexbox, Grid, container queries, CSS variables, and utility-first frameworks like Tailwind CSS.
3. **Core ECMAScript:** Prototypes, closures, event loop, promises, async/await, and DOM manipulation.

\`\`\`javascript
// Asynchronous data fetching in modern JS
async function fetchArticles(topic) {
  try {
    const res = await fetch(\`https://api.csitabmc.com/articles?topic=\${topic}\`);
    if (!res.ok) throw new Error("Failed to load articles");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
\`\`\`

---

### Phase 2: TypeScript & Component-Driven Architecture

Writing vanilla JavaScript in enterprise projects is increasingly rare. TypeScript introduces static type safety, reducing runtime errors and improving team refactoring confidence.

- **Generics & Utility Types:** Build reusable API response models.
- **Component Lifecycle:** Understand rendering phases, state reconciliation, and memoization.
- **Server vs. Client Components:** Leverage hybrid rendering in Next.js App Router for optimal Time-to-First-Byte (TTFB) and minimal client JavaScript bundles.

---

### Phase 3: Backend Systems & Databases

A full-stack engineer understands data modeling and access patterns. In our association tech stack:

- **Django REST Framework:** Clean relational architecture with PostgreSQL, schema validation, and JWT authentication.
- **Caching & Rate Limiting:** Redis-backed throttling for public endpoints like certificate verification.
- **CI/CD & Deployment:** Automating tests with GitHub Actions and deploying containerized applications.

### Conclusion

Focus on building complete, usable projects over tutorials. Join the CSIT Association workshops, contribute to community repositories, and deploy real tools for your peers!`,
    featured_image_url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191227/frontendworkshop_r24n64.jpg",
    featured_image_alt: "Laptop displaying code in a modern development workspace",
    status: "published",
    published_at: "2026-10-15T10:00:00Z",
    created_at: "2026-10-14T08:00:00Z",
    updated_at: "2026-10-15T10:00:00Z",
    read_time: "5 min read",
    seo: {
      title: "How to Start Web Development in 2026: A Practical Roadmap",
      description: "A complete step-by-step roadmap for CSIT students entering modern web engineering, from foundational internet concepts to full-stack architectures.",
    },
  },
  {
    id: 2,
    reference: "ART-0002",
    title: "Mastering Git & GitHub: Collaborative Workflows for College Projects",
    slug: "mastering-git-and-github-for-csit-students",
    author: {
      id: 5,
      name: "Sabin Ghimire",
      slug: "082ATLSG10",
      image: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1753553493/1000013760_d95dff4598.jpg",
    },
    author_name: "Sabin Ghimire",
    excerpt: "Learn branch hygiene, conventional commits, pull request etiquette, and conflict resolution for student group software engineering projects.",
    content: `## Collaborative Version Control

Every semester, computer science teams struggle with merge conflicts, overwritten code, and chaotic commit messages during group assignments. Mastering Git is the single highest-ROI skill a CS student can acquire.

---

### The Feature-Branch Workflow

Never push directly to \`main\`. Protect the production branch and follow this rhythm:

1. **Pull the latest upstream:**
   \`\`\`bash
   git checkout main
   git pull origin main
   \`\`\`

2. **Branch with semantic naming:**
   \`\`\`bash
   git checkout -b feature/event-registration-modal
   \`\`\`

3. **Atomic, Conventional Commits:**
   Use standard prefixes: \`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`, \`test:\`.

---

### Resolving Merge Conflicts with Confidence

When two teammates modify overlapping lines in the same file, Git pauses and marks the conflict:

\`\`\`diff
<<<<<<< HEAD
const API_URL = "https://api.csitabmc.com/v1";
=======
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.csitabmc.com/v1";
>>>>>>> feature/env-config
\`\`\`

Open the conflicted files, discuss with your peer which change takes precedence, test the build locally, and commit the resolved state.`,
    featured_image_url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191231/itroadmap_migntc.jpg",
    featured_image_alt: "Developers collaborating over source control and code reviews",
    status: "published",
    published_at: "2026-10-22T14:30:00Z",
    created_at: "2026-10-21T11:00:00Z",
    updated_at: "2026-10-22T14:30:00Z",
    read_time: "4 min read",
    seo: {
      title: "Mastering Git & GitHub: Collaborative Workflows for College Projects",
      description: "Learn branch hygiene, conventional commits, pull request etiquette, and conflict resolution for student group projects.",
    },
  },
  {
    id: 3,
    reference: "ART-0003",
    title: "Demystifying Data Structures & Algorithms: TU Exam & Interview Guide",
    slug: "demystifying-data-structures-and-algorithms",
    author: {
      id: 80,
      name: "Er. Ramesh Pandey",
      slug: "ramesh-pandey",
      image: "/team.jpeg",
    },
    author_name: "Er. Ramesh Pandey",
    excerpt: "How to master trees, graphs, and dynamic programming for Tribhuvan University board exams while building competitive programming intuition.",
    content: `## Balancing Academic Rigor with Industry Preparation

Tribhuvan University's BSc. CSIT curriculum covers Data Structures & Algorithms (DSA) in the second and third semesters. While academic exams emphasize manual tracing, asymptotic analysis, and pseudocode, technical interviews focus on algorithmic patterns and spatial/temporal tradeoffs.

---

### Core Patterns to Master

1. **Two Pointers & Sliding Window:** Crucial for array, string, and subarray optimizations in $O(N)$ time.
2. **Binary Search on Solution Space:** Finding optimal thresholds, capacity allocation, and search problems.
3. **Breadth-First vs. Depth-First Traversal:** Tree pathfinding, bipartite graphs, topological sorting, and cycle detection.
4. **Dynamic Programming:** Identifying overlapping subproblems and optimal substructure (Memoization vs. Tabulation).

\`\`\`python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]
\`\`\`

### TU Exam Tips
- Write clean, well-commented algorithms with explicit input and output definitions.
- Always include step-by-step trace tables for sorting and tree balancing procedures.
- Clearly state Big-O space and time complexity for best, average, and worst-case scenarios.`,
    featured_image_url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191232/mocktest_mqzpoi.jpg",
    featured_image_alt: "Algorithms, code structures, and computational thinking diagrams",
    status: "published",
    published_at: "2026-11-01T09:15:00Z",
    created_at: "2026-10-31T07:30:00Z",
    updated_at: "2026-11-01T09:15:00Z",
    read_time: "6 min read",
    seo: {
      title: "Demystifying Data Structures & Algorithms: TU Exam & Interview Guide",
      description: "How to master trees, graphs, and dynamic programming for TU board exams while building competitive programming intuition.",
    },
  },
  {
    id: 4,
    reference: "ART-0004",
    title: "Your First Open Source Contribution: From Fork to Merged PR",
    slug: "open-source-contribution-guide-for-beginners",
    author: {
      id: 2,
      name: "Rupesh Kharal",
      slug: "082EMRK15",
      image: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1753553493/1000013760_d95dff4598.jpg",
    },
    author_name: "Rupesh Kharal",
    excerpt: "Overcoming imposter syndrome and making impactful contributions to open-source software, hackathons, and student-led community tooling.",
    content: `## Taking the Leap into Open Source

Many aspiring software developers believe that open source contributions are reserved for senior engineers building Linux kernels or compiler engines. In reality, the vast majority of impactful contributions involve documentation fixes, test coverage, component accessibility, and small bug fixes.

---

### Step 1: Find Good First Issues

Look for repositories with labels such as:
- \`good first issue\`
- \`help wanted\`
- \`documentation\`

Check out our association GitHub organisation: [github.com/CSIT-Association-of-BMC](https://github.com/CSIT-Association-of-BMC), where active community tooling is open for student participation!

---

### Step 2: Read CONTRIBUTING.md

Every mature project defines guidelines:
- How to set up the local development environment.
- Code formatting standards (Prettier, ESLint, Black, Flake8).
- Branch naming and commit conventions.

Always comment on the issue before starting work to avoid duplicated effort!

---

### Step 3: Crafting a Helpful Pull Request

When opening your PR:
- Link the issue: "Closes #42".
- Describe the problem and your solution.
- Include before/after screenshots or GIFs for UI changes.
- Ensure all CI tests pass.`,
    featured_image_url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191233/reactEvent_jrvwjk.jpg",
    featured_image_alt: "Team collaborating on an open source project",
    status: "published",
    published_at: "2026-11-08T11:45:00Z",
    created_at: "2026-11-07T10:00:00Z",
    updated_at: "2026-11-08T11:45:00Z",
    read_time: "4 min read",
    seo: {
      title: "Your First Open Source Contribution: From Fork to Merged PR",
      description: "Overcoming imposter syndrome and making impactful contributions to open-source software and student community projects.",
    },
  },
];

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const djangoBaseUrl =
      process.env.NEXT_PUBLIC_DJANGO_API_URL ||
      "https://cms-dashbaord.onrender.com/api/v1";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${djangoBaseUrl}/blogs/`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const results: BlogPost[] = Array.isArray(data)
        ? data
        : data.results || [];
      if (results.length > 0) {
        return results.map((b) => ({
          ...b,
          read_time: calculateReadTime(b.content || ""),
        }));
      }
    }
  } catch {
    // Graceful fallback to schema-compatible dummy content
  }

  return DUMMY_BLOGS;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const decoded = decodeURIComponent(slug).trim().toLowerCase();

  try {
    const djangoBaseUrl =
      process.env.NEXT_PUBLIC_DJANGO_API_URL ||
      "https://cms-dashbaord.onrender.com/api/v1";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${djangoBaseUrl}/blogs/${encodeURIComponent(decoded)}/`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const b: BlogPost = await res.json();
      if (b && b.slug) {
        return {
          ...b,
          read_time: calculateReadTime(b.content || ""),
        };
      }
    }
  } catch {
    // Fallback to local schema-compatible dummy records
  }

  const found = DUMMY_BLOGS.find(
    (b) => b.slug.toLowerCase() === decoded || String(b.id) === decoded
  );
  return found || null;
}
