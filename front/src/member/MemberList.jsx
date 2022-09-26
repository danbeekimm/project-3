import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const MemberList = () => {
  const [memList, setMemList] = useState([]);
  
  const getList=()=>{
    const url = process.env.REACT_APP_SPRING_URL + 'member/list'; 

    axios.get(url)
    .then(res=>{
      setMemList(res.data);
      console.log(memList.length);
    })
  }

  const dataDelete=(num)=>{
    const url = process.env.REACT_APP_SPRING_URL + 'member/delete?num=' + num;
    axios.delete(url)
    .then(res=>{
      getList(); // 삭제 후 목록 다시 가져오기
    }) 
  }

  useEffect(()=>{
    getList();  
  }, []);

  return (
    <div>
      <table className='table table-bordered' style={{width:'600px'}}>
        <caption><h3>회원명단</h3></caption>
        <thead>
          <tr style={{backgroundColor:'#ddd'}}>
            <th width='50'>번호</th>
            <th width='70'>회원명</th>
            <th width='70'>아이디</th>
            <th width='100'>핸드폰</th>
            <th width='100'>이메일</th>
          </tr>
        </thead>
      </table>
      {
        memList.map((row, idx)=>(
          <table className='table' style={{width:'600px', margin:'0'}}>
            <tbody>
              <tr>
                <td width='50'>{idx + 1}</td>
                <td width='70'>{row.name}</td>
                <td width='70'>{row.id}</td>
                <td width='100'>{row.hp}</td>
                <td width='100'>{row.email}</td>
              </tr>
              <tr>
                <td colSpan={5}>주소 &gt;&gt; {row.addr} 
                  <span style={{float:'right'}}>
                    <button type='button' className='btn btn-danger btn-sm'
                    onClick={()=>{
                      dataDelete(row.num)
                    }}>Delete</button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        ))
      }
    </div>
  );
};

export default MemberList;