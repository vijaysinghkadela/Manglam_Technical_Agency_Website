export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-cheap-websites-cost-more',
    title: 'Why "Cheap" Websites End Up Costing You More',
    excerpt: 'The hidden costs of offshore templates, poor architecture, and security vulnerabilities that business owners ignore until it is too late.',
    content: `
      <h2>The True Cost of a £500 Website</h2>
      <p>Many business owners start their digital journey looking for the cheapest option. They find an agency promising a full website for £500 and think they've found a bargain. Six months later, the site is hacked, it takes 8 seconds to load, and it hasn't generated a single lead.</p>
      
      <h3>1. Security Vulnerabilities</h3>
      <p>Cheap websites are often built on outdated WordPress themes with dozens of unpatched plugins. This is an open door for malware. When your site goes down, you lose credibility and revenue.</p>
      
      <h3>2. Performance Issues</h3>
      <p>Google cares about speed. If your site takes more than 3 seconds to load, 53% of mobile users will abandon it. Cheap hosting and bloated code guarantee slow loading times, directly killing your conversion rate.</p>

      <h3>3. The Rebuild Tax</h3>
      <p>Eventually, you will have to rebuild it properly. By that time, you've wasted the initial £500, lost months of potential growth, and damaged your brand. It is always cheaper to build it right the first time.</p>
      
      <h2>The Engineering Approach</h2>
      <p>At MTA, we don't use templates. We engineer digital infrastructure that is secure by default, loads instantly globally, and is designed specifically for your business goals.</p>
    `,
    date: '2026-02-15',
    readTime: '4 min read',
    category: 'Engineering',
    author: 'Vinay Kali'
  },
  {
    slug: 'automating-client-onboarding',
    title: 'How to Automate Your Client Onboarding Pipeline',
    excerpt: 'Stop sending manual emails and PDFs. Learn how to build an automated workflow that impresses clients and saves your team 10 hours a week.',
    content: `
      <h2>The Onboarding Bottleneck</h2>
      <p>You close a client. Great. Now comes the friction: sending contracts, collecting assets, scheduling kickoff calls, and waiting for replies. If you're doing this manually, you're wasting time and risking a poor first impression.</p>
      
      <h3>The Ideal Automated Flow</h3>
      <p>A modern onboarding pipeline should look like this:</p>
      <ul>
        <li><strong>Trigger:</strong> Deal marked as "Closed Won" in CRM.</li>
        <li><strong>Action 1:</strong> Automatic generation and sending of an e-signature contract.</li>
        <li><strong>Action 2:</strong> Upon signing, a welcome email triggers with a Stripe payment link for the deposit.</li>
        <li><strong>Action 3:</strong> Upon payment, an intake form (Typeform/Tally) is sent to collect assets.</li>
        <li><strong>Action 4:</strong> Private Slack channel created, client invited, kickoff call link sent.</li>
      </ul>

      <h2>Tools to Make it Happen</h2>
      <p>You can build this entire flow using <strong>n8n</strong> or <strong>Zapier</strong>. It requires zero custom coding and connects tools you likely already use (HubSpot, Stripe, Slack).</p>
      
      <p>If you don't have the time to build it, that's what we do at MTA. We map your current mess and replace it with a silent, efficient machine.</p>
    `,
    date: '2026-03-01',
    readTime: '6 min read',
    category: 'Automation',
    author: 'Tech Team'
  },
  {
    slug: 'nextjs-vs-wordpress-2026',
    title: 'Next.js vs WordPress: Making the Right Choice in 2026',
    excerpt: 'Is WordPress finally dead? We compare modern web architectures to help you decide what infrastructure fits your scaling business.',
    content: `
      <h2>The Legacy Standard vs The Modern Standard</h2>
      <p>For a decade, WordPress was the default choice for almost every business website. Today, modern frameworks like Next.js have changed the landscape. But which one should you choose?</p>
      
      <h3>When to use WordPress</h3>
      <p>WordPress still has its place. If you run a high-volume publishing site (like a news outlet) with non-technical staff publishing 10 articles a day, WordPress remains a solid choice due to its editing interface.</p>

      <h3>When to use Next.js</h3>
      <p>For almost everything else—corporate sites, SaaS frontends, custom applications, and secure platforms—Next.js is vastly superior. It offers:</p>
      <ul>
        <li><strong>Security:</strong> No databases exposed to the frontend, no plugin vulnerabilities.</li>
        <li><strong>Performance:</strong> Static generation and edge rendering mean pages load instantly.</li>
        <li><strong>Customisation:</strong> You are not fighting a theme; you are writing pure React code tailored to your exact needs.</li>
      </ul>

      <h2>Our Verdict</h2>
      <p>At MTA, we use Next.js exclusively for client builds. The performance, security, and developer experience are unmatched, resulting in a significantly better product for the client.</p>
    `,
    date: '2026-01-20',
    readTime: '5 min read',
    category: 'Web Dev',
    author: 'Vinay Kali'
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
