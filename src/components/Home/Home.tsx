import { useMemo, useState, useEffect } from 'react';
import { useData } from './../../DataContext';
// import Item from './Slide/Item/Item';
import './Slide/Slide.css';
// import CompletedTab from './Slide/Tab/CompletedTab';
import HomeTab from './Slide/Tab/HomeTab';
// import InprogressTab from './Slide/Tab/InprogressTab';
// import Exams from './Slide/Admin/Exams';
import user from './../layout/img/user.png'
// import { fakeDataAdmin } from './Slide/fakeData';
// import UserAdmin from './Slide/Admin/UserAdmin';
// import Static from './Slide/Admin/Static';
import Create_Exams from './Slide/Admin/Create_Exams';
// import { User } from './../User/DataUser'
import SearchResult from './Slide/SearchResult/SearchResult';

function Home() {
  const tabs = ['Home', 'Inprogress', 'Completed'];
  const { checkUserOrAdmin, checkSearch, setcheckSearch } = useData();


  const [selectedTab, setSelectedTab] = useState('Home');
  const [selectedAdminTab, setSelectedAdminTab] = useState('exams');


  return (
    <div>
      {checkUserOrAdmin === 'admin' && <div className='admin'>
        <div className='avt-admin'>
          <div className='user_admin'>
            <img className='user_admin_avt' src={user} />
            <p className='user_admin_email'>adminabcdef@gmail.com</p>
          </div>
          <div className='tab_admin'>
            <button className='admin_tab' onClick={() => {setSelectedAdminTab('static'); setcheckSearch('home_page')}}>Static</button>
            {/* <button className='admin_tab' onClick={() => {setSelectedAdminTab('user'); setcheckSearch('home_page')}}>User</button> */}
            <button className='admin_tab' onClick={() => {setSelectedAdminTab('exams'); setcheckSearch('home_page')}}>Product</button>
            <button className='admin_tab_create' onClick={() => {setSelectedAdminTab('create_exams'); setcheckSearch('home_page')}}>Create Product</button>
          </div>
        </div>
        {checkSearch === 'search' && <SearchResult />}
        {checkSearch === 'home_page' && <div>
          {/* {selectedAdminTab === 'user' && <UserAdmin />}
          {selectedAdminTab === 'static' && <Static />} */}
          {selectedAdminTab === 'create_exams' && <Create_Exams />}
          {/* {selectedAdminTab === 'exams' && <Exams />} */}
        </div>}
      </div>} 
      {
        checkUserOrAdmin === 'user' && <div className='slide'>
          <div className='slide-text'>
            {tabs.map(tab => (
              <div>
                <p className={`text ${selectedTab === tab ? 'active' : ''}`}
                  key={tab}
                  onClick={() => {
                    setSelectedTab(tab)
                    setcheckSearch('home_page')

                  }}
                  style={selectedTab === tab ? { textDecoration: 'underline', color: '#660000' } : {}}>
                  {tab}
                </p></div>
            ))}
          </div>
          {checkSearch === 'search' && <SearchResult />}
          {checkSearch === 'home_page' && <div>
            {selectedTab === 'Home' && <HomeTab />}
            {/* {selectedTab === 'Inprogress' && <InprogressTab />}
            {selectedTab === 'Completed' && <CompletedTab />} */}
          </div>}
        </div>
      }
    </div>
  );
}

export default Home;

