'use client'

import InputField from "@/components/InputField";
import MessageBox from "@/components/MessageBox";
import LoadingBox from "@/components/LoadingBox";
import { useChat } from "./chat.hooks";

const ChatPage = () => {
    const {messages, messagesEndRef, handleSend, input, setInput, loading} = useChat();

    return (
        <>
            <h2 className="font-bold text-2xl">AskPdf</h2>
            <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
                <MessageBox messages={messages} messagesEndRef={messagesEndRef} />
                {loading &&
                    <LoadingBox />
                }
                <InputField handleSend={handleSend} input={input} setInput={setInput} loading={loading}/>
            </div>
        </>
    )

}
export default ChatPage;