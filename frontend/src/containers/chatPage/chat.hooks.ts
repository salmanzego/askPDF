

import { useState, useRef, useEffect } from 'react';
import { getMessage } from '@/services/chat';

export interface Message {
    role: 'user' | 'assistant'
    content: string
}

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How can I assist you today?' }
    ])
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSend = async() => {
        if (input.trim()) {
            setMessages([...messages, { role: 'user', content: input }]);
            setInput('');
            setLoading(true);
            const response = await getMessage(input);
            if(response.success){
                setLoading(false);
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response.data.message }])
            }else{
                setLoading(false);
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Sorry, something bad happened at our side, Please Try Again" }])
            }
        }
    }

    return { messages, input, setInput, messagesEndRef, handleSend, loading }
}
