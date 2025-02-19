'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  UserGroupIcon,
  MegaphoneIcon,
  CubeIcon,
  ChartBarIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  TruckIcon,
  ScaleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const useCases = [
  {
    id: 'sales',
    name: 'Sales Team',
    description: 'Empower Sales with Deep Customer & Market Understanding',
    icon: UserGroupIcon,
    scenarios: [
      {
        title: 'Enhanced Customer Proposals & Presentations',
        description: 'Quickly research potential clients, their industries, competitors, and pain points to create highly personalized and compelling proposals.'
      },
      {
        title: 'Account Intelligence & Lead Qualification',
        description: 'Deep dive into lead profiles and company information to qualify leads faster and prioritize high-potential opportunities.'
      },
      {
        title: 'Competitive Landscape Analysis for Sales Pitches',
        description: 'Instantly access up-to-date competitor information (pricing, strategies, strengths/weaknesses) to position your offerings effectively.'
      },
      {
        title: 'Industry & Market Trend Briefings for Client Meetings',
        description: 'Prepare for client meetings with concise briefings on relevant industry trends and market dynamics, demonstrating expertise and adding value to conversations.'
      },
      {
        title: 'Identify Upselling & Cross-selling Opportunities',
        description: 'Research existing customer needs and market trends to pinpoint potential upselling and cross-selling opportunities within current accounts.'
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Team',
    description: 'Data-Driven Marketing Strategies & Campaigns',
    icon: MegaphoneIcon,
    scenarios: [
      {
        title: 'Comprehensive Market Research & Trend Analysis',
        description: 'Conduct in-depth market research to identify emerging trends, market size, and growth opportunities for strategic planning.'
      },
      {
        title: 'Competitive Analysis & Benchmarking',
        description: 'Monitor competitor activities, marketing campaigns, product launches, and market positioning for competitive benchmarking and strategy adjustments.'
      },
      {
        title: 'Target Audience Profiling & Persona Development',
        description: 'Deeply research target audience demographics, psychographics, online behavior, and preferences for more effective marketing segmentation and targeting.'
      },
      {
        title: 'Content Marketing & SEO Strategy',
        description: 'Identify trending topics, keywords, and content gaps in your industry to inform content creation and SEO strategies.'
      },
      {
        title: 'Campaign Performance Analysis & Optimization',
        description: 'Research market feedback and online sentiment regarding marketing campaigns to analyze performance and identify areas for optimization.'
      },
      {
        title: 'Social Media Monitoring & Sentiment Analysis',
        description: 'Track brand mentions, competitor mentions, and industry conversations on social media to understand brand perception and identify emerging trends.'
      }
    ]
  },
  {
    id: 'product',
    name: 'Product Development Team',
    description: 'Develop Market-Leading Products Based on Deep Insights',
    icon: CubeIcon,
    scenarios: [
      {
        title: 'Market Needs & Gap Analysis',
        description: 'Research unmet market needs, customer pain points, and existing product gaps to identify opportunities for new product development.'
      },
      {
        title: 'Feature Prioritization & Roadmap Planning',
        description: 'Analyze market trends, customer feedback, and competitor offerings to prioritize product features and inform roadmap planning.'
      },
      {
        title: 'Usability Testing & User Research Support',
        description: 'Gather background research on user behavior and preferences to inform usability testing and user research efforts.'
      },
      {
        title: 'Technology Trend Research & Innovation Scouting',
        description: 'Stay ahead of the curve by researching emerging technologies, innovations, and potential disruptions in your industry.'
      },
      {
        title: 'Patent Research & Intellectual Property Analysis',
        description: 'Conduct preliminary patent research and analyze competitor IP landscape during the product development process.'
      }
    ]
  },
  {
    id: 'research',
    name: 'Market Research & Competitive Intelligence Team',
    description: 'Supercharge Your Research Capabilities',
    icon: ChartBarIcon,
    scenarios: [
      {
        title: 'Accelerated Research Project Completion',
        description: 'Significantly reduce the time spent on data collection, analysis, and reporting for market research projects.'
      },
      {
        title: 'Deeper and More Comprehensive Research',
        description: 'Access and analyze a wider range of data sources and uncover deeper insights than traditional methods allow.'
      },
      {
        title: 'Automated Competitive Intelligence Monitoring',
        description: 'Set up automated monitoring of key competitors, industry trends, and market signals for continuous intelligence gathering.'
      },
      {
        title: 'Generate Expert-Level Reports & Dashboards',
        description: 'Create professional-quality reports and dashboards with data visualizations and logical reasoning, ready for executive review.'
      },
      {
        title: 'Scenario Planning & Forecasting Support',
        description: 'Research market trends and potential disruptions to support scenario planning and forecasting exercises.'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance Team',
    description: 'Informed Financial Analysis & Investment Decisions',
    icon: BanknotesIcon,
    scenarios: [
      {
        title: 'Company Due Diligence & Investment Research',
        description: 'Conduct rapid and comprehensive due diligence on potential investment targets, analyzing financial performance, market position, and competitive landscape.'
      },
      {
        title: 'Market & Industry Analysis for Investment Strategies',
        description: 'Research market trends, industry growth forecasts, and macroeconomic factors to inform investment strategies.'
      },
      {
        title: 'Risk Assessment & Mitigation',
        description: 'Identify and assess potential financial risks by researching market volatility, regulatory changes, and competitor vulnerabilities.'
      },
      {
        title: 'Financial Modeling & Forecasting Support',
        description: 'Gather data and insights to support financial modeling and forecasting efforts, improving accuracy and reliability.'
      },
      {
        title: 'Economic & Geopolitical Risk Analysis',
        description: 'Research global economic trends and geopolitical events to assess potential impacts on financial markets and investment portfolios.'
      }
    ]
  },
  {
    id: 'strategy',
    name: 'Strategy & Corporate Development Team',
    description: 'Strategic Planning & Growth Initiatives',
    icon: BuildingOfficeIcon,
    scenarios: [
      {
        title: 'Market Entry & Expansion Research',
        description: 'Conduct in-depth research on new markets, regulatory environments, and competitive landscapes for market entry and expansion strategies.'
      },
      {
        title: 'Mergers & Acquisitions (M&A) Research & Analysis',
        description: 'Support M&A activities by researching potential target companies, industry synergies, and integration challenges.'
      },
      {
        title: 'Strategic Partnership & Alliance Identification',
        description: 'Identify potential strategic partners and alliances by researching companies with complementary capabilities and market reach.'
      },
      {
        title: 'Long-Term Trend Analysis & Future Scenario Planning',
        description: 'Research long-term trends and potential future scenarios to inform long-term strategic planning and corporate vision.'
      },
      {
        title: 'Industry Disruption & Innovation Opportunity Identification',
        description: 'Identify potential industry disruptions and emerging innovation opportunities to inform strategic pivots and new business ventures.'
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Supply Chain Team',
    description: 'Optimize Operations & Supply Chain Efficiency',
    icon: TruckIcon,
    scenarios: [
      {
        title: 'Supply Chain Risk Assessment & Resilience',
        description: 'Research potential supply chain disruptions (geopolitical events, natural disasters, supplier risks) to improve supply chain resilience.'
      },
      {
        title: 'Supplier Due Diligence & Risk Management',
        description: 'Conduct thorough due diligence on potential suppliers, researching their financial stability, ethical practices, and operational capabilities.'
      },
      {
        title: 'Logistics & Transportation Optimization',
        description: 'Research transportation routes, logistics providers, and market conditions to optimize logistics and transportation costs.'
      },
      {
        title: 'Market Demand Forecasting & Inventory Management',
        description: 'Research market trends and demand patterns to improve demand forecasting and optimize inventory management.'
      },
      {
        title: 'Sustainability & Ethical Sourcing Research',
        description: 'Research sustainable sourcing practices, ethical suppliers, and regulatory requirements related to sustainability in the supply chain.'
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal & Compliance Team',
    description: 'Ensure Compliance & Mitigate Legal Risks',
    icon: ScaleIcon,
    scenarios: [
      {
        title: 'Regulatory Research & Compliance Monitoring',
        description: 'Stay up-to-date on relevant regulations, compliance requirements, and legal changes in your industry and target markets.'
      },
      {
        title: 'Intellectual Property (IP) Research & Protection',
        description: 'Conduct patent searches, trademark research, and IP landscape analysis to protect company IP and avoid infringement.'
      },
      {
        title: 'Legal Precedent & Case Law Research',
        description: 'Research legal precedents and case law relevant to legal matters and litigation.'
      },
      {
        title: 'Risk & Compliance Audits Support',
        description: 'Gather research and documentation to support risk and compliance audits.'
      },
      {
        title: 'Data Privacy & Security Research',
        description: 'Stay informed about data privacy regulations (e.g., GDPR, CCPA) and best practices for data security and compliance.'
      }
    ]
  },
  {
    id: 'hr',
    name: 'HR Team',
    description: 'Data-Driven Talent Acquisition & Development',
    icon: UserIcon,
    scenarios: [
      {
        title: 'Industry Benchmarking for Compensation & Benefits',
        description: 'Research industry benchmarks for compensation and benefits packages to attract and retain top talent.'
      },
      {
        title: 'Talent Market Research & Sourcing Strategies',
        description: 'Research talent pools, skill gaps, and sourcing strategies to optimize talent acquisition efforts.'
      },
      {
        title: 'Employee Engagement & Satisfaction Research',
        description: 'Research best practices and industry trends in employee engagement and satisfaction.'
      },
      {
        title: 'Training & Development Program Research',
        description: 'Research best practices and emerging trends in training and development to design effective employee development programs.'
      }
    ]
  }
];

export default function UseCases() {
  const [selectedTeam, setSelectedTeam] = useState(useCases[0].id);

  const selectedTeamData = useCases.find(team => team.id === selectedTeam);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50/50">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Use Cases by Team
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover how GBase can empower different teams in your organization with AI-powered research capabilities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team selector */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {useCases.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                selectedTeam === team.id
                  ? 'bg-indigo-50 ring-2 ring-indigo-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <team.icon className={`h-8 w-8 ${
                selectedTeam === team.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className={`mt-2 text-sm font-medium text-center ${
                selectedTeam === team.id ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                {team.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected team scenarios */}
      {selectedTeamData && (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
          <motion.div
            key={selectedTeamData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <div className="text-center mb-12">
              <selectedTeamData.icon className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                {selectedTeamData.name}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                {selectedTeamData.description}
              </p>
            </div>

            <div className="space-y-8">
              {selectedTeamData.scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-900/5"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {scenario.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 mb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Ready to transform your team's research capabilities?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start using GBase today and empower your team with AI-powered research tools.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 