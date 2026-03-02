'use client';

interface PortfolioFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function PortfolioFilter({ categories, activeCategory, onCategoryChange }: PortfolioFilterProps) {
  return (
    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeCategory === cat
              ? 'bg-brand text-white'
              : 'bg-surface border border-brand/15 text-text-muted hover:text-text-primary hover:border-brand/30'
          }`}
          aria-label={`Filter by ${cat}`}
          id={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
