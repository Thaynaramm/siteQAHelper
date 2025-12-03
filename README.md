# QA Helper 🧪🧠

O **QA Helper** é uma aplicação web pensada para apoiar o dia a dia de quem trabalha com **qualidade de software (QA)**.  

Ele reúne em um só lugar:

- Tela de **login, cadastro e reset de senha**
- Painel (dashboard) com:
  - **Gerador de cenários de teste** em formato Gherkin (Dado/Quando/Então) em português
  - Sugestão de **cenários positivos e negativos**
  - **Gerador de documentação**:
    - Arquivo **.DOCX** com cenários e passos (incluindo imagens de evidência)
    - Arquivo **.XLSX** com planejamento de testes
  - **Editor de imagem para evidências de teste**:
    - Colar print diretamente no canvas
    - Desenhar **setas** e **retângulos**
    - Ferramenta de **recorte (crop)**
    - Copiar a imagem tratada para o editor de cenários
  - **Histórico de arquivos gerados**, com download dos arquivos (.docx / .xlsx)

É um projeto ideal para demonstrar habilidades de **testes de software, lógica, front-end, back-end e documentação de QA** em entrevistas e portfólio.

---

## 🎯 Objetivos do Projeto

- Simular um fluxo real de **autenticação**:
  - login
  - cadastro
  - reset de senha
- Gerar cenários de teste em **linguagem estruturada (Gherkin)**, em português.
- Facilitar a **documentação de testes manuais**, com:
  - cenários e passos detalhados
  - evidências (prints tratados no editor de imagem)
  - exportação para **.DOCX** (roteiro/cenários + imagens)
  - exportação para **.XLSX** (planejamento de QA)
- Servir como base de estudo para:
  - Testes funcionais
  - Planejamento e documentação de QA
  - Futuras integrações com backend e APIs

---

## 🧱 Tecnologias Utilizadas

### Back-end (API) – planejado / em evolução

- **Node.js**
- **Express**
- **CORS**
- (Opcional / em implementação) **express-session** → sessão em memória, para simular login persistente
- **bcrypt** → para hash de senha
- **Swagger** → documentação da API (rota ou arquivo de configuração)

O backend foi planejado para:

- Receber requisições de login, cadastro e reset de senha
- Validar credenciais
- Garantir regra de **não permitir dois usuários com o mesmo e-mail**
- Futuramente, servir arquivos gerados e integrar com uma pasta de **gravações/evidências**.

### Front-end

- **HTML5**
- **CSS3** (layout moderno usando **Flexbox**)
- **JavaScript (vanilla)**

Bibliotecas de apoio no navegador:

- `docx` → para gerar arquivos `.docx` (cenários + passos + imagens)
- `html2canvas` (opcional / planejado) → para tirar prints da tela
- Biblioteca de Excel (ex.: `xlsx` / `SheetJS`) → para gerar arquivo `.xlsx` com planejamento de QA

---

## 🗂 Estrutura do Projeto

```text
QA_HELPER/
├─ package.json
├─ server.js           ← Servidor Node/Express (se utilizado)
├─ app.js              ← Arquivo adicional (separação de rotas/config, se usado)
├─ swagger/ ou swagger.json (se usado)
├─ .gitignore
├─ README.md
└─ public/
   ├─ index.html       ← Tela de login
   ├─ register.html    ← Tela de cadastro
   ├─ reset.html       ← Tela de redefinição de senha
   ├─ dashboard.html   ← Dashboard (gerador + editor de imagem + histórico)
   ├─ css/
   │  ├─ style.css            ← Estilos do login/registro/reset
   │  └─ style-dashboard.css  ← Estilos do dashboard
   ├─ js/
   │  ├─ login.js             ← Lógica de login + validações
   │  ├─ register.js          ← Lógica de cadastro
   │  ├─ reset.js             ← Lógica de reset de senha
   │  └─ dashboard.js         ← Gerador, editor de imagem, histórico, exports
   └─ img/
      ├─ mascote-caveira.png  ← Mascote do QA Helper
      └─ imagem-trilha.png    ← Imagem lateral da tela de login
