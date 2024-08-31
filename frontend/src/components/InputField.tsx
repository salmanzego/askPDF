import { IoSend } from 'react-icons/io5';

interface Params {
    handleSend: Function,
    input: string | number | readonly string[] | undefined
    setInput: Function,
    loading: boolean | undefined
}

const InputField = ({ handleSend, input, setInput, loading }: Params) => {
    return (
        <div className="p-4 border-t border-gray-300">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                }}
                className="flex space-x-2"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={loading}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-green-200"
                    aria-label="Send message"
                    disabled={loading}
                >
                    <IoSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}

export default InputField;