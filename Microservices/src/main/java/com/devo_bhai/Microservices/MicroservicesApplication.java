package com.devo_bhai.Microservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@EnableJpaRepositories("com.devo_bhai.Microservices.*")
@SpringBootApplication(scanBasePackages = {"controller","service","entity", "repository"})
@EntityScan("com.devo_bhai.Microservices.*")
public class MicroservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicesApplication.class, args);
	}

}
