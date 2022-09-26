package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("memo")
@Data
public class MemoDto {
//	   num 
//	   nickname 
//	   message 
//	   writeday 
	private int num;
	private String nickname;
	private String message;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp writeday;
}
