import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import {
  getDeepResearch,
  getDeepResearchFeedback,
  postDeepResearchAnswer,
  getDeepResearchReport,
  getDeepResearchSuit,
} from "@/apis/services/core";
import React, { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatDate } from "@/utils";
import { useSafeTimeout } from "@/hooks/useSafeTimeout";
import { useChatStore } from "../../store/chat"; // 引入 store
import { Tooltip } from "@mantine/core"; // 引入 Mantine 的 Tooltip

type Feedback = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  answeredAt: string;
  answered: boolean;
};

type Message = {
  role: string;
  content: string;
  timestamp: string;
  canvas?: {
    type: string;
    content: string;
  };
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

interface CodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  node?: any;
}

mermaid.initialize({
  startOnLoad: true,
  theme: "neutral",
  securityLevel: "loose",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
    curve: "basis",
    padding: 20,
    useMaxWidth: true,
  },
  stateDiagram: {
    padding: 20,
    useMaxWidth: true,
  },
} as any);

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (elementRef.current) {
      mermaid
        .render(uniqueId.current, chart)
        .then(({ svg }) => {
          if (elementRef.current) {
            elementRef.current.innerHTML = svg;
          }
        })
        .catch((error) => {
          console.error("Mermaid rendering failed:", error);
          if (elementRef.current) {
            elementRef.current.innerHTML = `<pre>${chart}</pre>`;
          }
        });
    }
  }, [chart]);

  return <div ref={elementRef} className="my-4 overflow-x-auto" />;
};

