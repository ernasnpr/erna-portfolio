import { useEffect } from 'react';
import { X, CheckCircle2, FileText } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-project-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close case study drawer"
        onClick={onClose}
        className="fixed inset-0 bg-[#1A1D1B]/45 backdrop-blur-[2px] transition-opacity cursor-pointer"
      />

      {/* Slide-over panel */}
      <aside className="relative z-10 w-full max-w-2xl bg-[#FAF8F4] h-full overflow-y-auto border-l border-[#1A1D1B]/10 shadow-2xl flex flex-col">
        {/* Sticky Drawer Header */}
        <div className="sticky top-0 z-20 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#1A1D1B]/10 px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="text-xs text-[#575D59] flex items-center gap-2 min-w-0">
            <span className="font-mono font-semibold text-[#164232]">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">{project.timeframe}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="p-2 -mr-2 rounded-lg text-[#575D59] hover:text-[#1A1D1B] hover:bg-[#F2EFE9] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164232]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Thumbnail */}
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#1A1D1B]/10 bg-[#F2EFE9]">
            <ResilientImage
              src={project.thumbnailSrc}
              alt={project.thumbnailAlt}
              fallbackTitle={project.title}
              fallbackSubtitle={project.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Description */}
          <div>
            <h2
              id="drawer-project-title"
              className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1D1B] leading-tight text-balance"
            >
              {project.title}
            </h2>
            <p className="text-base text-[#1A1D1B]/90 leading-relaxed mt-4">
              {project.description}
            </p>
            <p className="text-sm text-[#575D59] leading-relaxed mt-3">
              {project.context}
            </p>
          </div>

          {/* Verified Quantitative Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#1A1D1B]/10">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-lg font-semibold text-[#164232] tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-[#575D59] mt-0.5">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Outcome / Achievement */}
          <div className="bg-[#E8F0EC]/70 border border-[#164232]/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              {project.certificateNote ? (
                <FileText className="w-5 h-5 text-[#164232] shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#164232] shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div>
                <p className="text-xs font-semibold text-[#164232]">
                  {project.outcomeLabel}
                </p>
                <p className="text-sm text-[#1A1D1B] leading-relaxed mt-1">
                  {project.outcomeDetail}
                </p>
              </div>
            </div>
          </div>

          {/* Key Contributions */}
          <div>
            <h3 className="text-sm font-semibold text-[#1A1D1B] mb-3">
              My Key Contributions
            </h3>
            <ul className="space-y-2.5">
              {project.contributions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#1A1D1B]/90 leading-relaxed"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#164232] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools and Skills (Zero-pill clean inline list) */}
          <div className="pt-4 border-t border-[#1A1D1B]/10">
            <h3 className="text-xs font-medium text-[#575D59] mb-2">
              Tools &amp; Core Skills Applied
            </h3>
            <p className="text-sm text-[#1A1D1B] leading-relaxed">
              {project.toolsAndSkills.join(' · ')}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
