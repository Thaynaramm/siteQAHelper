// ===============================
// IMPORTS
// ===============================
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");

// Importa banco SQLite
const db = require("./data/database/db");

// ===============================
// CONFIGURAÇÕES INICIAIS
// ===============================
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "qa-helper-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// ===============================
// PÁGINAS
// ===============================
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "register.html"))
);

app.get("/dashboard", (req, res) => {
  if (!req.session.userId) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ===============================
// REGISTER COM SQLITE
// ===============================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Preencha email e senha." });

    const emailLower = email.toLowerCase();

    // Verificar se já existe usuário
    db.get("SELECT * FROM users WHERE email = ?", [emailLower], async (err, row) => {
      if (err) return res.status(500).json({ message: "Erro no banco." });

      if (row)
        return res.status(409).json({ message: "Usuário já cadastrado." });

      const passwordHash = await bcrypt.hash(password, 10);

      // Inserir no SQLite
      db.run(
        "INSERT INTO users (email, passwordHash, createdAt) VALUES (?, ?, ?)",
        [emailLower, passwordHash, new Date().toISOString()],
        function (err) {
          if (err) return res.status(500).json({ message: "Erro ao cadastrar." });

          req.session.userId = this.lastID;

          res.status(201).json({
            message: "Cadastrado com sucesso!",
            user: { id: this.lastID, email: emailLower },
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// ===============================
// LOGIN COM SQLITE
// ===============================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Preencha email e senha." });

  const emailLower = email.toLowerCase();

  db.get("SELECT * FROM users WHERE email = ?", [emailLower], async (err, user) => {
    if (err) return res.status(500).json({ message: "Erro no banco." });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas." });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Credenciais inválidas." });

    req.session.userId = user.id;

    res.json({
      message: "Login efetuado.",
      user: { id: user.id, email: user.email },
    });
  });
});

// ===============================
// LOGOUT
// ===============================
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {});
  res.json({ message: "Deslogado." });
});

// ===============================
// CHECAR SESSÃO
// ===============================
app.get("/api/whoami", (req, res) => {
  if (!req.session.userId)
    return res.json({ logged: false });

  db.get("SELECT id, email FROM users WHERE id = ?", [req.session.userId], (err, user) => {
    if (err || !user) return res.json({ logged: false });
    res.json({ logged: true, user });
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
