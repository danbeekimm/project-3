package data.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import data.dto.BoardDto;
import data.service.BoardService;
import data.service.MemberService;
import util.FileUtil;

@RestController
@CrossOrigin
@RequestMapping("/board")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private MemberService memberService;  // 회원 이름 얻기위해
	
	String photoName; // 리액트에서 업로드한 이미지명(변경된 이미지명일 수도...)
	
	// 리액트에서 이미지 업로드시 save 폴더에 저장 후 이미지명 반환
	@PostMapping("/upload")
	public String fileUpload(@RequestParam MultipartFile uploadFile,
			HttpServletRequest request) {
		// 파일명
		String fileName=uploadFile.getOriginalFilename();
		
		// 업로드할 폴더 위치
		String path = request.getServletContext().getRealPath("/save");
		
		// 직전에 업로드한 이미지 삭제하기
		File file = new File(path + "/" + photoName);
		// 만약 존재할 경우 삭제
		if(file.exists())
			file.delete();
		
		// 파일명 변경
		FileUtil fileUtil = new FileUtil();
		photoName = fileUtil.changeFileName(fileName);
		System.out.println("fileName=" + fileName + "=>" + photoName);
		
		// save 폴더에 업로드
		try {
			uploadFile.transferTo(new File(path + "/" + photoName));
		} catch(IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		
		return photoName;
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody BoardDto dto) {
//		System.out.println(dto);
		
		// id에 해당하는 이름 가져오기
		String name = memberService.getName(dto.getId());
		
		dto.setName(name);
		boardService.insertBoard(dto);
		
		photoName=null; // 이전 insert할때 지우지 않게
	}
	
	@GetMapping("/detail")
	public BoardDto detail(@RequestParam int num) {
		// 조회수 증가
		boardService.updateReadCount(num);
		// dto 반환
		return boardService.getData(num);
	}

	@GetMapping("/alllist")
	public List<BoardDto> getAllList(){
		return boardService.getAllDatas();
	}
	
	@GetMapping("/pagelist")
	public Map<String, Object> getPageList(
			@RequestParam(defaultValue = "1") int currentPage)
	{
		System.out.println("currentPage=" + currentPage);
		
		// 페이징처리
		int totalCount;   	// 총 갯수
		int perPage  = 2;  	// 한 페이지당 보여질 글의 개수
		int perBlock = 5; 	// 한 블럭당 보여질 페이지 수
		int totalPage;		// 총 페이지 수
		int startNum;		// 한 페이지에서 보여질 시작 글번호
		int startPage;		// 한 블럭에서 보여질 시작 페이지 번호
		int endPage; 		// 한 블럭에서 보여질 끝 페이지 번호
		int no; 			// 각 페이지당 보여질 시작 번호
		
		// 총 글의 개수를 구한다
		totalCount = boardService.getTotalCount();
		
		// 총 페이지 수를 구한다
		   totalPage = totalCount/perPage + (totalCount % perPage == 0 ? 0 : 1);
		// totalPage = (int)Math.ceil((double)totalCount/perPage);
		
		// 각 블럭의 시작페이지(한 블럭당 5개일 경우)
		// 1, 6, 11 ...(currentPage가 1~5 이면 1, 6~10 이면 6)
		startPage = (currentPage-1)/perBlock * perBlock + 1;
				
	    // 5, 10, 15 ..(currentPage가 1~5 이면 5, 6~10 이면 10)
	    endPage = startPage + perBlock -1;
	    
	    // 마지막 블럭에서는 마지막 페이지(총 페이지수)까지만 나오게
	    if(endPage > totalPage)
	    	endPage = totalPage;
	    
	    // 각 페이지에서 보여질 글의 시작번호(mysql은 0 부터)
	    // 예) 한 페이지당 3개일 경우 1페이지:0, 2페이지:3, 3페이지:6 ...
	    startNum = (currentPage - 1) * perPage;
	    
	    // 각 페이지당 보여질 시작번호
	    no = totalCount - (currentPage - 1) * perPage;
	    
	    // 데이터 가져오기
	    List<BoardDto> list = boardService.getPagingList(startNum, perPage);
	    
	    // 출력할 페이지 번호
	    Vector<Integer> parr = new Vector<>();
	    
	    for(int pp = startPage; pp <= endPage; pp++) {
	    	parr.add(pp);
	    }
	    
	    // 리턴할 Map에 필요한 변수들 넣기
	    Map<String, Object> map = new HashMap<>();
	    
	    map.put("list", list);
	    map.put("parr", parr);
	    map.put("totalCount", totalCount);
	    map.put("totalPage", totalPage);
	    map.put("startPage", startPage);
	    map.put("endPage", endPage);
	    map.put("no", no);
	    
	    return map;
	    
	}
}
