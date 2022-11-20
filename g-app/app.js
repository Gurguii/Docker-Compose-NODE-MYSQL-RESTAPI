const express = require('express');
require('dotenv').config();
const db = require('./db.js');
const parser = require('./parser.js');
const port = process.env.NODE_DOCKER_PORT;
const app = express();

const send404 = (r) => {r.sendStatus(404).end();}

app.use(express.json())

app.get('/',(req,res) => {
	res.sendStatus(404).end();
	return;
});

/* Método: GET
 * Devuelve todas las columnas y filas de la tabla 'tbname'
 * Curl => curl http://<ip>:3000/<nombre_tabla>
 */

app.get('/:tbname',(req,res) => {
	db.query(`select * from ${req.params.tbname}`, (err,data) => {
		if(err){
			send404(res);return;
		}
		res.send(data);
	});
});

/* Método: GET
 * Ejecuta una query SELECT en la tabla 'tbname'
 * ssyntax = <campo1,campo2...>:<condition_key>:<condition_value>
 * curl http://<ip>:3000/<nombre_tabla>/<ssyntax>
 */

app.get('/:tbname/:ssyntax',(req,res) => {
    let query = parser.select_query(req.params.tbname,req.params.ssyntax);
    if(!query)
    {
        send404(res);return;
    }
    db.query(query,(err,data) => {
        if(err)
        {
            send404(res);return;
        }
        res.send(data);
    });
});

/* Método: POST
 * Ejecuta una query INSERT en la tabla 'tbname'
 * ssyntax = <campo1,campo2...>:<valor1,valor2...>
 * curl -XPOST http://<ip>:3000/<nombre_tabla>/<ssyntax>
 */

app.post('/:tbname/:ssyntax',(req,res) => {
    let query = parser.insert_query(req.params.tbname,req.params.ssyntax);
    if(!query)
    {
        send404(res);return;
    }
    db.query(query,(err,data) => {
        if(err)
        {
            send404(res);return;
        }
        res.send(data);
    })
});

/* Método: PUT
 * Ejecuta una query UPDATE en la tabla 'tbname'
 * ssyntax = <campo-a-cambiar>:<nuevo-valor>:<condition_key>:<condition_value>
 * curl -XPUT http://<ip>:3000/<nombre_tabla>/<ssyntax>
 */

app.put('/:tbname/:ssyntax',(req,res) => {
    let query = parser.update_query(req.params.tbname,req.params.ssyntax);
    if(!query)
    {
        send404(res);return;
    }
    db.query(query,(err,data)=>{
        if(err)
        {
            send404(res);return;
        }
        res.send(data)
    })
});

/* Método: DELETE
 * Ejecuta una query DELETE en la tabla 'tbname'
 * ssyntax = <condition_key>:<condition_value>
 * curl -XDELETE http://<ip>:3000/<nombre_tabla>/<ssyntax>
 */

app.delete('/:tbname/:ssyntax',(req,res) => {
    let query = parser.delete_query(req.params.tbname,req.params.ssyntax);
    if(!query)
    {
        send404(res);return;
    }
    db.query(query,(err,data) => {
        if(err)
        {
            send404(res);return;
        }
        res.send(data);
    })
});

app.listen(port,() => {
	console.log(`[+] - Node service running on port ${port}`);
});