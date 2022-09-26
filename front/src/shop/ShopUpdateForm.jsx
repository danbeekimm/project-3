import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

export default function ShopUpdateForm() {
  const {num} = useParams(); // 상품번호 받기
  // const [data, setData] = useState(''); // dto가 들어갈 변수

  const [photo, setPhoto] = useState('');
  const [sangpum, setSangpum] = useState('');
  const [su, setSu] = useState('');
  const [dan, setDan] = useState('');

  const navi = useNavigate();

  // url 등록
  let uploadUrl  = "http://localhost:9009/shop/upload";
  let photoUrl   = "http://localhost:9009/save/";
  let detailUrl  = "http://localhost:9009/shop/detail?num=" + num;
  let updatetUrl = "http://localhost:9009/shop/update";
  
  // 스프링으로부터 num에 해당하는 data 받기
  const onDataReceive=()=>{
    axios.get(detailUrl)
    .then(res=>{
      // console.log(res.data.sangpum);
      // setData(res.data);
      setSangpum(res.data.sangpum);
      setPhoto(res.data.photo);
      setSu(res.data.su);
      setDan(res.data.dan);
    }).catch(err=>{
      alert(err.data);
    })
  }  

  // 처음 렌더링시 위의 함수 호출
  useEffect(()=>{
    onDataReceive();
  }, []);

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
  const onUpdate=()=>{
    axios.post(updatetUrl, {num, sangpum, su, dan}) // key==value 일 경우 키 생략가능
    .then(res=>{
      // 상세보기 페이지로 이동
      navi(`/shop/detail/${num}`);
    })
  }

  return (
    <>
      <table className='table table-bordered' style={{width:'600px'}}>
        <caption><b>상품 수정 (상품번호 : {num}) </b></caption>
        <tbody>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>상품명</th>
            <td width='300'>
              <input type='text' className='form-control' style={{width:'250px'}} defaultValue={sangpum}
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
              <input type='text' className='form-control' style={{width:'120px'}} defaultValue={su}
                onChange={(e)=>{
                  setSu(e.target.value);
                }}/>
            </td>
            <th>{su}</th>
          </tr>
          <tr>
            <th width='100' style={{backgroundColor:'#fef'}}>단가</th>
            <td width='300'>
              <input type='text' className='form-control' style={{width:'150px'}} defaultValue={dan}
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
              <button type='button' className='btn btn-warning' 
                style={{width:'100px', height:'100px', marginLeft:'30px'}}
                  onClick={onUpdate}>상품수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}