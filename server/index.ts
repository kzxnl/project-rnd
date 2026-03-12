import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Konfigurasi Database (Ganti sesuai pgAdmin kamu)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'login_db', // Pastikan nama DB sesuai
  password: 'postgres',      // Pastikan password sesuai
  port: 5432,
});

// TEST KONEKSI
pool.connect((err) => {
  if (err) console.error('Gagal konek database:', err.stack);
  else console.log('Database terhubung dengan sukses!');
});

// --- FITUR REGISTER ---
// URL diubah menjadi /api/register agar cocok dengan Frontend React
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body; // Email dihapus

    // 1. Cek apakah username sudah dipakai
    const userExist = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Username sudah ada!" });
    }

    // 2. Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke database (Hanya username dan password yang di-hash)
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "Registrasi Berhasil! Silakan Login." });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Error Server" });
  }
});

// --- FITUR LOGIN (Sudah pakai Bcrypt) ---
// URL diubah menjadi /api/login agar cocok dengan Frontend React
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. Cari user berdasarkan username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    // 2. Jika user tidak ditemukan
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User tidak ditemukan!" });
    }

    // 3. Bandingkan password input dengan password hash di database
    const validPassword = await bcrypt.compare(password, result.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password salah!" });
    }

    res.json({ message: "Login Berhasil!", user: result.rows[0].username });
  } catch (err: any) {
    res.status(500).json({ message: "Error Server" });
  }
});

app.listen(5000, () => {
  console.log("Server login siap di port 5000");
});
