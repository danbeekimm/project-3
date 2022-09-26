import React, {useState, useEffect} from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import ShopRowItem from './ShopRowItem';

export default function Shop() {
  const navi = useNavigate();
  
  // 백엔드에서 받아 올 리스트 데이터 변수
  const [shopList, setShopList] = useState([]);
  // 데이터 가져오는 함수
  const list=()=>{
    let url = "http://localhost:9009/shop/list";

    axios.get(url)
    .then(res=>{
      // 서버(스프링)로부터 받아 온 List를  shopList에 넣기
      setShopList(res.data);
      // console.log("len=" + res.data.length);
    })
  }
  
  // 처음 렌더링 시 딱 한번만 데이터 가져오기
  useEffect(()=>{
    // console.log("list");
    list();
  }, []);

  return (
    <>
      <button type='button' className='btn btn-info' style={{width:'100px'}} 
        onClick={()=>{
          navi('/shop/form'); // 상품 폼 페이지로 이동
        }}>상품등록</button>
      <hr/>
      <table className='table table-bordered' style={{width:'500px'}}>
        <thead>
          <tr style={{backgroundColor:'#ddd'}}>
            <th width='50'>번호</th>
            <th width='350'>상품명</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {
            shopList.map((row, idx)=>(
              <ShopRowItem key={idx} idx={idx} row={row}/>
            ))
          }
        </tbody>
      </table>
    </>
  );
}