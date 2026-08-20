import Sidebar from "./Sidebar"
import "../css/chat.css"
import { ArrowUp, Gear } from "@phosphor-icons/react";
import OpenAI from 'openai';
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNavigate, useParams } from "react-router-dom";

const SUGGESTIONS = [
  "AI will create more jobs than it destroys.",
  "Nuclear power is essential for cutting global emissions.",
  "Electric vehicles are better for the climate.",
]

export default function Chat({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (value: boolean) => void}) {

    const [userInput, setUserInput] = useState("");
    const [pending, setPending] = useState(false);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem("openai_api_key") || "");
    const [baseURL, setBaseURL] = useState(() => localStorage.getItem("openai_base_url") || "https://api.groq.com/openai/v1");
    const [showSettings, setShowSettings] = useState(() => !localStorage.getItem("openai_api_key"));
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLElement>(null);

    const { uuid } = useParams();
    const navigate = useNavigate();

    const client = useMemo(() => apiKey ? new OpenAI({
        apiKey,
        baseURL,
        dangerouslyAllowBrowser: true,
    }) : null, [apiKey, baseURL]);

    function saveSettings(key: string, url: string) {
        const trimmedKey = key.trim()
        const trimmedURL = url.trim()
        if (!trimmedKey || !trimmedURL) return
        localStorage.setItem("openai_api_key", trimmedKey)
        localStorage.setItem("openai_base_url", trimmedURL)
        setApiKey(trimmedKey)
        setBaseURL(trimmedURL)
        setShowSettings(false)
    }

    const [conversation, setConversation] = useState<Record<string, any[]>>(() => {
        try {
            const raw = localStorage.getItem("conversation")
            return raw ? JSON.parse(raw) : {}
        } catch {
            return {}
        }
    });

    const [messages, setMessages] = useState<any[]>(() => {
        if (!uuid) return []
        try {
            const raw = localStorage.getItem("conversation")
            const convos = raw ? JSON.parse(raw) : {}
            return convos[uuid] || []
        } catch {
            return []
        }
    });

    async function askLLM(e: FormEvent) {
        e.preventDefault();

        if (!client) return;

        const trimmed = userInput.trim()
        if (!trimmed || trimmed.toLowerCase() === "stop") return;

        const newMessages = [
            ...messages,
            { role: "user", content: userInput },
        ];

        setMessages(newMessages);

        const convoId = uuid ?? crypto.randomUUID()
        if (!uuid) {
            navigate(`/chat/${convoId}`)
            setConversation(prev => ({ ...prev, [convoId]: newMessages }))
        }

        setUserInput("");
        inputRef.current?.focus();
        setPending(true);

        try {
            const response = await client.responses.create({
                model: "qwen/qwen3.6-27b",
                input: newMessages,
            });

            const updated = [...newMessages, ...response.output]
            setMessages(updated)
            setConversation(prev => ({ ...prev, [convoId]: updated }))
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current?.scrollHeight,
            behavior: "smooth",
        })
    }, [messages, pending])

    useEffect(() => {
        localStorage.setItem("conversation", JSON.stringify(conversation));
    }, [conversation]);

    useEffect(() => {
        if (!uuid) {
            setMessages([]);
            return;
        }

        try {
            const raw = localStorage.getItem("conversation") || "{}"
            const convos = JSON.parse(raw)
            setMessages(convos[uuid] || [])
        } catch {
            setMessages([])
        }
    }, [uuid])

    return (
        <main className={isOpen ? "chatScreen" : "chatScreen sidebar-collapsed"}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <section className="chatContent">
            {showSettings ? (
                <div className="chatHero">
                    <h1 className="chatHero-title">Settings</h1>
                    <p className="chatHero-sub">Add your API key to start chatting</p>
                    <form className="settingsForm" onSubmit={(e) => {
                        e.preventDefault()
                        const form = e.currentTarget
                        const key = (form.elements.namedItem('apiKey') as HTMLInputElement).value
                        const url = (form.elements.namedItem('baseURL') as HTMLInputElement).value
                        saveSettings(key, url)
                    }}>
                        <input
                            name="apiKey"
                            type="password"
                            placeholder="sk-..."
                            defaultValue={apiKey}
                            aria-label="API key"
                            required
                        />
                        <input
                            name="baseURL"
                            type="url"
                            placeholder="https://api.openai.com/v1"
                            defaultValue={baseURL}
                            aria-label="Base URL"
                            required
                        />
                        <button type="submit" className="settingsSave">Save</button>
                    </form>
                </div>
            ) : messages.length === 0 ? (
                <div className="chatHero">
                    <h1 className="chatHero-title">Debate with evidence.</h1>
                    <p className="chatHero-sub">Follow the evidence, not the argument.</p>
                    <div className="chatHero-suggestions">
                        {SUGGESTIONS.map(s => (
                            <button
                                key={s}
                                type="button"
                                className="suggestionChip"
                                onClick={() => {
                                    setUserInput(s)
                                    inputRef.current?.focus()
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <section className="messaging" ref={chatRef}>
                    {messages.map((message: any, index: number) => {
                        if (message.role === "user") {
                            return (
                                <article className="prompt" key={index}>
                                    {message.content}
                                </article>
                            );
                        }

                        if (message.type === "reasoning") {
                            const reason = message.content?.filter((item: any) => item.type === "reasoning_text").map((item: any) => item.text).join("\n");
                            return (
                                <article className="reasoning" key={index}>
                                    <details>
                                        <summary>Thinking</summary>
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {reason}
                                        </Markdown>
                                    </details>
                                </article>
                            );
                        }

                        if (message.type === "message" && message.role === "assistant") {
                            const text = message.content?.filter((item: any) => item.type === "output_text").map((item: any) => item.text).join("\n")
                            return (
                                <article className="reply" key={index}>
                                    <Markdown remarkPlugins={[remarkGfm]}>
                                    {text}
                                    </Markdown>
                                </article>
                            );
                        }

                        return null;

                    })}
                    {pending && (
                        <article className="typing" aria-label="Veridict is thinking">
                            <span /><span /><span />
                        </article>
                    )}
                </section>
            )}
            <form className="inputBox" onSubmit={askLLM}>
                <button
                    type="button"
                    className="settingsToggle"
                    onClick={() => setShowSettings(() => client ? !showSettings : true)}
                    aria-label="Open settings"
                >
                    <Gear size={22} weight="bold" />
                </button>
                <input
                    ref={inputRef}
                    name="prompt"
                    type="text"
                    placeholder="Start Typing!"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    enterKeyHint="send"
                    aria-label="Message Veridict"
                    disabled={!client}
                />
                <button type="submit" aria-label="Send message" disabled={pending || !client}>
                    <ArrowUp size={20} weight="bold" />
                </button>
            </form>
        </section>
        </main>
    )
}