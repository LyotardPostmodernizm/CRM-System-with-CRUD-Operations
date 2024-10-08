package com.crmSystemDevelopment.spring_boot;

import com.crmSystemDevelopment.spring_boot.configuration.SecurityConfig;
import com.crmSystemDevelopment.spring_boot.model.Customer;
import com.crmSystemDevelopment.spring_boot.model.User;
import com.crmSystemDevelopment.spring_boot.repository.CustomerRepository;
import com.crmSystemDevelopment.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class Application implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private UserRepository userRepository;


	@Override
	public void run(String... args) throws Exception {
//		Customer customer = new Customer();
//		customer.setFirstName("John");
//		customer.setLastName("Doe");
//		customer.setEmail("john.doe@example.com");
//		customer.setRegion("North America");
//		customer.setRegistrationDate(LocalDate.ofEpochDay(2023-6-15));
//		customerRepository.save(customer);
//
//		Customer customer2 = new Customer();
//		customer2.setFirstName("Jane");
//		customer2.setLastName("Smith");
//		customer2.setEmail("jane.smith@example.com");
//		customer2.setRegion("Europe");
//		customer2.setRegistrationDate(LocalDate.ofEpochDay(2023-5-10));
//		customerRepository.save(customer2);

//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String encodedPassword = passwordEncoder.encode("admin");
//
//		User adminUser = new User();
//		adminUser.setUsername("admin");
//		adminUser.setPassword(encodedPassword);
//		adminUser.setRole("admin");
//		adminUser.setCreatedAt(LocalDate.now());
//		adminUser.setUpdatedAt(LocalDate.now());
//		userRepository.save(adminUser);



	}

}
