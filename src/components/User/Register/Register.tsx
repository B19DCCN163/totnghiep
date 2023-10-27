import React, { useEffect } from 'react';
import './Register.css';
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {User} from '../DateUser'

interface Validation {
    erfname ?: string;
    erlname ?: string;
    eremail ?: string;
    erpass ?: string;
}

function Register() {
    const nav = useNavigate()
    const [error, setError] = useState<Validation>({})
    const [user, setUser]= useState<User>({
        email: '',
        pass: '',
        fname: '',
        lname: '',
    })

    const handleSubmit = () => {
        const usersString = localStorage.getItem('users');
        const users: User[] = JSON.parse(usersString || '[]');

        let errorMessages: Validation = {};
       
        if (!user.fname) {
            errorMessages.erfname = 'Firstname can not be null'
        }

        if (!user.lname) {
            errorMessages.erlname = 'Lastname can not be null'
        }
        if (!user.email) {
            errorMessages.eremail = 'Email can not be null'
        }
        if (!user.pass) {
            errorMessages.erpass = 'Pass word can not be null'
        }
        // else if (user.pass.length < 8 ) {
        //     errorMessages.erpass = 'Mật khẩu phải nhiều hơn 8 kí tự'
        // }
        else if (user.pass.includes(' ')) {
            errorMessages.erpass = 'Mật khẩu không được chứa khoảng trống'
        }

        user.isAdmin = Math.random() < 0.5;
        setError(errorMessages)
        console.log(errorMessages)   
        if(!errorMessages.eremail && !errorMessages.erfname && !errorMessages.erlname && !errorMessages.erpass) {
                    localStorage.setItem('users', JSON.stringify([...users, user]))
                    alert('Dang ki thanh cong')
                    return  nav("/user/login"); 
            }
}


        
  return (
    <div className='header_register' >
        <p className='header'>DANG KI</p>
        <div className='input-item'>
            <p>FirstName</p>
            <input value={user.fname} 
            onChange={e => setUser({
                ...user,
                fname : e.target.value
            })}/>
            {
                !!error.erfname && (<p style={{color: 'red'}}>{error.erfname}</p>)

            }
        </div>

        <div className='input-item'>
            <p>LastName</p>
            <input value={user.lname} 
            onChange={e => setUser({
                ...user,
                lname : e.target.value
            })}/>
            {
                !!error.erlname && (<p style={{color: 'red'}}>{error.erlname}</p>)

            }
        </div>

        <div className='input-item'>
            <p>Email</p>
            <input value={user.email} 
            type="email"
            onChange={e => setUser({
                ...user,
                email : e.target.value
            })}/>
            {
                !!error.eremail && (<p style={{color: 'red'}}>{error.eremail}</p>)

            }
        </div>

        <div className='input-item'>
            <p>Password</p>
            <input value={user.pass} 
            type="password"
            onChange={e => setUser({
                ...user,
                pass : e.target.value
            })}/>
            {
                !!error.erpass && (<p style={{color: 'red'}}>{error.erpass}</p>)

            }
        </div>

       <button className='btn-dang-ki' onClick={handleSubmit}>Dang ki</button>
        <p>Bạn da có tài khoản? <Link to="/user/login">Dang nhap</Link></p>

    </div>
  );
}

export default Register;

