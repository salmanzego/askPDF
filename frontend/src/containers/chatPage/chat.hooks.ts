

import { useState, useRef, useEffect } from 'react';
import { getMessage } from '@/services/chat';
import { uploadPdf } from '@/services/file';
import { getTabs } from '@/services/file';
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
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getTabs().then((response) => {
            setIsLoading(false);
            if (response.success) {
                setUploadedFiles(response.data.map((pdf: { filename: string }) => pdf.filename));
                setActiveFileIndex(null);
            } else {
                console.error("Failed to fetch tabs:", response.error);
            }
        })
    }, []);

    const handleFileUpload = (file: File) => {
        setIsUploading(true);
        uploadPdf(file).then((response) => {
            if (response.success) {
                setIsUploading(false);
                setUploadedFiles(prev => [...prev, file.name.split('.')[0]]);
                setActiveFileIndex(uploadedFiles.length);
                setMessages([
                    { role: 'assistant', content: 'Hello! How can I assist you today?' }
                ]);
            } else {
                setIsUploading(false);
                console.error("File upload failed:", response.error);
            }
        })
    }

    const activeFile = activeFileIndex !== null ? uploadedFiles[activeFileIndex] : null;

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { role: 'user', content: input }]);
            setInput('');
            setLoading(true);
            const response = await getMessage(input, uploadedFiles[activeFileIndex || 0]);
            if (response.success) {
                setLoading(false);
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response.data.message }])
            } else {
                setLoading(false);
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Sorry, something bad happened at our side, Please Try Again" }])
            }
        }
    }

    return { messages, input, setInput, messagesEndRef, handleSend, loading, handleFileUpload, uploadedFiles, activeFile, setActiveFileIndex, activeFileIndex, isLoading, isUploading}
}
