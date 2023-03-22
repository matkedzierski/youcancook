using System.ComponentModel.DataAnnotations;

namespace YouCanCook.Models;

public class Recipe
{
    [Key]    
    public long Id { get; set; }
    
    [Required] 
    public string? Title { get; set; }
}