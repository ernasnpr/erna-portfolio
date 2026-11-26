import { useState } from 'react';

type MetricTab = 'telkom' | 'mbg' | 'compare';

export function MetricsVisualizer() {
  const [activeTab, setActiveTab] = useState<MetricTab>('telkom');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="bg-white border border-[#1A1D1B]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#1A1D1B]/10">
          <div>
            <p className="text-xs font-medium text-[#575D59]">
              Verified Quantitative Evidence
            </p>
            <h3 className="font-editorial text-xl font-semibold text-[#1A1D1B] mt-1">
              Data &amp; Classification Metrics
            </h3>
          </div>

          <div
            role="tablist"
            aria-label="Metric dataset selector"
            className="inline-flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg self-start sm:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'telkom'}
              onClick={() => setActiveTab('telkom')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'telkom'
                  ? 'bg-[#164232] text-[#FAF8F4]'
                  : 'text-[#575D59] hover:text-[#1A1D1B]'
              }`}
            >
              Telkom Internship
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'mbg'}
              onClick={() => setActiveTab('mbg')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'mbg'
                  ? 'bg-[#164232] text-[#FAF8F4]'
                  : 'text-[#575D59] hover:text-[#1A1D1B]'
              }`}
            >
              MBG Research
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'compare'}
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'compare'
                  ? 'bg-[#164232] text-[#FAF8F4]'
                  : 'text-[#575D59] hover:text-[#1A1D1B]'
              }`}
            >
              Comparison
            </button>
          </div>
        </div>

        {/* Tab 1: PT Telkom Indonesia Internship */}
        {activeTab === 'telkom' && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* SVG Donut Gauge for 95% Classification Accuracy */}
              <div className="flex items-center gap-5">
                <svg
                  viewBox="0 0 120 120"
                  className="w-28 h-28 shrink-0"
                  role="img"
                  aria-label="95% customer classification model accuracy"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#E8F0EC"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#164232"
                    strokeWidth="12"
                    strokeLinecap="butt"
                    strokeDasharray={`${2 * Math.PI * 46 * 0.95} ${2 * Math.PI * 46}`}
                    transform="rotate(-90 60 60)"
                  />
                  <text
                    x="60"
                    y="58"
                    textAnchor="middle"
                    className="fill-[#1A1D1B] font-mono text-lg font-semibold tabular-nums"
                  >
                    95%
                  </text>
                  <text
                    x="60"
                    y="74"
                    textAnchor="middle"
                    className="fill-[#575D59] text-[9px] font-medium"
                  >
                    Accuracy
                  </text>
                </svg>

                <div>
                  <p className="text-sm font-semibold text-[#1A1D1B]">
                    Customer Classification Model
                  </p>
                  <p className="text-xs text-[#575D59] leading-relaxed mt-1">
                    Trained and validated on collected prospective customer and partner records during my Jan–Feb 2025 internship at Witel Purwokerto.
                  </p>
                </div>
              </div>

              {/* Verified Record Volume */}
              <div className="bg-[#FAF8F4] border border-[#1A1D1B]/10 rounded-lg p-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#575D59]">Prospective Records Analyzed</span>
                  <span className="font-mono text-xl font-semibold text-[#164232] tabular-nums">
                    131
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#E8F0EC] rounded-sm overflow-hidden">
                  <div className="h-full bg-[#164232] w-full" />
                </div>
                <div className="flex items-center justify-between text-xs text-[#575D59]">
                  <span>Reporting Cadence</span>
                  <span className="font-medium text-[#1A1D1B]">Weekly Management Reports</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1D1B]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-[#575D59]">Dataset Entity</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5">Customers &amp; Partners</p>
              </div>
              <div>
                <p className="text-[#575D59]">Service Channel</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5">WhatsApp Desk</p>
              </div>
              <div>
                <p className="text-[#575D59]">Period</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5 tabular-nums">Jan – Feb 2025</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MBG Research Study */}
        {activeTab === 'mbg' && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* SVG Donut Gauge for 88% SVM Test Accuracy */}
              <div className="flex items-center gap-5">
                <svg
                  viewBox="0 0 120 120"
                  className="w-28 h-28 shrink-0"
                  role="img"
                  aria-label="88% SVM test dataset accuracy"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#E8F0EC"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#164232"
                    strokeWidth="12"
                    strokeLinecap="butt"
                    strokeDasharray={`${2 * Math.PI * 46 * 0.88} ${2 * Math.PI * 46}`}
                    transform="rotate(-90 60 60)"
                  />
                  <text
                    x="60"
                    y="58"
                    textAnchor="middle"
                    className="fill-[#1A1D1B] font-mono text-lg font-semibold tabular-nums"
                  >
                    88%
                  </text>
                  <text
                    x="60"
                    y="74"
                    textAnchor="middle"
                    className="fill-[#575D59] text-[9px] font-medium"
                  >
                    Test Set
                  </text>
                </svg>

                <div>
                  <p className="text-sm font-semibold text-[#1A1D1B]">
                    SVM Satisfaction Classifier
                  </p>
                  <p className="text-xs text-[#575D59] leading-relaxed mt-1">
                    Evaluated on held-out test responses after preprocessing primary survey records for Indonesia’s Free Nutritious Meal Program (MBG).
                  </p>
                </div>
              </div>

              {/* Survey Dimensions */}
              <div className="bg-[#FAF8F4] border border-[#1A1D1B]/10 rounded-lg p-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#575D59]">Student Respondents</span>
                  <span className="font-mono text-xl font-semibold text-[#164232] tabular-nums">
                    499
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#575D59]">Likert-Scale Indicators</span>
                  <span className="font-mono text-base font-semibold text-[#1A1D1B] tabular-nums">
                    33
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#575D59]">Senior High Schools</span>
                  <span className="font-mono text-base font-semibold text-[#1A1D1B] tabular-nums">
                    5 Schools
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1D1B]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-[#575D59]">Region</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5">Banyumas Regency</p>
              </div>
              <div>
                <p className="text-[#575D59]">Algorithm</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5">Support Vector Machine</p>
              </div>
              <div>
                <p className="text-[#575D59]">Environment</p>
                <p className="font-medium text-[#1A1D1B] mt-0.5">Python Preprocessing</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Side-by-Side Comparison SVG Bar Chart */}
        {activeTab === 'compare' && (
          <div className="pt-6 space-y-5">
            <p className="text-xs text-[#575D59]">
              Interactive comparison of verified classification accuracy and sample size across both analytical engagements.
            </p>

            <div className="space-y-4">
              {/* Bar 1: Accuracy Comparison */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#1A1D1B]">
                    Classification Accuracy (%)
                  </span>
                  <span className="text-[#575D59] font-mono tabular-nums">
                    {hoveredBar === 'telkom-acc'
                      ? 'Telkom Model: 95% Accuracy'
                      : hoveredBar === 'mbg-acc'
                      ? 'MBG SVM Model: 88% Test Accuracy'
                      : 'Hover bars to inspect'}
                  </span>
                </div>

                <svg
                  viewBox="0 0 460 88"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Bar chart comparing 95% Telkom accuracy and 88% MBG SVM accuracy"
                >
                  {/* Telkom Accuracy Bar */}
                  <g
                    onMouseEnter={() => setHoveredBar('telkom-acc')}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    <text x="0" y="16" className="fill-[#575D59] text-[11px] font-medium">
                      Telkom Customer Model
                    </text>
                    <rect x="0" y="24" width="380" height="14" rx="3" fill="#F2EFE9" />
                    <rect
                      x="0"
                      y="24"
                      width={380 * 0.95}
                      height="14"
                      rx="3"
                      fill={hoveredBar === 'telkom-acc' ? '#0F2E23' : '#164232'}
                    />
                    <text
                      x="392"
                      y="35"
                      className="fill-[#1A1D1B] font-mono text-[12px] font-semibold tabular-nums"
                    >
                      95%
                    </text>
                  </g>

                  {/* MBG SVM Accuracy Bar */}
                  <g
                    onMouseEnter={() => setHoveredBar('mbg-acc')}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    <text x="0" y="60" className="fill-[#575D59] text-[11px] font-medium">
                      MBG Research (SVM Test)
                    </text>
                    <rect x="0" y="68" width="380" height="14" rx="3" fill="#F2EFE9" />
                    <rect
                      x="0"
                      y="68"
                      width={380 * 0.88}
                      height="14"
                      rx="3"
                      fill={hoveredBar === 'mbg-acc' ? '#0F2E23' : '#3E6B5B'}
                    />
                    <text
                      x="392"
                      y="79"
                      className="fill-[#1A1D1B] font-mono text-[12px] font-semibold tabular-nums"
                    >
                      88%
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bar 2: Dataset Records Comparison */}
              <div className="pt-3 border-t border-[#1A1D1B]/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#1A1D1B]">
                    Processed Dataset Records
                  </span>
                  <span className="text-[#575D59] font-mono tabular-nums">
                    {hoveredBar === 'mbg-vol'
                      ? '499 Student Surveys · 33 Indicators'
                      : hoveredBar === 'telkom-vol'
                      ? '131 Customer & Partner Records'
                      : 'Total: 630 records across both projects'}
                  </span>
                </div>

                <svg
                  viewBox="0 0 460 88"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Bar chart comparing 499 MBG student surveys and 131 Telkom records"
                >
                  <g
                    onMouseEnter={() => setHoveredBar('mbg-vol')}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    <text x="0" y="16" className="fill-[#575D59] text-[11px] font-medium">
                      MBG Student Surveys (5 Schools)
                    </text>
                    <rect x="0" y="24" width="380" height="14" rx="3" fill="#F2EFE9" />
                    <rect
                      x="0"
                      y="24"
                      width="380"
                      height="14"
                      rx="3"
                      fill={hoveredBar === 'mbg-vol' ? '#0F2E23' : '#164232'}
                    />
                    <text
                      x="392"
                      y="35"
                      className="fill-[#1A1D1B] font-mono text-[12px] font-semibold tabular-nums"
                    >
                      499
                    </text>
                  </g>

                  <g
                    onMouseEnter={() => setHoveredBar('telkom-vol')}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    <text x="0" y="60" className="fill-[#575D59] text-[11px] font-medium">
                      Telkom Prospective Records
                    </text>
                    <rect x="0" y="68" width="380" height="14" rx="3" fill="#F2EFE9" />
                    <rect
                      x="0"
                      y="68"
                      width={Math.round((131 / 499) * 380)}
                      height="14"
                      rx="3"
                      fill={hoveredBar === 'telkom-vol' ? '#0F2E23' : '#3E6B5B'}
                    />
                    <text
                      x="392"
                      y="79"
                      className="fill-[#1A1D1B] font-mono text-[12px] font-semibold tabular-nums"
                    >
                      131
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
