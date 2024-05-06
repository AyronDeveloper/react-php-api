import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../hook/useApi.js'
import axios from 'axios'
import { IoMdImage } from "react-icons/io"
import '../assets/css/editFood.css'

const EditFood = () => {

  const {data, loader, getData}=useApi()

  const [inputData, setInputData]=useState({nombre:"", imagen:""})
  const [dataImage, setDataImage]=useState("")
  const [imgPrev, setImgPrev]=useState(null)
  const [laoderUpdate, setLoaderUpdate]=useState(true)

  const {id}=useParams()

  useEffect(()=>{
    getData(`http://localhost/proyectos/PHP/apiPHP-MVC/api/comidas/${id}`)
  },[])

  useEffect(()=>{
    setInputData({nombre: data.nombre, imagen: data.imagen})
  },[data])

  const {nombre, imagen}=inputData

  const handleChange=({target})=>{
    const {name, value}=target
    setInputData({...inputData,[name]:value})
  }

  const handleFile=(e)=>{
    setDataImage(e.target.files[0])

    const render=new FileReader()
    render.onload=(e)=>{
      setImgPrev(e.target.result)
    }
    render.readAsDataURL(e.target.files[0])
  }

  const hanldeSubmit=async(e)=>{
    e.preventDefault()

    setLoaderUpdate(false)

    let form=new FormData()
    form.append("nombre", nombre)
    form.append("imagen", dataImage)
    const res= await axios.post(`http://localhost/proyectos/PHP/apiPHP-MVC/api/actualizarComida/${id}`,form)
  
    console.log(res.data)
    
    setLoaderUpdate(true)
    
  }

  return (
    <>
      <div className='container'>
        <h1>EDITAR COMIDA</h1>
        <div className='edit__content'>
          <div className='edit__image'>
          {imgPrev==null?
            <img className='edit__img' src={imagen} alt="" />
            :
            <img className='create__img' src={imgPrev} alt="" />
            }
          </div>
          <form className='edit__form' onSubmit={hanldeSubmit}>
            <input className='form__input' type="text" name='nombre' value={nombre} onChange={handleChange}/>
            <input className='form__input_file' type="file" name='imagen' id='imagen' onChange={handleFile}/>
            <label className='form__btn_img' htmlFor="imagen">
              <span className='btn__img_text'>Agregar Imagen</span>
              <span className='btn__img_ico'><IoMdImage /></span>
            </label>
            <button className='btn__update'>{laoderUpdate?"ACTUALIZAR": <span className='loader loader__update'></span> }</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditFood
