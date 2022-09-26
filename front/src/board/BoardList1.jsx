import React,{useState,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../App.css';
import axios from "axios";

const BoardList1=()=>{
    const [data,setData]=useState({});
    const navi=useNavigate();
    
    //현재 페이지번호
    const {currentPage}=useParams();

    //url 선언

    let pagelistUrl=process.env.REACT_APP_SPRING_URL+"board/pagelist?currentPage="+currentPage;
    let photoUrl=process.env.REACT_APP_SPRING_URL+"save/";

    //시작시 호출되는 함수
    const pagelist=()=>{
        axios.get(pagelistUrl)
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
        <div className="boardlist1">
            <h3 className="alert alert-danger">
                총 {data.totalCount}개의 게시글이 있습니다
            </h3>
            <br/>
            <table className="table table-bordered" style={{width:'800px'}}>
                <thead>
                    <tr style={{backgroundColor: '#ddd', }}>
                        <th width='50'>번호</th>
                        <th width='400'>제목</th>
                        <th width='180'>작성자</th>
                        <th width='150'>조회</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.list && 
                        //얘는 ()
                        data.list.map((row,idx)=>(
                            <tr>
                                <td>{data.no-idx}</td>
                                <td className="tdd" onClick={()=>{
                                    navi(`/board/detail/${row.num}/${currentPage}`) //다른곳갔다와도 내가봤던 페이지에 머무름.
                                }} style={{cursor:'pointer'}}>
                                    <img alt="" className="photo_small"
                                    src={photoUrl+row.photo}/>
                                    <b>{row.subject}</b>
                                </td>
                                <td>{row.name}</td>
                                <td>{row.readcount}</td>
                                
                            </tr>

                        ))
                    }
                </tbody>
            </table>
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
export default BoardList1;