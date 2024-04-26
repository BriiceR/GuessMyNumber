import React, { ReactNode } from 'react';

interface ScrollableBackgroundProps {
    children: ReactNode;
}

const BackgroundGradientAnimation: React.FC<ScrollableBackgroundProps> = ({ children }) => {
    return (
        <div
            className="w-screen h-full fixed top-0 left-0 overflow-y-scroll pb-8"
            style={{
                backgroundImage: 'linear-gradient(to right, #805ad5, #805ad5, #ff7b87)',
                position: 'relative',
            }}
        >
            {/* <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300 blur-3xl animate-move-sphere"
                style={{
                    width: '200px',
                    height: '200px',
                    animation: 'move-sphere 20s ease-in-out infinite',
                }}
            ></div> */}
            {children}
        </div>
    );
};


export default BackgroundGradientAnimation;
