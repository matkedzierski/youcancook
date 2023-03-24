using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YouCanCook.Models;

public class Recipe
{
    [Key]    
    public long Id { get; set; }
    
    [Required] 
    public string? Title { get; set; }
    
    [Required]
    public string? Author { get; set; }
    
    
    [NotMapped]
    public string AuthorName { get; set; }
    
    [NotMapped]
    public bool IsFavourite { get; set; }
}