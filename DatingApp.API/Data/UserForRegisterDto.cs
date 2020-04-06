using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Data
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password 4 and 8 charactors")]
        public string Password { get; set; }
    }
}