let mediaRecorder;
let audioChunks = [];
let isRecording = false;

const playMusicBtn = document.getElementById('playMusic');
const recordButton = document.getElementById('recordButton');
const playRecordingBtn = document.getElementById('playRecording');
const recordingStatus = document.getElementById('recordingStatus');

const musicAudio = new Audio('dynamite.mp3');

// BTS Dynamite 재생 버튼
playMusicBtn.addEventListener('click', () => {
    if (musicAudio.paused) {
        musicAudio.play();
        playMusicBtn.innerHTML = '<span class="icon">⏸️</span> 일시정지';
    } else {
        musicAudio.pause();
        playMusicBtn.innerHTML = '<span class="icon">🎵</span> BTS Dynamite 재생';
    }
});

// 녹음 버튼
recordButton.addEventListener('click', async () => {
    if (!isRecording) {
        // 녹음 시작
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            playRecordingBtn.onclick = () => {
                const audio = new Audio(audioUrl);
                audio.play();
            };
            playRecordingBtn.disabled = false;
            recordingStatus.textContent = '녹음이 완료되었습니다.';
        };

        mediaRecorder.start();
        isRecording = true;
        recordButton.innerHTML = '<span class="icon">⏹️</span> 녹음 정지';
        recordingStatus.textContent = '녹음 중...';
    } else {
        // 녹음 정지
        mediaRecorder.stop();
        isRecording = false;
        recordButton.innerHTML = '<span class="icon">🎤</span> 녹음 시작';
    }
});
