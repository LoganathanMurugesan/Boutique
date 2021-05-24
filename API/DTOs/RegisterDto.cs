using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email {get; set;}
        [Required]
        [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", ErrorMessage = "Password must have 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric and atleat 6 characters")]
        public string Password { get; set; }
    }
}