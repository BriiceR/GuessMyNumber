import { useState, useEffect } from "react";
import SphereAnimation from "./components/ui/background-gradient-animation";
import Toggle from "./components/action/toggle";
import Input from "./components/action/input";
import Reload from "./components/action/reload";
import Results, { Result } from "./components/action/results";
import Modal from "./components/action/modal";
import { getScores } from "./services/firestoreService";


function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [resetGuess, setResetGuess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setTargetNumber(generateTargetNumber(newDifficulty));
    setGuess("");
    setMessage("");
    setResetGuess(true);
    setAttempts(0);
  };

  useEffect(() => {
    setTargetNumber(generateTargetNumber(difficulty));
  }, [resetGuess]);

  useEffect(() => {
    if (!isModalOpen) {
      setTargetNumber(generateTargetNumber(difficulty));
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (resetGuess) {
      setGuess("");
      setMessage("");
      setResetGuess(false);
      setAttempts(0);
    }
  }, [difficulty, resetGuess]);

  const generateTargetNumber = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return Math.floor(Math.random() * 100) + 1;
      case "medium":
        return Math.floor(Math.random() * 10000) + 1;
      case "hard":
        return Math.floor(Math.random() * 1000000) + 1;
      default:
        return 0;
    }
  };

  const [targetNumber, setTargetNumber] = useState(generateTargetNumber(difficulty));
  const [lastMessage, setLastMessage] = useState("");
  console.log(targetNumber);
  const handleGuess = () => {
    let message = "";

    if (parseInt(guess) === targetNumber) {
      message = "Félicitations !";
      openModal();
    } else if (parseInt(guess) < targetNumber) {
      message = "C'est plus !";
    } else {
      message = "C'est moins !";
    }

    if (message === lastMessage) {
      setTimeout(() => {
        setMessage("");
        setTimeout(() => {
          setMessage(message);
          setLastMessage(message);
        }, 200);
      }, 200);
    } else {
      setMessage(message);
      setLastMessage(message);
    }

    setGuess("");
    setAttempts(prevAttempts => prevAttempts + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAttempts(0);
    setGuess("");
    setMessage("");
    setResetGuess(true);
  };

  // Dans votre composant App

  const [easyResults, setEasyResults] = useState<Result[]>([]);
  const [mediumResults, setMediumResults] = useState<Result[]>([]);
  const [hardResults, setHardResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const easyScores = await getScores('easy') as Result[];
        const mediumScores = await getScores('medium') as Result[];
        const hardScores = await getScores('hard') as Result[];

        setEasyResults(easyScores);
        setMediumResults(mediumScores);
        setHardResults(hardScores);

      } catch (error) {
        console.error("Erreur lors de la récupération des scores :", error);
      }
    };
    fetchScores();
  }, []);



  return (
    <div className="">
      <SphereAnimation>
        <h1 className="text-4xl font-bold text-center text-white pt-8">Guess My Number</h1>
        <div className="flex justify-center items-center mt-8 ">
          <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 p-10 text-white h-72">
            <Toggle onDifficultyChange={handleDifficultyChange} />
            <p className="text-1xl font-bold text-center mt-4">Trouve mon nombre !</p>
            <Input
              onGuessChange={setGuess}
              onGuess={handleGuess}
              resetGuess={resetGuess}
            />
            <Reload onReset={() => setResetGuess(true)} resetGuess={resetGuess} />
            <p className="text-1xl text-center mt-4 text-black">{message}</p>
          </div>
        </div>
        <Results easyResults={easyResults} mediumResults={mediumResults} hardResults={hardResults} />
      </SphereAnimation>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          targetNumber={targetNumber}
          attempts={attempts}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;

