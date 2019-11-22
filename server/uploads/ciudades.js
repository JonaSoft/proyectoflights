
const mostrarCiudades =async(res)=>{
const express = require('express');
const app = express();
let fs = require('fs');
const fileUpload = require('express-fileupload');
app.use(fileUpload({ useTempFiles: true }));
let paises=[];
 
 let archivoOrigen ='server/assets/paises.json';
    fs.readFile(archivoOrigen, 'utf8', async(err, data)=> {
        if (err){
            reject(err) 
        }else{
              data = data.trim();
              obj = JSON.parse(data);
              for (let i in obj){
                 paises.push(obj[i])
              }
              res.json({
                  ok: true,
                  paises
              })     
        }
    })

 return     
}
module.exports = {
    mostrarCiudades
}