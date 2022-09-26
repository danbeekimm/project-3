package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.MemberDto;
import data.service.MemberService;


@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/insert")
	public void insert(@RequestBody MemberDto dto ) 
	{
		System.out.println("insert>> " + dto.getEmail());
		memberService.insertMember(dto);
	}
	
	@GetMapping("/idcheck")
	public int idcheck(@RequestParam String id) {
		return memberService.idCheck(id);
	}
	
	@PostMapping("/login")
	public int login(@RequestBody MemberDto dto){
		// 모두 맞으면 1, 틀리면 0 반환
		System.out.println("login>>" + dto.getId());
		return memberService.loginCheck(dto.getId(), dto.getPass());
	}
	
	// id를 받으면 이름 반환 컨트롤러
	@GetMapping("/getname")
	public String getName(@RequestParam String id) {
//		System.out.println("param: " + id);
//		System.out.println("return: " + memberService.getName(id));
		return memberService.getName(id);
	}
	
	@GetMapping("/list")
	public List<MemberDto> list(){
		List<MemberDto> li = memberService.getAllMembers();
		System.out.println(li);
		return memberService.getAllMembers();
	}
	
	@DeleteMapping("/delete")
	public void delete(@RequestParam int num) {
		memberService.deleteMember(num);
	}
}




































