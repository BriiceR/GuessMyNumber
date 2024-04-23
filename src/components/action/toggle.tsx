import { useState } from "react";

interface ToggleProps {
    onDifficultyChange: (difficulty: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ onDifficultyChange }) => {
    const [difficulty, setDifficulty] = useState("easyResults");

    const handleDifficultyChange = (newDifficulty: string) => {
        setDifficulty(newDifficulty);
        onDifficultyChange(newDifficulty);
    };

    const getLeftPosition = () => {
        switch (difficulty) {
            case "easyResults":
                return "0%";
            case "mediumResults":
                return "33.33%";
            case "hardResults":
                return "66.66%";
            default:
                return "0%";
        }
    };

    return (
        <div className="flex justify-center relative bg-gray-200/50 rounded-full text-black border border-gray-100">
            <p
                onClick={() => handleDifficultyChange("easyResults")}
                className={`z-10 px-4 py-1 cursor-pointer w-16 text-center`}
            >
                100
            </p>
            <p
                onClick={() => handleDifficultyChange("mediumResults")}
                className={`z-10 px-4 py-1 cursor-pointer w-16 text-center`}
            >
                10K
            </p>
            <p
                onClick={() => handleDifficultyChange("hardResults")}
                className={`z-10 px-4 py-1 cursor-pointer w-16 text-center`}
            >
                1M
            </p>
            <div
                style={{ left: getLeftPosition() }}
                className={`bg-indigo-500/80 rounded-full w-16 h-8 absolute z-0 transition-all duration-200`}
            ></div>
        </div>
    );
};

export default Toggle;
