import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import "./App.css";
import "./Styles/loader.css";
import "./Styles/background.css";
import Background from "./Components/Background";
import Quiz from "./Page/Quiz";
import Result from "./Page/Result";
import Error from "./Page/Error";
import Welcome from "./Page/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:userName/:questionNo" element={<Quiz />} />
        <Route path="/quiz/:userName" element={<Welcome />} />
        <Route path="/result/:userName" element={<Result />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
