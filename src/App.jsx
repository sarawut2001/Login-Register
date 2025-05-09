import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Panel from './components/Panel';
import './App.css';

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm toggleTheme={toggleTheme} />
          <RegisterForm toggleMode={toggleMode} />
        </div>
      </div>
      <div className="panels-container">
        <Panel
          isLeft
          title="You don't have an account?"
          description="Create your account right now to follow people and like publications"
          buttonText="Register"
          onClick={toggleMode}
        />
        <Panel
          title="Already have an account?"
          description="Login to see your notifications and post your favorite photos"
          buttonText="Sign in"
          onClick={toggleMode}
        />
      </div>
    </div>
  );
}

export default App;