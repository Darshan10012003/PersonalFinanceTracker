package com.example.RestTemplate.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.RestTemplate.Entity.AdharEntity;

@Repository
public interface AdharRepo extends JpaRepository<AdharEntity, Long>{

	
	Optional<AdharEntity> findByAdharNumber(String adharNumber);
	
//	Optional<AdharEntity> findByAdharNumber();
	
//	Optional<AdharEntity> findByAdharEncryptedNo();
	
}
