package com.crmSystemDevelopment.spring_boot.repository;

import com.crmSystemDevelopment.spring_boot.model.Customer;
import com.crmSystemDevelopment.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findAll();
}
