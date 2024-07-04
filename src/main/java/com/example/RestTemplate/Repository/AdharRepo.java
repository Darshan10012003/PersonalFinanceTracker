package com.example.RestTemplate.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.RestTemplate.Entity.AdharEntity;

import jakarta.transaction.Transactional;

@Repository
public interface AdharRepo extends JpaRepository<AdharEntity, Long>{

	
//	Optional<AdharEntity> findByAdharNumber(String adharNumber);
	
//	Optional<AdharEntity> findByAdharNumber();
	
//	@Modifying
//	@Transactional
//	@Query("UPDATE AdharEntity s SET s.matchedId = :newName, WHERE s.RollNo = :sid")
//	void updateNameByRollNo(@Param("sid") Long sid, @Param("newName") String newName 
//			,@Param("address") String address , @Param("age") int age );
//	
//	@Query("SELECT a FROM AdharEntity a WHERE a.adharNumber = ?1 ORDER BY a.adharId ASC")
//    Optional<AdharEntity> findFirstByAdharNumberOrderByAdharIdAsc(String adharNumber);
	
	 @Query("SELECT a FROM AdharEntity a WHERE a.adharNumber = ?1 ORDER BY a.adharId ASC")
	    Optional<AdharEntity> findFirstByAdharNumberOrderByAdharIdAsc(String adharNumber);
	 
	 
//	 @Query("(select min(adharId) from AdharEntity group by adharNumber =: nadharNumber having count(*)>1)")
//	 Optional<AdharEntity> findByAdharNumber2(@Param ("nadharNumber") String nadharNumber);
	 
	 @Query("SELECT a FROM AdharEntity a WHERE a.adharId = (SELECT MIN(b.adharId) FROM AdharEntity b WHERE b.adharNumber = :nadharNumber GROUP BY b.adharNumber HAVING COUNT(b.adharNumber) >= 1)")
	 Optional<AdharEntity> findByAdharNumber(@Param("nadharNumber") String nadharNumber);

	 @Query("SELECT a FROM AdharEntity a WHERE a.adharId = (SELECT MAX(b.adharId) FROM AdharEntity b WHERE b.adharNumber = :nadharNumber GROUP BY b.adharNumber HAVING COUNT(b.adharNumber) >= 1)")
	 Optional<AdharEntity> findByAdharNumber2(@Param("nadharNumber") String nadharNumber);
	
//	Opional<AdharEntity> findByAdharEncryptedNo();
	
}
