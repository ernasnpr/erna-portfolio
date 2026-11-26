import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Expand,
  FileText,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  X,
} from 'lucide-react';
import { CvModal } from './components/CvModal';
import { MetricsVisualizer } from './components/MetricsVisualizer';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ResilientImage } from './components/ResilientImage';
import { TopBar } from './components/TopBar';
import {
  CERTIFICATION,
  EDUCATION,
  INTERNSHIP,
  ORGANIZATIONS,
  PORTFOLIO_MEDIA,
  PROFILE,
  PROJECTS,
  ProjectItem,
  QUANTITATIVE_HIGHLIGHTS,
  SKILLS,
} from './data/portfolioData';

type SkillFilter = 'all' | 'technical' | 'tools' | 'soft';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('all');
  const [skillQuery, setSkillQuery] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'linkedin' | null>(null);

  useEffect(() => {
    if (!isCertModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCertModalOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCertModalOpen]);

  const filteredSkills = useMemo(() => {
    const normalizedQuery = skillQuery.trim().toLowerCase();
    return SKILLS.filter((skill) => {
      const matchesCategory = skillFilter === 'all' || skill.category === skillFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.focusArea.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [skillFilter, skillQuery]);

  const skillCounts = useMemo(
    () => ({
      all: SKILLS.length,
      technical: SKILLS.filter((s) => s.category === 'technical').length,
      tools: SKILLS.filter((s) => s.category === 'tools').length,
      soft: SKILLS.filter((s) => s.category === 'soft').length,
    }),
    [],
  );

  const handleCopy = async (value: string, field: 'email' | 'phone' | 'linkedin') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      }
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2000);
    } catch {
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2000);
    }
  };

  const categoryLabelMap: Record<'technical' | 'tools' | 'soft', string> = {
    technical: 'Technical Skill',
    tools: 'Software & Tool',
    soft: 'Soft Skill',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1D1B]">
      <div className={isCvOpen ? 'no-print' : ''}>
        <TopBar onOpenCv={() => setIsCvOpen(true)} />

        <main>
          {/* SECTION 1: SPLIT-SCREEN HERO + QUANTITATIVE PROOF STRIP */}
          <section id="overview" className="max-w-6xl mx-auto px-6 sm:px-8 pt-10 pb-14 lg:pt-14 lg:pb-18">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#164232] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{PROFILE.professionalTitle}</span>
                    <span aria-hidden="true" className="text-[#575D59]">·</span>
                    <span className="text-[#575D59]">{PROFILE.location}</span>
                  </p>

                  <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#1A1D1B] tracking-tight leading-[1.12] mt-4 text-balance">
                    {PROFILE.headline}
                  </h1>

                  <p className="text-base text-[#1A1D1B]/90 leading-relaxed mt-6 max-w-2xl">
                    {PROFILE.leadBio}
                  </p>

                  <p className="text-sm text-[#575D59] leading-relaxed mt-4 max-w-2xl">
                    {PROFILE.extendedBio}
                  </p>
                </div>

                <div className="pt-8 space-y-6">
                  {/* Primary & Secondary Contact Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${PROFILE.contact.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#164232] hover:bg-[#0F2E23] text-[#FAF8F4] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#164232]"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Email Me</span>
                    </a>

                    <a
                      href={PROFILE.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#F2EFE9] hover:bg-[#E8F0EC] text-[#1A1D1B] border border-[#1A1D1B]/12 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#164232]"
                    >
                      <MessageCircle className="w-4 h-4 text-[#164232]" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={PROFILE.contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-[#164232] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      <Linkedin className="w-4 h-4" aria-hidden="true" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Open Target Roles (Zero-pill clean inline list) */}
                  <div className="pt-4 border-t border-[#1A1D1B]/10">
                    <p className="text-xs font-medium text-[#575D59]">
                      Open to entry-level roles in:
                    </p>
                    <p className="text-xs sm:text-sm text-[#1A1D1B] mt-1 leading-relaxed">
                      {PROFILE.targetRoles.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Balanced Height Editorial Portrait */}
              <div className="lg:col-span-5 flex flex-col">
                <figure className="flex-1 flex flex-col bg-[#F2EFE9] border border-[#1A1D1B]/10 rounded-xl overflow-hidden">
                  <div className="relative flex-1 min-h-[340px] lg:min-h-[420px]">
                    <ResilientImage
                      src={PORTFOLIO_MEDIA.profilePhoto.src}
                      alt={PORTFOLIO_MEDIA.profilePhoto.alt}
                      fallbackTitle={PROFILE.fullName}
                      fallbackSubtitle={PROFILE.professionalTitle}
                      className="w-full h-full lg:absolute lg:inset-0 object-cover object-top"
                    />
                  </div>
                  <figcaption className="px-5 py-3.5 bg-white border-t border-[#1A1D1B]/10 flex items-center justify-between gap-4 text-xs text-[#575D59]">
                    <span className="font-medium text-[#1A1D1B] truncate">
                      {PROFILE.fullName}
                    </span>
                    <span className="whitespace-nowrap shrink-0 font-mono tabular-nums">
                      Class of {PROFILE.graduationYear}
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Strip */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1D1B]/10 border border-[#1A1D1B]/10 rounded-xl overflow-hidden">
              {QUANTITATIVE_HIGHLIGHTS.map((item) => (
                <div key={item.label} className="bg-white p-5 sm:p-6">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#164232] tabular-nums">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1D1B] mt-1.5">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#575D59] mt-1 leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: INTERNSHIP EXPERIENCE & REAL-METRIC DATA VISUALIZATIONS */}
          <section
            id="experience"
            className="border-t border-[#1A1D1B]/10 bg-[#F2EFE9]/55 py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
              <div className="max-w-2xl mb-10">
                <p className="text-xs font-medium text-[#164232]">
                  01. Practical Experience &amp; Quantitative Evidence
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1D1B] tracking-tight mt-2 text-balance">
                  Internship &amp; Analytical Impact
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Internship Narrative Card */}
                <article className="lg:col-span-6 bg-white border border-[#1A1D1B]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#1A1D1B]/10">
                      <div>
                        <h3 className="font-editorial text-xl font-semibold text-[#1A1D1B]">
                          {INTERNSHIP.company}
                        </h3>
                        <p className="text-sm font-medium text-[#164232] mt-0.5">
                          {INTERNSHIP.position}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#575D59] tabular-nums whitespace-nowrap">
                        {INTERNSHIP.period}
                      </span>
                    </div>

                    <p className="text-sm text-[#575D59] leading-relaxed mt-5">
                      {INTERNSHIP.summary}
                    </p>

                    <h4 className="text-xs font-semibold text-[#1A1D1B] mt-6 mb-3">
                      Key Responsibilities &amp; Deliverables
                    </h4>
                    <ul className="space-y-2.5">
                      {INTERNSHIP.responsibilities.map((item) => (
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

                  <div className="mt-6 pt-4 border-t border-[#1A1D1B]/10 text-xs text-[#575D59] flex flex-wrap items-center gap-2">
                    <span>Data Processing</span>
                    <span aria-hidden="true">·</span>
                    <span>Customer Classification</span>
                    <span aria-hidden="true">·</span>
                    <span>WhatsApp Operations</span>
                    <span aria-hidden="true">·</span>
                    <span>Weekly Reporting</span>
                  </div>
                </article>

                {/* Interactive Real-Metric Visualizer */}
                <div className="lg:col-span-6 flex flex-col">
                  <MetricsVisualizer />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: PROJECTS SHOWCASE + DRAWER TRIGGER */}
          <section id="projects" className="border-t border-[#1A1D1B]/10 py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#164232]">
                    02. Selected Academic &amp; Research Projects
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1D1B] tracking-tight mt-2 text-balance">
                    Applied Research &amp; System Analysis
                  </h2>
                </div>
                <p className="text-sm text-[#575D59] max-w-sm">
                  Select either project below to inspect full methodology, contributions, and verified outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <article
                    key={project.id}
                    className="group bg-white border border-[#1A1D1B]/10 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#164232]/45"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#164232] cursor-pointer"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9] border-b border-[#1A1D1B]/10">
                          <ResilientImage
                            src={project.thumbnailSrc}
                            alt={project.thumbnailAlt}
                            fallbackTitle={project.title}
                            fallbackSubtitle={project.category}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                      </button>

                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-2 text-xs text-[#575D59]">
                          <span className="font-mono font-semibold text-[#164232]">
                            {project.index}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.timeframe}</span>
                        </div>

                        <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#1A1D1B] leading-snug mt-3 text-balance">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[#575D59] leading-relaxed mt-3">
                          {project.shortSummary}
                        </p>

                        <div className="mt-5 pt-4 border-t border-[#1A1D1B]/10 flex items-baseline justify-between gap-4">
                          <div>
                            <p className="text-xs text-[#575D59]">{project.outcomeLabel}</p>
                            <p className="font-mono text-lg font-semibold text-[#164232] tabular-nums mt-0.5">
                              {project.outcomeValue}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium bg-[#164232] hover:bg-[#0F2E23] text-[#FAF8F4] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#164232]"
                          >
                            <span>Read Case Study</span>
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 sm:px-8 py-4 bg-[#FAF8F4] border-t border-[#1A1D1B]/10 text-xs text-[#575D59]">
                      {project.toolsAndSkills.join(' · ')}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: INTERACTIVE SKILLS & TOOLS MATRIX */}
          <section
            id="skills"
            className="border-t border-[#1A1D1B]/10 bg-[#F2EFE9]/55 py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs font-medium text-[#164232]">
                    03. Capabilities &amp; Technical Stack
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1D1B] tracking-tight mt-2 text-balance">
                    Skills &amp; Analytical Tools
                  </h2>
                </div>

                {/* Filter Controls & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div
                    role="tablist"
                    aria-label="Filter skills by category"
                    className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#1A1D1B]/10 rounded-lg"
                  >
                    {(
                      [
                        { id: 'all', label: `All (${skillCounts.all})` },
                        { id: 'technical', label: `Technical (${skillCounts.technical})` },
                        { id: 'tools', label: `Tools (${skillCounts.tools})` },
                        { id: 'soft', label: `Soft Skills (${skillCounts.soft})` },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={skillFilter === tab.id}
                        onClick={() => setSkillFilter(tab.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          skillFilter === tab.id
                            ? 'bg-[#164232] text-[#FAF8F4]'
                            : 'text-[#575D59] hover:text-[#1A1D1B]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <Search
                      className="w-3.5 h-3.5 text-[#575D59] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      placeholder="Filter skills..."
                      aria-label="Filter skills by keyword"
                      className="w-full sm:w-48 pl-8 pr-3 py-2 text-xs bg-white border border-[#1A1D1B]/10 rounded-lg text-[#1A1D1B] placeholder:text-[#575D59] focus:outline-none focus:ring-2 focus:ring-[#164232]"
                    />
                  </div>
                </div>
              </div>

              {filteredSkills.length === 0 ? (
                <div className="bg-white border border-[#1A1D1B]/10 rounded-xl p-8 text-center">
                  <p className="text-sm text-[#575D59]">
                    No matching capabilities found for &ldquo;{skillQuery}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSkillQuery('');
                      setSkillFilter('all');
                    }}
                    className="mt-3 px-4 py-2 text-xs font-medium text-[#164232] bg-[#E8F0EC] hover:bg-[#164232] hover:text-[#FAF8F4] rounded-lg transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1D1B]/10 border border-[#1A1D1B]/10 rounded-xl overflow-hidden">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-white p-5 flex items-center justify-between gap-4 hover:bg-[#FAF8F4] transition-colors duration-150"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1A1D1B] truncate">
                          {skill.name}
                        </p>
                        <p className="text-xs text-[#575D59] mt-0.5 truncate">
                          {categoryLabelMap[skill.category]} · {skill.focusArea}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-[#164232] whitespace-nowrap shrink-0">
                        {skill.category === 'tools'
                          ? 'Tool'
                          : skill.category === 'technical'
                          ? 'Core'
                          : 'Soft'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SECTION 5: EDUCATION, CERTIFICATION & ORGANIZATIONAL INVOLVEMENT */}
          <section id="credentials" className="border-t border-[#1A1D1B]/10 py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#164232]">
                  04. Academic Foundation &amp; Leadership
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1D1B] tracking-tight mt-2 text-balance">
                  Education, Certification &amp; Organizations
                </h2>
              </div>

              {/* Education & Certification Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <article className="bg-white border border-[#1A1D1B]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs text-[#575D59]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#164232]">
                        <GraduationCap className="w-4 h-4" aria-hidden="true" />
                        <span>Education</span>
                      </span>
                      <span className="font-mono tabular-nums">{EDUCATION.period}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-semibold text-[#1A1D1B] mt-4">
                      {EDUCATION.institution}
                    </h3>
                    <p className="text-sm font-medium text-[#164232] mt-1">
                      {EDUCATION.degree}
                    </p>
                    <p className="text-sm text-[#575D59] leading-relaxed mt-3">
                      {EDUCATION.highlights}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1A1D1B]/10 flex items-baseline justify-between">
                    <span className="text-xs text-[#575D59]">Cumulative GPA</span>
                    <span className="font-mono text-lg font-semibold text-[#164232] tabular-nums">
                      {EDUCATION.gpa}
                    </span>
                  </div>
                </article>

                <article className="bg-white border border-[#1A1D1B]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs text-[#575D59]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#164232]">
                        <Award className="w-4 h-4" aria-hidden="true" />
                        <span>National Certification</span>
                      </span>
                      <span className="font-mono tabular-nums">Issued {CERTIFICATION.issuedDate}</span>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-5 items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-editorial text-2xl font-semibold text-[#1A1D1B] text-balance">
                          {CERTIFICATION.title}
                        </h3>
                        <p className="text-sm font-medium text-[#164232] mt-1">
                          {CERTIFICATION.issuerShort} · {CERTIFICATION.credentialDesignation}
                        </p>
                        <p className="text-sm text-[#575D59] leading-relaxed mt-3">
                          Issued via {CERTIFICATION.lspAgency} on behalf of {CERTIFICATION.issuerFull}, valid for {CERTIFICATION.validityPeriod}.
                        </p>
                        <p className="font-mono text-xs text-[#575D59] tabular-nums mt-3">
                          Reg. {CERTIFICATION.registrationNumber}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsCertModalOpen(true)}
                        aria-label="View full BNSP Certificate of Competence"
                        className="group relative w-32 sm:w-36 shrink-0 aspect-[3/4] rounded-lg overflow-hidden border border-[#1A1D1B]/15 bg-[#F2EFE9] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164232]"
                      >
                        <ResilientImage
                          src={CERTIFICATION.certificateImageSrc}
                          alt={CERTIFICATION.certificateImageAlt}
                          fallbackTitle="BNSP Certificate"
                          fallbackSubtitle="May 2026"
                          className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-[#1A1D1B]/75 text-[#FAF8F4] text-[11px] font-medium py-1.5 px-2 flex items-center justify-center gap-1">
                          <Expand className="w-3 h-3" aria-hidden="true" />
                          <span>Inspect</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1A1D1B]/10 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[#575D59] tabular-nums">
                      No. {CERTIFICATION.certificateNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCertModalOpen(true)}
                      className="text-xs font-medium text-[#164232] hover:underline underline-offset-4 cursor-pointer"
                    >
                      View Certificate Image
                    </button>
                  </div>
                </article>
              </div>

              {/* Organizational Experience Row */}
              <div className="pt-4">
                <h3 className="font-editorial text-2xl font-semibold text-[#1A1D1B] mb-6">
                  Organizational Involvement
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {ORGANIZATIONS.map((org) => (
                    <article
                      key={org.organization}
                      className="bg-[#F2EFE9]/75 border border-[#1A1D1B]/10 rounded-xl p-6 sm:p-8"
                    >
                      <h4 className="font-editorial text-xl font-semibold text-[#1A1D1B]">
                        {org.organization}
                      </h4>
                      <p className="text-sm font-medium text-[#164232] mt-1">
                        {org.role}
                      </p>

                      <ul className="space-y-2.5 mt-5">
                        {org.responsibilities.map((item) => (
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
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: DIRECT CONTACT & PRINTABLE CV FOOTER */}
          <section
            id="contact"
            className="border-t border-[#1A1D1B]/10 bg-[#164232] text-[#FAF8F4] py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6">
                  <p className="text-xs font-medium text-[#E8F0EC]/80">
                    05. Let&rsquo;s Connect
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#FAF8F4] tracking-tight mt-2 text-balance">
                    Ready for entry-level roles in data, intelligence, and operations.
                  </h2>
                  <p className="text-sm sm:text-base text-[#E8F0EC]/85 leading-relaxed mt-4 max-w-xl">
                    I am based in {PROFILE.location} and open to opportunities in Data Analytics, Data Support, Business Intelligence, Administration, Project Administration, and Business Analysis.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-7">
                    <a
                      href={`mailto:${PROFILE.contact.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#FAF8F4] text-[#164232] hover:bg-[#E8F0EC] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Send Email</span>
                    </a>

                    <a
                      href={PROFILE.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[#FAF8F4]/30 text-[#FAF8F4] hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsCvOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[#FAF8F4]/30 text-[#FAF8F4] hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      <span>Printable CV</span>
                    </button>
                  </div>
                </div>

                {/* Direct Contact Details Card */}
                <div className="lg:col-span-6 bg-[#0F2E23] border border-white/12 rounded-xl divide-y divide-white/10">
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-[#E8F0EC]/70">Email Address</p>
                      <a
                        href={`mailto:${PROFILE.contact.email}`}
                        className="text-sm font-medium text-[#FAF8F4] hover:underline truncate block mt-0.5"
                      >
                        {PROFILE.contact.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.contact.email, 'email')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#FAF8F4] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-[#E8F0EC]/70">Phone &amp; WhatsApp</p>
                      <a
                        href={PROFILE.contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-medium text-[#FAF8F4] hover:underline tabular-nums block mt-0.5"
                      >
                        {PROFILE.contact.phoneDisplay}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.contact.phoneDisplay, 'phone')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#FAF8F4] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-[#E8F0EC]/70">LinkedIn Profile</p>
                      <a
                        href={PROFILE.contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#FAF8F4] hover:underline truncate block mt-0.5"
                      >
                        {PROFILE.contact.linkedinLabel}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(PROFILE.contact.linkedinUrl, 'linkedin')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#FAF8F4] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedField === 'linkedin' ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={PROFILE.contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#FAF8F4] rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 flex items-center gap-3 text-xs text-[#E8F0EC]/80">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{PROFILE.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#0F2E23] text-[#E8F0EC]/75 border-t border-white/10 py-6">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {PROFILE.graduationYear} {PROFILE.fullName}</p>
            <p>{PROFILE.university} · {PROFILE.location}</p>
          </div>
        </footer>
      </div>

      {/* Interactive Project Case-Study Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable A4 CV View */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

      {/* BNSP Certificate Lightbox */}
      {isCertModalOpen && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <button
            type="button"
            aria-label="Close certificate preview"
            onClick={() => setIsCertModalOpen(false)}
            className="fixed inset-0 bg-[#1A1D1B]/70 backdrop-blur-[2px] cursor-pointer"
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#FAF8F4] border border-[#1A1D1B]/15 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#1A1D1B]/10 flex items-center justify-between gap-4 bg-white">
              <div className="min-w-0">
                <h2 id="cert-modal-title" className="font-editorial text-lg font-semibold text-[#1A1D1B] truncate">
                  {CERTIFICATION.title}
                </h2>
                <p className="font-mono text-xs text-[#575D59] tabular-nums mt-0.5">
                  No. {CERTIFICATION.certificateNumber} · Reg. {CERTIFICATION.registrationNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                aria-label="Close certificate preview"
                className="p-2 rounded-lg text-[#575D59] hover:text-[#1A1D1B] hover:bg-[#F2EFE9] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto bg-[#F2EFE9] flex justify-center">
              <ResilientImage
                src={CERTIFICATION.certificateImageSrc}
                alt={CERTIFICATION.certificateImageAlt}
                fallbackTitle={CERTIFICATION.title}
                fallbackSubtitle={CERTIFICATION.certificateNumber}
                className="max-h-[72vh] w-auto object-contain rounded-lg border border-[#1A1D1B]/10 shadow-sm bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
