import BackgroundGradientAnimation from "./components/ui/background-gradient-animation";
import Toggle from "./components/action/toggle";

function App() {


  return (
    <div className="App">
      <BackgroundGradientAnimation>
        <h1 className="text-4xl font-bold text-center text-white mt-10">Guess My Number</h1>
        <div className="flex justify-center items-center mt-10 ">
          <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 flex justify-between p-8 text-white gap-8 relative">

            <Toggle />
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}

export default App;
