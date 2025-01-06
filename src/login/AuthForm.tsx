// AuthForm.tsx
import React, { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, isLogin: boolean) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  handleResetPassword: (email: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  handleSubmit,
  handleGoogleLogin,
  handleResetPassword,
}) => {
  // Középső kártya pozíciójának követése
  const [middleCardPosition, setMiddleCardPosition] = useState<'middle' | 'left' | 'right'>('middle');
  const [middleCardAfterPosition, setMiddleCardAfterPosition] = useState<'leftTilt' | 'rightTilt' | ' '>();
  
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // Elfelejtett jelszó e-mail állapot

  // Elfelejtett jelszó gomb kezelése
  const handleForgotPasswordClick = () => {
    setMiddleCardPosition('left');
    setMiddleCardAfterPosition(' ');
  };

  // Visszatérés a középső kártyára bal gombbal
  const handleLeftCardButtonClick = () => {
    setMiddleCardPosition('middle');
    setMiddleCardAfterPosition('leftTilt');
  };

  // Visszatérés a középső kártyára jobb gombbal
  const handleRightCardButtonClick = () => {
    setMiddleCardPosition('middle');
    setMiddleCardAfterPosition('rightTilt');
  };

  // Regisztrációs kártyára váltás
  const handleRegisterButtonClick = () => {
    setMiddleCardPosition('right');
    setMiddleCardAfterPosition(' ');
  };

  // Jelszó visszaállítás űrlap kezelése
  const handlePasswordResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleResetPassword(forgotPasswordEmail);
  };

  return (
    <div className='card-container'>
      {/* Bal kártya - Elfelejtett jelszó */}
      <div className={`left-card ${middleCardPosition === 'left' ? 'left-to-middle' : ''}`}>
        <h1>Forgot Password</h1>
        <form onSubmit={handlePasswordResetSubmit}>
          <img src="src/assets/user.png" alt="user" />
          <input
            type="email"
            placeholder="Email Address"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            required
          />
          <button type="submit">Send Email</button>
        </form>
        <button className='forgot-password-btn' onClick={handleLeftCardButtonClick}>
          Return
        </button>
      </div>

      {/* Középső kártya - Bejelentkezés */}
      <div className={`middle-card 
                        ${middleCardPosition === 'left' ? 'middle-to-left' : ''} 
                        ${middleCardPosition === 'right' ? 'middle-to-right' : ''}
                        ${middleCardAfterPosition === 'leftTilt' ? 'leftTilt' : ''}
                        ${middleCardAfterPosition === 'rightTilt' ? 'rightTilt' : ''}`
                      }>
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e, true)}> {/* Login küldés */}
          <img src="src/assets/user.png" alt="user" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <img src="src/assets/lock.png" alt="user" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p onClick={handleForgotPasswordClick}>Forgot Password?</p>
          <button type="submit">Sign In</button>
        </form>
        <span className='dotted-line'/>
        <button onClick={handleGoogleLogin} className='google-login'>Sign In with Google</button>
        <p onClick={handleRegisterButtonClick} className='sign-up-text'>
          Don't have an account? Sign up
        </p>
      </div>

      {/* Jobb kártya - Regisztráció */}
      <div className={`right-card ${middleCardPosition === 'right' ? 'right-to-middle' : ''}`}>
        <h1>Sign Up</h1>
        <form onSubmit={(e) => handleSubmit(e, false)}> {/* Regisztráció küldés */}
          <img src="src/assets/id-card.png" alt="user" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <img src="src/assets/user.png" alt="user" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <img src="src/assets/lock.png" alt="user" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <button className='register-btn' onClick={handleRightCardButtonClick}>
          Return
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
