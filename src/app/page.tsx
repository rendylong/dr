'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GlobeAltIcon,
  CloudArrowUpIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  SparklesIcon,
  UserIcon,
  LightBulbIcon,
  DocumentTextIcon,
  XMarkIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
// MermaidDiagram 模块找不到，暂时注释掉
// import MermaidDiagram from './research/MermaidDiagram';

const styles = {
  '@keyframes wave': {
    '0%': { transform: 'translateX(-100%)' },
    '50%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(-100%)' }
  },
  '.animate-wave': {
    animation: 'wave 3s ease-in-out infinite'
  }
};

const features = [
  {
    name: 'Lightning Fast',
    tagline: 'Accelerate Your Research Process',
    description: 'Receive comprehensive research reports in minutes, drastically reducing research time and accelerating your projects.',
    icon: GlobeAltIcon,
    imageSrc: '/lightningfast.svg',
  },
  {
    name: 'Deep Intelligence',
    tagline: 'Unlock Hidden Market Insights',
    description: 'Analyze information from diverse online sources – text, images, PDFs – for a complete and nuanced understanding of your market landscape.',
    icon: CloudArrowUpIcon,
    imageSrc: '/deepintel.svg',
  },
  {
    name: 'Smart Automation',
    tagline: 'AI-Driven Research Planning & Execution',
    description: 'Experience an intelligent system that automatically breaks down research objectives, plans execution steps, and engages in meaningful dialogue to deliver highly targeted insights.',
    icon: PuzzlePieceIcon,
    imageSrc: '/smartauto.svg',
  },
  {
    name: 'Strategic Impact',
    tagline: 'Transform Insights into Impact',
    description: 'Make informed, confident decisions based on accurate, reliable, and deeply analyzed research across any industry or domain.',
    icon: ShieldCheckIcon,
    imageSrc: '/strategic.svg',
  },
  {
    name: 'Private Knowledge',
    tagline: 'Your Custom Research Engine',
    description: '(Coming Soon) Seamlessly integrate your internal documents, reports, and knowledge base to create a customized research engine that truly understands your business context.',
    icon: CloudArrowUpIcon,
    imageSrc: '/domainknow.svg',
    comingSoon: true,
  },
];

