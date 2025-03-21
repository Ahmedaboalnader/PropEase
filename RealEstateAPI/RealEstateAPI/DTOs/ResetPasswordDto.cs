﻿using System.ComponentModel.DataAnnotations;

public class ResetPasswordDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string OTP { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string NewPassword { get; set; } = string.Empty;
}
