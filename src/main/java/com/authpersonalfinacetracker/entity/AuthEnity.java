package com.authpersonalfinacetracker.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthEnity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;

	private String password;

	private String emailId;
//	@JsonFormat(pattern="dd/MM/yyyy")
	private Date birthDate;
	
	private Long otp;

	private LocalDateTime currentTimeandDate;

	private LocalDateTime otpVerifyTime;

}
