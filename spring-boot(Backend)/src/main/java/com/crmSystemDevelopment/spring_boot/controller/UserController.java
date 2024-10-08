package com.crmSystemDevelopment.spring_boot.controller;

import com.crmSystemDevelopment.spring_boot.model.LoginRequest;
import com.crmSystemDevelopment.spring_boot.model.User;
import com.crmSystemDevelopment.spring_boot.payload.JwtAuthenticationResponse;
import com.crmSystemDevelopment.spring_boot.repository.UserRepository;
import com.crmSystemDevelopment.spring_boot.services.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController // sınıfın bir restful web servisi olduğunu belirtir
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // PasswordEncoder'ı ekliyoruz

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    // Only Admins.
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) { //JSON tipinde bir Useri postlama endpointi
        // Clienttan gelen JSON verisi, otomatik olarak Customer sınıfının bir örneğine (nesnesine) dönüştürülüyor.

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByUsername(user.getUsername()));
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        try {
            user.setRole("USER");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal(); // Burada kendi User modelimizi kullanıyoruz

            // JWT oluşturuyoruz
            String jwt = tokenProvider.generateToken(user.getUsername());

            // JWT yanıtını kullanıcı bilgileriyle birlikte döndürüyoruz
            return ResponseEntity.ok(new JwtAuthenticationResponse(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getRole(),
                    user.getCreatedAt(),
                    user.getUpdatedAt()
            ));

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


    @PutMapping("/users/{id}")  // Kullanıcının bilgilerini güncelleme endpoint'i
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        try {
            // Kullanıcının bilgilerini güncelle
            if (updatedUser.getUsername() != null) {
                user.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Parolayı güncelle
            }

            // updatedAt alanını güncelle
            user.setUpdatedAt(LocalDate.from(LocalDateTime.now())); // Mevcut tarih ve saati atayın

            userRepository.save(user); // Güncellenmiş kullanıcıyı kaydet
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }


    }
}
