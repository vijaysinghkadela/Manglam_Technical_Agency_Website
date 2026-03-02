'use client';

import { ExternalLink, Clock, IndianRupee } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.comingSoon) {
    return (
      <GlassCard className="p-6 md:p-8 opacity-60">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-heading font-semibold text-text-primary">{project.title}</h3>
              <Badge variant="brand">Coming Soon</Badge>
            </div>
            <p className="text-sm text-text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map((tech) => (
                <span key={tech} className="text-xs bg-surface px-2 py-1 rounded border border-brand/10 text-text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Browser frame */}
        <div className="p-6 md:p-8 bg-dark/40">
          <div className="rounded-xl border border-brand/15 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-brand/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 ml-3">
                <div className="bg-dark/60 rounded-md px-3 py-1 text-xs text-text-muted max-w-xs">
                  {project.url}
                </div>
              </div>
            </div>
            <div
              className="p-8 min-h-[250px] flex flex-col items-center justify-center text-center"
              style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)` }}
            >
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center mb-4"
                style={{ backgroundColor: `${project.color}20`, borderColor: `${project.color}40` }}
              >
                <span className="text-2xl font-heading font-bold" style={{ color: project.color }}>
                  {project.title[0]}
                </span>
              </div>
              <h4 className="text-lg font-heading font-semibold text-text-primary">{project.client}</h4>
              <p className="text-sm text-text-muted mt-2 max-w-xs">
                {project.type} • {project.category}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="brand">{project.type}</Badge>
            <Badge variant="accent">{project.category}</Badge>
          </div>
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">{project.title}</h3>
          <p className="text-text-muted leading-relaxed mb-4">{project.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div><span className="text-text-muted">Client:</span><div className="text-text-primary font-medium">{project.client}</div></div>
            <div><span className="text-text-muted">Duration:</span><div className="text-text-primary font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{project.duration}</div></div>
            <div><span className="text-text-muted">Value:</span><div className="text-text-primary font-medium flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />{project.value}</div></div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((tech) => (
              <span key={tech} className="text-xs bg-surface px-2 py-1 rounded border border-brand/10 text-text-muted">{tech}</span>
            ))}
          </div>

          {project.deliverables.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Deliverables:</h4>
              <ul className="space-y-1">
                {project.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-text-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-light" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.url && (
            <a
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand-light border border-brand/20 rounded-lg text-sm hover:bg-brand/20 transition-all"
              aria-label={`Visit ${project.title} website`}
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
