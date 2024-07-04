package com.example.RestTemplate.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdharEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long adharId;
	
	private String adharNumber;
	
	private String adharEncryptedNo;
	
	private String name;
	
	private String refNumber;
	
	private Long matchedId;

}
