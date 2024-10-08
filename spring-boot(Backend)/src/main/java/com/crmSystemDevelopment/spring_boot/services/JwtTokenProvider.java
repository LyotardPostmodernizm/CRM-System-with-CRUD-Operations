package com.crmSystemDevelopment.spring_boot.services;

import com.crmSystemDevelopment.spring_boot.model.User;
import com.crmSystemDevelopment.spring_boot.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    private final SecretKey secretKey;

    @Autowired
    private UserRepository userRepository;

    public JwtTokenProvider() {
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    // Token oluşturma metodu
    public String generateToken(String username) {

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expMillis = nowMillis + jwtExpirationMs; // Geçerlilik süresi
        Date exp = new Date(expMillis);


        User user = userRepository.findByUsername(username);
        System.out.println("Kullanıcının Rolü: " + user.getRole());

        JwtBuilder builder = Jwts.builder()
                .setSubject(username)
                .claim("role", user.getRole())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secretKey);

        return builder.compact();
    }


    public String getUsernameFromJwt(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
