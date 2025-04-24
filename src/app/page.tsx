/** @jsxImportSource react */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRightIcon, 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  FolderIcon,
  GlobeAltIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  ShareIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  BoltIcon,
  SparklesIcon,
  CpuChipIcon,
  ChartBarIcon,
  LockClosedIcon,
  CheckIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// 将 features 数组精简为3个
const features = [
  {
    name: "Lightning Fast",
    tagline: "Accelerate Research",
    description: "Minutes, not hours. Process data at lightning speed.",
    icon: BoltIcon,
    imageSrc: "/images/features/lightning-fast.png"
  },
  {
    name: "Deep Intelligence",
    tagline: "Uncover Insights",
    description: "AI-powered analysis that finds what matters.",
    icon: SparklesIcon,
    imageSrc: "/images/features/deep-intelligence.png"
  },
  {
    name: "Smart Automation",
    tagline: "Effortless Workflow",
    description: "Focus on insights, let AI handle the rest.",
    icon: CpuChipIcon,
    imageSrc: "/images/features/smart-automation.png"
  }
];

// 添加 Project 特性
const projectFeature = {
  name: "Project Workspace",
  tagline: "Dedicated Knowledge Space",
  description: "Create dedicated knowledge spaces for your teams and initiatives.",
  icon: FolderIcon,
  features: [
    {
      name: "File Management",
      description: "Upload and manage multiple file formats (PDF, Word, Excel, PowerPoint)",
      icon: DocumentTextIcon
    },
    {
      name: "Web Crawling",
      description: "Automatically extract information from websites",
      icon: GlobeAltIcon
    },
    {
      name: "RAG System",
      description: "Ask questions and get answers based on your project content",
      icon: ChatBubbleLeftRightIcon
    },
    {
      name: "Collaboration Tools",
      description: "Share projects with team members with flexible permission settings",
      icon: UserGroupIcon
    }
  ],
  imageSrc: "/images/features/project-workspace.png"
};

// 定义用例数组
const useCases = [
  {
    name: "Market Intelligence",
    description: "Stay ahead with real-time market insights.",
    icon: BuildingOfficeIcon,
    features: [
      {
        name: "Real-time Analysis",
        description: "Track market trends and competitor movements instantly"
      },
      {
        name: "Smart Reports",
        description: "Generate comprehensive market reports automatically"
      },
      {
        name: "Team Workspace",
        description: "Collaborate on market research in real-time"
      }
    ],
    imageSrc: "/images/features/market-intelligence.png"
  },
  {
    name: "Product Development",
    description: "Accelerate product innovation with AI.",
    icon: LightBulbIcon,
    features: [
      {
        name: "Knowledge Hub",
        description: "Centralize all product research and documentation"
      },
      {
        name: "Smart Search",
        description: "Find product insights across all your data"
      },
      {
        name: "Team Sync",
        description: "Keep everyone aligned on product decisions"
      }
    ],
    imageSrc: "/images/features/product-development.png"
  },
  {
    name: "Knowledge Base",
    description: "Your team's intelligent knowledge hub.",
    icon: ChatBubbleLeftRightIcon,
    features: [
      {
        name: "Smart Docs",
        description: "AI-powered documentation that stays up to date"
      },
      {
        name: "Quick Answers",
        description: "Get instant answers to any question"
      },
      {
        name: "Data Insights",
        description: "Extract insights from your knowledge base"
      }
    ],
    imageSrc: "/images/features/knowledge-base.png"
  }
];

