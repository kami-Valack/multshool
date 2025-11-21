const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/infrastructure/templates');
const targetDir = path.join(__dirname, '../dist/infrastructure/templates');

// Cria o diretório de destino se não existir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copia os arquivos
const files = fs.readdirSync(sourceDir);
files.forEach(file => {
  const sourceFile = path.join(sourceDir, file);
  const targetFile = path.join(targetDir, file);
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`Copiado: ${file}`);
});

console.log('Templates copiados com sucesso!');

