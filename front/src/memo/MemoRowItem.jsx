import React from "react";
import "../App.css";



const MemoRowItem=({row,del})=>{
    const BACKURL=process.env.REACT_APP_SPRING_URL;
    let deleteUrl=BACKURL+'memo/delete?num='+row.num;
    // const nav=useNavigate();

    

    return(

        <tr>
        
        <td>
            <b>{row.nickname}</b>
        </td>
        <td>
            <b>{row.message}</b>
        </td>
        <td>
            <b>{row.writeday}</b>
        </td>
        <td>
        {/* <span class="glyphicon glyphicon-envelope">
                onClick={deleteMemo}>delete</span> */}
                <span className="glyphicon glyphicon-remove" style={{color:'red', cursor:'pointer'}}
                onClick={()=>{del(deleteUrl)}}></span>
                {/* e 말고 다른 파라미터쓸땐 위 형식으로써야함 */}
        </td>
        </tr>
)
}


export default MemoRowItem;