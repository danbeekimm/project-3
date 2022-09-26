package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.BoardDto;
import data.mapper.BoardMapper;

@Service
public class BoardService implements BoardServiceInter {

	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public void insertBoard(BoardDto dto) {
		// TODO Auto-generated method stub
		boardMapper.insertBoard(dto);
	}

	@Override
	public int getTotalCount() {
		// TODO Auto-generated method stub
		return boardMapper.getTotalCount();
	}

	@Override
	public List<BoardDto> getPagingList(int start, int perpage) {
		// TODO Auto-generated method stub
		Map<String, Integer> map = new HashMap<>();
		map.put("start", start);
		map.put("perpage", perpage);
		
		return boardMapper.getPagingList(map);
	}

	@Override
	public List<BoardDto> getAllDatas() {
		// TODO Auto-generated method stub
		return boardMapper.getAllDatas();
	}

	@Override
	public BoardDto getData(int num) {
		// TODO Auto-generated method stub
		return boardMapper.getData(num);
	}

	@Override
	public void updateReadCount(int num) {
		// TODO Auto-generated method stub
		boardMapper.updateReadCount(num);
	}

}
