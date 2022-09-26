import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
// import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const [name, setName] = useState('');
  let id = localStorage.myid;

  const initFunc=()=>{
    const url = process.env.REACT_APP_SPRING_URL + "member/getname?id=" + id;
    axios.get(url)
    .then(res=>{
      setName(res.data);
    })
  }

  const btnLogout=()=>{
    localStorage.removeItem("loginok");
    localStorage.removeItem("myid");
    window.location.reload();
  }

  useEffect(()=>{
    initFunc();
  }, []); // 처음 랜더링시 한번만 호출

  return (
    <div style={{marginLeft:'100px', marginTop:'100px'}}>
      <b style={{fontSize:'20px'}}>{name}({id})님</b>
        <button type='button' className='btn btn-warning' style={{marginLeft:'50px'}}
        onClick={btnLogout}>로그아웃</button>
    </div>
  );
}