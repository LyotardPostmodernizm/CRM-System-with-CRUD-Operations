package com.crmSystemDevelopment.spring_boot.repository;

import com.crmSystemDevelopment.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);



}