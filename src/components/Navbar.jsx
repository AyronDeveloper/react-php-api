import React from 'react'
import { Link } from 'react-router-dom'
import logoReact from '../assets/images/react.png'
import logoPhp from '../assets/images/php.png'
import '../assets/css/navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className='navbar__link' to={"/"}>INICIO</Link>
      <div className='navbar__images'>
        <img className='navbar__img navbar__img_react' src={logoReact} alt="Logo React" />
        <img className='navbar__img navbar__img_php' src={logoPhp} alt="Logo PHP" />
      </div>
      <Link className='navbar__link' to={"/create"}>CREAR</Link>
    </nav>
  )
}

export default Navbar
