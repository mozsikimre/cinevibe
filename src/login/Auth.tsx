// Auth.tsx
import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { firebaseService } from '../api/Firebase';
import Toast from '../components/ErrorToast'; // Import the Toast component
import './AuthForm.css';
import '../components/ErrorToast.css';

const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Function to show toast message
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Handle form submission: login or registration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, isLogin: boolean) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await firebaseService.loginUser(email, password);
        showToast('Login successful!');
        window.location.href = '/';
      } catch (error: any) {
        showToast(error.message);
      }
    } else {
      try {
        await firebaseService.registerUser(email, password, username);
        showToast('Registration successful!');
      } catch (error: any) {
        showToast(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebaseService.googleLogin();
      showToast('Google login successful!');
      window.location.href = '/';
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await firebaseService.resetPassword(email);
      showToast('Password reset email sent!');
    } catch (error: any) {
      showToast(error.message);
    }
  };

  return (
    <div>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLogin}
        handleResetPassword={handleResetPassword}
      />

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}

    </div>
  );
};

export default Auth;
