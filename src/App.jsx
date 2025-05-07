import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import ChooseLevel from "./pages/ChooseLevel";
import ChooseSong from "./pages/ChooseSong";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/choose-level" element={<ChooseLevel />} />
          <Route path="/choose-song" element={<ChooseSong />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
