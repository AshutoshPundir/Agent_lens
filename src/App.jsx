import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import CinematicLoader from "./components/ui/CinematicLoader";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <CinematicLoader onComplete={() => setLoaded(true)} />}
      <AppRoutes />
    </>
  );
}

export default App;
