// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import './App.css';
import dynamiteMusic from './assets/dynamite.mp3';

// 페이지 컴포넌트들
import Test from './pages/Test';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import ChooseLevel from './pages/ChooseLevel';
import ChooseSong from './pages/ChooseSong';
import Result from './pages/Result';
import LearnSentence from './pages/LearnSentence';
import LearnWord from './pages/LearnWord';
import ReadyToLearnSentence from './pages/ReadyToLearnSentence';
import ReadyToLearnWord from './pages/ReadyToLearnWord';
import ReadyToRap from './pages/ReadyToRap';
import StartRap from './pages/StartRap';

// 녹음 + 재생 기능을 담당할 Main 컴포넌트
function Main() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const musicAudioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    musicAudioRef.current = new Audio(dynamiteMusic);
    return () => musicAudioRef.current.pause();
  }, []);

  const handlePlayMusic = () => {
    if (!musicAudioRef.current) return;
    musicAudioRef.current.paused
      ? musicAudioRef.current.play()
      : musicAudioRef.current.pause();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = e => audioChunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(URL.createObjectURL(blob));
      };

      mr.start();
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const playRecording = () => {
    if (recordedAudio) new Audio(recordedAudio).play();
  };

  return (
    <div className="container">
      <h1>오디오 녹음 및 재생</h1>
      <div className="buttons">
        <button className="btn" onClick={handlePlayMusic}>
          🎵 BTS Dynamite 재생
        </button>
        <button className="btn" onClick={isRecording ? stopRecording : startRecording}>
          🎤 {isRecording ? '녹음 완료' : '녹음하기'}
        </button>
        {recordedAudio && (
          <button className="btn" onClick={playRecording}>
            ▶️ 녹음 재생하기
          </button>
        )}
      </div>
      {isRecording && <p className="recording-status">녹음 중...</p>}

      <button className="btn next-button" onClick={() => navigate('/test')}>
        ➡️ 다음으로 넘어가기
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 강제 이동 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 개별 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Test />} />

        {/* App.jsx에 있던 라우트들 */}
        <Route path="/choose-level" element={<ChooseLevel />} />
        <Route path="/choose-song" element={<ChooseSong />} />
        <Route path="/result" element={<Result />} />
        <Route path="/learn-sentence" element={<LearnSentence />} />
        <Route path="/learn-word" element={<LearnWord />} />
        <Route path="/readytolearn-sentence" element={<ReadyToLearnSentence />} />
        <Route path="/readytolearn-word" element={<ReadyToLearnWord />} />
        <Route path="/readyto-rap" element={<ReadyToRap />} />
        <Route path="/start-rap" element={<StartRap />} />

        {/* 그 외는 /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
