const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { readDb, writeDb, UPLOAD_DIR } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'psht_unesa_rbac_secret_2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Static files
app.use('/uploads', express.static(UPLOAD_DIR));
const clientDist = fs.existsSync(path.join(__dirname, '../dist'))
  ? path.join(__dirname, '../dist')
  : path.join(__dirname, '../client/dist');
const clientPublic = path.join(__dirname, '../client/public');
if (fs.existsSync(clientPublic)) {
  app.use(express.static(clientPublic));
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30MB limit for high-res JPG, HEIC, PNG, etc.
});

// Helper: Token auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token otentikasi tidak ditemukan. Harap masuk kembali.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Sesi telah kedaluwarsa atau token tidak sah.' });
    }
    req.user = decoded;
    next();
  });
};

// Helper: Admin only middleware
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak. Fitur ini khusus Pengurus Admin.' });
  }
  next();
};

// ======================== AUTH & REGISTRATION ========================

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
  }
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// Download template surat izin endpoint
app.get('/api/download/template-surat-izin', (req, res) => {
  const filePath = path.join(__dirname, '../client/public/surat-izin-latihan-psht-unesa.html');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'Template-Surat-Izin-Latihan-PSHT-UNESA.html');
  } else {
    res.status(404).json({ message: 'Template surat izin belum tersedia.' });
  }
});

// 1. Registrasi Siswa
// Form: Nama Lengkap, NIM, NIK, Nomor WA, Nama Orang Tua, Email, Password, upload Surat Izin
app.post('/api/auth/register-siswa', upload.single('signedPermission'), (req, res) => {
  try {
    const db = readDb();
    const { name, nim, nik, phone, parentName, email, password, signedPermissionBase64 } = req.body;

    if (!name || !nim || !nik || !phone || !parentName || !email || !password) {
      return res.status(400).json({
        message: 'Semua kolom wajib diisi (Nama Lengkap, NIM, NIK, No WA, Nama Orang Tua, Email, dan Password).'
      });
    }

    // Check duplicate email across all entities
    const allUsers = [...db.admins, ...db.siswa, ...db.warga];
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
      return res.status(400).json({ message: 'Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.' });
    }

    let signedPermissionUrl = '';
    if (req.file) {
      signedPermissionUrl = `/uploads/${req.file.filename}`;
    } else if (signedPermissionBase64 && signedPermissionBase64.startsWith('data:')) {
      const matches = signedPermissionBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split('/')[1] || 'jpg';
        const filename = `surat_izin_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${ext}`;
        fs.writeFileSync(path.join(UPLOAD_DIR, filename), Buffer.from(matches[2], 'base64'));
        signedPermissionUrl = `/uploads/${filename}`;
      }
    }

    if (!signedPermissionUrl) {
      return res.status(400).json({
        message: 'Pendaftar Siswa diwajibkan mengunggah Surat Izin Latihan yang sudah ditandatangani orang tua & siswa.'
      });
    }

    const newSiswa = {
      id: `sis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      nim: nim.trim(),
      nik: nik.trim(),
      phone: phone.trim(),
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      role: 'siswa',
      signedPermissionUrl,
      status: 'Pending', // Menunggu validasi admin
      createdAt: new Date().toISOString()
    };

    db.siswa.unshift(newSiswa);
    writeDb(db);

    const { passwordHash, ...safeSiswa } = newSiswa;
    const token = jwt.sign(
      { id: safeSiswa.id, email: safeSiswa.email, role: 'siswa', status: safeSiswa.status },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Pendaftaran Siswa berhasil! Akun Anda berstatus PENDING hingga divalidasi oleh Pengurus Admin.',
      token,
      user: safeSiswa
    });
  } catch (err) {
    console.error('Register siswa error:', err);
    res.status(500).json({ message: 'Gagal memproses pendaftaran siswa.', error: err.message });
  }
});

// 2. Registrasi Warga
// Form: Nama Lengkap, Asal Daerah, Asal Tempat Pengesahan, Nomor WA, Email, Password, upload Foto Bukti Warga (KTA / Foto bersakral)
app.post('/api/auth/register-warga', upload.single('evidence'), (req, res) => {
  try {
    const db = readDb();
    const { name, originRegion, sahPlace, phone, email, password, evidenceBase64 } = req.body;

    if (!name || !originRegion || !sahPlace || !phone || !email || !password) {
      return res.status(400).json({
        message: 'Semua kolom wajib diisi (Nama Lengkap, Asal Daerah, Asal Tempat Pengesahan, No WA, Email, dan Password).'
      });
    }

    // Check duplicate email
    const allUsers = [...db.admins, ...db.siswa, ...db.warga];
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
      return res.status(400).json({ message: 'Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.' });
    }

    let evidenceUrl = '';
    if (req.file) {
      evidenceUrl = `/uploads/${req.file.filename}`;
    } else if (evidenceBase64 && evidenceBase64.startsWith('data:')) {
      const matches = evidenceBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split('/')[1] || 'jpg';
        const filename = `bukti_warga_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${ext}`;
        fs.writeFileSync(path.join(UPLOAD_DIR, filename), Buffer.from(matches[2], 'base64'));
        evidenceUrl = `/uploads/${filename}`;
      }
    }

    if (!evidenceUrl) {
      return res.status(400).json({
        message: 'Pendaftar Warga diwajibkan mengunggah Foto Bukti Warga (KTA / Foto Bersakral Lengkap).'
      });
    }

    const newWarga = {
      id: `wrg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      originRegion: originRegion.trim(),
      sahPlace: sahPlace.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      role: 'warga',
      evidenceUrl,
      status: 'Pending', // Menunggu validasi admin
      createdAt: new Date().toISOString()
    };

    db.warga.unshift(newWarga);
    writeDb(db);

    const { passwordHash, ...safeWarga } = newWarga;
    const token = jwt.sign(
      { id: safeWarga.id, email: safeWarga.email, role: 'warga', status: safeWarga.status },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Pendataan Warga berhasil! Akun Anda berstatus PENDING hingga diverifikasi oleh Pengurus Admin.',
      token,
      user: safeWarga
    });
  } catch (err) {
    console.error('Register warga error:', err);
    res.status(500).json({ message: 'Gagal memproses pendaftaran warga.', error: err.message });
  }
});

