/*
import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';

const app = express();
const PORT = 5000;

// Middleware agar server bisa baca data JSON
app.use(cors());
app.use(express.json());

// Tes rute sederhana
app.get('/', (req: Request, res: Response) => {
  res.send("Server Login Berjalan!");
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});
*/

import express, { Request, Response } from 'express';
import cors from 'cors'; // Pastikan ini ada
import pool from './db';

const app = express();

// IZINKAN KONEKSI DARI LUAR (CORS)
app.use(cors()); 
app.use(express.json());

// Rute tes untuk browser
app.get('/', (req: Request, res: Response) => {
  res.send("Server Login Berjalan!");
});

// ROUTE LOGIN UTAMA
app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (user.rows.length > 0) {
      res.json({ message: "Login Berhasil!", user: user.rows[0].username });
    } else {
      res.status(401).json({ message: "Username atau Password salah!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan pada database" });
  }
});

app.listen(5000, () => console.log("Server login siap di port 5000"));