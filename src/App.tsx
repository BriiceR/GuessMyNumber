import { useState, useEffect } from "react";
import BackgroundGradientAnimation from "./components/ui/background-gradient-animation";
import Toggle from "./components/action/toggle";
import Input from "./components/action/input";
import Reload from "./components/action/reload";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [resetGuess, setResetGuess] = useState(false);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setTargetNumber(generateTargetNumber(newDifficulty));
    setGuess("");
    setMessage("");
    setResetGuess(true);
  };

  useEffect(() => {
    setGuess("");  // Réinitialise l'input lorsque la difficulté change
  }, [difficulty]);

  useEffect(() => {
    if (resetGuess) {
      setGuess("");
      setMessage("");
      setResetGuess(false); // Réinitialisez resetGuess à false après avoir effectué le reset
    }
  }, [resetGuess]);

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

  const handleGuess = () => {
    let message = "";

    if (parseInt(guess) === targetNumber) {
      message = "Félicitations ! Vous avez trouvé le bon nombre !";
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
  };

  const handleReset = () => {
    setGuess("");
    setMessage("");
    setResetGuess(false); // Réinitialisez resetGuess à false pour arrêter la réinitialisation de l'input
  };


  return (
    <div className="App">
      <BackgroundGradientAnimation>
        <h1 className="text-4xl font-bold text-center text-white mt-10">Guess My Number</h1>
        <div className="flex justify-center items-center mt-10 ">
          <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 p-10 text-white h-72">
            <Toggle onDifficultyChange={handleDifficultyChange} />
            <p className="text-1xl font-bold text-center mt-4">Trouve mon nombre !</p>
            <Input
              onGuessChange={setGuess}
              onGuess={handleGuess}
              resetGuess={resetGuess}
            />

            <Reload onReset={handleReset} setResetGuess={setResetGuess} />
            <p className="text-1xl text-center mt-4 text-black">{message}</p>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}

export default App;
