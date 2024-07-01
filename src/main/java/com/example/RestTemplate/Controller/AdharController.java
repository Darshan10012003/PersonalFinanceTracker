package com.example.RestTemplate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RestTemplate.Entity.AdharEntity;
import com.example.RestTemplate.Service.AdharService;

@RestController
@RequestMapping("/adhar")
public class AdharController {
	
	
	@Autowired
	private AdharService adharService;
	
	@PostMapping("/saveAdharData")
	public ResponseEntity<String> SaveAdharData (@RequestBody AdharEntity adharEntity) 
	{
		return new ResponseEntity<>(adharService.SaveAdharData(adharEntity) , HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getEncryptedRef/{adharNumber}")
	public ResponseEntity<String> getAdharNumberFromEncryptedData(@PathVariable("adharNumber") String adharNumber) 
	{
		return new ResponseEntity<String>(adharService.getAdharNumberFromEncryptedData(adharNumber) , HttpStatus.OK);
	}

}
