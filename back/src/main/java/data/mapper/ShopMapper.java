package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.ShopDto;

@Mapper
public interface ShopMapper {
	public void insertShop(ShopDto dto);
	public List<ShopDto> getShopDatas();
	public ShopDto getData(int num);
	public void deleteShop(int num);// 사진도 삭제
	public void updateShop(ShopDto dto);
}
