import React, { useState } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const BoardDetail = () => {
  const {num, currentPage} = useParams();
  const [dto, setDto] = useState('');
  const navi = useNavigate();

  // url선언
  let detailUrl = process.env.REACT_APP_SPRING_URL + 'board/detail?num=' + num;
  let photoUrl  = process.env.REACT_APP_SPRING_URL + 'save/';

  const getData=()=>{
    axios.get(detailUrl)
    .then(res=>{
      setDto(res.data);
    })
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <div>
      <table className='table' style={{width:'500px'}}>
        <caption><h3>{dto.subject}</h3></caption>
        <tbody>
          <tr>
            <td>
              <b>작성자: {dto.name}({dto.id})</b>
              <span style={{float:'right', color:'gray'}}>{dto.writeday}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img alt='' src={photoUrl + dto.photo}
                style={{maxWidth:'400px'}}/>
                <br/><br/>
                <p style={{backgroundColor:'white', border:'none', maxWidth:'300px'}}>
                  {dto.content}
                </p>
            </td>
          </tr>
          <tr>
            <td><b style={{color:'gray'}}>조회 {dto.readcount}</b></td>
          </tr>
          <tr>
            <td>
              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi("/board/form");
              }}>글쓰기</button>

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRigth:'10px'}}
              onClick={()=>{
                navi(`/board/list/${currentPage}`);
              }}>목록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoardDetail;

