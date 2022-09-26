package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.MemoDto;
import data.service.MemoService;

@RestController
@CrossOrigin
@RequestMapping("/memo")
public class MemoController {
	
	@Autowired
	private MemoService service;
	
	@PostMapping("/insert")
	public void insertMemo(@RequestBody MemoDto dto) {
		service.insertMemo(dto);
	}
	
	@GetMapping("/list")
	public List<MemoDto> list(){
		return service.getMemoDatas();
	}
}
