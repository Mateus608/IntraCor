// routers/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garantir que a pasta de uploads existe
const uploadDir = path.join(__dirname, '../renderer/public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Nome único para o arquivo: timestamp + nome original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Filtro para tipos de arquivo (opcional)
const fileFilter = (req, file, cb) => {
    // Permitir apenas PDFs e imagens
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos PDF e imagens são permitidos!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limite
    }
});

module.exports = upload;