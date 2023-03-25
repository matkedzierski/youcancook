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

    public List<string> Ingredients { get; set; } = new();
    
    public string ShortDescription { get; set; }
    
    public string Content { get; set; }
    
    //TODO: call user info service and add cron to update display name  
    //[NotMapped]
    //public string AuthorName { get; set; }
    
    [NotMapped]
    public bool IsFavourite { get; set; }
}