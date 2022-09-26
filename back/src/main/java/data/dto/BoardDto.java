package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("board")
@Data
public class BoardDto {
	
	private int num;
	private int readcount;
	private String photo;
	private String id;
	private String name;
	private String subject;
	private String content;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Timestamp writeday;
	
}
