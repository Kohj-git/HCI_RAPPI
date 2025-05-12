import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import ChooseLevel from "./pages/ChooseLevel";
import ChooseSong from "./pages/ChooseSong";
import Result from "./pages/Result";
import LearnSentence from "./pages/LearnSentence";
import LearnWord from './pages/LearnWord'
import ReadyToLearnSentence from './pages/ReadyToLearnSentence'
import ReadyToLearnWord from './pages/ReadyToLearnWord'
import ReadyToRap from './pages/ReadyToRap'
import StartRap from './pages/StartRap'
import Login from './pages/Login'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/choose-level" element={<ChooseLevel />} />
          <Route path="/choose-song" element={<ChooseSong />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learn-sentence" element={<LearnSentence />} />
          <Route path="/learn-word" element={<LearnWord />} />
          <Route path="/readytolearn-sentence" element={<ReadyToLearnSentence />} />
          <Route path="/readytolearn-word" element={<ReadyToLearnWord />} />
          <Route path="/readyto-rap" element={<ReadyToRap />} />
          <Route path="/start-rap" element={<StartRap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