// 3. Login Terpadu (Admin, Warga, Siswa)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    const db = readDb();
    const cleanEmail = email.trim().toLowerCase();

    // Check in admins, then warga, then siswa
    let foundUser = db.admins.find(u => u.email.toLowerCase() === cleanEmail);
    let entityType = 'admins';

    if (!foundUser) {
      foundUser = db.warga.find(u => u.email.toLowerCase() === cleanEmail);
      entityType = 'warga';
    }

    if (!foundUser) {
      foundUser = db.siswa.find(u => u.email.toLowerCase() === cleanEmail);
      entityType = 'siswa';
    }

    if (!foundUser) {
      return res.status(401).json({ message: 'Email atau kata sandi tidak sesuai.' });
    }

    const isValid = bcrypt.compareSync(password, foundUser.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Email atau kata sandi tidak sesuai.' });
    }

    const { passwordHash, ...safeUser } = foundUser;
    const token = jwt.sign(
      { id: safeUser.id, email: safeUser.email, role: safeUser.role, status: safeUser.status },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login berhasil.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan sistem saat proses masuk.', error: err.message });
  }
});

// Profile Me
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const db = readDb();
  let foundUser = db.admins.find(u => u.id === req.user.id) ||
                  db.warga.find(u => u.id === req.user.id) ||
                  db.siswa.find(u => u.id === req.user.id);

  if (!foundUser) {
    return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
  }

  const { passwordHash, ...safeUser } = foundUser;
  res.json({ user: safeUser });
});

// ======================== ADMIN USER MANAGEMENT (CRUD) ========================

