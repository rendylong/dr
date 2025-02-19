import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  XMarkIcon,
  PaperClipIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

// 初始化 mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 14,
    numberSectionStyles: 4,
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    useMaxWidth: true,
  },
  stateDiagram: {
    padding: 20,
    useMaxWidth: true,
  }
});

// Mermaid 渲染组件
const MermaidDiagram = ({ chart }) => {
  const elementRef = useRef(null);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (elementRef.current) {
      mermaid.render(uniqueId.current, chart).then(({ svg }) => {
        elementRef.current.innerHTML = svg;
      }).catch(error => {
        console.error('Mermaid rendering failed:', error);
        elementRef.current.innerHTML = `<pre>${chart}</pre>`;
      });
    }
  }, [chart]);

  return <div ref={elementRef} className="my-4 overflow-x-auto" />;
};

// 模拟聊天历史数据
const MOCK_CHAT_HISTORY = {
  "123": {
    id: "123",
    title: "Enterprise SaaS Solution Proposal for TechCorp",
    timestamp: "2024-01-20 14:30",
    messages: [
      {
        role: 'user',
        content: 'Can you help me prepare a sales proposal for TechCorp? They are looking for an enterprise SaaS solution with focus on security and scalability.',
        timestamp: '2024-01-20 14:30',
      },
      {
        role: 'assistant',
        content: `Here's a comprehensive proposal outline for TechCorp:

1. Solution Overview:
- Cloud-based enterprise platform
- End-to-end security features
- Scalable infrastructure
- Real-time collaboration tools

2. Key Features:
- Single Sign-On (SSO) integration
- Role-based access control
- Data encryption at rest and in transit
- Automated backup and disaster recovery

3. Implementation Timeline:
- Phase 1: Initial setup (2 weeks)
- Phase 2: Data migration (3 weeks)
- Phase 3: User training (2 weeks)
- Phase 4: Go-live and support

Would you like me to elaborate on any of these aspects?`,
        timestamp: '2024-01-20 14:31',
        sources: [
          {
            title: 'Enterprise Solution Guide',
            url: 'https://example.com/enterprise-guide',
            type: 'web'
          },
          {
            title: 'Security_Features.pdf',
            url: 'file://security-features.pdf',
            type: 'file'
          }
        ]
      },
      {
        role: 'user',
        content: 'Yes, please provide more details about the security features and pricing model.',
        timestamp: '2024-01-20 14:32',
      },
      {
        role: 'assistant',
        content: `Let me break down our security features and pricing model:

1. Security Features:
- Multi-factor authentication (MFA)
- Advanced encryption (AES-256)
- Regular security audits
- Compliance with SOC 2, ISO 27001

2. Pricing Tiers:
| Plan | Users | Annual Price/User |
|------|-------|------------------|
| Team | <100 | $120 |
| Business | 101-500 | $96 |
| Enterprise | 500+ | Custom |

3. Enterprise Benefits:
- Dedicated support team
- Custom integration options
- SLA guarantees
- Priority feature requests

Would you like to see a detailed ROI analysis or implementation timeline?`,
        timestamp: '2024-01-20 14:33',
        sources: [
          {
            title: 'Enterprise Pricing Guide',
            url: 'https://example.com/pricing',
            type: 'web'
          }
        ],
        canvas: {
          type: 'markdown',
          content: `# Enterprise SaaS Solution Proposal
## For TechCorp

### Executive Summary
We propose a comprehensive enterprise SaaS solution that addresses TechCorp's requirements for security, scalability, and efficiency. Our platform offers enterprise-grade security features, seamless scalability, and extensive customization options to meet your specific needs.

### 1. Solution Overview

#### 1.1 Core Platform Features
- **Cloud-based Infrastructure**
  - Multi-region deployment
  - Auto-scaling capabilities
  - 99.99% uptime SLA
  - Real-time data synchronization

#### 1.2 Security Architecture
- **Authentication & Access Control**
  - Multi-factor authentication (MFA)
  - Single Sign-On (SSO) integration
  - Role-based access control (RBAC)
  - Active Directory integration

- **Data Protection**
  - AES-256 encryption at rest
  - End-to-end encryption in transit
  - Regular security audits
  - Automated backup systems

- **Compliance**
  - SOC 2 Type II certified
  - ISO 27001 compliant
  - GDPR compliant
  - Regular compliance reporting

### 2. Implementation Plan

#### 2.1 Project Timeline
\`\`\`mermaid
gantt
    title Project Implementation Timeline
    dateFormat YYYY-MM-DD
    axisFormat %m-%d
    tickInterval 1week
    
    section Discovery
    Requirements Gathering    :active, d1, 2024-02-01, 7d
    Architecture Design      :d2, after d1, 7d
    
    section Setup
    Infrastructure Setup     :s1, after d2, 7d
    Base Configuration      :s2, after s1, 7d
    
    section Migration
    Data Transfer           :m1, after s2, 14d
    Validation & Testing    :m2, after m1, 7d
    
    section Training
    Admin Training         :t1, after m2, 7d
    User Training         :t2, after t1, 7d
    
    section Launch
    Go-Live               :l1, after t2, 7d
    
    %% Dependencies
    click d1 href "#"
    click d2 href "#"
    click s1 href "#"
    click s2 href "#"
    click m1 href "#"
    click m2 href "#"
    click t1 href "#"
    click t2 href "#"
    click l1 href "#"
\`\`\`

#### 2.2 Implementation Process
\`\`\`mermaid
flowchart LR
    A[Discovery] --> B[Setup]
    B --> C[Migration]
    C --> D[Training]
    D --> E[Go-Live]
    
    subgraph Discovery
    A1[Requirements] --> A2[Architecture]
    end
    
    subgraph Setup
    B1[Infrastructure] --> B2[Configuration]
    end
    
    subgraph Migration
    C1[Data Transfer] --> C2[Validation]
    end
    
    subgraph Training
    D1[Admin] --> D2[Users]
    end
    
    subgraph Go-Live
    E1[Deployment] --> E2[Monitoring]
    end
\`\`\`

#### 2.3 Key Milestones
\`\`\`mermaid
stateDiagram-v2
    [*] --> Discovery
    Discovery --> Setup: Requirements Approved
    Setup --> Migration: Infrastructure Ready
    Migration --> Training: Data Validated
    Training --> GoLive: Users Trained
    GoLive --> [*]: Project Complete
    
    state Discovery {
        [*] --> Requirements
        Requirements --> Architecture
        Architecture --> [*]
    }
    
    state Migration {
        [*] --> Transfer
        Transfer --> Validation
        Validation --> [*]
    }
    
    state GoLive {
        [*] --> Deploy
        Deploy --> Monitor
        Monitor --> Review
        Review --> [*]
    }
\`\`\`

### 3. Pricing & Licensing

#### 3.1 Plan Comparison

| Feature | Business Plan | Enterprise Plan |
|---------|---------------|-----------------|
| Annual Price/User | $96 | Custom |
| Minimum Users | 100 | 500+ |
| Storage | 1TB/user | Unlimited |
| API Calls | 100K/month | Unlimited |
| Custom Integrations | 5 | Unlimited |
| SLA Guarantee | 99.95% | 99.99% |

#### 3.2 Enterprise Benefits
- Dedicated customer success manager
- 24/7 priority support
- Custom feature development
- Quarterly business reviews
- On-site training sessions
- Custom security configurations

### 4. ROI Analysis

#### 4.1 Cost Savings
- 40% reduction in IT infrastructure costs
- 60% improvement in workflow efficiency
- 30% reduction in training time
- 50% faster deployment compared to on-premise solutions

#### 4.2 Business Impact
- Improved security posture
- Enhanced operational efficiency
- Reduced maintenance overhead
- Scalable infrastructure on demand
- Better compliance management

### 5. Support & Maintenance

#### 5.1 Enterprise Support Features
- 24/7 dedicated support team
- 1-hour response time for critical issues
- Regular maintenance updates
- Proactive monitoring
- Monthly system health reports

#### 5.2 Training & Resources
- Comprehensive documentation
- Video tutorials
- Regular webinars
- Custom training sessions
- Admin & user guides

### 6. Next Steps
1. Technical deep dive session
2. Security assessment review
3. Custom requirements workshop
4. Contract finalization
5. Project kickoff

---

> **Note**: This proposal is valid for 30 days and can be customized based on specific requirements.

### Contact Information
- Sales Team: enterprise@company.com
- Support: support@company.com
- Emergency: +1 (555) 123-4567`
        }
      }
    ],
    attachments: [
      {
        id: 1,
        name: 'TechCorp_Proposal.pdf',
        size: '2.4 MB',
        type: 'application/pdf',
      },
      {
        id: 2,
        name: 'ROI_Analysis.xlsx',
        size: '1.1 MB',
        type: 'application/xlsx',
      }
    ]
  }
};

