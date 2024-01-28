const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const { PassThrough } = require('stream');
const cors = require('cors');
const app = express();
const PORT = 3000;

const upload = multer();

app.use(cors())
app.post('/upload', upload.single('file'), (req, res) => {
  const fileStream = new PassThrough();
  fileStream.end(req.file.buffer);

  const writeStream = fs.createWriteStream(`${req.file.originalname}`);
  fileStream.pipe(writeStream);

  writeStream.on('finish', () => {
    res.send('Arquivo enviado com sucesso!');
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));