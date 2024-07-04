package com.authpersonalfinacetracker.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.authpersonalfinacetracker.myuserdetails.MyUserDetails;
import com.authpersonalfinacetracker.utils.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private MyUserDetails myUserDetails;
	
	public static final String HEADERS_FOR_AUTH = "Authorization";
	public static final String BEARER = "Bearer ";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.err.println("errrrrrrrrrrrrrrrr >>>>>r  "+request.getHeaders("Authorization"));
		
		String header = request.getHeader(HEADERS_FOR_AUTH);
		String username =  null;
		String without_bearer_token =  null;
		if (header != null && header.startsWith(BEARER)) {
			without_bearer_token = header.substring(7);
			System.err.println("TOken"+without_bearer_token);
			username = jwtUtils.extractUsername(without_bearer_token);
		}
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userByUsername = myUserDetails.loadUserByUsername(username);
			if (jwtUtils.validateToken(without_bearer_token, userByUsername)) {
			UsernamePasswordAuthenticationToken	 usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userByUsername, null, userByUsername.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		filterChain.doFilter(request, response);
		
	}

}
