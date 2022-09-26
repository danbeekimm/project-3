import React, {useState, useEffect} from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import BoardList1 from './BoardList1';
import BoardList2 from './BoardList2';
import BoardList3 from './BoardList3';

export default function Board() {
  const [show, setShow] = useState(1);
  const navi = useNavigate();

  return (
    <div>
      <button type='button' className='btn btn-info'
      style={{width:'110px', marginTop:'10px'}}
      onClick={()=>{
        navi("/board/form");
      }}>글쓰기</button>

      <div className='list-icon'>
        <span className='glyphicon glyphicon-th-list bicon' 
        style={{color:show===1?'green':'magenta'}}
        onClick={()=>{
          setShow(1);
        }}></span>
        <span className='glyphicon glyphicon-th-large'
        style={{color:show===2?'green':'magenta'}}
        onClick={()=>{
          setShow(2);
        }}></span>
        <span className='glyphicon glyphicon-list-alt'
        style={{color:show===3?'green':'magenta'}}
        onClick={()=>{
          setShow(3);
        }}></span>
      </div>
      <div>
        {
          show===1?<BoardList1/>:show===2?<BoardList2/>:<BoardList3/>
        }
      </div>
    </div>
  );
}