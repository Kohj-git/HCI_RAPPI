import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

// 로고 이미지 import
import RabbitLogo from '../assets/logo/rabbit.png';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/main');
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mb-auto mt-[30vh]">
        <img src={RabbitLogo} alt="RAPPI" className="w-[200px]" />
      </div>

      {/* 구글 로그인 버튼 */}
      <div className="mb-[120px]">
        <Button
          onClick={handleGoogleSignIn}
          className="w-[309px] h-[63px] bg-[#ffa55d] hover:bg-[#ff9a4a] rounded-[50px] text-white text-xl font-bold shadow-lg flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#ffffff"/>
        </svg>
        Sign in with Google
        </Button>
      </div>
    </div>
  );
}