// Get users list (separated siswa & warga, with filters)
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const db = readDb();
  const { status, search } = req.query;

  let siswaList = db.siswa.map(({ passwordHash, ...u }) => u);
  let wargaList = db.warga.map(({ passwordHash, ...u }) => u);

  if (status && status !== 'all') {
    siswaList = siswaList.filter(s => s.status === status);
    wargaList = wargaList.filter(w => w.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    siswaList = siswaList.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.nim && s.nim.toLowerCase().includes(q))
    );
    wargaList = wargaList.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.email.toLowerCase().includes(q) ||
      (w.originRegion && w.originRegion.toLowerCase().includes(q))
    );
  }

  res.json({
    siswa: siswaList,
    warga: wargaList,
    totalPending: db.siswa.filter(s => s.status === 'Pending').length +
                  db.warga.filter(w => w.status === 'Pending').length
  });
});

// Update Status (Approve/Reject: Pending -> Active / Rejected)
app.patch('/api/admin/users/:type/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { type, id } = req.params; // 'siswa' | 'warga'
  const { status } = req.body;

  if (!['Active', 'Pending', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status harus bernilai Active, Pending, atau Rejected.' });
  }

  const db = readDb();
  const list = type === 'siswa' ? db.siswa : type === 'warga' ? db.warga : null;

  if (!list) {
    return res.status(400).json({ message: 'Tipe pengguna tidak valid.' });
  }

  const idx = list.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Data pengguna tidak ditemukan.' });
  }

  list[idx].status = status;
  list[idx].updatedAt = new Date().toISOString();
  writeDb(db);

  const { passwordHash, ...safeUser } = list[idx];
  res.json({
    message: `Status ${safeUser.name} berhasil diubah menjadi ${status}.`,
    user: safeUser
  });
});

// Edit user data (Admin)
app.put('/api/admin/users/:type/:id', authenticateToken, requireAdmin, (req, res) => {
  const { type, id } = req.params;
  const db = readDb();
  const list = type === 'siswa' ? db.siswa : type === 'warga' ? db.warga : null;

  if (!list) {
    return res.status(400).json({ message: 'Tipe pengguna tidak valid.' });
  }

  const idx = list.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Data pengguna tidak ditemukan.' });
  }

  const allowedUpdates = { ...req.body };
  delete allowedUpdates.passwordHash;
  delete allowedUpdates.id;

  list[idx] = {
    ...list[idx],
    ...allowedUpdates,
    updatedAt: new Date().toISOString()
  };
  writeDb(db);

  const { passwordHash, ...safeUser } = list[idx];
  res.json({ message: 'Data pengguna berhasil diperbarui.', user: safeUser });
});

// Delete user (Admin)
app.delete('/api/admin/users/:type/:id', authenticateToken, requireAdmin, (req, res) => {
  const { type, id } = req.params;
  const db = readDb();

  if (type === 'siswa') {
    db.siswa = db.siswa.filter(s => s.id !== id);
  } else if (type === 'warga') {
    db.warga = db.warga.filter(w => w.id !== id);
  } else {
    return res.status(400).json({ message: 'Tipe pengguna tidak valid.' });
  }

  writeDb(db);
  res.json({ message: 'Pengguna berhasil dihapus dari sistem.' });
});

// ======================== BERITA NASIONAL (CRUD) ========================

app.get('/api/news', (req, res) => {
  const db = readDb();
  res.json({ news: db.content.beritaNasional || [] });
});

app.post('/api/news', authenticateToken, requireAdmin, (req, res) => {
  const db = readDb();
  const { title, date, author, image, summary, content, location } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Judul dan isi berita nasional wajib diisi.' });
  }

  const newArticle = {
    id: `news_${Date.now()}`,
    title: title.trim(),
    category: 'Berita Nasional',
    date: date || new Date().toISOString().split('T')[0],
    author: author || 'Pengurus PSHT',
    image: image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    summary: summary || '',
    content: content || '',
    location: location || 'Nasional'
  };

  db.content.beritaNasional.unshift(newArticle);
  writeDb(db);

  res.status(201).json({ message: 'Berita Nasional berhasil diterbitkan.', article: newArticle });
});

