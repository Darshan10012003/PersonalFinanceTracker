package com.example.RestTemplate.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdharDTO {

	
	private Long id;
	private String name;
	private String accountNo;
	private String accountType;
	private Double balance;
	private String adharNumber;
}
