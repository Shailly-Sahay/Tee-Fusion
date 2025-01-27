import Canvas from "./canvas";
import { Home, Customizer } from "./pages";

function App() {
  return (
    <main className="app-transition-all ease-in">
      <h1 className="head-text">ThreeJs</h1>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}

export default App;
