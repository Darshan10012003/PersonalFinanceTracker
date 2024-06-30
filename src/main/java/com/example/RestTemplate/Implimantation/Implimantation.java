package com.example.RestTemplate.Implimantation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.example.RestTemplate.Entity.Entity;
import com.example.RestTemplate.Repository.RestemplateRepo;

@Component
public class Implimantation {

	
	
	@Autowired
	private RestemplateRepo repo;
	
	@Autowired
	private RestTemplate restTemplate;
	
	public Implimantation(RestTemplate restTemplate) {
		super();
		this.restTemplate = restTemplate;
	}

	public String Savedata(Entity entity) 
	{
		HttpEntity<Entity> entityData  = new HttpEntity<>(entity) ;
		String body = restTemplate.exchange("http://localhost:7777/wallet/saveWalletData", HttpMethod.POST
				, entityData, String.class).getBody();
		return body;
		
	}
	
	
}
