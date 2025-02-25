const fs = require('fs');
require('dotenv').config();

// Verifica si la carpeta environments no existe, y si no, la crea
if (!fs.existsSync('src/environments')) {
  fs.mkdirSync('src/environments');
}
const {
  API_URL,
} = process.env;

// Contenido de environment.ts
const contentProd = `export const environment = {
    API_URL: '${API_URL}'
};`;

fs.writeFileSync('src/environments/environment.ts', contentProd);
