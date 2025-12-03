const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Caminho completo para o arquivo .db
const dbPath = path.join(__dirname, "../users.db");

// Caminho completo para o script SQL
const initPath = path.join(__dirname, "init.sql");

// Criar o banco se não existir
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao SQLite:", err);
    } else {
        console.log("SQLite conectado:", dbPath);
    }
});

// Ler e executar o init.sql
const initSQL = fs.readFileSync(initPath, "utf8");

db.exec(initSQL, (err) => {
    if (err) {
        console.error("Erro ao inicializar tabelas:", err);
    } else {
        console.log("Tabelas inicializadas com sucesso.");
    }
});

module.exports = db;
