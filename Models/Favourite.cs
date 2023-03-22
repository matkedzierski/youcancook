using System.ComponentModel.DataAnnotations;

namespace YouCanCook.Models;

public class Favourite
{
    [Key]    
    public long Id { get; set; }
    
    [Required] 
    public Recipe? Recipe { get; set; }
    
    [Required] 
    public string? UserId { get; set; }
    
}