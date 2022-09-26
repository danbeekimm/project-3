package util;

import java.time.LocalDate;
import java.time.LocalTime;

public class FileUtil {
	
	public String changeFileName(String fileName) {
		
		int dot = fileName.lastIndexOf('.');
		
		// . 부터 끝까지 확장자 추출
		String ext = fileName.substring(dot, fileName.length());
		
		String file = fileName.substring(0, dot); // dot 이전 추출
		
		LocalDate date = LocalDate.now();
		int y = date.getYear();
		int m = date.getMonthValue();
		int d = date.getDayOfMonth();
		
		LocalTime time = LocalTime.now();
		int hh = time.getHour();
		int mm = time.getMinute();
		int ss = time.getSecond();
				
		String renameFile = file + "_" + y 
				+ (m <10 ? "0"+m : m) 
				+ (d <10 ? "0"+d : d) 
				+ (hh<10 ? "0"+hh:hh)
				+ (mm<10 ? "0"+mm:mm)
				+ (ss<10 ? "0"+ss:ss)
				+ ext;
		
		return renameFile;
	}
}
