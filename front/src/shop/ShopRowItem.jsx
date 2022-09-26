import React from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';

export default function ShopRowItem({idx, row}) {
  let photoUrl = "http://localhost:9009/save/";
  const navi = useNavigate();

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        <img alt='' src={photoUrl + row.photo} className="small"/>
        <b>{row.sangpum}</b>
      </td>
      <td>
        <button type="button" className='btn btn-info btn-sm'
          onClick={()=>{
            // navi(`/shop/detail/${row.num}`)
            navi("/shop/detail/" + row.num); // 위와 같다
          }}>detail</button>
      </td>
    </tr>
  );
}