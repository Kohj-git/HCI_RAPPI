import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import dynamiteMusic from './assets/dynamite.mp3';
import Test from './pages/Test';

function Main() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    musicAudioRef.current = new Audio(dynamiteMusic);
    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
      }
    };
  }, []);

  const handlePlayMusic = () => {
    if (!musicAudioRef.current) return;

    if (musicAudioRef.current.paused) {
      musicAudioRef.current.play();
    } else {
      musicAudioRef.current.pause();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  return (
    <div className="container">
      <h1>오디오 녹음 및 재생</h1>
      
      <div className="buttons">
        <button
          className="btn"
          onClick={handlePlayMusic}
        >
          <span className="icon">🎵</span>
          BTS Dynamite 재생
        </button>

        <button
          className="btn"
          onClick={isRecording ? stopRecording : startRecording}
        >
          <span className="icon">🎤</span>
          {isRecording ? '녹음 완료' : '녹음하기'}
        </button>

        {recordedAudio && (
          <button
            className="btn"
            onClick={playRecording}
          >
            <span className="icon">▶️</span>
            녹음 재생하기
          </button>
        )}
      </div>

      <div className="status">
        {isRecording && <p className="recording-status">녹음 중...</p>}
      </div>

      <button
        className="btn next-button"
        onClick={() => navigate('/test')}
      >
        <span className="icon">➡️</span>
        다음으로 넘어가기
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
