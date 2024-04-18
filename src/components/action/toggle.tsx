import { useState } from "react";

function Toggle() {
    const [difficulty, setDifficulty] = useState("easy");

    const handleDifficultyChange = (newDifficulty: string) => {
        setDifficulty(newDifficulty);
    };

    const getLeftPosition = () => {
        switch (difficulty) {
            case "easy":
                return "0%";
            case "medium":
                return "33.33%";
            case "hard":
                return "66.66%";
            default:
                return "0%";
        }
    };

    return (
        <div className="flex justify-center relative bg-gray-200/50 rounded-full text-black border border-gray-100">
            <p
                onClick={() => handleDifficultyChange("easy")}
                className={`z-10 px-4 py-1 cursor-pointer w-16 text-center`}
            >
                100
            </p>
            <p
                onClick={() => handleDifficultyChange("medium")}
                className={`z-10 px-4 py-1 cursor-pointer w-16 text-center`}
            >
                10K
            </p>
            <p
                onClick={() => handleDifficultyChange("hard")}
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
}

export default Toggle;
