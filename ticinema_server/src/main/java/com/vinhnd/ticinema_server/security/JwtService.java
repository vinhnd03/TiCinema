package com.vinhnd.ticinema_server.security;

import com.vinhnd.ticinema_server.entity.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

@Service
public class JwtService {
    private String jwtSecret = "+giuxKoSEsvBX+OSt2ICd3aCsa4ZuKf+4lxkxBfO2UZjMDXV7ivlpoXzzOVtplLz36ojIOM+sIU9rjbtwPronQ==";
    private Long jwtExpiration = 60 * 60 * 1000l;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole().getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
//        catch (ExpiredJwtException e) {
//            throw e; // 👈 Ném ra ngoài để filter bắt được
//        }
        catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String refreshToken(String token, long expirationMillis) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        Map<String, Object> claimsMap = new HashMap<>(claims);
        claimsMap.remove("exp");
        claimsMap.remove("iat");

        return Jwts.builder()
                .setClaims(claimsMap)
                .setSubject(claims.getSubject())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
