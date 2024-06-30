package com.example.RestTemplate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.RestTemplate.Entity.Entity;
import com.example.RestTemplate.Implimantation.Implimantation;
import com.example.RestTemplate.Repository.RestemplateRepo;

@RestController
public class RestControler {

	@Autowired
	RestemplateRepo repo;
	
	@Autowired
	private Implimantation service;
	@PostMapping("save")
	public String Savedata(@RequestBody Entity entity) {
		System.err.println(entity);
	return service.Savedata(entity);
		
	}
	
	
}
