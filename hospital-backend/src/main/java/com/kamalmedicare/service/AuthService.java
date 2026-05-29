package com.kamalmedicare.service;

import com.kamalmedicare.dto.*;
import com.kamalmedicare.entity.User;
import com.kamalmedicare.repository.UserRepository;
import com.kamalmedicare.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );
        User user = userRepository.findByUsername(auth.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return AuthResponse.builder()
            .token(token).username(user.getUsername())
            .role(user.getRole().name()).email(user.getEmail())
            .build();
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername()))
            throw new RuntimeException("Username already taken");
        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered");
        User user = User.builder()
            .username(req.getUsername())
            .email(req.getEmail())
            .hashedpassword(passwordEncoder.encode(req.getPassword()))
            .role(User.Role.Visitor)
            .createat(LocalDateTime.now())
            .updateat(LocalDateTime.now())
            .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return AuthResponse.builder()
            .token(token).username(user.getUsername())
            .role(user.getRole().name()).email(user.getEmail())
            .build();
    }
}