// 定义关键特性数组
const keyFeatures = [
  {
    name: "Enterprise Deep Research",
    tagline: "Research at Scale",
    description: "Transform how your enterprise conducts research.",
    icon: GlobeAltIcon,
    features: [
      {
        name: "AI Research Assistant",
        description: "Smart analysis across multiple data sources",
        icon: SparklesIcon
      },
      {
        name: "Team Collaboration",
        description: "Share insights and work together seamlessly",
        icon: UserGroupIcon
      },
      {
        name: "Knowledge Base",
        description: "Build your enterprise knowledge repository",
        icon: FolderIcon
      }
    ],
    imageSrc: "/images/features/enterprise-research.png"
  },
  {
    name: "Create with AI",
    tagline: "Content Generation",
    description: "Turn insights into compelling content.",
    icon: DocumentTextIcon,
    features: [
      {
        name: "Smart Presentations",
        description: "One-click creation of professional slides",
        icon: PresentationChartBarIcon
      },
      {
        name: "Document Creation",
        description: "AI-powered writing and formatting",
        icon: DocumentTextIcon
      },
      {
        name: "Visual Mapping",
        description: "Transform ideas into visual mind maps",
        icon: ShareIcon
      }
    ],
    imageSrc: "/images/features/ai-creation.png"
  },
  {
    name: "Connect All Your Data",
    tagline: "Rich SaaS Integration",
    description: "Unified access to all your knowledge sources.",
    icon: FolderIcon,
    features: [
      {
        name: "Universal Connectors",
        description: "Connect to all your favorite tools",
        icon: CloudArrowUpIcon
      },
      {
        name: "Real-time Sync",
        description: "Keep all your data up to date",
        icon: BoltIcon
      },
      {
        name: "Smart Search",
        description: "Find anything across all sources",
        icon: MagnifyingGlassIcon
      }
    ],
    imageSrc: "/images/features/data-connectors.png"
  }
];

