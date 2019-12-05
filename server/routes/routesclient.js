/*jshint esversion: 8 */
//require('../uploads/ciudades')
const express = require('express');
const modeloFlight = require('../models/flights');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
//let ciudades = require('../uploads/ciudades')
app.use(fileUpload({ useTempFiles: true }));
let paises=[];
let ciudades=[];

//obtener paises
app.get('/flights/paises',async(req,res)=>{
    paises=[]
    let archivoOrigen=" "
    archivoOrigen ='server/assets/paises.json';
    fs.readFile(archivoOrigen, 'utf8', async(err, data)=> {
        if (err){
            reject(err) 
        }else{
            data = data.trim();
            let obj = JSON.parse(data);
            for (let i in obj){
                paises.push(obj[i])
            }
            res.json({
               paises
            })     
        }
    })
})

//obtener ciudades
app.get('/flights/ciudades',async(req, res)=>{
    ciudades=[]
    let archivoCiudades = " ";
    archivoCiudades = 'server/assets/ciudades.json';
    fs.readFile(archivoCiudades,'utf8', async(err,data)=>{
      if(err)  {
          reject(err)
      }else{
          data = data.trim();
          let obj = JSON.parse(data);
          for(let i in obj){
                ciudades.push(obj[i] )
          }
          res.json({
              ciudades
          })
      }
    })

})

//obtener todos los flights
app.get('/flights', async(req, res) => {
    // filtrando por flight 1 y por  algunos campos
    //({flightini:1},'cliente comentario')
    console.log('invoca url',req.url)
    //console.log(req.path)
    let cadena=req.url;
    //let parametro=cadena.slice(-2);
    //let parametro=cadena.substr(16,2);
    //console.log(parametro);

   

    //CONSULTA MARKET Y FLIGHTINI
    if (cadena.startsWith("market=",9) && cadena.startsWith("flightini=",19)) {
        console.log("paso market");
        console.log("paso flightini")
        let parametro=cadena.substr(16,2);
        let parametro2=cadena.substr(29,4);
        console.log(parametro);
        console.log(parametro2);
        await modeloFlight.find({market:parametro, flightini:parametro2})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }
    //CONSULTA POR CODOPERATOR Y FLIGHTOPERATOR
    if (cadena.startsWith("codope=",9) && cadena.startsWith("flightope=",19)) {
        console.log("paso codope");
        console.log("paso flightope")
        let parametro=cadena.substr(16,2);
        let parametro2=cadena.substr(29,4);
        console.log(parametro);
        console.log(parametro2);
        await modeloFlight.find({codope:parametro, flightope:parametro2})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }
    //CONSULTA POR ORIGEN Y DESTINO
    if (cadena.startsWith("origin=",9) && cadena.startsWith("destinat=",20)) {
        console.log("paso origen");
        console.log("paso destino")
        let parametro=cadena.substr(16,3);
        let parametro2=cadena.substr(29,3);
        console.log(parametro);
        console.log(parametro2);
        await modeloFlight.find({origen:parametro, destino:parametro2})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }

    //CONSULTA POR MARKET Y OPERADOR
    if (cadena.startsWith("market=",9) && cadena.startsWith("codope=",19)) {
        console.log("paso market");
        console.log("paso codope")
        let parametro=cadena.substr(16,2);
        let parametro2=cadena.substr(26,2);
        console.log(parametro);
        console.log(parametro2);
        await modeloFlight.find({market:parametro, codope:parametro2})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }
    //CONSULTA SOLO MARKET
    if (cadena.startsWith("market=",9)) {
        console.log("paso market");
        let parametro=cadena.substr(16,2);
        console.log(parametro);
        await modeloFlight.find({market:parametro})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }
    //CONSULTA POR FECHA
    if (cadena.startsWith("fechareg=",9)) {
        //console.log("paso market");
        console.log("paso SOLO flightini")
        let parametro=cadena.substr(18,10);
        //let parametro2=cadena.substr(29,4);
        console.log(parametro);
        //console.log(parametro2);
        await modeloFlight.find({fechareg:parametro})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }

    // CONSULTA POR FLIGHTINI

    if (cadena.startsWith("flightini=",9)) {
        //console.log("paso market");
        console.log("paso SOLO flightini")
        let parametro=cadena.substr(19,4);
        //let parametro2=cadena.substr(29,4);
        console.log(parametro);
        //console.log(parametro2);
        await modeloFlight.find({flightini:parametro})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }
    //CONSULTA POR CODOPERATOR
    if (cadena.startsWith("codope=",9)) {
        console.log("paso codope");
        //console.log("paso flightope")
        let parametro=cadena.substr(16,2);
        //let parametro2=cadena.substr(29,4);
        console.log(parametro);
        //console.log(parametro2);
        await modeloFlight.find({codope:parametro})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
        return
    }

    //CONSULTA CON FORMULARIO VACIO
    if(cadena.startsWith("none",9)){
        console.log('formulario vacio')
        await modeloFlight.find({market:0, codope:0})
        .exec((err,dataFlights)=>{  //Ejecuta el query
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            //modeloFlight.count((err,conteo)=>{
                res.json({
                    ok: true,
                    flights:dataFlights,
                    //total:conteo
                })     
            //})
            
        })
    }
});
//crear un flight
app.post('/flights',async(req, res) =>{

    let body = req.body;

    let flight = new modeloFlight({
        cliente:	body.cliente,
        market:	    body.market,
        flightini:	body.flightini,
        origen:	    body.origen,
        destino:	body.destino,
        codope:	    body.codope,
        fechainit:	body.fechainit,
        fechaend:	body.fechaend,
        frecuencia:	body.frecuencia,
        clase:	    body.clase,
        comentario:	body.comentario,
        flightope:	body.flightope,
        timedep:	body.timedep,
        timearr:	body.timearr,
        fechareg:	body.fechareg

    });

    await flight.save((err,flightDB)=>{

        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            flight:flightDB
        })
    })
});

