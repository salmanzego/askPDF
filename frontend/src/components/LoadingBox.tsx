const LoadingBox = () =>{
    return(
        <div className="px-2 sm:px-3 py-2 sm:py-3 bg-gray-50 border-t text-center">
            <div className="inline-flex items-center space-x-2 text-sm sm:text-base text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Loading...</span>
            </div>
        </div>
    )
}
export default LoadingBox;