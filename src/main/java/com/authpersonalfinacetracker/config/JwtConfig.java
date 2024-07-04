package com.authpersonalfinacetracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.authpersonalfinacetracker.autentrypoint.AuthEntryPoint;
import com.authpersonalfinacetracker.filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class JwtConfig {

	@Autowired
	private AuthEntryPoint authEntryPoint;

	@Autowired
	private JwtFilter filter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(cs -> cs.disable()).cors(co -> co.disable())
				.authorizeHttpRequests(req -> req.requestMatchers("/auth/login","/auth/register","/auth/forgetPasswordUsingSendEmail","/auth/verifyotp","/auth/forgetPasswordEnter").permitAll().anyRequest().authenticated())
				.exceptionHandling(ex -> ex.authenticationEntryPoint(authEntryPoint))
				.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
