import React, { useState } from 'react'
import { FaImage } from "react-icons/fa"
import { IoMdImage } from "react-icons/io"
import '../assets/css/createFood.css'
import axios from 'axios'

const CreateFood = () => {

  const [loaderCreate, setLoaderCreate]=useState(true)
  const [nombre, setNombre]=useState("")
  const [dataImage, setDataImage]=useState("")
  const [imgPrev, setImgPrev]=useState(null)

  const handleNombre=(e)=>{
    setNombre(e.target.value)
  }

  const handleFile=(e)=>{
    setDataImage(e.target.files[0])
    
    const render=new FileReader()
    render.onload=(e)=>{
      setImgPrev(e.target.result)
    }
    render.readAsDataURL(e.target.files[0])
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const form=new FormData()

    form.append("nombre",nombre)
    form.append("imagen",dataImage)

    const res=await axios.post(`http://localhost/proyectos/PHP/apiPHP-MVC/api/crearComida`,form)
    console.log(res.data)
    if(res.data){
      setNombre("")
      setDataImage("")
    }
  }

  return (
    <>
    <div className='container'>
      <h1>AÑADIR COMIDA</h1>
      <div className='create__content'>
          <div className='create__image'>
            {imgPrev==null?
            <div className='create__img_previus'>
              <span className='create__img_ico'><FaImage/></span>
            </div>
            :
            <img className='create__img' src={imgPrev} alt="" />
            }
          </div>
          <form className='create__form' onSubmit={handleSubmit}>
            <input className='form__input' type="text" name='nombre' value={nombre} onChange={handleNombre}/>
            <input className='form__input_file' type="file" name='imagen' id='imagen' onChange={handleFile}/>
            <label className='form__btn_img' htmlFor="imagen">
              <span className='btn__img_text'>Agregar Imagen</span>
              <span className='btn__img_ico'><IoMdImage /></span>
            </label>
            <button className='btn__create'>{loaderCreate?"AGREGAR": <span className='loader loader__create'></span> }</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default CreateFood
