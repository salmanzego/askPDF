import { LegacyRef } from "react";
import { Message } from "@/containers/chatPage/chat.hooks";

interface Params {
    messages: Message[]
    messagesEndRef: LegacyRef<HTMLDivElement>
}

const MessageBox = ({ messages, messagesEndRef }: Params) => {
    return (
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[70%] p-3 rounded-lg ${message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessageBox;