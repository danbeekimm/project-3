package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.ShopDto;
import data.mapper.ShopMapper;

@Service
public class ShopService implements ShopMapper {
	
	@Autowired
	private ShopMapper shopMapper;
	
	@Override
	public void insertShop(ShopDto dto) {
		shopMapper.insertShop(dto);		
	}
	
	@Override
	public List<ShopDto>getShopDatas(){
		return shopMapper.getShopDatas();
	}

	@Override
	public ShopDto getData(int num) {
		return shopMapper.getData(num);
	}
	
	@Override
	public void deleteShop(int num) {
		shopMapper.deleteShop(num);
	}
	
	@Override
	public void updateShop(ShopDto dto) {
		shopMapper.updateShop(dto);	
	}
}
