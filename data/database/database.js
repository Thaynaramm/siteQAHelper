const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Caminho do banco
const dbPath = path.join(__dirname, "users.db");

// Inicializa o banco (cria caso não exista)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o banco:", err);
    } else {
        console.log("Banco SQLite carregado:", dbPath);

        // Rodar o init.sql
        const initPath = path.join(__dirname, "init.sql");
        const initSQL = fs.readFileSync(initPath, "utf-8");

        db.exec(initSQL, (err) => {
            if (err) {
                console.error("Erro ao executar init.sql:", err);
            } else {
                console.log("Tabelas garantidas no banco!");
            }
        });
    }
});

module.exports = db;
