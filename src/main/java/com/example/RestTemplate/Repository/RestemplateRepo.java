package com.example.RestTemplate.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.RestTemplate.Entity.Entity;

@Repository
public interface RestemplateRepo extends JpaRepository<Entity, Long> {

}
