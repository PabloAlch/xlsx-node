import fs from 'fs';
import xlsx from 'xlsx';
import { file } from './iberdrola.js';

const dataFile = Buffer.from(file, 'base64');
const workbook = xlsx.read(dataFile, { type: 'buffer' });
const sheetName = workbook.SheetNames[1]; //'Sheet 1'
const sheetInfo = workbook.SheetNames[0]; //'Info. General'
const worksheet = workbook.Sheets[sheetName];
//------------------------
const info = xlsx.utils.sheet_to_json(worksheet);

const twoResults = info.slice(0, 100);
console.log(twoResults);


const filterData = twoResults.map( period => {
  const fechaHora = period['FECHA HORA']
  const [fecha, hora] = fechaHora.split(' ');
  const [dd, mm, yy] = fecha.split('/');
  const fechaISO = new Date(`${yy}-${mm}-${dd}T${hora}:00`).toISOString();
  

  const powerKeys = ['Potencia Máxima P1', 'Potencia Máxima P2', 'Potencia Máxima P3', 'Potencia Máxima P4', 'Potencia Máxima P5', 'Potencia Máxima P6'];
  let powerData = undefined;

for (const [key, value] of Object.entries(period)) {
  if (typeof value === 'number' && powerKeys.includes(key)) {
    powerData = value;
    break;
  }
}

  return {
    readDate: fechaISO,
    // readQuality: 2,
    // readType: 1,
    maxPower: powerData
  }
})

console.log(filterData)

//-------------------
// const updatedBuffer = xlsx.write(workbook, { type: 'buffer' });

// fs.writeFile('archivo.xlsx', updatedBuffer, (err) => {
//   if (err) {
//       console.error('Error al guardar el archivo:', err);
//     } else {
//       console.log('Archivo XLSX guardado correctamente.');
//     }
//   });

  
  
  
  
  
  
  //---------
  // function isFirstRow(cell) {
  //   return /^\D+1$/.test(cell);
  // }
  
  // Object.keys(worksheet).forEach((cell) => {
  //   if (!isFirstRow(cell) && cell.startsWith('B')) {
  //     worksheet[cell].v = 'HOLA valor para columna B';
  //   }
  // });
  //----------

// fs.writeFile('archivo.xlsx', data, (err) => {
//     if (err) {
//       console.error('Error al guardar el archivo:', err);
//     } else {
//       console.log('Archivo XLSX guardado correctamente.');
//     }
//   });


// limpieza de datos pero parece q no se necesita

// const newInfo = info.map(item => {
//   const newItem = {};
//   for (const key in item) {
//     if (key.includes('"')) {
//       newItem[key.replace(/"/g, '')] = item[key];
//     } else {
//       newItem[key] = item[key];
//     }
//   }
//   return newItem;
// });

// console.log(newInfo);
// const twoResults1 = newInfo.slice(0, 2);
// console.log(twoResults1);