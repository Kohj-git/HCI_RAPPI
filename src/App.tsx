// src/App.tsx
import { useState, useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import './App.css';
import dynamiteMusic from './assets/dynamite.mp3';
import Test from './pages/Test';
import Login from './pages/Login';

function Main() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    musicAudioRef.current = new Audio(dynamiteMusic);
    return () => musicAudioRef.current?.pause();
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
        {/* 1) 기본 루트로 들어오면 로그인 페이지를 보여주고 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2) /login 에서 Login 컴포넌트 */}
        <Route path="/login" element={<Login />} />

        {/* 3) 오디오 녹음/재생 화면 (여태껏 Main이 담당) */}
        <Route path="/main" element={<Main />} />

        {/* 4) 로그인 완료나 Main의 “다음으로” 버튼에서 이동할 Test 페이지 */}
        <Route path="/test" element={<Test />} />

        {/* 그 외 모든 경로는 /login 으로 보내기 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
