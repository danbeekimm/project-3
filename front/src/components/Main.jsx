import React from 'react';
import '../App.css';
import mainimg1 from '../image/K-036.png';
import mainimg2 from '../image/K-039.png';
import mainimg3 from '../image/K-041.png';
import mainimg4 from '../image/mainImg.png';

export default function Main() {
  return (
    <>
      <h2>비트캠프</h2>
      <img src={mainimg1} className='main' alt=''/>
      <img src={mainimg2} className='main' alt=''/>
      <br/><br/>
      <img src={mainimg3} className='main' alt=''/>
      <img src={mainimg4} className='main' alt=''/>
    </>
  );
}