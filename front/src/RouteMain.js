import React from 'react';
import './App.css';
import {
  Route, 
  Routes
} from 'react-router-dom';
import {About, Info, Main, Menu,Title} from './components';
import Board from './board/Board';
import Login from './login/Login';
import {Shop, ShopDetail, ShopForm} from './shop';
import Member from './member/Member';
import ShopUpdateForm from './shop/ShopUpdateForm';
import Memo from './memo/Memo';
import MemberList from './member/MemberList';
import BoardForm from './board/BoardForm';
import BoardList1 from './board/BoardList1';
import BoardList3 from './board/BoardList3';
import BoardList2 from './board/BoardList2';
import BoardDetail from './board/BoardDetail';

export default function RouteMain() {
  return (
    <>
      <div className='title'><Title/></div>
      <div className='info'><Info/></div>
      <div className='menu'><Menu/></div>

      <div className='main'>
        <Routes>
          <Route path='/' element={<Main/>}/>
          
          {/* Shop */}
          <Route path='/shop/list' element={<Shop/>}/>
          <Route path='/shop/form' element={<ShopForm/>}/>
          <Route path='/shop/detail/:num' element={<ShopDetail/>}/>
          <Route path='/shop/updateform/:num' element={<ShopUpdateForm/>}/>

          {/* Memo */}
          <Route path='/memo' element={<Memo/>}/>

          {/* Board */}
          <Route path='/board/list/:currentPage' element={<Board/>}/>
          <Route path='/board/form' element={<BoardForm/>}/>
          <Route path='/board/detail/:num/:currentPage' element={<BoardDetail/>}/>

          {/* Member */}
          <Route path='/member/form' element={<Member/>}/>
          <Route path='/member/list' element={<MemberList/>}/>
          
          {/* Login */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>

          <Route path='*' element={
            <div>
              <h1>잘못된 URL 주소입니다.</h1>
            </div>
          }/>
        </Routes>
      </div>

    </>
  );
}