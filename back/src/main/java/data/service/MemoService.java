package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.MemoDto;
import data.mapper.MemoMapper;

@Service
public class MemoService implements MemoMapper{
	
	@Autowired
	private MemoMapper memoMapper;

	@Override
	public void insertMemo(MemoDto dto) {
		memoMapper.insertMemo(dto);
	}

	@Override
	public List<MemoDto> getMemoDatas() {
		return memoMapper.getMemoDatas();
	}

	@Override
	public void deleteMemo(int num) {
		memoMapper.deleteMemo(num);
	}

}