// 添加企业痛点和解决方案数组
const challenges = [
  {
    name: "Scattered Information",
    description: "Information scattered across documents, emails, and web pages. Employees spend 30% of work time switching between systems to find information.",
    solution: {
      title: "Unified Knowledge Space",
      description: "GBase Knowledge provides a unified collaboration space. Project feature integrates multi-format files with AI-powered search, reducing information retrieval time by 70%.",
      metrics: [
        { before: "30%", after: "10%", label: "Time spent on searching" },
        { before: "Multiple", after: "One", label: "Systems to search" }
      ]
    }
  },
  {
    name: "Knowledge Silos",
    description: "Cross-departmental knowledge sharing is ineffective, creating information silos. Research findings and project experience are hard to preserve, with knowledge reuse rate below 30%.",
    solution: {
      title: "Collaborative Knowledge Platform",
      description: "GBase Knowledge's Project feature enables unified knowledge sharing platform, facilitating cross-team collaboration and knowledge sharing, increasing knowledge reuse rate to 80%.",
      metrics: [
        { before: "30%", after: "80%", label: "Knowledge reuse rate" },
        { before: "Limited", after: "Full", label: "Cross-team access" }
      ]
    }
  },
  {
    name: "Steep Learning Curve",
    description: "New employees face overwhelming enterprise knowledge and historical project experience, with a 3-month adaptation period impacting team efficiency.",
    solution: {
      title: "AI-Powered Onboarding",
      description: "GBase Knowledge's AI Q&A feature enables quick access to historical projects and technical solutions, reducing adaptation period to 1 month.",
      metrics: [
        { before: "3 months", after: "1 month", label: "Adaptation period" },
        { before: "Manual", after: "AI-assisted", label: "Learning process" }
      ]
    }
  },
  {
    name: "Time-Consuming Research",
    description: "Market research and competitive intelligence analysis require processing vast amounts of data, taking 2-3 weeks with difficulty in systematic results.",
    solution: {
      title: "Intelligent Research Assistant",
      description: "Web Search and Deep Research features intelligently retrieve internet information, breaking down complex research topics, reducing research cycle to 1 week.",
      metrics: [
        { before: "2-3 weeks", after: "1 week", label: "Research cycle" },
        { before: "Manual", after: "AI-powered", label: "Analysis process" }
      ]
    }
  },
  {
    name: "Slow Customer Support",
    description: "Support teams face repetitive questions without efficient knowledge retrieval tools. 30-minute average response time, 75% resolution rate, 70% satisfaction.",
    solution: {
      title: "Smart Support Knowledge Base",
      description: "GBase Knowledge creates customer support knowledge base, integrating product FAQs and solutions, reducing response time to 5 minutes, 95% resolution rate, 90% satisfaction.",
      metrics: [
        { before: "30 min", after: "5 min", label: "Response time" },
        { before: "75%", after: "95%", label: "Resolution rate" }
      ]
    }
  }
];

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* 背景装饰 - 添加动画效果 */}
          <motion.div 
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ 
            background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
          }}
        />
      </motion.div>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl py-24 sm:py-40 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文字内容 */}
          <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-black/5 border border-black/10">
                <span className="text-sm font-medium text-gray-900">GBase</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Unlock the power of seamless knowledge. 
                </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Enterprise Knowledge Hub：Where teams and AI work together
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                  <Link
                  href="https://knowledge.gbase.ai/auth/register"
                  className="rounded-[999px] bg-black px-[24px] py-[12px] text-[15px] font-normal text-white border border-black hover:bg-black/90 transition-all"
                  >
                  Start Free Trial
                  </Link>
                  <Link
                  href="/features/deep-research"
                  className="text-sm font-semibold leading-6 text-gray-900 group flex items-center"
                  >
                  Learn more 
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                    </div>
                  </motion.div>

            {/* 右侧图片 */}
                  <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:block"
            >
              <Image
                src="/hero.png"
                alt="GBase Application Interface"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Key Product Highlights - Notion Style */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* 左侧标题区域 */}
              <motion.div
              className="lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold tracking-tight text-black mb-6">AI-Powered Knowledge Hub</h2>
              <p className="text-xl text-gray-600">Transform scattered information into actionable insights. Discover hidden patterns, extract knowledge, and make smarter decisions.</p>
              </motion.div>

            {/* 右侧功能列表 */}
            <div className="lg:col-span-8">
              <dl className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
            <motion.div
                    key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex-none mb-8">
                      <feature.icon className="h-16 w-16 text-black" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="text-xl font-semibold leading-7 text-black">{feature.tagline}</dt>
                      <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
                        </div>
                    </motion.div>
                ))}
              </dl>
                      </div>
                      </div>

          {/* 底部示意图 */}
                    <motion.div
            className="mt-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
                      initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/features-overview.png"
              alt="Features Overview"
              width={2000}
              height={1000}
              className="w-full h-auto"
            />
                    </motion.div>
                        </div>
                      </div>

      {/* Project Feature Section */}
      <div className="relative bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* 左侧标题区域 */}
                    <motion.div
              className="lg:col-span-4"
                      initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
              <h2 className="text-5xl font-bold tracking-tight text-black mb-6">{projectFeature.name}</h2>
              <p className="text-xl text-gray-600">{projectFeature.description}</p>
                    </motion.div>

            {/* 右侧功能列表 */}
            <div className="lg:col-span-8">
              <dl className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projectFeature.features.map((feature, index) => (
                    <motion.div
                    key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5"
                  >
                    <feature.icon className="h-8 w-8 text-black flex-shrink-0 mr-4" aria-hidden="true" />
                    <div>
                      <dt className="text-lg font-semibold leading-7 text-black">{feature.name}</dt>
                      <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
                        </div>
              </motion.div>
                ))}
              </dl>
                      </div>
                            </div>

          {/* 底部示意图 */}
                    <motion.div 
            className="mt-24 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
          >
            <Image
              src={projectFeature.imageSrc}
              alt="Project Workspace Overview"
              width={2000}
              height={1000}
              className="w-full h-auto"
            />
                    </motion.div>
                </div>
              </div>

      {/* Key Features - Notion Style */}
      <div className="relative bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {keyFeatures.map((feature, index) => (
            <div key={feature.name} className="mb-32 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* 左侧标题区域 */}
              <motion.div
                  className="lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                  <h2 className="text-5xl font-bold tracking-tight text-black mb-6">{feature.name}</h2>
                  <p className="text-xl text-gray-600">{feature.description}</p>
              </motion.div>

                {/* 右侧功能列表 */}
                <div className="lg:col-span-8">
                  <dl className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {feature.features.map((item, i) => (
              <motion.div
                        key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="flex-none mb-8">
                          <item.icon className="h-16 w-16 text-black" aria-hidden="true" />
                        </div>
                        <div>
                          <dt className="text-xl font-semibold leading-7 text-black">{item.name}</dt>
                          <dd className="mt-2 text-base text-gray-600">{item.description}</dd>
                      </div>
              </motion.div>
                  ))}
                  </dl>
                </div>
              </div>

              {/* 底部示意图 */}
              <motion.div
                className="mt-24 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  src={feature.imageSrc}
                  alt={`${feature.name} Overview`}
                  width={2000}
                  height={1000}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          ))}
        </div>
            </div>

      {/* Use Cases - Notion Style */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-black">
                Transform Your Workflow
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how leading teams use GBase to unlock their potential.
              </p>
            </motion.div>
          </div>

          {/* 用例列表 */}
          <div className="mt-16 space-y-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/use-cases/${useCase.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="relative overflow-hidden">
                    <div className="bg-gray-50/50 rounded-2xl p-8 transition-all duration-300 group-hover:bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* 左侧内容 */}
                        <div className="lg:col-span-3 flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <useCase.icon className="h-10 w-10 text-black transition-transform group-hover:scale-110" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-black group-hover:text-black/80 transition-colors flex items-center">
                              {useCase.name}
                              <ArrowRightIcon className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">{useCase.description}</p>
                          </div>
                        </div>

                        {/* 右侧功能列表 */}
                        <div className="lg:col-span-9">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {useCase.features.map((feature, i) => (
                              <div 
                                key={i} 
                                className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-900/[0.03] transition-all duration-300 group-hover:ring-gray-900/[0.05] group-hover:shadow-md"
                              >
                                <dt className="text-sm font-semibold text-black mb-1">{feature.name}</dt>
                                <dd className="text-sm text-gray-600 line-clamp-2">{feature.description}</dd>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 底部示意图 */}
          <motion.div
            className="mt-24 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/features/use-cases.png"
              alt="Use Cases Overview"
              width={2000}
              height={1000}
              className="w-full h-auto"
            />
          </motion.div>

          {/* 切换按钮 */}
          <div className="mt-8 flex items-center justify-center gap-x-2">
            {useCases.map((useCase, index) => (
              <button
                key={useCase.name}
                className="rounded-full w-2 h-2 bg-gray-300 hover:bg-gray-400 transition-colors"
                aria-label={`View ${useCase.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Challenges Section */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Transform Your Enterprise Knowledge Management
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Common challenges faced by enterprises and how GBase Knowledge solves them
              </p>
            </motion.div>
          </div>

          {/* 痛点和解决方案列表 */}
          <div className="space-y-16">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
              >
                {/* 左侧痛点 */}
                <div className="bg-gray-50 p-8 rounded-2xl flex flex-col h-full">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {challenge.name}
                    </h3>
                    <p className="text-gray-600">
                      {challenge.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      <span>Current Challenge</span>
                    </div>
                  </div>
                </div>

                {/* 右侧解决方案 */}
                <div className="bg-black/5 p-8 rounded-2xl flex flex-col h-full">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                      {challenge.solution.title}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {challenge.solution.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-6">
                      {challenge.solution.metrics.map((metric, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500">Before</span>
                            <span className="text-red-500 font-semibold">{metric.before}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500">After</span>
                            <span className="text-green-500 font-semibold">{metric.after}</span>
                          </div>
                          <div className="text-sm text-gray-600 text-center border-t pt-2">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Notion Style */}
      <div className="relative bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
                Ready to transform your knowledge management?
              </h2>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="https://knowledge.gbase.ai/auth/register"
                  className="rounded-lg bg-white px-8 py-4 text-base font-medium text-black hover:bg-gray-100 transition-colors"
                >
                  Try GBase free →
                </Link>
                <Link
                  href="/features/deep-research"
                  className="text-base font-medium text-white hover:text-gray-300 transition-colors"
                >
                  Request a demo →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="https://twitter.com/gbase_ai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>

            <Link href="https://github.com/gbase-ai" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link href="https://discord.gg/gbase" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} GBase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 添加全局样式 */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}