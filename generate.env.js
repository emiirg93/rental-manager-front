const fs = require('fs');
require('dotenv').config();

// Verifica si la carpeta environments no existe, y si no, la crea
if (!fs.existsSync('src/environments')) {
  fs.mkdirSync('src/environments');
}
const {
  API_URL,
  OWNER_EMAIL
} = process.env;

// Contenido de environment.ts
const contentProd = `export const environment = {
    API_URL: '${API_URL}',
    OWNER_EMAIL : '${OWNER_EMAIL}'
};`;

fs.writeFileSync('src/environments/environment.ts', contentProd);
