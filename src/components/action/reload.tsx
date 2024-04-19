import reloadIcon from "../../assets/Reload.svg";

interface ReloadProps {
    onReset: () => void;
    setResetGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reload: React.FC<ReloadProps> = ({ onReset, setResetGuess }) => {
    const handleReset = () => {
        onReset();
        setResetGuess(prevResetGuess => !prevResetGuess); // Utilisez une fonction callback pour garantir que vous obtenez la valeur la plus récente de resetGuess
    };

    return (
        <div className="flex justify-center items-center p-2 bg-indigo-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 cursor-pointer mt-4">
            <img src={reloadIcon} onClick={handleReset} alt="reload" className="w-6 h-6" />
        </div>
    )
}

export default Reload;
