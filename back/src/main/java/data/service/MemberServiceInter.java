package data.service;

import java.util.List;

import data.dto.MemberDto;

public interface MemberServiceInter  {

	public void insertMember(MemberDto dto);
	public List<MemberDto> getAllMembers();
	public String getName(String id);
	public int loginCheck(String id, String pass);
	public void deleteMember(int num);
	public int idCheck(String id);
}