export default function Home() {
  const [selectedBenefit, setSelectedBenefit] = useState<{featureIndex: number, benefitIndex: number} | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);

  const { scrollYProgress } = useScroll();
  const gradientRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gradientScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const useCases = [
    {
      title: "Market Research Team",
      cases: [
        {
          title: "Market Entry Strategy",
          description: "Comprehensive market analysis including size, growth potential, competitive landscape, and entry barriers.",
          icon: ChartBarIcon
        },
        {
          title: "Competitive Intelligence",
          description: "Track competitors' products, strategies, strengths, and weaknesses. Identify market opportunities.",
          icon: SparklesIcon
        }
      ]
    },
    {
      title: "Product Team",
      cases: [
        {
          title: "Product Innovation Research",
          description: "Research emerging technologies and user needs to guide product development and innovation.",
          icon: LightBulbIcon
        },
        {
          title: "User Experience Analysis",
          description: "Deep dive into user behavior patterns and preferences to optimize product design.",
          icon: UserIcon
        }
      ]
    },
    {
      title: "Investment Team",
      cases: [
        {
          title: "Investment Due Diligence",
          description: "Thorough analysis of investment opportunities, market trends, and risk assessment.",
          icon: ChartBarIcon
        },
        {
          title: "Portfolio Company Research",
          description: "Monitor portfolio companies' performance and market positioning.",
          icon: SparklesIcon
        }
      ]
    },
    {
      title: "Strategy Consulting Team",
      cases: [
        {
          title: "Industry Trend Analysis",
          description: "Gain insights into industry trends, technological changes, and consumer behavior shifts.",
          icon: LightBulbIcon
        },
        {
          title: "Strategic Planning",
          description: "Research-backed strategic recommendations for business growth and transformation.",
          icon: ChartBarIcon
        }
      ]
    }
  ];

  useEffect(() => {
    // 初始化窗口宽度
    setWindowWidth(window.innerWidth);

    // 监听窗口大小变化
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 添加自动播放效果
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startDemo = () => {
      // 重置到初始状态
      setCurrentStep(0);
      setShowCanvas(false); // 确保每次重启时关闭 Canvas
      
      // 设置每个步骤的延时
      const delays = [1000, 2000, 2000, 3000]; // 每个步骤的显示时间
      let totalDelay = 0;
      
      // 依次展示每个步骤
      delays.forEach((delay, index) => {
        timer = setTimeout(() => {
          setCurrentStep(index + 1);
        }, totalDelay);
        totalDelay += delay;
      });

      // 完整循环结束后重新开始
      timer = setTimeout(startDemo, totalDelay + 2000);
    };

    startDemo();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const handlePrevFeature = () => {
    setActiveFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNextFeature = () => {
    setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
  };

  // 计算卡片位移
  const calculateTransform = () => {
    if (windowWidth === 0) return '0px';
    const cardWidth = 460; // 卡片宽度
    const cardSpacing = 40; // 卡片间距 (px-5 * 2 = 40px)
    const activeCardOffset = activeFeature * (cardWidth + cardSpacing);
    const centerOffset = windowWidth / 2 - cardWidth / 2;
    return `${centerOffset - activeCardOffset}px`;
  };

  const handleCanvasToggle = (show: boolean) => {
    setShowCanvas(show);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden min-h-screen">
        {/* 背景色延伸到顶部 */}
        <div className="fixed inset-0 -z-10 bg-[#F5F3F2]" />
        
        {/* 动态背景 */}
        <div className="fixed inset-0 -z-10">
          {/* 基础渐变背景 */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #F5F3F2, #E5E0DE, #F5F3F2)',
              rotate: gradientRotate,
              scale: gradientScale,
            }}
          ></motion.div>
          
          {/* 第二层渐变 */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.03) 50%, transparent 100%)',
              scale: useTransform(scrollYProgress, [0, 1], [0.5, 2]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]),
            }}
          ></motion.div>
          
          {/* 网格图案 - 第一层 */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `radial-gradient(#000 1.5px, transparent 0)`,
              backgroundSize: '24px 24px',
              backgroundPosition: '-12px -12px',
              opacity: useTransform(scrollYProgress, [0, 1], [0.05, 0.02]),
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
              filter: 'blur(0px)',
            }}
          ></motion.div>
          
          {/* 网格图案 - 第二层 */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
              backgroundSize: '32px 32px',
              backgroundPosition: '-16px -16px',
              opacity: useTransform(scrollYProgress, [0, 1], [0.03, 0.05]),
              scale: useTransform(scrollYProgress, [0, 1], [1.2, 1.8]),
              filter: 'blur(0.5px)',
            }}
          ></motion.div>
          
          {/* 渐变过渡效果 */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 80%, #F5F3F2)',
              opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className="mx-auto w-full lg:w-[1920px] px-6 lg:px-[240px] pt-[80px] pb-16 sm:pt-[104px] sm:pb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-left max-w-[720px]">
                <p className="text-[16px] font-medium text-black/70 mb-2">10x more insights with</p>
                <h1 className="text-[120px] font-medium tracking-[-2.56px] text-black leading-[1.1] whitespace-nowrap">
                  Deep Research
                  <br />
                  <span className="text-black">
                    For Enterprise
                  </span>
                </h1>
                
                <p className="mt-6 text-[15.125px] leading-6 text-black opacity-50 max-w-[480px]">
                 Leverage internal knowledge with the internet's vast resources
                  <br />
                  Enable deep research for your entire team at <span className="bg-gradient-to-r from-black/50 to-black/30 text-white px-2 py-1 rounded-md">1/10 of the cost.</span>
                </p>

                <div className="mt-6 flex items-start">
                  <Link
                    href="https://knowledge.gbase.ai/auth/register"
                    className="rounded-[999px] bg-black px-[13px] py-[8px] text-[15px] font-normal text-white border border-black hover:bg-black/90 transition-all"
                  >
                    Get Started
                  </Link>
                </div>

                {/* Feature highlights */}
                <div className="mt-[56px] grid grid-cols-1 md:grid-cols-3 gap-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="h-[24px] mb-2">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-400/20">Coming Soon</span>
                    </div>
                    <h3 className="text-[30.875px] font-medium tracking-[-0.64px] text-black leading-[32px] whitespace-nowrap">Domain Context</h3>
                    <p className="mt-4 text-[15px] leading-6 text-black opacity-50">Deep research with enterprise domain knowledge and industry context</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="h-[24px] mb-2"></div>
                    <h3 className="text-[30.875px] font-medium tracking-[-0.64px] text-black leading-[32px]">Team Access</h3>
                    <p className="mt-4 text-[15px] leading-6 text-black opacity-50">Everyone in your team can leverage the power of deep research</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="h-[24px] mb-2"></div>
                    <h3 className="text-[30.875px] font-medium tracking-[-0.64px] text-black leading-[32px] whitespace-nowrap">90% Cost Down</h3>
                    <p className="mt-4 text-[15px] leading-6 text-black opacity-50">Significantly reduce research costs while maintaining enterprise quality</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="relative isolate overflow-hidden bg-[#F5F3F2]">
        {/* 顶部过渡渐变 */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F5F3F2] to-transparent"></div>
        <div className="mx-auto max-w-[1920px]">
          <div className="mx-auto py-16 lg:py-[96px]">
            {/* Title section */}
            <div id="features" className="mx-auto max-w-[896px] px-6 lg:px-[240px] relative z-10 scroll-mt-[100px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-4xl lg:text-[60.375px] font-medium tracking-[-2.56px] leading-tight lg:leading-[64px] text-black whitespace-nowrap text-center">
                  How Deep Research Works
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-0">
                  <div className="relative w-full max-w-[896px] mx-auto">
                    <p className="text-lg text-gray-600 text-center">
                   Proactively breaks down research goals, refine focus, execute iterative web searches, and deliver a clear, thorough, structured report.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Deep Research Agent Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 my-8 mx-auto max-w-4xl shadow-lg ring-1 ring-black/5"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex">
                  {/* Left: Chat Demo */}
                  <div className={`space-y-4 transition-all duration-300 ${showCanvas ? 'w-1/2 pr-4' : 'w-full'}`}>
                    {/* 步骤状态指示器 */}
                    <div className="flex justify-center space-x-2 mb-4">
                      {[1, 2, 3, 4].map((step) => (
                        <motion.div
                          key={step}
                          className={`h-1.5 w-1.5 rounded-full ${
                            step <= currentStep ? 'bg-black' : 'bg-gray-200'
                          }`}
                          initial={false}
                          animate={{
                            scale: step === currentStep ? 1.2 : 1,
                            opacity: step <= currentStep ? 1 : 0.3,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    {/* User Message 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 20 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">Research AI applications in financial services</p>
                      </div>
                    </motion.div>

                    {/* AI Response 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 2 ? 0 : 20 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <SparklesIcon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl shadow-sm p-3 ring-1 ring-black/5">
                          <p className="text-gray-900 text-sm">Let me help narrow down the scope. Which aspect interests you most:</p>
                          <ul className="mt-2 space-y-1">
                            <li className="flex items-center gap-2 text-sm">
                              <ArrowRightIcon className="h-3 w-3 text-black" />
                              <span>Risk Assessment & Fraud Detection</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <ArrowRightIcon className="h-3 w-3 text-black" />
                              <span>Investment & Trading</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <ArrowRightIcon className="h-3 w-3 text-black" />
                              <span>Customer Service & Personalization</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    {/* User Message 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 20 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium text-sm">Risk Assessment & Fraud Detection</p>
                      </div>
                    </motion.div>

                    {/* AI Response 2 - Research Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: currentStep >= 4 ? 1 : 0, y: currentStep >= 4 ? 0 : 20 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <SparklesIcon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl shadow-sm p-4 ring-1 ring-black/5">
                          <div className="prose max-w-none">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">AI in Financial Risk Assessment Report</h4>
                            
                            <div className="bg-white rounded-lg p-3 space-y-2">
                              <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                              <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                            </div>

                            <button
                              onClick={() => handleCanvasToggle(true)}
                              className="mt-4 w-[200px] bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between group transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-2 whitespace-nowrap">
                                <DocumentTextIcon className="h-5 w-5 text-black flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-900">View in Canvas</span>
                              </div>
                              <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Canvas */}
                  {showCanvas && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="w-1/2 pl-4 border-l border-gray-200"
                    >
                      <div className="bg-gray-50 rounded-xl shadow-sm h-full overflow-hidden ring-1 ring-black/5">
                        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                          <h3 className="text-base font-semibold text-gray-900">Research Report</h3>
                          <button 
                            onClick={() => handleCanvasToggle(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="p-4 space-y-6 max-h-[400px] overflow-y-auto">
                          {/* Report Content Preview */}
                          {[1, 2, 3, 4].map((section) => (
                            <div key={section} className="space-y-3">
                              <div className="h-5 bg-white rounded w-1/3"></div>
                              <div className="space-y-2">
                                <div className="h-3 bg-white rounded w-full"></div>
                                <div className="h-3 bg-white rounded w-5/6"></div>
                                <div className="h-3 bg-white rounded w-4/6"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <LightBulbIcon className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Intelligent Clarification</h3>
                <p className="text-gray-600">Asks targeted questions to understand research objectives and context</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <SparklesIcon className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Deep Research</h3>
                <p className="text-gray-600">Researches both across the internet and within your enterprise knowledge</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Structured Output</h3>
                <p className="text-gray-600">Delivers organized, comprehensive reports</p>
              </motion.div>
            </div>

            {/* Feature cards container */}
            <div className="relative mt-32">
              <div className="mx-auto max-w-[896px] px-6 lg:px-[240px] mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-4xl lg:text-[60.375px] font-medium tracking-[-2.56px] leading-tight lg:leading-[64px] text-black text-center whitespace-nowrap">
                    Unleash the Power of AI Research
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-0">
                    <div className="relative w-full max-w-[896px] mx-auto">
                      <p className="text-base lg:text-[14.875px] leading-[20px] text-black opacity-50 text-center">
                        Discover how our advanced research capabilities can transform your enterprise knowledge into actionable insights,
                      </p>
                      <p className="text-base lg:text-[14.875px] leading-[20px] text-black opacity-50 text-center">
                        enabling faster and more informed decision-making.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="w-full overflow-hidden">
                {/* 添加两侧的灰白色渐变遮罩 */}
                <div className="absolute left-0 top-0 bottom-0 w-[240px] bg-gradient-to-r from-[#F5F3F2]/95 via-[#F5F3F2]/70 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-[240px] bg-gradient-to-l from-[#F5F3F2]/95 via-[#F5F3F2]/70 to-transparent z-10" />
                <div className="flex transition-transform duration-500 ease-in-out" 
                     style={{ 
                       transform: `translateX(${calculateTransform()})`,
                     }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative group w-[460px] flex-shrink-0 px-5 transition-all duration-500 cursor-pointer
                        ${index === activeFeature ? 'opacity-100 scale-100' : 'opacity-80 scale-95'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFeatureClick(index);
                      }}
                    >
                      <div className="block">
                        <div className="flex flex-col justify-center items-start">
                          <div className="relative w-full aspect-[1.5] rounded-xl overflow-hidden mb-4">
                            <Image
                              src={feature.imageSrc}
                              alt={feature.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 460px"
                              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                              priority={index === 0}
                            />
                          </div>
                          
                          <h3 className="text-lg lg:text-[20px] font-medium leading-[24px] tracking-[-0.48px] text-black mb-2 group-hover:text-black/80 transition-colors duration-300">
                            {feature.name}
                          </h3>
                          
                          <p className="text-sm lg:text-[14px] leading-[20px] text-black opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                            {feature.description}
                          </p>
                          
                          {feature.comingSoon && (
                            <div className="absolute top-4 right-4">
                              <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                Coming Soon
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center items-center gap-[6px] mt-10">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleFeatureClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                      index === activeFeature ? 'bg-[#222222]' : 'bg-[#222222] opacity-40'
                    }`}
                    aria-label={`Show slide ${index + 1} of ${features.length}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Use Cases section */}
      <div className="relative isolate overflow-hidden bg-[#F5F3F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
                Use Cases
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-black/60">
                Explore how different teams leverage GBase for deep research
              </p>
            </motion.div>
          </div>

          {/* Team Tabs */}
          <div className="flex justify-center space-x-4 mb-12">
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => setActiveUseCase(index)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === activeUseCase 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-white/50 text-black/60 hover:bg-white hover:text-black'
                }`}
              >
                {useCase.title}
              </button>
            ))}
          </div>

          {/* Use Cases Grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {useCases[activeUseCase].cases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-y-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 transition-all duration-300 h-[200px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-black/5 rounded-xl">
                      <useCase.icon className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">{useCase.title}</h3>
                  </div>
                  <p className="text-black/60">
                    {useCase.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-12 gap-4">
            <button
              onClick={() => setActiveUseCase(prev => (prev === 0 ? useCases.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300"
            >
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeUseCase ? 'bg-black scale-125' : 'bg-black/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveUseCase(prev => (prev === useCases.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300"
            >
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate overflow-hidden bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Start Using GBase Today
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Experience AI-powered enterprise deep research capabilities now. Get 10x more insights at 1/10 of the cost.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="https://knowledge.gbase.ai/auth/register"
                  className="rounded-[999px] bg-white px-[24px] py-[12px] text-[15px] font-normal text-black hover:bg-gray-100 transition-all"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="https://knowledge.gbase.ai/auth/register"
                  className="rounded-[999px] px-[24px] py-[12px] text-[15px] font-normal text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 relative z-10" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <span className="text-2xl font-bold text-white">GBase</span>
              <p className="text-sm leading-6 text-gray-300">
                AI workspace for enterprise.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#features" className="text-sm leading-6 text-gray-300 hover:text-white">Features</a>
                    </li>
                    <li>
                      <Link href="/pricing" className="text-sm leading-6 text-gray-300 hover:text-white">Pricing</Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="https://www.sparticle.com" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">About</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Documentation</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">API Reference</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Privacy</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Terms</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">&copy; 2025 Sparticle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
