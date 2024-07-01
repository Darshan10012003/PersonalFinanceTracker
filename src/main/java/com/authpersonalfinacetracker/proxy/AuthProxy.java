package com.authpersonalfinacetracker.proxy;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthProxy {

	private Long id;

	private String username;

	private String password;

	private String emailId;

	private Date birthDate;
	
	private Long otp;

	private LocalDateTime currentTimeandDate;

	private LocalDateTime otpVerifyTime;
}
