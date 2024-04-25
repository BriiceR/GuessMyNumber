import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="max-w-sm animate-pulse mt-2">
            <div className="h-4 bg-gray-200 rounded-full w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-20 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-20 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-20 mb-2"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loading;
