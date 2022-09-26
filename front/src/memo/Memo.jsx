import React,{useState,useEffect} from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MemoRowItem from "./MemoRowItem";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Memo=()=>{
    const BACKURL=process.env.REACT_APP_SPRING_URL;
    const [nickname,setNickname]=useState('');
    const [message,setMessage]=useState('');
    const [list,setList]=useState([]);
    

    let insertUrl=BACKURL+'memo/insert';
    let listUrl=BACKURL+'memo/list';
 

    const insertMemo =()=>{
        axios.post(insertUrl,{nickname,message})
        .then(res =>{
            setNickname('');
            setMessage('');
            getList();
        })
    }

    const getList = ()=>{
        axios.get(listUrl)
        .then(res =>{
            setList(res.data);
        })
    }

    //삭제 
    const deleteMemo =(url)=> {
        axios.delete(url)
        .then(res =>{
            alert('삭제성공');
            getList();
            // nav('/memo');
            
        })
    }

    //입력 keyup이벤트
    const txtEnter=(e)=>{
        if(e.key==='Enter'){
            insertMemo();
            e.target.value='';
        }
    }

   //입력 change이벤트
    const txtInput=(e)=>{
            
        setNickname(e.target.value);
        
    }

    const txtInput2=(e)=>{
            
        setMessage(e.target.value);
        
    }

    useEffect(()=>{
        getList();

    },[])

    return(
        
        <div>
            
            {/* memo form */}
            <div>
            <h2>MEMO</h2>
            <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <div>
            <TextField
            label="닉네임을 입력해주세요" onChange={txtInput}
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
            />

            <TextField
            label="메모를 입력해주세요" style={{fontSize:'25px'}}  onChange={txtInput2} onKeyUp={txtEnter}
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
            />
                
            </div>
            </Box>
            </div>
                
            
            
        
        
            {/* memo list */}
        <table className="table table-borderless" style={{width:'700px'}}>
        <thead>
            <tr style={{textAlign:"center"}}>
                <th width='150' style={{fontSize:'30px', textAlign:"center"}}>닉네임</th>
                <th width='550' style={{fontSize:'30px', textAlign:"center"}}>메세지</th>
                <th width='350' style={{fontSize:'30px', textAlign:"center"}}>작성일</th>
            </tr>
        </thead>
        <tbody>
                {
                    list.map((row,idx)=> (<MemoRowItem key={idx} row={row} del={deleteMemo}/>))
                }
        </tbody>
        </table>

    
    </div>

)
}

    export default Memo;