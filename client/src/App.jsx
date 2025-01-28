import CanvasModel from "./canvas";
import { Home, Customizer } from "./pages";

function App() {
  return (
    <main className="h-full app-transition-all ease-in flex">
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  );
}

export default App;
