import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import {
  CERTIFICATION,
  EDUCATION,
  INTERNSHIP,
  ORGANIZATIONS,
  PROFILE,
  PROJECTS,
  SKILLS,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const technicalSkills = SKILLS.filter((s) => s.category === 'technical').map((s) => s.name);
  const tools = SKILLS.filter((s) => s.category === 'tools').map((s) => s.name);
  const softSkills = SKILLS.filter((s) => s.category === 'soft').map((s) => s.name);

  return (
    <div
      className="print-only-container fixed inset-0 z-50 bg-[#1A1D1B]/55 backdrop-blur-[2px] overflow-y-auto p-4 sm:p-8 flex justify-center items-start"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="print-sheet relative w-full max-w-4xl bg-white text-[#1A1D1B] rounded-xl border border-[#1A1D1B]/10 shadow-2xl overflow-hidden my-4">
        {/* Non-printable action bar */}
        <div className="no-print sticky top-0 z-10 bg-[#F2EFE9] border-b border-[#1A1D1B]/10 px-6 py-3.5 flex items-center justify-between gap-4">
          <p id="cv-modal-title" className="text-sm font-semibold text-[#1A1D1B]">
            Curriculum Vitae — Print Preview
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#164232] hover:bg-[#0F2E23] text-[#FAF8F4] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="p-2 rounded-lg text-[#575D59] hover:text-[#1A1D1B] hover:bg-white/70 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable A4 CV Content */}
        <div className="p-8 sm:p-12 space-y-6 text-sm leading-relaxed">
          {/* Header */}
          <div className="border-b-2 border-[#164232] pb-5">
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1D1B]">
              {PROFILE.fullName}
            </h1>
            <p className="text-sm font-medium text-[#164232] mt-1">
              {PROFILE.professionalTitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#575D59] mt-3">
              <span>{PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.contact.email}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{PROFILE.contact.phoneDisplay}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.contact.linkedinLabel}</span>
            </div>
          </div>

          {/* Summary */}
          <section>
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
              Professional Profile
            </h2>
            <p className="text-[#1A1D1B]/90">
              {PROFILE.leadBio} {PROFILE.extendedBio}
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <p className="font-semibold text-[#1A1D1B]">{EDUCATION.institution}</p>
                <p className="text-[#575D59]">
                  {EDUCATION.degree} · GPA <span className="font-mono tabular-nums font-medium text-[#1A1D1B]">{EDUCATION.gpa}</span>
                </p>
              </div>
              <p className="text-xs font-mono text-[#575D59] tabular-nums">{EDUCATION.period}</p>
            </div>
          </section>

          {/* Internship Experience */}
          <section>
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
              Internship Experience
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
              <div>
                <p className="font-semibold text-[#1A1D1B]">{INTERNSHIP.company}</p>
                <p className="text-[#575D59]">{INTERNSHIP.position}</p>
              </div>
              <p className="text-xs font-mono text-[#575D59] tabular-nums">{INTERNSHIP.period}</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[#1A1D1B]/90">
              {INTERNSHIP.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section>
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
              Academic &amp; Research Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <p className="font-semibold text-[#1A1D1B]">{project.title}</p>
                    <p className="text-xs font-mono text-[#575D59] whitespace-nowrap">{project.timeframe}</p>
                  </div>
                  <p className="text-[#1A1D1B]/85 mt-1">{project.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-[#1A1D1B]/90 mt-1.5">
                    {project.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <p className="text-xs font-medium text-[#164232] mt-1.5">
                    Outcome: {project.outcomeDetail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Certification & Organizations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section>
              <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
                Certification
              </h2>
              <p className="font-semibold text-[#1A1D1B]">{CERTIFICATION.title}</p>
              <p className="text-[#575D59] text-xs mt-0.5">
                {CERTIFICATION.issuerFull} · Issued {CERTIFICATION.issuedDate}
              </p>
            </section>

            <section>
              <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#164232] mb-2">
                Organizational Experience
              </h2>
              <div className="space-y-2.5">
                {ORGANIZATIONS.map((org) => (
                  <div key={org.organization}>
                    <p className="font-semibold text-[#1A1D1B]">{org.organization}</p>
                    <p className="text-xs text-[#575D59]">{org.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Skills & Tools */}
          <section className="pt-2 border-t border-[#1A1D1B]/10 space-y-1.5 text-xs">
            <p>
              <span className="font-semibold text-[#1A1D1B]">Technical Skills: </span>
              <span className="text-[#575D59]">{technicalSkills.join(', ')}</span>
            </p>
            <p>
              <span className="font-semibold text-[#1A1D1B]">Tools: </span>
              <span className="text-[#575D59]">{tools.join(', ')}</span>
            </p>
            <p>
              <span className="font-semibold text-[#1A1D1B]">Soft Skills: </span>
              <span className="text-[#575D59]">{softSkills.join(', ')}</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
