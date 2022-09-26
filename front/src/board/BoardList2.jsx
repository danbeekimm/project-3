import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import '../App.css';
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';





    
const BoardList2=()=>{
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
        
        <div className="list2"><br></br>
            <h3 className="alert alert-danger">
                총 {data.totalCount}개의 게시글이 있습니다
            </h3>
            <ImageList sx={{ width: 800, height: 450 }}>
                
        {data.list && data.list.map((row,idx) => (
            <ImageListItem key={row.img}>
            
            <img
                alt="" className="photo_small"
                src={photoUrl+row.photo}
                onClick={()=>{
                    navi(`/board/detail/${row.num}/${currentPage}`) //다른곳갔다와도 내가봤던 페이지에 머무름.
                    }} style={{cursor:'pointer'}}/>
                
            <ImageListItemBar style={{fontSize:'40px' }}
                title={row.title}
                subtitle={<span class="drop-in-underline">by : {row.name} <br/>조회 수 : {row.readcount}회<br/>내용 : {row.subject}</span>}
                position="below"
            />
            </ImageListItem>
        ))}
        </ImageList>
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

    
export default BoardList2;