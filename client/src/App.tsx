import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // --- VALIDATION FUNCTIONS (English) ---
  const validateUsername = (value: string) => {
    if (!value) return "Username cannot be empty.";
    if (value.length < 3) return "Username must be at least 3 characters.";
    if (value.length > 20) return "Username must be at most 20 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Only letters, numbers, and underscores allowed.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password cannot be empty.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/(?=.*[a-z])/.test(value)) return "Must contain at least 1 lowercase letter.";
    if (!/(?=.*[A-Z])/.test(value)) return "Must contain at least 1 uppercase letter.";
    if (!/(?=.*[0-9])/.test(value)) return "Must contain at least 1 number.";
    if (!/(?=.*[!@#$%^&*])/.test(value)) return "Must contain at least 1 symbol (!@#$%^&*).";
    return "";
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (!isLoginMode) setUsernameError(validateUsername(val));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (!isLoginMode) setPasswordError(validatePassword(val));
  };

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsernameError('');
    setPasswordError('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginMode) {
      const uErr = validateUsername(username);
      const pErr = validatePassword(password);
      setUsernameError(uErr);
      setPasswordError(pErr);
      if (uErr || pErr) return;
    }

    const endpoint = isLoginMode ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';

    try {
      const response = await axios.post(endpoint, { username, password });
      
      if (isLoginMode) {
        setIsLoggedIn(true);
        setActiveUser(response.data.user || username); 
      } else {
        alert("SUCCESS: Registration successful! Please log in.");
        setIsLoginMode(true);
        setPassword('');
      }
    } catch (error: any) {
      alert("FAILED: " + (error.response?.data?.message || "Backend server error!"));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveUser('');
    setUsername('');
    setPassword('');
  };

  // ==========================================
  // VIEW 1: MAIN PAGE (LITERACY DASHBOARD)
  // ==========================================
  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f4f7f6', color: '#333', fontFamily: 'Arial, sans-serif' }}>
        {/* Navbar */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#646cff', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: 0 }}>📚 LiteracyQuest</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Hello, {activeUser}!</span>
            <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#2c3e50' }}>test font</h1>
            <p style={{ color: '#7f8c8d', fontSize: '18px' }}>"Choose a learning module below to improve your literacy skills" template.</p>
          </div>

          {/* Module Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            
            {/* Card 1 */}
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📖</div>
              <h3 style={{ color: '#646cff', marginBottom: '10px' }}>Basic Reading</h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px', lineHeight: '1.5' }}>learn how to form a simple sentence inn a correct way (includes letters, syllables)</p>
              <button style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#e0e7ff', color: '#646cff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Start Learning</button>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎭</div>
              <h3 style={{ color: '#646cff', marginBottom: '10px' }}>Interactive Folktales</h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px', lineHeight: '1.5' }}>intuition: reading traditional tales accompanied by pictures n sound (engaging)</p>
              <button style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#e0e7ff', color: '#646cff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Open Story</button>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>✍️</div>
              <h3 style={{ color: '#646cff', marginBottom: '10px' }}>Comprehension Quiz</h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px', lineHeight: '1.5' }}>can include quizzes on reading stories to measure how much u understand abt it, could be about grammar, vocab, pronounciation, spelling or anything else etc, still brainstorming</p>
              <button style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#e0e7ff', color: '#646cff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Take Quiz</button>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGIN / REGISTER PAGE
  // ==========================================
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: '#121212', color: 'white', fontFamily: 'Arial' }}>
      <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', width: '320px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '25px', color: '#646cff' }}>{isLoginMode ? 'Login System' : 'Register Account'}</h2>
        
        {/* USERNAME INPUT */}
        <div style={{ textAlign: 'left', marginBottom: usernameError && !isLoginMode ? '5px' : '15px' }}>
          <input 
            type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '8px', border: `1px solid ${usernameError && !isLoginMode ? '#ff4d4d' : '#333'}`, backgroundColor: '#2a2a2a', color: 'white', outline: 'none' }}
          />
        </div>
        {!isLoginMode && usernameError && <div style={{ color: '#ff4d4d', fontSize: '12px', textAlign: 'left', marginBottom: '15px' }}>{usernameError}</div>}

        {/* PASSWORD INPUT */}
        <div style={{ textAlign: 'left', marginBottom: passwordError && !isLoginMode ? '5px' : '25px' }}>
          <input 
            type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '8px', border: `1px solid ${passwordError && !isLoginMode ? '#ff4d4d' : '#333'}`, backgroundColor: '#2a2a2a', color: 'white', outline: 'none' }}
          />
        </div>
        {!isLoginMode && passwordError && <div style={{ color: '#ff4d4d', fontSize: '12px', textAlign: 'left', marginBottom: '25px' }}>{passwordError}</div>}

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
          {isLoginMode ? 'GASPOL MASUK LAYAR' : 'izin buat akun bang'}
        </button>

        <p style={{ fontSize: '14px', color: '#aaaaaa', margin: 0 }}>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span onClick={handleToggleMode} style={{ color: '#646cff', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLoginMode ? 'Sign up here' : 'Login here'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default App;