export default function ChatDetail() {
  const { setSidebarCollapsed } = useChatStore();
  const { deepResearchId } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [questions, setQuestions] = useState<Feedback[]>([]);
  const [disableSendMessage, setDisableSendMessage] = useState(false);
  const { t } = useTranslation("chat");
  const { setSafeTimeout, isMountedRef } = useSafeTimeout();
  const [copySuccess, setCopySuccess] = useState(false); // 用于显示复制成功的状态

  const renderHasReportPage = (data: any) => {
    const { deepResearch, feedbacks, report } = data;
    const feedbackMessages = feedbacks.flatMap((feedback: Feedback) => [
      {
        role: "assistant",
        content: feedback.question,
        timestamp: feedback.createdAt,
      },
      {
        role: "user",
        content: feedback.answer,
        timestamp: feedback.answeredAt,
      },
    ]);
    const chatData = {
      id: deepResearch.id,
      title: deepResearch.title,
      messages: [
        {
          role: "user",
          content: deepResearch.title,
          timestamp: deepResearch.createdAt,
        },
        ...feedbackMessages,
        {
          role: "assistant",
          content: t("reportGenerated"),
          timestamp: report.createdAt,
          canvas: {
            type: "markdown",
            content: report.content,
          },
        },
      ],
    };
    setChat(chatData);
    setDisableSendMessage(true);
    setSidebarCollapsed(true);
    setSelectedMessageId(chatData.messages.length - 1);
  };
  useEffect(() => {
    console.log("deepResearchId", deepResearchId);
    if (!deepResearchId) return;
    setIsLoading(true);
    console.log("调用 getDeepResearchSuit 接口");
    getDeepResearchSuit(deepResearchId).then(({ data }) => {
      console.log("getDeepResearchSuit 接口返回数据", data);
      if (data.success) {
        if (data.report) {
          console.log("报告已完成，初始化页面");
          renderHasReportPage(data);
        } else {
          if (
            data.deepResearch.stage === "DEEP_RESEARCH" &&
            data.deepResearch.stageStatus === "DEEP_RESEARCH_WAIT_EXECUTE"
          ) {
            console.log("等待报告输出");
            getResearchReport();
          }
        }
      } else {
        if (
          data.deepResearch.stage === "DEEP_RESEARCH" &&
          data.deepResearch.stageStatus === "DEEP_RESEARCH_WAIT_EXECUTE"
        ) {
          console.log("等待报告输出");
          getResearchReport();
        } else if (!data.report) {
          console.log("暂无报告，调用 getDeepResearch 接口");
          getDeepResearch(deepResearchId).then(({ data }) => {
            console.log("getDeepResearch 接口返回数据", data);
            const chatData = {
              id: data.deepResearch.id,
              title: data.deepResearch.title,
              messages: [
                {
                  role: "user",
                  content: data.deepResearch.title,
                  timestamp: data.deepResearch.createdAt,
                },
              ],
            };
            setChat(chatData);
            if (data.success) {
              if (
                data.deepResearch.stage === "FEEDBACK" &&
                data.deepResearch.stageStatus === "FEEDBACK_WAIT_USER_ANSWER"
              ) {
                console.log("FEEDBACK");
                updateMessage();
              } else if (
                data.deepResearch.stage === "FEEDBACK" &&
                data.deepResearch.stageStatus === "FEEDBACK_WAIT_INITIALIZE"
              ) {
                console.log("FEEDBACK_WAIT_INITIALIZE");
                const timeoutId = setTimeout(() => {
                  console.log("轮询问题。。。");
                  updateMessage();
                }, 1000);
                setSafeTimeout(() => {
                  console.log("轮询问题。。。");
                  updateMessage();
                }, 1000);
              } else if (
                data.deepResearch.stage === "REPORT" &&
                data.deepResearch.stageStatus === "REPORT_WAIT_EXECUTE"
              ) {
                console.log("REPORT_WAIT_EXECUTE");
                updateMessage();
                getResearchReport();
              }
            }
          });
        }
      }
      setIsLoading(false);
    });
  }, [deepResearchId]);
  const updateMessage = () => {
    if (!deepResearchId) {
      console.error("deepResearchId is undefined");
      return;
    }

    // 移除旧的"扩展问题加载中"消息
    setChat((prevChat) => ({
      ...prevChat,
      id: prevChat?.id || "",
      title: prevChat?.title || "",
      messages:
        prevChat?.messages.filter(
          (msg) =>
            msg.content !== t("loadingExtendedQuestions") ||
            msg.role !== "assistant"
        ) || [],
    }));

    // 插入新的临时加载消息
    const loadingMessage = {
      role: "assistant",
      content: t("loadingExtendedQuestions"),
      timestamp: formatDate(new Date()),
    };

    setChat((prevChat) => ({
      ...prevChat,
      id: prevChat?.id || "",
      title: prevChat?.title || "",
      messages: [...(prevChat?.messages || []), loadingMessage],
    }));

    const processFeedbacks = (feedbacks: Feedback[]) => {
      // 移除临时加载消息
      setChat((prevChat) => ({
        ...prevChat,
        id: prevChat?.id || "",
        title: prevChat?.title || "",
        messages:
          prevChat?.messages.filter(
            (msg) => msg.content !== t("loadingExtendedQuestions")
          ) || [],
      }));

      const feedbackMessages = feedbacks
        .map((feedback: Feedback, idx: number) => {
          const messages = [];
          const isFirstOrAnswered = feedback.answered || idx === 0;
          const isPreviousAnswered = idx > 0 && feedbacks[idx - 1].answered;

          if (isFirstOrAnswered || isPreviousAnswered) {
            if (
              !isMessageInChat(
                feedback.question,
                "assistant",
                feedback.createdAt
              )
            ) {
              messages.push({
                role: "assistant",
                content: feedback.question,
                timestamp: feedback.createdAt,
              });
            }
            if (
              feedback.answered &&
              !isMessageInChat(feedback.answer, "user", feedback.answeredAt)
            ) {
              messages.push({
                role: "user",
                content: feedback.answer,
                timestamp: feedback.answeredAt,
              });
            }
          } else {
            return null; // 停止渲染后续的问题
          }
          return messages;
        })
        .filter(Boolean) // 过滤掉 null 值
        .flat();

      setChat((prevChat) => ({
        id: prevChat?.id || "",
        title: prevChat?.title || "",
        messages: [...(prevChat?.messages || []), ...feedbackMessages],
      }));

      if (feedbacks.every((feedback: Feedback) => feedback.answered)) {
        getResearchReport();
      }
    };

    const isMessageInChat = (
      content: string,
      role: string,
      timestamp: string
    ) => {
      return chat?.messages.some(
        (msg) =>
          msg.content === content &&
          msg.role === role &&
          msg.timestamp === timestamp
      );
    };

    console.log("调用 getDeepResearchFeedback 接口");
    getDeepResearchFeedback(deepResearchId).then(({ data }) => {
      if (!isMountedRef.current) return; // 检查组件是否仍然挂载
      console.log("getDeepResearchFeedback 接口返回数据", data);
      if (data.feedbacks.length === 0) {
        setSafeTimeout(() => {
          console.log("轮询问题。。。");
          updateMessage();
        }, 1000);
      } else {
        setQuestions(data.feedbacks); // 保存问题列表
        processFeedbacks(data.feedbacks);
      }
    });
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;
    if (!deepResearchId) {
      console.error("deepResearchId is undefined");
      return;
    }
    console.log("questions", questions);
    // 找到第一个未回答的问题
    const firstUnansweredQuestion = questions.find(
      (question) => !question.answered
    );
    if (firstUnansweredQuestion?.id) {
      console.log("调用 postDeepResearchAnswer 接口");
      postDeepResearchAnswer(deepResearchId, {
        [firstUnansweredQuestion.id]: trimmedMessage,
      }).then(({ data }) => {
        console.log("postDeepResearchAnswer 接口返回数据", data);
        updateMessage();
      });
    }
    setNewMessage("");
  };
  const getResearchReport = () => {
    if (!deepResearchId) {
      console.error("deepResearchId is undefined");
      return;
    }

    // 检查是否已经存在"报告生成中"消息
    const isLoadingReportMessagePresent = chat?.messages.some(
      (msg) => msg.content === t("loadingReport") && msg.role === "assistant"
    );
    console.log("isLoadingReportMessagePresent", isLoadingReportMessagePresent);

    if (!isLoadingReportMessagePresent) {
      // 插入新的临时加载消息
      const loadingReportMessage = {
        role: "assistant",
        content: t("loadingReport"),
        timestamp: formatDate(new Date()),
      };

      setChat((prevChat) => {
        const updatedChat = {
          ...prevChat,
          id: prevChat?.id || "",
          title: prevChat?.title || "",
          messages: [
            ...(prevChat?.messages.filter(
              (msg) =>
                msg.content !== t("loadingReport") || msg.role !== "assistant"
            ) || []),
            loadingReportMessage,
          ],
        };
        console.log("更新后的 chat 状态:", updatedChat);
        return updatedChat;
      });
    }

    console.log("调用 getDeepResearchReport 接口");
    getDeepResearchReport(deepResearchId)
      .then(({ data }) => {
        if (!isMountedRef.current) return; // 检查组件是否仍然挂载
        console.log("getDeepResearchReport 接口返回数据", data);

        if (data.success) {
          // 移除"报告生成中"消息
          setChat((prevChat) => {
            const updatedChat = {
              ...prevChat,
              id: prevChat?.id || "",
              title: prevChat?.title || "",
              messages:
                prevChat?.messages.filter(
                  (msg) =>
                    msg.content !== t("loadingReport") ||
                    msg.role !== "assistant"
                ) || [],
            };
            console.log("移除报告生成中消息后的 chat 状态:", updatedChat);
            return updatedChat;
          });

          setChat((prevChat) => {
            const updatedChat = {
              ...prevChat,
              id: prevChat?.id || "",
              title: prevChat?.title || "",
              messages: [
                ...(prevChat?.messages || []),
                {
                  role: "assistant",
                  content: t("reportGenerated"),
                  timestamp: data.report.createdAt,
                  canvas: {
                    type: "markdown",
                    content: data.report.content,
                  },
                },
              ],
            };
            console.log("添加报告内容后的 chat 状态:", updatedChat);
            return updatedChat;
          });
        } else {
          if (!data.success) {
            setSafeTimeout(() => {
              console.log("轮询报告。。。");
              getResearchReport();
            }, 1000);
          }
        }
      })
      .catch((error) => {
        if (!isMountedRef.current) return; // 检查组件是否仍然挂载
        console.error("获取报告失败", error);
        setSafeTimeout(() => {
          console.log("轮询报告。。。");
          getResearchReport();
        }, 1000);
      });
  };
  if (isLoading || !chat) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">{t("loadingChat")}</p>
        </div>
      </div>
    );
  }

  // if (!chat) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <div className="text-center text-gray-500">Chat not found</div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            {t("back")}
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50">
              <ChatBubbleLeftIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-900">
                {t("deepResearch")}
              </span>
            </div>
          </div>
        </div>
        {disableSendMessage && selectedMessageId && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCanvasVisible(!isCanvasVisible);
                console.log("Canvas visibility toggled:", !isCanvasVisible);
              }}
              className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {isCanvasVisible ? (
                <>
                  <EyeSlashIcon className="w-4 h-4 mr-1.5" />
                  {t("hideCanvas")}
                </>
              ) : (
                <>
                  <EyeIcon className="w-4 h-4 mr-1.5" />
                  {t("showCanvas")}
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div
          className={`flex-1 flex flex-col ${
            isCanvasVisible ? "w-2/5" : "w-full"
          }`}
        >
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chat.messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[460px] rounded-lg p-3 
                      ${
                        message.role === "assistant"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-primary-500 text-white"
                      }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </div>
                    <div className="mt-1 text-xs opacity-60">
                      {message.timestamp}
                    </div>
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
                            <span className="text-sm text-gray-900">
                              {t("viewInCanvas")}
                            </span>
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
          {!disableSendMessage ? (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t("messageAssistant")}
                  className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`flex items-center justify-center p-2 rounded-lg
                  ${
                    newMessage.trim()
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isCanvasVisible &&
          selectedMessageId !== null &&
          chat.messages[selectedMessageId]?.canvas && (
            <div className="w-3/5 border-l border-gray-200 bg-white overflow-y-auto">
              <div className="px-24 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {chat.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => setIsCanvasVisible(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button> */}
                    <Tooltip label={t("copySuccess")} opened={copySuccess}>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            chat.messages[selectedMessageId]?.canvas?.content ||
                              ""
                          );
                          console.log(
                            "内容已复制到剪贴板:",
                            chat.messages[selectedMessageId]?.canvas?.content ||
                              ""
                          );
                          setCopySuccess(true); // 设置复制成功状态
                          setTimeout(() => setCopySuccess(false), 2000); // 2秒后自动关闭提示
                        }}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <DocumentTextIcon className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div
                  className="prose prose-sm max-w-none
                    prose-headings:font-bold
                    prose-h1:text-4xl prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-gray-300 prose-h1:font-bold
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:font-bold prose-h2:text-gray-800
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-bold prose-h3:text-gray-800
                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-bold prose-h4:text-gray-800
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-li:text-gray-700 prose-li:mb-3 prose-li:marker:text-primary-500
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-em:italic prose-em:text-gray-800
                    prose-code:bg-gray-100 prose-code:rounded prose-code:px-3 prose-code:py-2 prose-code:text-sm prose-code:shadow
                    prose-table:text-sm prose-table:border prose-table:border-gray-300
                    prose-th:bg-gray-50 prose-th:font-semibold prose-th:border prose-th:border-gray-300
                    prose-td:py-3 prose-td:border prose-td:border-gray-300
                    prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                    prose-a:text-primary-500 prose-a:underline hover:prose-a:text-primary-600
                  "
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                    components={{
                      table: ({ node, ...props }) => (
                        <table
                          className="min-w-full divide-y divide-gray-200 border border-gray-200"
                          {...props}
                        />
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-gray-50" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="px-4 py-2 text-sm text-gray-900 border-t border-gray-200"
                          {...props}
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-4xl mb-8 pb-4 border-b border-gray-300 font-bold text-gray-900"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-3xl mt-10 mb-6 font-bold text-gray-800"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-2xl mt-8 mb-4 font-bold text-gray-800"
                          {...props}
                        />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4
                          className="text-xl mt-6 mb-3 font-bold text-gray-800"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-700 leading-relaxed mb-6"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="text-gray-700 mb-3 marker:text-primary-500"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-bold text-gray-900"
                          {...props}
                        />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic text-gray-800" {...props} />
                      ),
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";
                        if (language === "mermaid") {
                          return <MermaidDiagram chart={String(children)} />;
                        }
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-gray-400 pl-4 italic text-gray-600"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-primary-500 underline hover:text-primary-600"
                          {...props}
                        />
                      ),
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
