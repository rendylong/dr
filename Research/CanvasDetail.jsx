import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  DocumentTextIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
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

// 修改 mock 数据的结构，使其更容易访问
const MOCK_CHAT_HISTORY = {
  "123": {
    messages: [
      {
        role: 'assistant',
        content: 'Here is a comprehensive proposal outline for TechCorp...',
        timestamp: '2024-01-20 14:33',
        canvas: {
          type: 'markdown',
          content: `# Enterprise SaaS Solution Proposal
## For TechCorp

### Executive Summary
- We propose a comprehensive enterprise SaaS solution that addresses TechCorp's requirements for security, scalability, and efficiency. 
- Our platform offers enterprise-grade security features, seamless scalability, and extensive customization options to meet your specific needs.

### **1. Solution Overview**

#### **1.1 Core Platform Features**
- **Cloud-based Infrastructure**
  - Multi-region deployment
  - Auto-scaling capabilities
  - 99.99% uptime SLA
  - Real-time data synchronization

#### **1.2 Security Architecture**
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

### **2. Implementation Plan**

#### **2.1 Project Timeline**
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

#### **2.2 Implementation Process**
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

#### **2.3 Key Milestones**
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

### **3. Pricing & Licensing**

#### **3.1 Plan Comparison**

| Feature | Business Plan | Enterprise Plan |
|---------|---------------|-----------------|
| Annual Price/User | $96 | Custom |
| Minimum Users | 100 | 500+ |
| Storage | 1TB/user | Unlimited |
| API Calls | 100K/month | Unlimited |
| Custom Integrations | 5 | Unlimited |
| SLA Guarantee | 99.95% | 99.99% |

#### **3.2 Enterprise Benefits**
- Dedicated customer success manager
- 24/7 priority support
- Custom feature development
- Quarterly business reviews
- On-site training sessions
- Custom security configurations

### **4. ROI Analysis**

#### **4.1 Cost Savings**
- 40% reduction in IT infrastructure costs
- 60% improvement in workflow efficiency
- 30% reduction in training time
- 50% faster deployment compared to on-premise solutions

#### **4.2 Business Impact**
- Improved security posture
- Enhanced operational efficiency
- Reduced maintenance overhead
- Scalable infrastructure on demand
- Better compliance management

### **5. Support & Maintenance**

#### **5.1 Enterprise Support Features**
- 24/7 dedicated support team
- 1-hour response time for critical issues
- Regular maintenance updates
- Proactive monitoring
- Monthly system health reports

#### **5.2 Training & Resources**
- Comprehensive documentation
- Video tutorials
- Regular webinars
- Custom training sessions
- Admin & user guides

### **6. Next Steps**
1. Technical deep dive session
2. Security assessment review
3. Custom requirements workshop
4. Contract finalization
5. Project kickoff

---

> **Note**: This proposal is valid for 30 days and can be customized based on specific requirements.

### **Contact Information**
- Sales Team: enterprise@company.com
- Support: support@company.com
- Emergency: +1 (555) 123-4567`
        }
      }
    ]
  }
};

export default function CanvasDetail() {
  const { projectId, canvasId } = useParams();
  const [canvas, setCanvas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // 模拟 API 调用获取 canvas 内容
    setTimeout(() => {
      // 从 mock 数据中获取对应的 canvas 内容
      const chatData = MOCK_CHAT_HISTORY["123"]; // 假设我们总是使用这个聊天记录
      
      // 找到包含 canvas 的消息
      const message = chatData.messages.find(msg => msg.canvas);
      
      if (message?.canvas) {
        setCanvas({
          id: canvasId,
          title: "Enterprise SaaS Solution Proposal",
          content: message.canvas.content,
          createdAt: "2024-01-20 14:30",
          updatedAt: "2024-01-20 15:45",
          author: "AI Assistant",
          type: "markdown"
        });
      }
      setIsLoading(false);
    }, 500);
  }, [canvasId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading canvas...</p>
        </div>
      </div>
    );
  }

  if (!canvas) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Canvas not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100">
                <DocumentTextIcon className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {canvas.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                  text-gray-700 bg-white border border-gray-300 rounded-lg
                  hover:bg-gray-50 transition-colors"
              >
                <ShareIcon className="w-4 h-4" />
                Share
              </button>
              <button
                className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg
                  hover:bg-gray-100 transition-colors"
              >
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="prose prose-sm max-w-none
          prose-headings:font-bold
          prose-h1:text-3xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-gray-200
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
          prose-p:text-gray-600
          prose-li:text-gray-600
          prose-strong:text-gray-900
          prose-strong:font-bold
          prose-table:text-sm
          prose-th:bg-gray-50 prose-th:font-semibold
          prose-td:py-2"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                
                if (language === 'mermaid') {
                  return <MermaidDiagram chart={String(children)} />;
                }
                
                return <code className={className} {...props}>{children}</code>;
              },
              table: ({node, ...props}) => (
                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => (
                <thead className="bg-gray-50" {...props} />
              ),
              th: ({node, ...props}) => (
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="px-4 py-2 text-sm text-gray-900 border-t border-gray-200" {...props} />
              ),
              h1: ({node, ...props}) => (
                <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />
              ),
              h4: ({node, ...props}) => (
                <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2" {...props} />
              ),
              strong: ({node, ...props}) => (
                <strong className="font-bold text-gray-900" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="text-gray-600 mb-4" {...props} />
              ),
              ul: ({node, ordered, ...props}) => (
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2" {...props} />
              ),
              ol: ({node, ordered, ...props}) => (
                <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-2" {...props} />
              ),
              li: ({node, ordered, ...props}) => (
                <li className="text-gray-600" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-200 pl-4 py-2 my-4 text-gray-600 italic" {...props} />
              ),
            }}
          >
            {canvas.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 