'use client'

import React from 'react'
import { FiUploadCloud, FiFileText, FiX } from 'react-icons/fi'
import { VscLoading } from "react-icons/vsc";

interface SidePanelProps {
    uploadedFiles: string[]
    onFileUpload: (file: File) => void
    activeFileIndex: number | null
    setActiveFileIndex: (index: number | null) => void
    isUploading: boolean
    onClose?: () => void
}

const SidePanel: React.FC<SidePanelProps> = ({
    uploadedFiles,
    onFileUpload,
    activeFileIndex,
    setActiveFileIndex,
    isUploading,
    onClose
}) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onFileUpload(file)
        }
    }

    const handleFileSelect = (index: number) => {
        setActiveFileIndex(index);
        // Close sidebar on mobile after file selection
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="w-full border-r border-gray-300 bg-gray-50 h-full p-4 flex flex-col relative">
            {/* Mobile Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors"
                >
                    <FiX size={20} />
                </button>
            )}
            
            <div className="mb-6 text-2xl font-bold text-blue-600 text-center mt-8 lg:mt-0">
                Ask<span className="text-gray-800">Pdf</span>
            </div>
            <div className="mb-4">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <>
                            <VscLoading className="animate-spin w-5 h-5" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <FiUploadCloud className="w-5 h-5" />
                            Upload File
                        </>
                    )}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {uploadedFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-600 flex-grow">
                    <FiFileText className="w-12 h-12 mb-2 text-gray-400" />
                    <p className="font-medium">No files uploaded</p>
                    <p className="text-sm">Upload a file to start chatting</p>
                </div>
            ) : (
                <ul className="flex flex-col space-y-2 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                        <li
                            key={index}
                            onClick={() => handleFileSelect(index)}
                            className={`cursor-pointer flex items-center gap-2 p-2 rounded border transition-colors
                            ${activeFileIndex === index ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <FiFileText />
                            <span className="truncate">{file}</span>
                        </li>
                    ))}
                    <button
                        onClick={() => {
                            setActiveFileIndex(null);
                            if (onClose) onClose();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border text-gray-500 rounded hover:text-gray-700 transition-colors"
                    >
                        Home
                    </button>
                </ul>
            )}
        </div>
    )
}

export default SidePanel
