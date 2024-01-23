import axios from 'axios';
import {useEffect, useState } from "react";

function Entrada()
{
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [entradas, setEntradas] = useState([]);
  //const [createAt, setCreateAt] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

  async function  Load()
  {
     const result = await axios.get(
         "http://127.0.0.1:8080/api/entradas");
         setEntradas(result.data);
         console.log(entradas);
  }
 
    
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://127.0.0.1:8080/api/entradas",
        {
        
          titulo: titulo,
          autor: autor,
          contenido: contenido
        
        });
          alert("Entrada Registation Successfully");
          setId("");
          setTitulo("");
          setAutor("");
          setContenido("");
          Load();
        
        }
    catch(err)
        {
          alert("Entrada Registation Failed");
        }
   }
   async function editEntrada(entradas)
   {
    setTitulo(entradas.titulo);
    setAutor(entradas.autor);
    setContenido(entradas.contenido); 
 
    setId(entradas.id);
    
   }



   async function DeleteEntrada(id)
   {
       
        await axios.delete("http://127.0.0.1:8080/api/entradas/" + id); 
        alert("Entrada deleted Successfully");
        Load();
   
   }



   async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://127.0.0.1:8080/api/entradas/"+ entradas.find(u => u.id === id).id || id,
       {
         id: id,
         titulo: titulo,
         autor: autor,
         contenido: contenido
       
       });
         alert("Registation Update");
         setId("");
         setTitulo("");
         setAutor("");
         setContenido("");
         Load();
       
       }
   catch(err)
       {
         alert("Entrada Registation Failed");
       }
  }
  async function searchEntrada(column,value)
  {
    const result = await axios.get(
      "http://127.0.0.1:8080/api/entradas?"+column+"="+value);
      setEntradas(result.data);
      console.log(entradas);
    console.log("buscando");
  }
  

  return (
    <div>
       <h1>Entradas</h1>
       <div class="container" >
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="entrada_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
               
               />
                <label>Titulo</label>
                <input  type="text" class="form-control" id="entradaTitulo"
                value={titulo}
                onChange={(event) =>
                  {
                    setTitulo(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>Autor</label>
                <input  type="text" class="form-control" id="entradaAutor" 
                 value={autor}
                  onChange={(event) =>
                    {
                      setAutor(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Contenido</label>
                <input type="text" class="form-control" id="entradaContenido" 
                  value={contenido}
                onChange={(event) =>
                  {
                    setContenido(event.target.value);      
                  }}
                />
              </div>

                 <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
<div>
    <br/>

<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Entrada Id</th>
      <th scope="col">Titulo<br/><input onChange={(event) => searchEntrada("titulo",event.target.value)}/></th>
      <th scope="col">Autor<br/><input onChange={(event) => searchEntrada("autor",event.target.value)}/></th>
      <th scope="col">Contenido<br/><input onChange={(event) => searchEntrada("contenido",event.target.value)}/></th>
      <th scope="col">Publicacion</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {entradas.map(function fn(entrada)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{entrada.id} </th>
                <td>{entrada.titulo}</td>
                <td>{entrada.autor}</td>
                <td>{entrada.contenido.substring(0, 70)}...</td>
                <td>{new Date(entrada.createdAt).toLocaleDateString()}</td>     
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editEntrada(entrada)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteEntrada(entrada.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
       </div>
            );
        }
 
export default Entrada;