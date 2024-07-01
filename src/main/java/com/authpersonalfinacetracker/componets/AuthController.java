package com.authpersonalfinacetracker.componets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authpersonalfinacetracker.proxy.AuthProxy;
import com.authpersonalfinacetracker.proxy.AuthRequest;
import com.authpersonalfinacetracker.proxy.AuthResponse;
import com.authpersonalfinacetracker.service.AuthService;


@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<String> postMethodName(@RequestBody AuthProxy authProxy) {
		System.out.println(authProxy.getBirthDate());
		return new ResponseEntity<String>(authService.registerDetails(authProxy),HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginWithCredentials1(@RequestBody AuthRequest request)
	{
		System.out.println("email"+request.getEmailId() + "pass" +request.getPassword());
		return new ResponseEntity<AuthResponse>(authService.loginWithCredentials(request),HttpStatus.ACCEPTED);
	}
	
	@PostMapping("forgetPasswordUsingSendEmail")
	public ResponseEntity<String> forgetPasswordSendOtp(@RequestBody AuthProxy authProxy) {
		return new ResponseEntity<String>(authService.forgetPasswordSendOtp(authProxy),HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/verifyotp/{email}/{otp}/{birthDate}")
	public Boolean Otpverify(@PathVariable String email,@PathVariable Long otp,@PathVariable java.util.Date birthDate) {
		System.out.println("Form Fronted..."+birthDate);
		return authService.Otpverify(email, otp, birthDate);
	}
	
	@GetMapping("forgetPasswordEnter/{email}/{password}")
	public ResponseEntity<String> forgetPasswordEnter(@PathVariable String email ,@PathVariable String password) {
		return new ResponseEntity<String>(authService.forgetPasswordEnter(email,password),HttpStatus.ACCEPTED);
	}

}
