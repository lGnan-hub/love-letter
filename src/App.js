import LoveLetter from './components/LoveLetter/LoveLetter';
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App">
      <LoveLetter />
      <SpeedInsights/>
    </div>
  );
}

export default App;
