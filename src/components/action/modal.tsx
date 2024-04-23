import { useState } from "react";
import ConfettiAnimation from "../ui/ConfettiAnimation";
import { addScore } from "../../services/firestoreService";


interface CongratulationsModalProps {
    isModalOpen: boolean;
    targetNumber: number;
    attempts: number;
    closeModal: () => void;
    difficulty: string;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
    isModalOpen,
    targetNumber,
    attempts,
    closeModal,
    difficulty,
}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    if (!isModalOpen) {
        return null;
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        if (!/^[A-Z]{3}$/.test(event.target.value)) {
            setError("3 lettres majuscules");
        } else {
            setError("");
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            setError("Veuillez saisir un nom");
            return;
        }

        if (error) {
            return;
        }

        try {
            await addScore(difficulty, name, attempts);
            console.log("Score ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout du score :", error);
        }

        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <ConfettiAnimation isActive={isModalOpen} />
            <div className="absolute inset-0 bg-black opacity-50 "></div>
            <div className="p-2 rounded-md z-10 sm:p-4 flex flex-col items-center justify-center bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100">
                <h2 className="text-xl font-bold mb-4 sm:text-2xl">Félicitations !</h2>
                <p className="text-sm sm:text-lg">Tu as trouvé le nombre {targetNumber}</p>
                <p className="text-sm sm:text-lg">Ton score : {attempts} tentative{attempts > 1 ? "s" : ""} !</p>
                <h2 className="text-xl font-bold sm:text-2xl mt-4">NOM</h2>
                <div className="flex justify-center items-center mt-4">
                    <div className="relative w-full min-w-[100px] ">
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="peer w-full h-full bg-gray-200/50 text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-200 focus:border-indigo-500"
                            placeholder=""
                        />
                        {error ?
                            <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-black/40 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500"
                            >
                                {error}
                            </label> :
                            <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-black/40 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500"
                            >
                                Nom
                            </label>
                        }

                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-500/80 text-white rounded-md border border-gray-100">Envoyer</button>
                            <button onClick={closeModal} className="px-6 py-2 bg-red-500/80 text-white rounded-md border border-gray-100">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CongratulationsModal;
