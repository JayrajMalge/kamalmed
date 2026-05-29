package com.kamalmedicare.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(min = 3, max = 30) private String username;
    @NotBlank @Size(min = 6, max = 50) private String password;
    @NotBlank @Email private String email;
}
