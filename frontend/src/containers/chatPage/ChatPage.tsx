'use client'

import InputField from "@/components/InputField";
import MessageBox from "@/components/MessageBox";
import LoadingBox from "@/components/LoadingBox";
import SidePanel from "@/components/SidePanel";
import { useChat } from "./chat.hooks";

const ChatPage = () => {
    const {
        messages,
        messagesEndRef,
        handleSend,
        input,
        setInput,
        loading,
        uploadedFiles,
        handleFileUpload,
        activeFile,
        setActiveFileIndex,
        activeFileIndex,
        isLoading,
        isUploading
    } = useChat();

    return (
        <>
            <div className="flex h-screen w-full mx-auto border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
                <SidePanel
                    uploadedFiles={uploadedFiles}
                    onFileUpload={handleFileUpload}
                    activeFileIndex={activeFileIndex}
                    setActiveFileIndex={setActiveFileIndex}
                    isUploading={isUploading}
                />

                <div className="flex flex-col w-4/5 justify-center items-center">
                    {activeFile ? (
                        <div className="flex flex-col w-full h-full">
                            <div className="px-4 py-2 border-b text-sm text-gray-600">
                                Chatting with: <strong>{activeFile}</strong>
                            </div>
                            <MessageBox messages={messages} messagesEndRef={messagesEndRef} />
                            {loading && <LoadingBox />}
                            <InputField
                                handleSend={handleSend}
                                input={input}
                                setInput={setInput}
                                loading={loading}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 px-4">
                            <p className="text-xl font-semibold mb-2">Welcome to AskPdf</p>
                            <p className="mb-4">Upload a PDF file to begin chatting with it.</p>
                            <p className="text-sm text-gray-500">Use the left panel to upload and switch between files.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}
export default ChatPage;