import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import '../App.css';

const Member=()=>{
  const navi = useNavigate();
  const [data, setData] = useState({
    id:'',
    name:'',
    pass:'',
    email:'',
    hp:'',
    addr:'',
    emailok:false
  });

  const [passOk, setPassOk] = useState(false);
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [btnOk, setBtnOk] = useState(false);
  

  // submit(required 사용하기위해(button(x))) 시 호출될 함수
  const onSave=(e)=>{
    e.preventDefault(); // 기본 이벤트를 무효화(onSubmit시 action으로 넘어가는것을 방지(로그 찍을려구 할때))
    // console.dir(data); // 데이터 구조를 보기위해
    
    if(!btnOk){
      alert("아이디 중복체크를 해주세요");
      return;
    }

    if(!passOk){
      alert("비밀번호를 확인해주세요");
      return;
    }

    if(!data.emailok){
      alert("이메일 중복 버튼을 눌러주세요");
      return;
    }

    const url = process.env.REACT_APP_SPRING_URL + "member/insert";
    axios.post(url, data)
    .then(res=>{
      // alert("insert 성공");
      navi("/login");
    });
  }
  // 폼 data 입력시 호출
  const onDataChange=(e)=>{
    const {name, value} = e.target;

    // 이벤트 발생 name이 pass일 경우 무조건 passOk 는 false
    if(name==='pass')
      setPassOk(false);

      setData({
        ...data,
        [name]:value
      })
  }
  // emil 선택 변경시 호출
  const onEmailChange=(e)=>{
    const {value} = e.target;
    if(value==='-')
      setEmail2('');
    else
      setEmail2(value);
  }
  // 2번째 pass 입력시 호출
  const onPassChange=(e)=>{
    const {value} = e.target;
    if(value===data.pass)
      setPassOk(true);
    else
      setPassOk(false);
  }
  // 아이디 중복체크 번튼 이벤트
  const onIdJungbok=()=>{
    const url = process.env.REACT_APP_SPRING_URL + "member/idcheck?id=" + data.id;
    
    if(data.id!=='') {
      axios.get(url)
      .then(res=>{
        if(res.data===0){
          setBtnOk(true);
          alert("가입 가능한 아이디입니다");
        } else{
          setBtnOk(false);
          alert("이미 가입된 아이디입니다");
          setData({
            ...data,
            id:''
          })
        }
      })
    }
  }


  return (
      <div>
          <form className="form-inline" onSubmit={onSave}>
            <table className="table table-bordered" style={{width:'500px'}}>
                <caption><h3><b>회원가입</b></h3></caption>
                <tbody>
                    <tr>
                      <th width='100'>아이디</th>
                      <td>
                          <input type='text' className="form-control"
                          style={{width:'130px'}} name="id" required
                          value={data.id}
                          onChange={onDataChange}/>
                          <button type="button" className="btn btn-danger btn-sm"
                          style={{marginLeft:'5px'}} onClick={onIdJungbok}>
                              중복체크
                          </button>
                      </td>
                    </tr>
                    <tr>
                        <th width='100'>이름</th>
                        <td>
                            <input type='text' className="form-control"
                            style={{width:'130px'}} name="name" 
                            onChange={onDataChange} required/>                            
                        </td>
                    </tr>
                    <tr>
                      <th width='100'>비밀번호</th>
                      <td>
                          <input type='password' className="form-control"
                          style={{width:'100px'}} name="pass" 
                          onChange={onDataChange} required/> 

                          <input type='password' className="form-control"
                          style={{width:'100px',marginLeft:'5px'}} 
                          onChange={onPassChange} required/>

                          <span style={{marginLeft:'5px',color:'red'}}>
                            {passOk?'ok':''}</span> 
                      </td>
                    </tr>

                    <tr>
                      <th width='100'>이메일</th>
                      <td>
                          <input type='text' className="form-control"
                          style={{width:'100px'}} name="email"
                          onChange={(e)=>{
                            setEmail1(e.target.value);
                          }} required/> 
                          <b>@</b>
                          <input type='text' className="form-control"
                          style={{width:'130px'}} 
                          defaultValue={email2}
                          onChange={(e)=>{
                            setEmail2(e.target.value);
                          }} required/>
                          &nbsp;&nbsp;
                          <select className="form-control" onChange={onEmailChange}>
                              <option value='-'>직접입력</option>
                              <option value='naver.com'>네이버</option>
                              <option value='nate.com'>네이트</option>
                              <option value='gmail.com'>구글</option>
                          </select>
                          <button type="button" className="btn btn-danger btn-sm"
                          onClick={()=>{
                            setData({
                              ...data,
                              email:`${email1}@${email2}`,
                              emailok:true
                            });
                            alert("이메일 중복 확인");
                          }}>
                            이메일 중복
                          </button>                           
                      </td>
                    </tr>
                    <tr>
                      <th width='100'>핸드폰</th>
                      <td>
                          <input type='text' className="form-control"
                          style={{width:'180px'}} name="hp" 
                          onChange={onDataChange} 
                          required/>                                                    
                      </td>
                    </tr>
                    <tr>
                      <th width='100'>주소</th>
                      <td>
                          <input type='text' className="form-control"
                          style={{width:'350px'}} name="addr" 
                          onChange={onDataChange} 
                          required/>                                                    
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{textAlign:'center'}}>
                          <button type="submit" className="btn btn-info">가입하기</button>
                          <button type="button" className="btn btn-warning"
                          style={{marginLeft:'5px'}} 
                          onClick={()=>{
                            navi('/member/list');
                          }}>회원명단</button>
                      </td>
                    </tr>
                </tbody>
            </table>
          </form>
      </div>
  )
}

export default Member;