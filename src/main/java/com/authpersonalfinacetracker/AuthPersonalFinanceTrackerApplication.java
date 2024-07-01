package com.authpersonalfinacetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class AuthPersonalFinanceTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthPersonalFinanceTrackerApplication.class, args);
	}

}
