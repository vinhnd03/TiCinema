package com.vinhnd.ticinema_server.controller.user;

import com.vinhnd.ticinema_server.dto.LoginRequest;
import com.vinhnd.ticinema_server.dto.RegisterRequest;
import com.vinhnd.ticinema_server.dto.UserSummaryDTO;
import com.vinhnd.ticinema_server.entity.Role;
import com.vinhnd.ticinema_server.entity.User;
import com.vinhnd.ticinema_server.security.JwtService;
import com.vinhnd.ticinema_server.service.IRoleService;
import com.vinhnd.ticinema_server.service.IUserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IUserService userService;
    private final IRoleService roleService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @PostMapping("/login")
    private ResponseEntity login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        System.out.println("login");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
            );
            User user = (User) authentication.getPrincipal();

            long maxAge = loginRequest.rememberMe() ? 30 * 24 * 60 : 3600;
            String token = jwtService.generateToken(user);
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(maxAge)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(Map.of("success", true));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("success", false, "error", "INVALID_CREDENTIALS"));
        } catch (DisabledException e) {
            return ResponseEntity.status(403)
                    .body(Map.of("success", false, "error", "ACCOUNT_DISABLED"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "error", "SERVER_ERROR"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest) {
        if (userService.existedByEmail(registerRequest.email())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "EMAIL_EXISTED"));
        }
        Role userRole = roleService.findByName("USER")
                .orElseGet(() -> roleService.save(new Role(null, "USER")));

        User user = new User();
        user.setEmail(registerRequest.email());
        user.setPassword(registerRequest.password());
        user.setStatus(true);
        user.setRole(userRole);
        user.setName(registerRequest.name());

        userService.register(user);

        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/me")
    private ResponseEntity getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(UserSummaryDTO.from(user));
    }
}
