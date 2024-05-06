import React, { useEffect, useState } from 'react'
import useApi from '../hook/useApi.js'
import '../assets/css/inicio.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Inicio = () => {

  const {data, loading, getData}=useApi()

  const [comidas, setComidas]=useState([])

  useEffect(()=>{
    getData("http://localhost/proyectos/PHP/apiPHP-MVC/api/comidas")
  },[])

  useEffect(()=>{
    setComidas(data)
  },[data])

  const handleClick=async(id)=>{
    const res= await axios.delete(`http://localhost/proyectos/PHP/apiPHP-MVC/api/eliminarComida/${id}`)
    console.log(res.data)

    setComidas(comidas.filter((com)=>com.id!==id))

  }

  return (
    <>
    <div className='container'>
      <h1>TODAS LAS COMIDAS</h1>
      {loading?
      <div className='food'>
        <div className='food__content'>
          {comidas.map(com=>(
            <article className='food__card' key={com.id}>
              <img className='food__img' src={com.imagen} alt="image-comida" />
              <h3 className='food__title'>{com.nombre}</h3>
              <div className='food__options'>
                <Link className='' to={`/edit/${com.id}`}>EDITAR</Link>
                <button onClick={()=>handleClick(com.id)}>ELIMINAR</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      :
      <div className='food__loader'><span className='loader'></span></div>
      }
    </div>
    </>
  )
}

export default Inicio
