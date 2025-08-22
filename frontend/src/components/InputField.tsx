import { IoSend } from 'react-icons/io5';
import { FiPaperclip } from 'react-icons/fi'

interface Params {
    handleSend: Function,
    input: string | number | readonly string[] | undefined
    setInput: Function,
    loading: boolean | undefined
}

const InputField = ({ handleSend, input, setInput, loading }: Params) => {

    return (
        <div className="p-2 sm:p-4 border-t border-gray-300">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                }}
                className="flex space-x-2 sm:space-x-3 items-center"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={loading}
                    className="flex-grow px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-green-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Send message"
                    disabled={loading}
                >
                    <IoSend className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </form>
        </div>
    )
}

export default InputField;