// src/pages/Login.tsx
import React from "react";
import { auth, googleProvider, db } from "../lib/firebase";
import { signInWithPopup }           from "firebase/auth";
import { doc, setDoc }               from "firebase/firestore";
import { useNavigate }               from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user   = result.user;

      // Firestore에 users/{uid} 문서 생성
      await setDoc(
        doc(db, "users", user.uid),
        {
          name  : user.email,   // 로그인한 이메일을 name 필드에
          level : "Beginner",   // 기본값
          carrot: 0             // 기본값
        },
        { merge: true }         // 기존 데이터는 덮어쓰지 않고 필드만 추가/갱신
      );

      console.log("프로필 생성/업데이트 완료:", user.uid);
      navigate("/test");
    } catch (error: any) {
      alert("로그인 에러: " + error.message);
    }
  };

  return (
    <div>
      <h2>Firebase Google 로그인</h2>
      <button onClick={handleGoogleLogin}>
        구글 계정으로 로그인
      </button>
    </div>
  );
}
