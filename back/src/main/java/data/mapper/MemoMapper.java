package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.MemoDto;

@Mapper
public interface MemoMapper {

	public void insertMemo(MemoDto dto);
	public List<MemoDto> getMemoDatas();
	public void deleteMemo(int num);
}