app.put('/api/news/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const idx = db.content.beritaNasional.findIndex(n => n.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Artikel berita tidak ditemukan.' });
  }

  db.content.beritaNasional[idx] = {
    ...db.content.beritaNasional[idx],
    ...req.body,
    id,
    category: 'Berita Nasional'
  };
  writeDb(db);

  res.json({ message: 'Berita Nasional berhasil diperbarui.', article: db.content.beritaNasional[idx] });
});

app.delete('/api/news/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.content.beritaNasional = db.content.beritaNasional.filter(n => n.id !== id);
  writeDb(db);
  res.json({ message: 'Berita Nasional berhasil dihapus.' });
});

// ======================== DOKUMENTASI & PROKER (CRUD) ========================

app.get('/api/proker', (req, res) => {
  const db = readDb();
  res.json({ proker: db.content.dokumentasiProker || [] });
});

app.post('/api/proker', authenticateToken, requireAdmin, (req, res) => {
  const db = readDb();
  const { title, type, category, date, lead, progress, image, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Judul dokumentasi/proker wajib diisi.' });
  }

  const newItem = {
    id: `prok_${Date.now()}`,
    title: title.trim(),
    type: type || 'Proker',
    category: category || 'Umum',
    date: date || new Date().toISOString().split('T')[0],
    lead: lead || 'Pengurus',
    progress: progress || 'Terencana',
    image: image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: description || ''
  };

  db.content.dokumentasiProker.unshift(newItem);
  writeDb(db);

  res.status(201).json({ message: 'Dokumentasi/Proker berhasil ditambahkan.', item: newItem });
});

app.put('/api/proker/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const idx = db.content.dokumentasiProker.findIndex(p => p.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Item tidak ditemukan.' });
  }

  db.content.dokumentasiProker[idx] = {
    ...db.content.dokumentasiProker[idx],
    ...req.body,
    id
  };
  writeDb(db);

  res.json({ message: 'Dokumentasi/Proker berhasil diperbarui.', item: db.content.dokumentasiProker[idx] });
});

app.delete('/api/proker/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.content.dokumentasiProker = db.content.dokumentasiProker.filter(p => p.id !== id);
  writeDb(db);
  res.json({ message: 'Dokumentasi/Proker berhasil dihapus.' });
});

// ======================== 7 DEPARTEMEN MANAGEMENT ========================

app.get('/api/departments', (req, res) => {
  const db = readDb();
  res.json({ departments: db.content.departemen || {} });
});

app.put('/api/departments/:deptId', authenticateToken, requireAdmin, (req, res) => {
  const { deptId } = req.params;
  const db = readDb();

  if (!db.content.departemen[deptId]) {
    return res.status(404).json({ message: `Departemen '${deptId}' tidak ditemukan.` });
  }

  db.content.departemen[deptId] = {
    ...db.content.departemen[deptId],
    ...req.body,
    id: deptId
  };
  writeDb(db);

  res.json({ message: `Data Departemen ${db.content.departemen[deptId].name} berhasil diperbarui.`, data: db.content.departemen[deptId] });
});

// ======================== CMS LAYOUT & SETTINGS ========================

app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json({
    settings: db.content.settings || {},
    contentSummary: {
      totalNews: db.content.beritaNasional?.length || 0,
      totalProker: db.content.dokumentasiProker?.length || 0,
      totalDepartments: Object.keys(db.content.departemen || {}).length,
      totalSiswa: db.siswa?.length || 0,
      totalWarga: db.warga?.length || 0
    }
  });
});

app.put('/api/settings', authenticateToken, requireAdmin, (req, res) => {
  const db = readDb();
  db.content.settings = {
    ...db.content.settings,
    ...req.body
  };
  writeDb(db);
  res.json({ message: 'Pengaturan tampilan layout & portal berhasil diperbarui.', settings: db.content.settings });
});

// Client SPA fallback
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[PSHT UNESA RBAC Server] berjalan aktif di port ${PORT}`);
  });
}

module.exports = app;
