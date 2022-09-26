package data.service;

import java.util.List;
import data.dto.BoardDto;

public interface BoardServiceInter {

	public void insertBoard(BoardDto dto);
	public int getTotalCount();
	public List<BoardDto> getPagingList(int start, int perpage);
	public List<BoardDto> getAllDatas();
	public BoardDto getData(int num);
	public void updateReadCount(int num);
}
