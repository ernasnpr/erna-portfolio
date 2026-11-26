export interface ProjectItem {
  id: 'mbg-svm' | 'saf-preneur';
  index: string;
  category: string;
  timeframe: string;
  title: string;
  shortSummary: string;
  description: string;
  context: string;
  contributions: string[];
  outcomeLabel: string;
  outcomeValue: string;
  outcomeDetail: string;
  certificateNote?: string;
  toolsAndSkills: string[];
  thumbnailSrc: string;
  thumbnailAlt: string;
  metrics: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  category: 'technical' | 'tools' | 'soft';
  focusArea: string;
}

export interface OrganizationItem {
  organization: string;
  role: string;
  responsibilities: string[];
}

/**
 * MEDIA CONFIGURATION
 * To replace any placeholder photo with an original image:
 * 1. Place your image inside `/public/images/` or `/src/assets/images/`.
 * 2. Update the path string below.
 */
export const PORTFOLIO_MEDIA = {
  profilePhoto: {
    src: '/assets/aistudio/image_1a7f22fb.png',
    alt: 'Formal portrait of Ernawati Eka B Sianipar, S.Kom., Information Systems graduate',
  },
  mbgProjectThumbnail: {
    src: '/src/assets/images/project_mbg_svm_thumb_1795612357736.jpg',
    alt: 'Machine learning Support Vector Machine classification visualization for the MBG satisfaction study',
  },
  safPreneurThumbnail: {
    src: '/src/assets/images/project_saf_preneur_thumb_1795612357990.jpg',
    alt: 'System requirements and web application architecture blueprint for SAF PRENEUR',
  },
  bnspCertificate: {
    src: '/assets/aistudio/image_63b808a9.png',
    alt: 'BNSP Certificate of Competence No. 62015 2120 6 0039671 2026 for Ernawati Eka B Sianipar, CADS in Artificial Intelligence',
  },
};

export const PROFILE = {
  shortName: 'Ernawati Sianipar',
  fullName: 'Ernawati Eka B Sianipar, S.Kom.',
  professionalTitle: 'Information Systems Graduate | Data Analytics & Business Intelligence',
  location: 'North Jakarta, Indonesia',
  graduationYear: '2026',
  gpa: '3.72/4.00',
  university: 'Telkom University Purwokerto',
  degree: 'Bachelor of Information Systems',
  headline: 'I turn operational records and survey datasets into structured, reliable insights.',
  leadBio:
    'I am an Information Systems graduate from Telkom University Purwokerto (GPA 3.72/4.00) with practical internship experience at PT Telkom Indonesia and a strong focus on Data Analytics, Data Visualization, Business Intelligence, Information Management, and Business Operations.',
  extendedBio:
    'During my studies and internship, I combined hands-on data processing, Support Vector Machine classification modeling, and structured system requirements documentation with frontline customer communication and operational reporting. I am detail-oriented, analytical, adaptable, and ready to contribute in entry-level analytical and operational roles.',
  targetRoles: [
    'Data Analytics',
    'Data Support',
    'Business Intelligence',
    'Administration',
    'Project Administration',
    'Business Analysis',
  ],
  contact: {
    email: 'ernawati.eka.sianipar@gmail.com',
    phoneDisplay: '+62 812-6586-7188',
    whatsappUrl: 'https://wa.me/6281265867188',
    linkedinUrl: 'https://www.linkedin.com/in/ernawati-eka-b-sianipar',
    linkedinLabel: 'linkedin.com/in/ernawati-eka-b-sianipar',
  },
};

export const QUANTITATIVE_HIGHLIGHTS = [
  {
    value: '3.72 / 4.00',
    label: 'Cumulative GPA',
    context: 'Bachelor of Information Systems · 2026',
  },
  {
    value: '95%',
    label: 'Customer Model Accuracy',
    context: '131 records analyzed at PT Telkom Indonesia',
  },
  {
    value: '88%',
    label: 'SVM Test Accuracy',
    context: '499 student surveys across 5 high schools',
  },
  {
    value: 'May 2026',
    label: 'BNSP Certified',
    context: 'Associate Data Scientist in Artificial Intelligence',
  },
];

