import { DroneProvider } from "./contexts/DroneProvider";
import MainPage from "./pages/main/Mainpage.js";

function App() {
  return (
    <DroneProvider>
      <MainPage/>
    </DroneProvider>
  );
}

export default App;
