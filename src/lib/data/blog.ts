export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  content: string
  gradient: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-every-indian-business-needs-a-website-2026',
    title: 'Why Every Indian Business Needs a Website in 2026',
    excerpt: 'Your customers are online. If you are not, you are invisible. Here is what a modern business website does for you and how to get one without overpaying.',
    category: 'Web Development',
    readTime: '5 min read',
    date: '28 Feb 2026',
    author: 'MTA Team',
    gradient: 'from-violet-900/40 to-violet-950/20',
    content: `
In 2026, a business without a website is like a shop without a signboard. 
Your potential customers search online before they call, walk in, or buy.

A website built on modern technology — responsive, fast, and SEO-ready — is not a 
luxury. It is the baseline for being found, trusted, and chosen.

At Manglam Technical Agency, we have built websites for NGOs, hospitals, and startups 
across Rajasthan. Every single client saw increased enquiries within 90 days of launch.

The cost of not having a website is far higher than the cost of building one.
    `.trim(),
  },
  {
    slug: 'social-media-automation-save-10-hours-week',
    title: 'Social Media Automation: Save 10 Hours a Week',
    excerpt: 'Manual posting is dead. Learn how automation workflows handle scheduling, responses, and reporting — so your team focuses on what matters.',
    category: 'Marketing',
    readTime: '4 min read',
    date: '20 Feb 2026',
    author: 'MTA Team',
    gradient: 'from-cyan-900/40 to-cyan-950/20',
    content: `
Most businesses waste 10–15 hours a week on manual social media tasks — writing captions, 
scheduling posts, downloading reports, and responding to comments.

Automation tools like n8n and Zapier, combined with platform scheduling APIs, can handle 
all of this with zero manual effort once configured correctly.

At MTA, we set up automation workflows that run 24/7. Our clients post consistently, 
respond faster, and spend zero time on repetitive scheduling tasks.

The result: more time for strategy, less time on execution.
    `.trim(),
  },
  {
    slug: 'top-5-cybersecurity-mistakes-indian-smes',
    title: 'Top 5 Cybersecurity Mistakes Indian SMEs Make',
    excerpt: 'Most Indian SMEs are one breach away from serious damage. These five mistakes are the most common — and the most preventable.',
    category: 'Cybersecurity',
    readTime: '6 min read',
    date: '15 Feb 2026',
    author: 'MTA Team',
    gradient: 'from-red-900/30 to-red-950/20',
    content: `
1. Using the same password across all business accounts.
2. No two-factor authentication on email and banking.
3. Unpatched software and outdated plugins on the website.
4. No backup strategy — losing data means losing the business.
5. No IT Act 2000 compliance for customer data handling.

Each of these is straightforward to fix with the right guidance. 
A security audit takes one week and costs far less than a breach.
    `.trim(),
  },
  {
    slug: 'how-ai-automation-cut-manual-work-70-percent',
    title: 'How AI Automation Cut Our Client\'s Manual Work by 70%',
    excerpt: 'A Rajasthan-based services firm was spending 30 hours a week on data entry and reporting. We automated it in two weeks. Here is how.',
    category: 'AI',
    readTime: '5 min read',
    date: '10 Feb 2026',
    author: 'MTA Team',
    gradient: 'from-amber-900/30 to-amber-950/20',
    content: `
The client processed 200+ enquiries a week — manually entering data into spreadsheets, 
generating reports, and sending follow-up emails.

We audited the process, built an n8n workflow connected to their CRM, and automated:
- Data entry from web forms directly into structured records
- Automated weekly PDF reports sent to management
- Follow-up email sequences triggered by lead status

Total implementation time: 2 weeks. Manual hours saved: 30 per week. ROI: less than 30 days.
    `.trim(),
  },
  {
    slug: 'understanding-indian-it-act-what-business-must-know',
    title: 'Understanding the Indian IT Act: What Your Business Must Know',
    excerpt: 'The IT Act 2000 applies to every business that handles customer data digitally. Here is what it means for you in plain language.',
    category: 'Business',
    readTime: '7 min read',
    date: '5 Feb 2026',
    author: 'MTA Team',
    gradient: 'from-green-900/30 to-green-950/20',
    content: `
The Information Technology Act 2000 and its 2008 amendments govern how Indian businesses 
handle electronic data, transactions, and cybersecurity.

Key obligations for most businesses:
- A published Privacy Policy on your website if you collect personal data
- Reasonable security practices for stored user data
- Grievance Officer designation for data complaints
- Written agreements with data processors (vendors, agencies)

Non-compliance penalties range from fines to criminal liability under Section 43A and 72A.

Manglam Technical Agency helps businesses achieve compliance through Data Processing Agreements 
and documented security frameworks.
    `.trim(),
  },
  {
    slug: 'from-brief-to-launch-how-mta-builds-in-3-weeks',
    title: 'From Brief to Launch: How MTA Builds Websites in 3 Weeks',
    excerpt: 'Most agencies take 2–3 months. We deliver in 3 weeks. Not by cutting corners — by eliminating waste from the process.',
    category: 'Web Development',
    readTime: '4 min read',
    date: '28 Jan 2026',
    author: 'MTA Team',
    gradient: 'from-violet-900/30 to-indigo-950/20',
    content: `
Week 1: Discovery + design mockups. Client approves the visual direction before any code is written.
Week 2: Full development on a live staging environment. Client reviews at any time.
Week 3: QA, content finalisation, and production deployment.

The secret is eliminating the feedback loops that kill most projects — endless revisions 
caused by vague scope and no written agreement.

Every MTA project starts with a signed scope document. That is why we deliver on time, every time.

Our MNSS project (marutnarayansewasansthan.org) was delivered in exactly 3 weeks for ₹50,000.
    `.trim(),
  },
]

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}