export const INTERNSHIP = {
  company: 'PT Telkom Indonesia – Witel Purwokerto',
  position: 'Data Analyst & Customer Service Intern',
  period: 'January 2025 – February 2025',
  summary:
    'In this dual analytical and operational role, I bridged raw customer datasets with daily service coordination—classifying prospective partners while managing direct WhatsApp inquiries and weekly management reporting.',
  responsibilities: [
    'Collected, processed, and analyzed 131 prospective customer and partner records.',
    'Developed a customer classification model achieving 95% accuracy.',
    'Managed customer inquiries, product consultations, service information, and complaints through WhatsApp.',
    'Documented customer technical and operational issues and coordinated follow-ups with relevant departments.',
    'Prepared weekly operational data and performance reports for management evaluation.',
  ],
  metrics: {
    recordsProcessed: 131,
    accuracyPercent: 95,
    errorMarginPercent: 5,
    reportingCadence: 'Weekly Management Reports',
    serviceChannel: 'WhatsApp Consultation & Issue Coordination',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'mbg-svm',
    index: '01',
    category: 'Machine Learning Research',
    timeframe: 'Undergraduate Research · 2026',
    title: 'Machine Learning Application for Satisfaction Analysis of the Free Nutritious Meal Program (MBG)',
    shortSummary:
      'Applied the Support Vector Machine (SVM) algorithm to classify student satisfaction across 499 respondents from five senior high schools in Banyumas Regency.',
    description:
      'For my undergraduate research project, I designed and evaluated a Support Vector Machine (SVM) classification pipeline to measure student satisfaction with Indonesia’s Free Nutritious Meal Program (MBG) in Banyumas Regency.',
    context:
      'Evaluating large-scale public nutrition programs requires structured quantitative evidence. I collected primary survey responses across five senior high schools, standardized 33 Likert-scale indicators, and trained an SVM classifier to reliably categorize student satisfaction levels.',
    contributions: [
      'Collected and processed primary survey data from 499 students across five senior high schools in Banyumas Regency.',
      'Structured and analyzed 33 Likert-scale satisfaction indicators across program dimensions.',
      'Executed data preprocessing, cleaning, and feature formatting prior to model training.',
      'Implemented and tuned the Support Vector Machine (SVM) classification algorithm in Python.',
      'Evaluated classification model performance against the held-out test dataset.',
    ],
    outcomeLabel: 'Test Dataset Accuracy',
    outcomeValue: '88%',
    outcomeDetail: 'Achieved 88% classification accuracy on the test dataset using Support Vector Machine (SVM).',
    toolsAndSkills: [
      'Python',
      'Data Preprocessing',
      'Survey Analysis',
      'Machine Learning',
      'Support Vector Machine (SVM)',
    ],
    thumbnailSrc: PORTFOLIO_MEDIA.mbgProjectThumbnail.src,
    thumbnailAlt: PORTFOLIO_MEDIA.mbgProjectThumbnail.alt,
    metrics: [
      { label: 'Student Respondents', value: '499' },
      { label: 'Senior High Schools', value: '5' },
      { label: 'Likert Indicators', value: '33' },
      { label: 'SVM Test Accuracy', value: '88%' },
    ],
  },
  {
    id: 'saf-preneur',
    index: '02',
    category: 'Web Application & Systems Analysis',
    timeframe: 'Academic Capstone · May 2026',
    title: 'SAF PRENEUR System Development',
    shortSummary:
      'Collaborated in a three-student capstone team to analyze system requirements, author documentation, and deliver a copyrighted web-based application.',
    description:
      'SAF PRENEUR is a web-based application built as an academic capstone project by a three-member team, where I focused on identifying system requirements and maintaining structured technical documentation.',
    context:
      'Clear functional specifications and aligned documentation keep small engineering teams moving predictably. Working closely with my teammates from discovery through delivery, I translated user and business needs into clear requirements and supporting documentation.',
    contributions: [
      'Participated actively in identifying, structuring, and analyzing functional system requirements.',
      'Assisted in authoring and organizing comprehensive system documentation for the capstone deliverable.',
      'Collaborated across a three-student development team to align requirements with implementation milestones.',
    ],
    outcomeLabel: 'Intellectual Property',
    outcomeValue: 'No. 001224765',
    outcomeDetail:
      'Registered as a copyrighted computer program under Copyright Certificate No. 001224765, issued in May 2026.',
    certificateNote: 'Copyright Certificate No. 001224765 · Issued May 2026',
    toolsAndSkills: [
      'System Requirements Analysis',
      'System Documentation',
      'Teamwork',
      'Communication',
    ],
    thumbnailSrc: PORTFOLIO_MEDIA.safPreneurThumbnail.src,
    thumbnailAlt: PORTFOLIO_MEDIA.safPreneurThumbnail.alt,
    metrics: [
      { label: 'Capstone Team Size', value: '3 Students' },
      { label: 'Certificate No.', value: '001224765' },
      { label: 'Registration Date', value: 'May 2026' },
      { label: 'Artifact Type', value: 'Web Application' },
    ],
  },
];

