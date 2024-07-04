package com.authpersonalfinacetracker.impl;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.authpersonalfinacetracker.entity.AuthEnity;
import com.authpersonalfinacetracker.myuserdetails.MyUserDetails;
import com.authpersonalfinacetracker.proxy.AuthProxy;
import com.authpersonalfinacetracker.proxy.AuthRequest;
import com.authpersonalfinacetracker.proxy.AuthResponse;
import com.authpersonalfinacetracker.repo.AuthRepo;
import com.authpersonalfinacetracker.service.AuthService;
import com.authpersonalfinacetracker.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class AuthImpl implements AuthService {

	@Autowired
	private AuthRepo authRepo;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private MyUserDetails myUserDetails;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public String registerDetails(AuthProxy authProxy) {
		// TODO Auto-generated method stub
		ObjectMapper objectMapper = new ObjectMapper();
		AuthEnity convertValue = objectMapper.convertValue(authProxy, AuthEnity.class);
		authRepo.save(convertValue);
		return "Save Successfully..";
	}

	@Override
	public AuthResponse loginWithCredentials(AuthRequest authRequest) {
		// TODO Auto-generated method stub
		if (authRequest != null) {
			try {
				Authentication authenticate = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(authRequest.getEmailId(), authRequest.getPassword()));
				authenticate.isAuthenticated();

			} catch (Exception e) {
				e.printStackTrace();
				throw new UsernameNotFoundException("user name not found!!");
			}
		}
		UserDetails userByUsername = myUserDetails.loadUserByUsername(authRequest.getEmailId());
		String token = null;
		if (userByUsername != null) {
			token = jwtUtils.generateToken(userByUsername);
		}
		AuthResponse authResponse = new AuthResponse(token);
		return authResponse;
	}

	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public String Sendemail(String to, String subject, String body) {
		// TODO Auto-generated method stub
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom(sender);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setText(body);
			javaMailSender.send(mimeMessage);
			return "Email Send";
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		}
	}

	@Override
	public String forgetPasswordSendOtp(AuthProxy authProxy) {
		// TODO Auto-generated method stub
		String emailId = authProxy.getEmailId();
		Date birthDate = authProxy.getBirthDate();
		if (emailId != null && birthDate != null) {
			AuthEnity byEmailIdAndPassword = authRepo.findByEmailIdAndBirthDate(emailId, birthDate);
//			if(byEmailIdAndPassword.getEmailId().equals(emailId)&&byEmailIdAndPassword.getBirthDate().equals(birthDate)) {
			if (byEmailIdAndPassword.getEmailId().equals(emailId)) {
				AuthEnity authEnity = new AuthEnity();
				Random random = new Random();
				long nextLong = random.nextLong(999999);
				LocalDateTime curreDateTime = LocalDateTime.now();
				authEnity.setCurrentTimeandDate(curreDateTime);
				authEnity.setId(byEmailIdAndPassword.getId());
				authEnity.setBirthDate(byEmailIdAndPassword.getBirthDate());
				authEnity.setUsername(byEmailIdAndPassword.getUsername());
				authEnity.setEmailId(emailId);
				authEnity.setPassword(byEmailIdAndPassword.getPassword());
				authEnity.setOtp(nextLong);
				authRepo.save(authEnity);
				String body = "Your Otp is" + " " + nextLong;
				String subject = "Otp Verification Code..";
				Sendemail(byEmailIdAndPassword.getEmailId(), subject, body);
				return "Send Successfully....";
			} else {
				return "Email Or BirthDate Not Match...";
			}

		}
		return "EmailId or BirthDate Not Shoud Be null";

	}

	@Value("${otpvalidationtimeinminutes}")
	private Integer otptime;

	@Override
	public boolean Otpverify(String email, Long otp, java.util.Date birthDate) {
		// TODO Auto-generated method stub
//		AuthEnity byEmailIdAndBirthDate = authRepo.findByEmailIdAndBirthDate(email,birthDate);
		AuthEnity byEmailIdAndBirthDate = authRepo.findByEmailId(email);
		LocalDateTime otpverifytime = LocalDateTime.now();

		
		byEmailIdAndBirthDate.setOtpVerifyTime(otpverifytime);
		authRepo.save(byEmailIdAndBirthDate);
		int result = 0;
		if (byEmailIdAndBirthDate != null && email.equals(byEmailIdAndBirthDate.getEmailId())
				&& otp.equals(byEmailIdAndBirthDate.getOtp())
				&& birthDate.equals(byEmailIdAndBirthDate.getBirthDate())) {
			LocalDateTime dbcurrentTimeandDate = byEmailIdAndBirthDate.getCurrentTimeandDate();
			result = otpverifytime.getMinute() - dbcurrentTimeandDate.getMinute();
			if (result <= otptime) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public String forgetPasswordEnter(String email, String password) {
		// TODO Auto-generated method stub
		AuthEnity byEmailId = authRepo.findByEmailId(email);
		byEmailId.setPassword(password);
		authRepo.save(byEmailId);
		return "Update Successfully..";
	}

	@Override
	public Boolean validateToken() {
		// TODO Auto-generated method stub
		return Boolean.TRUE;
	}

}
