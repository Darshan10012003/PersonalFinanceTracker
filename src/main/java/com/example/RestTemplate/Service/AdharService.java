package com.example.RestTemplate.Service;

import org.springframework.stereotype.Service;

import com.example.RestTemplate.Entity.AdharEntity;

@Service
public interface AdharService {

	
	public String SaveAdharData (AdharEntity adharEntity) ;
	
	public String getAdharNumberFromEncryptedData(String adharNumber) ;
	public Long getMatchId(String adharNumber) ;
	
}
