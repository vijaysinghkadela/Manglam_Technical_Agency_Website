// Define the MarketResearchArticle interface here to avoid circular dependencies
export interface MarketResearchArticle {
  slug: string
  title: string
  subtitle: string
  category: 'market-analysis' | 'technical' | 'case-study' | 'pricing' | 'compliance'
  readTime: string
  date: string
  author: string
  excerpt: string
  sections: {
    id: string
    heading: string
    content?: string
    bullets?: string[]
    tables?: {
      title?: string
      headers: string[]
      rows: string[][]
    }[]
    highlight?: string
  }[]
  stats?: {
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down' | 'neutral'
  }[]
  meta: {
    documentType: string
    version: string
    updated: string
  }
}

// Import article collections
import { aiMarketResearch } from './ai-market-research'
import { aiMarketResearchPart2 } from './ai-market-research-2'
import { aiMarketResearchPart3 } from './ai-market-research-3'
import { marketResearchPart4 } from './ai-market-research-4'

// Combine all research articles
export const allMarketResearch: MarketResearchArticle[] = [
  ...aiMarketResearch,
  ...aiMarketResearchPart2,
  ...aiMarketResearchPart3,
  ...marketResearchPart4,
]

// Export individual collections for selective imports
export { aiMarketResearch }
export { aiMarketResearchPart2 }
export { aiMarketResearchPart3 }
export { marketResearchPart4 }

// Helper function to get article by slug
export function getMarketResearchBySlug(slug: string): MarketResearchArticle | undefined {
  return allMarketResearch.find((article) => article.slug === slug)
}

// Helper function to get articles by category
export function getMarketResearchByCategory(category: MarketResearchArticle['category']): MarketResearchArticle[] {
  return allMarketResearch.filter((article) => article.category === category)
}

// Helper function to get featured/recent articles
export function getRecentMarketResearch(limit: number = 6): MarketResearchArticle[] {
  return allMarketResearch
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Category labels for UI
export const categoryLabels: Record<MarketResearchArticle['category'], string> = {
  'market-analysis': 'Market Analysis',
  'technical': 'Technical',
  'case-study': 'Case Study',
  'pricing': 'Pricing',
  'compliance': 'Compliance',
}

// Category descriptions
export const categoryDescriptions: Record<MarketResearchArticle['category'], string> = {
  'market-analysis': 'Comprehensive analysis of global and regional AI automation markets, trends, and competitive landscapes.',
  'technical': 'Deep-dive technical documentation covering implementation details, platform comparisons, and architectural patterns.',
  'case-study': 'Real-world case studies of AI automation deployments, agency operations, and business transformations.',
  'pricing': 'Pricing benchmarks, revenue models, and cost analysis for AI automation services across global markets.',
  'compliance': 'Legal frameworks, regulatory requirements, and compliance standards for AI automation operations.',
}
