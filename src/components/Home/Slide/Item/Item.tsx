import React from 'react';
import './Item.css';
import {Link} from 'react-router-dom'
import {useState} from 'react'


interface ItemProps {
  label: string;
  name: string;
  rating: number;
  imageSrc : string;
}

const Item = (props: ItemProps) => {
const { label, name, rating, imageSrc } = props;

return (
  <div className='item-xin'>
    <div className='item'>
      <img className='img-item' src={imageSrc} alt='' />
      <label className='label-item'>{label}</label>
      <p className='text-item'>{name}</p>
      <div className='rating-bar'>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`rating-star ${value <= rating ? 'active' : ''}`}
          >
            ★
          </span> 
        ))}
      </div>
      <a href=''>Learn more</a>
    </div>
  </div>
);
};
export default Item;

