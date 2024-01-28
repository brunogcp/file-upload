const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));