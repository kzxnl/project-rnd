import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mengirim data login ke Server Backend (Port 5000)
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      
      alert("SUKSES: " + response.data.message);
    } catch (error: any) {
      alert("GAGAL: " + (error.response?.data?.message || "Server belum dinyalakan!"));
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', backgroundColor: '#121212', color: 'white', fontFamily: 'Arial' 
    }}>
      <form onSubmit={handleLogin} style={{ 
        padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', width: '320px', textAlign: 'center' 
      }}>
        <h2 style={{ marginBottom: '25px', color: '#646cff' }}>Login System</h2>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ 
            width: '100%', padding: '12px', marginBottom: '15px', 
            borderRadius: '8px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' 
          }}
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            width: '100%', padding: '12px', marginBottom: '25px', 
            borderRadius: '8px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' 
          }}
        />

        <button type="submit" style={{ 
          width: '100%', padding: '12px', backgroundColor: '#646cff', 
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
        }}>
          SIGN IN
        </button>
      </form>
    </div>
  );
}

export default App;

/*
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Menghubungkan ke Backend di port 5000
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      
      alert("HASIL: " + response.data.message);
    } catch (error: any) {
      alert("GAGAL: " + (error.response?.data?.message || "Koneksi ke server gagal!"));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a', color: 'white' }}>
      <form onSubmit={handleLogin} style={{ padding: '3rem', backgroundColor: '#242424', borderRadius: '12px', textAlign: 'center', width: '300px' }}>
        <h2 style={{ color: '#646cff' }}>Login PERN</h2>
        <input 
          type="text" 
          placeholder="Username (admin)" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px', width: '100%', marginBottom: '10px', borderRadius: '6px' }}
        />
        <input 
          type="password" 
          placeholder="Password (12345)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', width: '100%', marginBottom: '20px', borderRadius: '6px' }}
        />
        <button type="submit" style={{ padding: '12px', width: '100%', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          SIGN IN
        </button>
      </form>
    </div>
  );
}

export default App;
*/