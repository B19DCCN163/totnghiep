import React from 'react';
import './Login.css';
import test from '../image/test.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Item from './../../Home/Slide/Item/Item';
import { User } from '../DateUser'
import { useData } from '../../../DataContext';
import { fakeData3, fakeDataAdmin } from '../../Home/Slide/fakeData';

interface UserLogin {
    email: string,
    pass: string,
}

interface Validation {
    eremail?: string;
    erpass?: string;
}




function Login() {
    const nav = useNavigate()
    const [check, setCheck] = useState(false)
    const [save, setSave] = useState(false)
    const [error, setError] = useState<Validation>({})
    const [userlogin, setUserLogin] = useState<UserLogin>({
        email: '',
        pass: '',
    })
    const handleSubmit = () => {
        let errorMessages: Validation = {};
        if (!userlogin.email) {
            errorMessages.eremail = 'Email can not be null'
        }
        if (!userlogin.pass) {
            errorMessages.erpass = 'Pass word can not be null'
        }
        // else if (userlogin.pass.length < 8) {
        //     errorMessages.erpass = 'Mật khẩu phải nhiều hơn 8 kí tự'

        // }
        else if (userlogin.pass.includes(' ')) {
            errorMessages.erpass = 'Mật khẩu không được chứa khoảng trống'
        }
        setError(errorMessages)

        if (!errorMessages.eremail && !errorMessages.erpass) {
            const usersString = localStorage.getItem('users'); 
            const users: User[] = JSON.parse(usersString || '[]');
            if (usersString) {
                const foundUser = users.find((user1) => user1.email === userlogin.email && user1.pass === userlogin.pass);
                if (foundUser) {
                    // Người dùng đã đăng ký trong localStorage với email và password tương ứng
                    localStorage.setItem('user', JSON.stringify(foundUser))
                    localStorage.setItem('save', JSON.stringify(save))
                    alert('Dang nhap thanh cong')
                    // Tiến hành đăng nhập
                    return nav("/home");
                }
                else {
                    setCheck(true)
                    console.log('Người dùng chua đăng ký:', foundUser);
                    
                }
            }

        }

    }
    // useEffect(() => {

    // })

    return (
        <div className='header_login' >
            <p className='header'>DANG NHAP</p>

            <div className='input-item'>
                <p>Email</p>
                <input value={userlogin.email}
                    onChange={e => setUserLogin({
                        ...userlogin,
                        email: e.target.value
                    })} />
                {
                    !!error.eremail && (<p style={{ color: 'red' }}>{error.eremail}</p>)

                }
            </div>
            <div className='input-item'>
                <p>Password</p>
                <input value={userlogin.pass}
                    onChange={e => setUserLogin({
                        ...userlogin,
                        pass: e.target.value
                    })} />
                {
                    !!error.erpass && (<p style={{ color: 'red' }}>{error.erpass}</p>)

                }
            </div>

            <div className='remember'>
                <input onClick={() => setSave(!save)} type="checkbox" id="checkbox_remember" name="checkbox_remember"></input>
                <p className='text_remember'>Nho mat khau</p>
                <p className='forgot_password'><Link to="/user/register">Quen mat khau</Link></p>
            </div>

            <button className='btn-dang-nhap' onClick={handleSubmit}>Dang nhap</button>
            {check && (<p style={{ color: 'red' }}>{'Tai khoan khong hop le'}</p>)}
            <p>Bạn chưa có tài khoản? <Link to="/user/register">Tạo mới tài khoản</Link></p>





        </div>
    );
}

export default Login;
