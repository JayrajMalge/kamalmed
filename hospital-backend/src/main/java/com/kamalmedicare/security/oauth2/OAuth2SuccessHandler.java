package com.kamalmedicare.security.oauth2;

import com.kamalmedicare.entity.User;
import com.kamalmedicare.repository.UserRepository;
import com.kamalmedicare.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Value("${cors.allowed-origins}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String googleId = oAuth2User.getAttribute("sub");

        User user = userRepository.findByOauthProviderAndOauthId("google", googleId)
                .orElseGet(() -> userRepository.findByEmail(email).orElseGet(() -> {
                    User newUser = User.builder()
                            .username(email.split("@")[0] + "_g")
                            .email(email)
                            .role(User.Role.Visitor)
                            .oauthProvider("google")
                            .oauthId(googleId)
                            .createat(LocalDateTime.now())
                            .updateat(LocalDateTime.now())
                            .build();
                    return userRepository.save(newUser);
                }));

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        response.sendRedirect(frontendUrl + "/auth/callback?token=" + token + "&role=" + user.getRole().name());
    }
}
