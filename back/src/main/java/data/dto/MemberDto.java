package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("member") //data.dto.MemberDto 를 "member" 로 줄여 쓰겠다.
public class MemberDto {
	
//	private String num;
	private int num;
	
	private String id;
	private String name;
	private String email;
	private String pass;
	private String hp;
	private String addr;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Timestamp gaipday;
	
}
