package com.crmSystemDevelopment.spring_boot.payload;

import java.time.LocalDateTime;

public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private Long id;
    private String username;
    private String role;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;


    // Constructor
    public JwtAuthenticationResponse(String accessToken,Long id, String username, String role, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.accessToken = accessToken;
        this.id=id;
        this.username = username;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
