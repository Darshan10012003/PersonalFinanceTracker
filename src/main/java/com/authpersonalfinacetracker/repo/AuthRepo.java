package com.authpersonalfinacetracker.repo;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.authpersonalfinacetracker.entity.AuthEnity;


@Repository
public interface AuthRepo extends JpaRepository<AuthEnity, Long>{
	
	AuthEnity findByUsername(String username);
	
	AuthEnity findByEmailId(String emailId);
	
	AuthEnity findByEmailIdAndBirthDate(String emailId,Date birthDate);
	

}
