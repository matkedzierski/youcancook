using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YouCanCook.Models;

public class RecipeImage
{
    [Key] public long Id { get; set; }

    [Required] public int? Order { get; set; }

    [Required] [JsonIgnore] public Recipe? Recipe { get; set; }

    [Required] public string? Content { get; set; }
}