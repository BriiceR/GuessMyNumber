import { useState, useEffect } from "react";
import SphereAnimation from "./components/ui/background-gradient-animation";
import Toggle from "./components/action/toggle";
import Input from "./components/action/input";
import Reload from "./components/action/reload";
import Results from "./components/action/results";
import testResults from "./data/testResults.json";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [resetGuess, setResetGuess] = useState(false);

  const [easyResults, setEasyResults] = useState<number[]>([]);
  const [mediumResults, setMediumResults] = useState<number[]>([]);
  const [hardResults, setHardResults] = useState<number[]>([]);


  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setTargetNumber(generateTargetNumber(newDifficulty));
    setGuess("");
    setMessage("");
    setResetGuess(true);
  };

  useEffect(() => {
    setTargetNumber(generateTargetNumber(difficulty));
  }, [resetGuess]);


  console.log(resetGuess);

  useEffect(() => {
    if (resetGuess) {
      setGuess("");
      setMessage("");
      setResetGuess(false);
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
        }, 300); // Attendez 1 seconde avant de réafficher le message
      }, 300); // Réinitialisez le message après 1 seconde
    } else {
      setMessage(message);
      setLastMessage(message);
    }

    setGuess(""); // Réinitialise la valeur de guess après avoir soumis une tentative

    switch (difficulty) {
      case "easy":
        setEasyResults([...easyResults, parseInt(guess)]);
        break;
      case "medium":
        setMediumResults([...mediumResults, parseInt(guess)]);
        break;
      case "hard":
        setHardResults([...hardResults, parseInt(guess)]);
        break;
      default:
        break;
    }
  };

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
        <Results easyResults={testResults.easyResults} mediumResults={testResults.mediumResults} hardResults={testResults.hardResults} />
      </SphereAnimation>
    </div>
  );
}

export default App;
