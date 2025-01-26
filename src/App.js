import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter basename="/ThoughtTracker-react">
      <Home />;
    </BrowserRouter>
  );
};

export default App;
