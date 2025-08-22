'use client'

import InputField from "@/components/InputField";
import MessageBox from "@/components/MessageBox";
import LoadingBox from "@/components/LoadingBox";
import SidePanel from "@/components/SidePanel";
import { useChat } from "./chat.hooks";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const ChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <div className="flex h-screen w-full mx-auto border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg relative">
                {/* Mobile Menu Button */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>

                {/* Sidebar */}
                <div className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    fixed lg:relative
                    top-0 left-0
                    h-full w-80 lg:w-1/5
                    z-40
                    transition-transform duration-300 ease-in-out
                    lg:transition-none
                `}>
                    <SidePanel
                        uploadedFiles={uploadedFiles}
                        onFileUpload={handleFileUpload}
                        activeFileIndex={activeFileIndex}
                        setActiveFileIndex={setActiveFileIndex}
                        isUploading={isUploading}
                        onClose={closeSidebar}
                    />
                </div>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={closeSidebar}
                    />
                )}

                {/* Main Content */}
                <div className="flex flex-col w-full lg:w-4/5 justify-center items-center relative">
                    {activeFile ? (
                        <div className="flex flex-col w-full h-full">
                            <div className="px-4 py-2 border-b text-sm text-gray-600 mt-16 lg:mt-0">
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
                        <div className="text-center text-gray-600 px-4 mt-16 lg:mt-0">
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