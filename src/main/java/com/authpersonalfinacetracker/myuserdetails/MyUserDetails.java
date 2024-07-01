package com.authpersonalfinacetracker.myuserdetails;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.authpersonalfinacetracker.entity.AuthEnity;
import com.authpersonalfinacetracker.repo.AuthRepo;

@Configuration
public class MyUserDetails implements UserDetailsService {
	
	@Autowired
	private AuthRepo authRepo;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration builder) throws Exception {
		return builder.getAuthenticationManager();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AuthEnity byUsername = authRepo.findByEmailId(username);
		if (username.equals(byUsername.getEmailId())) {
			return new User(username, passwordEncoder().encode(byUsername.getPassword()), new ArrayList<>());
		}
		throw new UsernameNotFoundException("UserName Not Found..");
	}
	
	

}
