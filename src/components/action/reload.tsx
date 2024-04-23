import { useEffect } from "react";
import reloadIcon from "../../assets/Reload.svg";

interface ReloadProps {
    onReset: () => void;
    resetGuess: boolean;
}

const Reload: React.FC<ReloadProps> = ({ onReset, resetGuess }) => {
    const handleReset = () => {
        onReset();
    };

    useEffect(() => {
        if (resetGuess) {
            handleReset();
        }
    }, [resetGuess]);

    return (
        <div onClick={handleReset} className="flex justify-center items-center p-2 bg-indigo-500/80 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 cursor-pointer mt-4">
            <img src={reloadIcon} alt="reload" className="w-6 h-6" />
        </div>
    );
};

export default Reload;
