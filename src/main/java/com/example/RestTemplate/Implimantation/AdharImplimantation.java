package com.example.RestTemplate.Implimantation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
	System.out.println("hiii"+adharEntity);	
		Optional<AdharEntity> byAdharNumber = adharRepo.findByAdharNumber(adharEntity.getAdharNumber());
		
//		System.out.println(adharEntity3);
		if(byAdharNumber.isPresent()) {
			System.out.println("1111111111111");
			AdharEntity adharEntity3 = byAdharNumber.get();
		if(adharEntity.getAdharNumber().equals(adharEntity3.getAdharNumber())) {
			System.err.println("22222");
			adharEntity.setAdharNumber(adharEntity3.getAdharNumber());
			adharEntity.setMatchedId(adharEntity3.getAdharId());
			adharEntity.setRefNumber(adharEntity3.getRefNumber());
			adharEntity.setAdharEncryptedNo(adharEntity3.getAdharEncryptedNo());
		}
		}
		else {
			System.out.println("hello"+adharEntity);
			String uuidString = UUID.randomUUID().toString();
			adharEntity.setAdharNumber(adharEntity.getAdharNumber());
			adharEntity.setRefNumber(uuidString);
			String encodeAdharNumber = commonResponse.encode(adharEntity.getAdharNumber());
			adharEntity.setAdharEncryptedNo(encodeAdharNumber);
			System.err.println("ENCODED ADHAR NUMBER ---> " + encodeAdharNumber);
			
			
		}
		adharRepo.save(adharEntity);
		return "ADHAR DATA HAS BEEN SAVED";
	}
//	@Override
//	public String SaveAdharData(AdharEntity adharEntity) {
//		 System.out.println("Received Adhar Entity: " + adharEntity);
//
//	        Optional<AdharEntity> existingAdharEntityOptional = adharRepo.findFirstByAdharNumberOrderByAdharIdAsc(adharEntity.getAdharNumber());
//
//	        if (existingAdharEntityOptional.isPresent()) {
//	            AdharEntity existingAdharEntity = existingAdharEntityOptional.get();
//	            adharEntity.setMatchedId(existingAdharEntity.getAdharId());
//	            adharEntity.setRefNumber(existingAdharEntity.getRefNumber());
//	            System.err.println("Existing Adhar Number: " + existingAdharEntity.getAdharNumber());
//	        } else {
//	            System.out.println("New Adhar Entry: " + adharEntity);
//	            String uuidString = UUID.randomUUID().toString();
//	            adharEntity.setRefNumber(uuidString);
//	            String encodeAdharNumber = commonResponse.encode(adharEntity.getAdharNumber());
//	            adharEntity.setAdharEncryptedNo(encodeAdharNumber);
//	            System.err.println("Encoded Adhar Number: " + encodeAdharNumber);
//	        }
//
//	        adharRepo.save(adharEntity);
//	        return "ADHAR DATA HAS BEEN SAVED";
//    }
	@Override
	public String getAdharNumberFromEncryptedData(String adharNumber) 
	{
		Optional<AdharEntity> byAdharNo = adharRepo.findByAdharNumber(adharNumber);
		if (byAdharNo.isEmpty()) {
			throw new RuntimeException("ADHAR NUMBER IS NOT VALID ");
		}
		
		AdharEntity adharEntity = byAdharNo.get();
		return adharEntity.getAdharEncryptedNo();
	
	}
	
	@Override
	public Long getMatchId(String adharNumber) 
	{
		Optional<AdharEntity> byAdharNo = adharRepo.findByAdharNumber2(adharNumber);
		if (byAdharNo.isEmpty()) {
			throw new RuntimeException("ADHAR NUMBER IS NOT VALID ");
		}
		
		AdharEntity adharEntity = byAdharNo.get();
		System.err.println( "-------------->  "  + adharEntity.getMatchedId());
		return adharEntity.getMatchedId();
	
	}
	
	
}
