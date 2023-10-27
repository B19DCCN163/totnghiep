import React from 'react';
import './Header.css';
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import logo from './../img/logo.png'
import search from './../img/search.png'
import noti from './../img/noti.png'
import setting from './../img/setting.png'
import user from './../img/user.png'
import { DataSearch, fakeDataAdmin } from './../../Home/Slide/fakeData'
import { SearchResultItem, useData } from './../../../DataContext'
import Select from 'react-select';

function Header() {

  const optionTime = [
    { values: '30p', label: '30p' },
    { values: '60p', label: '60p' },
    { values: '90p', label: '90p' },
    { values: '120p', label: '120p' }

  ]
  const [searchKeyword, setSearchKeyword] = useState('');
  const { setData, setcheckSearch } = useData();
  const [isUserOpen, setIsUserOpen] = useState(false)
  const handleLogout = () => {
      // localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify({}))
      localStorage.setItem('save', JSON.stringify(false))
      
  }
  const handleSearch = () => {
    const result = DataSearch.items.filter(item =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setcheckSearch('search')
    setData(result);
  };
  return (
    <div className='header'>
      <div className='search'>
        <img className='header__logo-img' src={logo} />
        <input placeholder='Tim kiem'
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button className='btn-search' onClick={handleSearch} ><img className='img-search' src={search} /></button>
      </div>
      <img className='img-noti' src={noti} />
      <img className='img-setting' src={setting} />
      <div className='logout'>
        <img className='img-user' src={user} onClick={() => setIsUserOpen(!isUserOpen)} />
        {isUserOpen && <div className='all-btn-logout'>
          <button className='btn-logout'>CV</button>
          <Link to='/user/login'><button className='btn-logout' onClick={handleLogout}>Logout</button></Link>
        </div>}
      </div>
    </div>


  );
}

export default Header;

