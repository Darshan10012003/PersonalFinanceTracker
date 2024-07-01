package com.example.RestTemplate.Implimantation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.RestTemplate.Entity.AdharEntity;
import com.example.RestTemplate.Helper.CommonResponse;
import com.example.RestTemplate.Repository.AdharRepo;
import com.example.RestTemplate.Service.AdharService;

@Component
public class AdharImplimantation implements AdharService{

	@Autowired
	private AdharRepo adharRepo;
	
	@Autowired
	private CommonResponse commonResponse;
	
	@Override
	public String SaveAdharData (AdharEntity adharEntity) 
	{
		
		Optional<AdharEntity> byAdharNumber = adharRepo.findByAdharNumber(adharEntity.getAdharNumber());
		
		if (byAdharNumber.isPresent()) {
			throw new RuntimeException("ADHAR NUMBER " +adharEntity.getAdharNumber() + " IS ALREADY REGISTERED");
		}
		
		String encodeAdharNumber = commonResponse.encode(adharEntity.getAdharNumber());
		adharEntity.setAdharEncryptedNo(encodeAdharNumber);
		System.err.println("ENCODED ADHAR NUMBER ---> " + encodeAdharNumber);
		
		adharRepo.save(adharEntity);
		
		return "ADHAR DATA HAS BEEN SAVED";
	}
	
	
	public String getAdharNumberFromEncryptedData(String adharNumber) 
	{
		Optional<AdharEntity> byAdharNo = adharRepo.findByAdharNumber(adharNumber);
		if (byAdharNo.isEmpty()) {
			throw new RuntimeException("ADHAR NUMBER IS NOT VALID ");
		}
		
		AdharEntity adharEntity = byAdharNo.get();
		return adharEntity.getAdharEncryptedNo();
	
	}
	
}