//buscar un flight
app.get('/flights/:id', async(req, res) => {
    const idflights = await modeloFlight.findById(req.params.id);
    res.json({
        idflights
    })
});

//actualizar un flight
app.put('/flights/:id', async(req, res) => {
    let body = req.body;
    const { id } = req.params;
    const flightporActualizar = {
        cliente:	body.cliente,
        market:	    body.market,
        flightini:	body.flightini,
        origen:	    body.origen,
        destino:	body.destino,
        codope:	    body.codope,
        fechainit:	body.fechainit,
        fechaend:	body.fechaend,
        frecuencia:	body.frecuencia,
        clase:	    body.clase,
        comentario:	body.comentario,
        flightope:	body.flightope,
        timedep:	body.timedep,
        timearr:	body.timearr,
        fechareg:	body.fechareg
    }
    await modeloFlight.findByIdAndUpdate(id, { $set: flightporActualizar }, { new: true });
    res.json({
        status: 'Flight Actualizado'
    });
});

//eliminar un flight
app.delete('/flights/:id', async(req, res) => {
    await modeloFlight.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Flight eliminado'
    });
});
//subir imagen
app.put('/upload', function(req, res) {
    if (!req.files){
       return res.status(400)
            .json({
                ok:false,
                err: {
                    message: "No se ha seleccionado ningún archivo"
                }
            })

    } 

    let archivo = req.files.archivo;

    archivo.mv('server/uploads/img/filename.jpg', (err)=> {
        if (err)
        return res.status(500).json({
                ok:false,
                err
        });
    
        res.json({
            ok:true,
            message:'Imagen subida correctamente'
        });
      });
});
//buscar imagen
app.get('/flights/img/:img', async(req, res) => {
    await modeloFlight.find({img:req.params.img})
    .exec()
    //console.log(idFlights)
    let imagen = req.params.img;
    //res.json({
    //    img:imagen
        //ok:true,
        //message:'Imagen Lista'
    //})
    //let imagen1 = Idflights.img
    //let imagen = req.params.img;
    //let imagen = flights.img
    console.log('desde server routesclient',imagen)
    
    let pathImg = `../assets/2019/${imagen}`;
    let ruta = path.resolve(__dirname,pathImg);
    if (fs.existsSync(ruta)){
        res.sendFile(ruta)
    }else{
        let sinImagen = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(sinImagen)
    }
       return    
    
});


module.exports=app;