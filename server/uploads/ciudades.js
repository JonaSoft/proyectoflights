module.exports.mostrarCiudades =()=>{
 let fs = require('fs');
    //let modeloFlights = require ('../../server/models/flights')
    setTimeout(()=>{
        let archivoOrigen ='server/assets/paises.json';
        fs.readFile(archivoOrigen, 'utf8', async(err, data)=> {
            if (err)
                reject(err) 
            else
                data = data.trim();
                obj = JSON.parse(data);
                let cont=0
                /*for (let i in obj){
                    console.log(obj[i]);
                }*/
                return obj
           
              
            
        })
    },500)
}