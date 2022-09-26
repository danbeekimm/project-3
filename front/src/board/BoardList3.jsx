import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import '../App.css';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';




    
const BoardList3=()=>{
    const [data,setData]=useState({});
    const navi=useNavigate();

    const {currentPage}=useParams();

    //url 선언

    let pagelistUrl=process.env.REACT_APP_SPRING_URL+"board/pagelist?currentPage="+currentPage;
    let photoUrl=process.env.REACT_APP_SPRING_URL+"save/";


    //시작시 호출되는 함수
    const pagelist=()=>{
        axios.get(pagelistUrl,{photoUrl})
        .then(res=>{
            console.log(1);
            console.dir(res.data);
            setData(res.data);
        })
    }

    useEffect(()=>{
        pagelist();

    },[currentPage]); //currentpage가 변경될때마다 다시호출

    


    
    return(
        <div className="list3">
            <h3 className="alert alert-danger">
                총 {data.totalCount}개의 게시글이 있습니다
            </h3>
            <List sx={{ width: '120%', maxWidth: 360, bgcolor: 'background.paper' }}>
                
            {data.list && data.list.map((row,idx) => (
            <ListItem alignItems="flex-start" key={row.img} 
                onClick={()=>{
                navi(`/board/detail/${row.num}/${currentPage}`) //다른곳갔다와도 내가봤던 페이지에 머무름.
                }} style={{cursor:'pointer'}}>
                <ListItemAvatar  >
                <Avatar 
                alt="" className="photo_small" 
                src={photoUrl+row.photo}
                />
                </ListItemAvatar>
                <ListItemText style={{fontWeight:'bolder'}}
                
                primary={<span style={{fontSize:'15px',}} className='half-highlight'>{row.name}</span>}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        
                        
                    >
                        
                    </Typography>
                    <span style={{fontSize:'12px'}}><b>조회수 : {row.readcount} </b></span><br></br>
                    <span style={{fontSize:'12px'}}><b>내용 : {row.subject}</b></span>
                    <p style={{borderBottom:'1px solid gray', paddingBottom:'10px', width: '800px'}}></p>
                    </React.Fragment>
                }
                
                />
                
            </ListItem>))}
            {/* <Divider variant="inset" component="li" /> */}
            
            
            </List>
        {/* 페이징 */}
        <div style={{width:'700px', textAlign:'center'}}>
                    <ul className="pagination">
                        {
                            (data.startPage>1?
                                <li><Link to={`/board/list/${data.startPage-1}`}>이전</Link></li>:'')
                        }
                        {
                            //(): 자동리턴 {}: 리턴이있어야함 ,두줄이상
                            data.parr &&
                            data.parr.map(n=>{
                                const url="/board/list/"+n
                                return(
                                    <li>
                                        <Link to={url}>
                                            <b style={{color:n===Number(currentPage)?'red':'black'}}>{n}</b></Link>
                                    </li>
                                )

                            })
                        }
                    {
                        (data.endPage<data.totalPage?
                            <li><Link to={`/board/list/${data.endPage+1}`}>다음</Link></li>:'')
                        
                    }
                    </ul>
            </div>
        </div>
    )
}

    
export default BoardList3;