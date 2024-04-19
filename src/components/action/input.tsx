import { useState, useEffect } from "react";

interface InputProps {
    onGuessChange: (guess: string) => void;
    onGuess: () => void;
    resetGuess: boolean;
}

const Input: React.FC<InputProps> = ({ onGuessChange, onGuess, resetGuess }) => {
    const [guess, setGuess] = useState("");

    useEffect(() => {
        if (resetGuess) {
            setGuess("");
        }
    }, [resetGuess]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
        onGuessChange(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onGuess();
        }
    };


    return (
        <div className="flex justify-center items-center mt-4">
            <div className="relative w-full min-w-[100px] h-10">
                <input
                    value={guess}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="peer w-full h-full bg-gray-200/50 text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-200 focus:border-indigo-500"
                    placeholder=" "
                />
                <label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-black/40 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500"
                >
                    Nombre
                </label>
            </div>
        </div>
    );
};

export default Input;
