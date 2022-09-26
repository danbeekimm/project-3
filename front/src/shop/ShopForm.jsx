import React from 'react';
import { useState } from 'react';
import '../App.css';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function ShopForm() {
  const [photo, setPhoto] = useState('');
  const [sangpum, setSangpum] = useState('');
  const [su, setSu] = useState('');
  const [dan, setDan] = useState('');

  const navi = useNavigate();

  // url 등록
  let uploadUrl = "http://localhost:9009/shop/upload";
  let photoUrl = "http://localhost:9009/save/";
  let insertUrl = "http://localhost:9009/shop/insert";

  // file change 시 호출 이벤트
  const uploadImage = (e) => {
    const uploadFile = e.target.files[0];
    const imageFile = new FormData();
    imageFile.append("uploadFile", uploadFile);
    
    axios({
      method:'post',
      url:uploadUrl,
      data:imageFile,
      headers:{'Content-Type':'multipart/form-data'}
    }).then(res=>{
      setPhoto(res.data); // 백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
    }).catch(err=>{
      alert(err);
    }) 
  }

  // 추가하는 함수 이벤트
  const onInsert=()=>{

    axios.post(insertUrl, {sangpum:sangpum, su, dan}) // key==value 일 경우 키 생략가능
    .then(res=>{
      // insert 성공 후 처리할 코드들
      /*  페이지가 다르기 때문에 필요없음
          setSangpum('');
          setSu('');
          setDan('');
          setPhoto('');
      */   
      // 목록으로 이동
      navi("/shop/list");
    })
  }

  return (
    <>
      <table className='table table-bordered' style={{width:'600px'}}>
        <caption><b>상품등록</b></caption>
        <tbody>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>상품명</th>
            <td width='300'>
              <input type='text' className='form-control' style={{width:'250px'}}
                onChange={(e)=>{
                setSangpum(e.target.value);
              }}/>
            </td>
            <th>{sangpum}</th>
          </tr>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>상품사진</th>
            <td width='300'>
              <input type='file' className='form-control' style={{width:'250px'}}
                onChange={uploadImage}/>
            </td>
            <th>{photo}</th>
          </tr>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>수량</th>
            <td width='300'>
              <input type='text' className='form-control' style={{width:'120px'}}
                onChange={(e)=>{
                  setSu(e.target.value);
                }}/>
            </td>
            <th>{su}</th>
          </tr>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>단가</th>
            <td width='300'>
              <input type='text' className='form-control' style={{width:'150px'}}
                onChange={(e)=>{
                  setDan(e.target.value);
                }}/>
            </td>
            <th>{dan}</th>
          </tr>
          <tr style={{height:'160px'}}>
            <td colSpan='2'>
              <img alt='' src={photoUrl+photo} 
                style={{width:'120px', marginLeft:'130px'}}/>
            </td>
            <td>
              <button type='button' className='btn btn-success' 
                style={{width:'100px', height:'100px', marginLeft:'30px'}}
                  onClick={onInsert}>상품등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}