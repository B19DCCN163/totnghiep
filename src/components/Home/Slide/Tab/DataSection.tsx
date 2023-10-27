import React from 'react';
import './../Slide.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Item from './../Item/Item'
import next from './../../../layout/img/next.png'
import back from './../../../layout/img/back.png'
// import { fakeData1, fakeData2,fakeData3, fakeDataAdmin, DataSearch } from './../fakeData'
// import logo from './../../layout/img/logo.png'
// import search from './../../layout/img/search.png'
// import noti from './../../layout/img/noti.png'
// import setting from './../../layout/img/setting.png'
// import user from './../../layout/img/user.png'



export interface DataRender {
    displayItems: any[];
    handleItemsChange: (nextStartIndex: number) => void;
    startIndex: number;
    data: any;
}

export const DataSection = ({
    displayItems,
    handleItemsChange,
    startIndex, 
    data,
  }: {
    displayItems: any[];
    handleItemsChange: (nextStartIndex: number) => void;
    startIndex: number;
    data: any;
  }) => {
    const canGoNext = startIndex + 3 < data.items.length;
  
    return (
      <div>
        <div className='component1'>
        <p className='tittle-item'>{data.name}</p>
        <div className='all-item'>
            {startIndex > 0 && <img className='img-back' src={back} onClick={() => handleItemsChange(startIndex - 3)} /> }
            <div className='item-three'> 
            {displayItems.map((item) => (
            <div className='item-one'>
            <Item {...item} key={item.id}/>
            </div>
            ))}
            </div>
           { canGoNext && <img className='img-next' src={next}  onClick={() => handleItemsChange(startIndex + 3)} />   }         
        </div>

        <div className='all-circle'>
              <button className={`circle ${startIndex > 0 ? 'active' : ''}`} 
              style={startIndex === 0 ? { background : '#000000' } : {}}></button>
              <button className={`circle ${startIndex > 0 ? 'active' : ''}`} 
              style={startIndex > 0 && canGoNext ? { background : '#000000' } : {}}></button>
              <button className={`circle ${startIndex > 0 ? 'active' : ''}`} 
              style={!canGoNext ? { background : '#000000' } : {}}></button>
        </div>
        </div>
      </div>
      
    );
    }