export const SKILLS: SkillItem[] = [
  // Technical Skills
  { name: 'Data Analysis', category: 'technical', focusArea: 'Analytics & Insights' },
  { name: 'Data Processing', category: 'technical', focusArea: 'Data Preparation' },
  { name: 'Data Cleaning', category: 'technical', focusArea: 'Data Quality' },
  { name: 'Data Classification', category: 'technical', focusArea: 'Predictive Modeling' },
  { name: 'Survey Data Analysis', category: 'technical', focusArea: 'Quantitative Research' },
  { name: 'Data Visualization', category: 'technical', focusArea: 'Reporting & BI' },
  { name: 'Business Intelligence Fundamentals', category: 'technical', focusArea: 'Decision Support' },
  { name: 'Machine Learning Fundamentals', category: 'technical', focusArea: 'Applied Modeling' },
  { name: 'Support Vector Machine (SVM)', category: 'technical', focusArea: 'Classification' },
  { name: 'System Requirements Analysis', category: 'technical', focusArea: 'Business Analysis' },
  { name: 'System Documentation', category: 'technical', focusArea: 'Information Management' },

  // Tools
  { name: 'Microsoft Excel', category: 'tools', focusArea: 'Spreadsheets & Reporting' },
  { name: 'Microsoft Power BI', category: 'tools', focusArea: 'Interactive Dashboards' },
  { name: 'Python (Basic)', category: 'tools', focusArea: 'Data & SVM Scripting' },
  { name: 'SQL (Basic)', category: 'tools', focusArea: 'Relational Queries' },

  // Soft Skills
  { name: 'Analytical Thinking', category: 'soft', focusArea: 'Core Strength' },
  { name: 'Critical Thinking', category: 'soft', focusArea: 'Evaluation' },
  { name: 'Problem Solving', category: 'soft', focusArea: 'Operations & Data' },
  { name: 'Communication', category: 'soft', focusArea: 'Stakeholder Alignment' },
  { name: 'Teamwork and Collaboration', category: 'soft', focusArea: 'Cross-Functional' },
  { name: 'Adaptability', category: 'soft', focusArea: 'Fast Onboarding' },
  { name: 'Time Management', category: 'soft', focusArea: 'Deadline Delivery' },
  { name: 'Organizational Skills', category: 'soft', focusArea: 'Coordination' },
];

export const EDUCATION = {
  institution: 'Telkom University Purwokerto',
  degree: 'Bachelor of Information Systems',
  period: 'September 2022 – August 2026',
  gpa: '3.72 / 4.00',
  highlights:
    'Focused coursework in Information Management, Business Intelligence, System Requirements Analysis, and Applied Machine Learning.',
};

export const CERTIFICATION = {
  title: 'Associate Data Scientist in Artificial Intelligence',
  credentialDesignation: 'Certified Associate Data Scientist (CADS)',
  issuerShort: 'BNSP',
  issuerFull: 'Indonesia’s National Professional Certification Agency (BNSP)',
  lspAgency: 'LSP Informatika',
  certificateNumber: '62015 2120 6 0039671 2026',
  registrationNumber: 'TIK.317.01963 2026',
  issuedDate: '18 May 2026',
  validityPeriod: '3 Years',
  certificateImageSrc: PORTFOLIO_MEDIA.bnspCertificate.src,
  certificateImageAlt: PORTFOLIO_MEDIA.bnspCertificate.alt,
};

export const ORGANIZATIONS: OrganizationItem[] = [
  {
    organization: 'HKBP Purwokerto',
    role: 'Coordinator of Public Relations',
    responsibilities: [
      'Coordinated public relations activities across congregation and community initiatives.',
      'Managed internal and external communications to keep stakeholders informed.',
      'Coordinated event promotion and public engagement efforts.',
      'Maintained constructive relationships with members and external stakeholders.',
    ],
  },
  {
    organization: 'UKM Rohani Kristiani – Telkom University Purwokerto',
    role: 'External Division Staff',
    responsibilities: [
      'Established relationships with external parties and partner campus communities.',
      'Coordinated cross-division programs and joint student activities.',
      'Supported external communication and organizational collaboration.',
    ],
  },
];
