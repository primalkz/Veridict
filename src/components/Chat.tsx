import Sidebar from "./Sidebar"
import "../css/chat.css"
import { ArrowUp } from "@phosphor-icons/react";
import OpenAI from 'openai';
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown'

export default function Chat({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (value: boolean) => void}) {

    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef(null);

    const client = new OpenAI({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true
    });

    async function askLLM(e: { preventDefault: () => void }) {
        e.preventDefault();

        if (!userInput.trim() || userInput.trim().toLowerCase() === "stop") return;

        const newMessages = [
            ...messages,
            { role: "user", content: userInput },
        ];

        setMessages(newMessages);
        setUserInput("");
        inputRef.current?.focus();

        const response = await client.responses.create({
            model: "groq/compound",
            input: newMessages,
        });

        setMessages([...newMessages, ...response.output]);
    }

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current?.scrollHeight,
            behavior: "smooth",
        })
    }, [messages])

    return (
        <>
        <main className={isOpen ? "chatScreen" : "chatScreen sidebar-collapsed"}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <section className="chatContent">
            {messages.length === 0 &&
            <><h2>
                Debate with evidence!
            </h2></>
            }
            <section className="messaging" ref={chatRef}>
                { messages.map((message:any, index:number) => {
                    if (message.role === "user") {
                        return (
                            <article className="prompt" key={index}>
                                {message.content}
                            </article>
                        );
                    }

                    if (message.type === "reasoning") {
                        const reason = message.content ?.filter((item: any) => item.type === "reasoning_text").map((item: any) => item.text).join("");
                        return (
                            <article className="reasoning" key={index}>
                                <details>
                                    <summary>Thinking</summary>
                                    <p>
                                    <Markdown>
                                        {reason}
                                    </Markdown>
                                    </p>
                                </details>
                            </article>
                        );
                    }

                    if(message.type === "message" && message.role === "assistant") {
                        const text = message.content ?.filter((item: any) => item.type === "output_text").map((item: any) => item.text).join("")
                        return (
                            <article className="reply" key={index}>
                                <Markdown>
                                {text}
                                </Markdown>
                            </article>
                        );
                    }
                    
                    return null;

                })}
            </section>
            <form className="inputBox" onSubmit={(e) => askLLM(e)}>
                <input ref={inputRef} name="prompt" type="text" placeholder="Start Typing!" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                <button type="submit"><ArrowUp size={20} weight="bold" /></button>
            </form>
        </section>
        </main>
        </>
    )
}