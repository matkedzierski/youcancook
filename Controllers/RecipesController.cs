using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouCanCook.Data;
using YouCanCook.Models;

namespace YouCanCook.Controllers;


public class RecipesController : Controller
{
    RecipesDbContext _dbContext;
    
    public RecipesController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [Route("/Recipes")]
    public List<Recipe> GetRecipes()
    {
        return _dbContext.Recipes.ToList();
    }
    
    [Authorize]
    [HttpPost]
    [Route("/Recipes")]
    public ActionResult AddRecipe([FromBody] Recipe recipe)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        _dbContext.Recipes.Add(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }
    
    [Authorize]
    [HttpPut]
    [Route("/Recipes")]
    public ActionResult UpdateRecipe([FromBody] Recipe recipe)
    {
        _dbContext.Recipes.Update(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }
    
    [Authorize]
    [HttpPut]
    [Route("/Recipes/Favourites")]
    public ActionResult GetFavourites([FromBody] Recipe recipe)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        _dbContext.Recipes.Update(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }
}