package com.authpersonalfinacetracker.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.authpersonalfinacetracker.proxy.AuthProxy;
import com.authpersonalfinacetracker.proxy.AuthRequest;
import com.authpersonalfinacetracker.proxy.AuthResponse;

@Service
public interface AuthService {

	public String registerDetails(AuthProxy authProxy);

	public AuthResponse loginWithCredentials(AuthRequest authRequest);

	public String Sendemail(String to, String subject, String body);

	public String forgetPasswordSendOtp(AuthProxy authProxy);

	public boolean Otpverify(String email, Long otp, Date birthDate);

	public String forgetPasswordEnter(String email, String password);

	public Boolean validateToken();
}
