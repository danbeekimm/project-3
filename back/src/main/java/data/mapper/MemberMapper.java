package data.mapper;

import java.util.List;
//import java.util.Map;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.MemberDto;

@Mapper
public interface MemberMapper {
	
	public void insertMember(MemberDto dto);
	public List<MemberDto> getAllMembers();
	public String getName(String id);
	public int loginCheck(Map<String, String> map);
	public void deleteMember(int num);
	public int idCheck(String id);
	
//	public int getTotalCount();
//	public int getSearchId(String id);
//	public int login(Map<String, String> map);
}