export default function ChatDetail() {
  const { chatId, collectionId } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // 获取当前的 base URL
  const baseUrl = window.location.origin;

  useEffect(() => {
    // 模拟API调用
    setIsLoading(true);
    setTimeout(() => {
      const chatData = MOCK_CHAT_HISTORY[chatId];
      if (chatData) {
        setChat(chatData);
        setAttachments(chatData.attachments || []);
      }
      setIsLoading(false);
    }, 500);
  }, [chatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      role: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setNewMessage('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: 'I understand your question about injection molding parameters. Let me analyze and provide a detailed response...',
        timestamp: new Date().toISOString(),
        sources: [
          {
            title: 'Processing Guide',
            url: 'https://example.com/guide',
            type: 'web'
          }
        ]
      };
      setChat(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
      }));
    }, 1000);
  };

  const handleAddToProject = (content) => {
    // 模拟添加到项目的 API 调用
    const timestamp = new Date().toISOString();
    const newDocument = {
      id: `doc-${Date.now()}`,
      title: 'Enterprise SaaS Solution Proposal',
      type: 'markdown',
      content: content,
      createdAt: timestamp,
      updatedAt: timestamp,
      author: 'AI Assistant'
    };
    
    // TODO: 实际项目中这里应该调用 API 保存内容
    console.log('Adding document to project:', newDocument);
    
    // 显示成功提示
    // TODO: 使用实际的提示组件
    alert('Successfully added to project');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Chat not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50">
              <ChatBubbleLeftIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-900">
                Project Assistant
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCanvasVisible(!isCanvasVisible)}
            className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {isCanvasVisible ? (
              <>
                <EyeSlashIcon className="w-4 h-4 mr-1.5" />
                Hide Canvas
              </>
            ) : (
              <>
                <EyeIcon className="w-4 h-4 mr-1.5" />
                Show Canvas
              </>
            )}
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages */}
        <div className={`flex-1 flex flex-col ${isCanvasVisible ? 'w-2/5' : 'w-full'}`}>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chat.messages.map((message, index) => (
              <div key={index}>
                <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[460px] rounded-lg p-3 
                      ${message.role === 'assistant'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-primary-500 text-white'
                      }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="mt-1 text-xs opacity-60">{message.timestamp}</div>
                    
                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                        <div className="text-xs font-medium text-gray-500">Sources:</div>
                        {message.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900"
                          >
                            {source.type === 'web' ? (
                              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                            ) : (
                              <DocumentIcon className="w-3 h-3" />
                            )}
                            {source.title}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Canvas Preview Button */}
                    {message.canvas && (
                      <button
                        onClick={() => {
                          setSelectedMessageId(index);
                          setIsCanvasVisible(true);
                        }}
                        className="mt-3 w-full bg-white border border-gray-200 rounded-lg 
                          p-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DocumentTextIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-900">View in Canvas</span>
                          </div>
                          {isCanvasVisible ? (
                            <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
                  >
                    <DocumentIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{file.name}</span>
                    <span className="text-gray-500">({file.size})</span>
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message the assistant..."
                className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`flex items-center justify-center p-2 rounded-lg
                  ${newMessage.trim()
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Section */}
        {isCanvasVisible && selectedMessageId !== null && chat.messages[selectedMessageId]?.canvas && (
          <div className="w-3/5 border-l border-gray-200 bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Canvas</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddToProject(chat.messages[selectedMessageId].canvas.content)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                      text-gray-700 bg-white border border-gray-300 rounded-lg
                      hover:bg-gray-50 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add to Project
                  </button>
                  <button
                    onClick={() => window.open(`${baseUrl}/my-base/project/${collectionId}/canvas/${selectedMessageId}`, '_blank')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                      text-gray-700 bg-white border border-gray-300 rounded-lg
                      hover:bg-gray-50 transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    Open in New Tab
                  </button>
                  <button
                    onClick={() => setIsCanvasVisible(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Markdown Content */}
              <div className="prose prose-sm max-w-none
                prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-gray-200 prose-h1:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-bold prose-h2:text-gray-900
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-bold prose-h3:text-gray-900
                prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-h4:font-bold prose-h4:text-gray-900
                prose-p:text-gray-600
                prose-li:text-gray-600
                prose-strong:text-gray-900
                prose-strong:font-bold
                prose-table:text-sm
                prose-th:bg-gray-50 prose-th:font-semibold
                prose-td:py-2"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ node, ...props }) => (
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200" {...props} />
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-gray-50" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 text-sm text-gray-900 border-t border-gray-200" {...props} />
                    ),
                    h1: ({node, ...props}) => (
                      <h1 className="text-gray-900 font-bold" {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 className="text-gray-900 font-bold" {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 className="text-gray-900 font-bold" {...props} />
                    ),
                    h4: ({node, ...props}) => (
                      <h4 className="text-gray-900 font-bold" {...props} />
                    ),
                    strong: ({node, ...props}) => (
                      <strong className="font-bold text-gray-900" {...props} />
                    ),
                    code: ({node, inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      
                      if (language === 'mermaid') {
                        return <MermaidDiagram chart={String(children)} />;
                      }
                      
                      return <code className={className} {...props}>{children}</code>;
                    },
                  }}
                >
                  {chat.messages[selectedMessageId].canvas.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 