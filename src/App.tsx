import { Navigation } from "./components/navigation/Navigation";
import "./styles.css";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navigation setActiveTab={() => {}} addNewTab={() => {}} tabs={[]} />
    </div>
  );
}

export default App;
