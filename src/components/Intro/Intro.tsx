import React from 'react';
import './Intro.css';
import {useState, useEffect} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'



function Intro() {   
  useEffect(() => {
    const saveString = localStorage.getItem('save');
    const saved: boolean | null = saveString ? JSON.parse(saveString) : null;
    console.log(saved)
    if(saved) {
      window.location.href = "/home"
    }
  }, [])
 return (  
    <div>
        <Link to="/user/login"><button className='btn-item'>DANG NHAP</button></Link>
        <Link to="/user/register"><button className='btn-item'>DANG KI</button></Link>     
    </div>
    
  );
}

export default Intro;

