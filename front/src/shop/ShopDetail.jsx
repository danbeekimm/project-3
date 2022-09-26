import React, {useState, useEffect} from 'react';
import '../App.css';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShopDetail() {
  // .env 파일로부터 전역변수 사용(서버 재시작해야 적용)
  const SPRING_URL = process.env.REACT_APP_SPRING_URL;

  const {num} = useParams();
  const [data, setData] = useState(''); // dto가 들어갈 변수
  let navi = useNavigate();

  // url 등록
  let detailUrl = SPRING_URL + "shop/detail?num=" + num;
  let photoUrl  = SPRING_URL + "save/";
  let deleteUrl = SPRING_URL + "shop/delete?num=" + num;

  // 삭제 다이얼로그 모달 띄우기
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 스프링으로부터 num에 해당하는 data 받기
  const onDataReceive=()=>{
    axios.get(detailUrl)
    .then(res=>{
      // console.log(res.data.sangpum);
      setData(res.data);
    }).catch(err=>{
      alert(err.data);
    })
  }

  // 삭제 시 호출할 함수
  const onDelete=()=>{
    // console.log("delete");
    axios.delete(deleteUrl) // 서버컨트롤 @DeleteMapping
    .then(res=>{
      // 삭제 후 목록으로 이동
      navi("/shop/list");
    });

    handleClose(); // 다이얼로그 닫기
  }

  // 처음 렌더링시 위의 함수 호출
  useEffect(()=>{
    onDataReceive();
  }, []);

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h4>상품 삭제 확인</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>{data.sangpum}상품을 삭제하려면 [확인] 버튼을 눌러주세요</h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={onDelete} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <table className='table table-bordered' style={{width:'500px'}}>
        <caption><h3>상품 상세보기</h3></caption>
        <tbody>
          <tr>
            <td rowSpan='4' style={{width:'60%'}}>
              <img alt='' src={photoUrl + data.photo}/>
            </td> 
            <td>상품명:<br/>{data.sangpum}</td>  
          </tr>
          <tr>
            <td>수량:<br/>{data.su}개</td>
          </tr>
          <tr>
            <td>단가:<br/>{data.dan}원</td>
          </tr>
          <tr>
            <td>입고일:<br/>{data.ipgoday}</td>
          </tr>
          <tr style={{textAlign:'center'}}>
            <td colSpan='2' className='detail'>
              <button type='button' className='btn btn-info' 
                onClick={()=>{navi("/shop/list");}}>목록</button>
              <button type='button' className='btn btn-success' 
                onClick={()=>{navi("/shop/form");}}>상품추가</button>
              <button type='button' className='btn btn-warning' 
                onClick={()=>{navi(`/shop/updateform/${num}`)}}>수정</button>
              <button type='button' className='btn btn-danger' 
                onClick={handleClickOpen}>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}