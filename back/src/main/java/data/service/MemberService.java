package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.MemberDto;
import data.mapper.MemberMapper;

@Service
public class MemberService implements MemberServiceInter{
	
	@Autowired
	private MemberMapper memberMapper;

	@Override
	public void insertMember(MemberDto dto) {
		// TODO Auto-generated method stub
		memberMapper.insertMember(dto);
	}

	@Override
	public List<MemberDto> getAllMembers() {
		// TODO Auto-generated method stub
		return memberMapper.getAllMembers();
	}

	@Override
	public String getName(String id) {
		// TODO Auto-generated method stub
		return memberMapper.getName(id);
	}

	@Override
	public int loginCheck(String id, String pass) {
		// TODO Auto-generated method stub
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("pass", pass);
		
		return memberMapper.loginCheck(map);
	}

	@Override
	public void deleteMember(int num) {
		// TODO Auto-generated method stub
		memberMapper.deleteMember(num);
	}
	
	@Override
	public int idCheck(String id) {
		// TODO Auto-generated method stub
		return memberMapper.idCheck(id);
	}
}
