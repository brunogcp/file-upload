<div align="center">
  <h3 align="center">File Upload</h3>
  <div>
  <a href="https://bgcp.vercel.app/article/b72c4fdb-5ec3-4a85-b8ea-6a049d4b48c6">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução ao Upload de Arquivos

O upload de arquivos é uma funcionalidade essencial em muitas aplicações web e móveis, permitindo que usuários enviem documentos, imagens, vídeos e outros tipos de arquivos para um servidor. Em Node.js, diversas bibliotecas facilitam a implementação de upload de arquivos, tornando-o seguro e eficiente. Quando se trata de arquivos grandes, o uso de streams é crucial para reduzir o consumo de memória e melhorar a experiência do usuário.

## 🛠️ Instalação

### Windows, Linux (Ubuntu/Debian), e macOS:

O processo de instalação para o upload de arquivos envolve configurar o ambiente Node.js e instalar bibliotecas auxiliares como `multer` para o manuseio de multipart/form-data, que é amplamente utilizado para upload de arquivos.

1. **Node.js**: Certifique-se de ter o Node.js instalado. Visite [Node.js](https://nodejs.org/) para instruções de instalação específicas para seu sistema operacional.
   
2. **Instalação do `multer` e `express`**:

```bash
npm install express multer
```

## 📊 Uso Básico

### Configuração Inicial:

Para começar, configure um servidor Express simples e adicione o middleware `multer` para tratar os uploads de arquivos.

1. **Configuração do Servidor Express**:

```javascript
// index.js
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
```

### Exemplo Básico de Upload de Arquivo:

No frontend, você pode criar um formulário simples para enviar um arquivo ao servidor.

```html
<form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" value="Enviar Arquivo" />
</form>
```

## 📈 Upload de Arquivos Grandes com Stream

### Teoria do Upload com Stream:

💡 O streaming de upload permite o processamento de arquivos grandes em "pedaços", enviando-os sequencialmente. Isso reduz o consumo de memória do servidor e permite o tratamento de arquivos maiores que o tamanho da memória disponível.

### Motivo para Utilizar Streaming:

🚀 Utilizar streaming para upload de arquivos grandes melhora significativamente a eficiência e a escalabilidade de aplicações web, permitindo o manuseio de arquivos que de outra forma poderiam sobrecarregar o sistema.
<div style="page-break-after: always;"></div>


### 👨‍💻 Implementação de Upload com Stream:

#### Backend: Node.js

1. **Instale as Dependências Necessárias**:

```bash
npm install express multer fs-extra
```

2. **Configure o Servidor Express para Upload com Stream**:

```javascript
const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const { PassThrough } = require('stream');
const app = express();
const PORT = 3000;

const upload = multer();

app.post('/upload', upload.single('file'), (req, res) => {
  const fileStream = new PassThrough();
  fileStream.end(req.file.buffer);

  const writeStream = fs.createWriteStream(`uploads/${req.file.originalname}`);
  fileStream.pipe(writeStream);

  writeStream.on('finish', () => {
    res.send('Arquivo enviado com sucesso!');
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```

#### Frontend: React

1. **Crie um Componente React para o Upload de Arquivos**:

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FileUpload;
```

### 🔍 Testes

#### Testar Upload de Arquivos Grandes

- Utilize o componente React para selecionar e enviar um arquivo grande.
- Monitore o consumo de memória do servidor durante o upload para validar a eficiência do streaming.
- Confirme o sucesso do upload verificando se o arquivo foi corretamente salvo no diretório especificado.

## 🏆 Conclusão

Este tutorial explorou como implementar o upload de arquivos em aplicações Node.js, com foco especial no manuseio de arquivos grandes através de streaming. A capacidade de processar arquivos grandes de maneira eficiente e segura é fundamental para muitos sistemas, e o uso de streams no Node.js oferece uma solução robusta para essa necessidade. Continue explorando e otimizando suas implementações para tirar o máximo proveito das capacidades do Node.js e das bibliotecas disponíveis. 📦🚀