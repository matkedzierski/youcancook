using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouCanCook.Data;
using YouCanCook.Models;

namespace YouCanCook.Controllers;

public class RecipesController : Controller
{
    readonly RecipesDbContext _dbContext;

    public RecipesController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [Route("/Recipes")]
    public List<Recipe> GetRecipes()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var fav = _dbContext.Favourites.Where(f => f.UserId == userId).Select(f => f.Recipe!.Id);
        var list = _dbContext.Recipes.ToList();
        list.ForEach(r =>
        {
            if (fav.Contains(r.Id))
            {
                r.IsFavourite = true;
            }
        });
        Console.WriteLine($"Get all recipes, user = {userId}, size = {list.Count}");
        return list;
    }

    [Route("/Recipes/{id:long}")]
    public ActionResult<Recipe> GetRecipe(long id)
    {
        var recipe = _dbContext.Recipes.Find(id);
        Console.WriteLine($"Get recipe, id = {id}");
        if (recipe != null)
        {
            return recipe;
        }

        return NotFound();
    }

    [Route("/Recipes/My")]
    public List<Recipe> GetOwnRecipes()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var list = _dbContext.Recipes
            .Where(r => r.Author == userId)
            .ToList();
        Console.WriteLine($"Get own recipes, user = {userId}, size = {list.Count}");
        return list;
    }

    [Authorize]
    [HttpPost]
    [Route("/Recipes")]
    public ActionResult AddRecipe([FromBody] Recipe recipe)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        recipe.Author = userId;
        _dbContext.Recipes.Add(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }

    [Authorize]
    [HttpPut]
    [Route("/Recipes/{id:long}")]
    public ActionResult UpdateRecipe(long id, [FromBody] Recipe recipe)
    {
        recipe.Id = id;
        _dbContext.Recipes.Update(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }

    [Authorize]
    [HttpPost]
    [Route("/Recipes/Favourites")]
    public ActionResult AddToFavourites([FromQuery] long recipeId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var recipe = _dbContext.Recipes.Find(recipeId);
        if (recipe == null)
        {
            return NotFound();
        }

        _dbContext.Favourites.Add(new Favourite { UserId = userId, Recipe = recipe });
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipeId} added to favourites");
        return Ok();
    }

    [Authorize]
    [HttpDelete]
    [Route("/Recipes/Favourites/{id:long}")]
    public ActionResult DeleteFavourite(long id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var recipe = _dbContext.Recipes.Find(id);
        if (recipe == null)
        {
            return NotFound();
        }

        var range = _dbContext.Favourites.Where(f => f.Recipe == recipe && f.UserId == userId);
        _dbContext.Favourites.RemoveRange(range);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {id} added to favourites by {userId}");
        return Ok();
    }

    [Authorize]
    [HttpGet]
    [Route("/Recipes/Favourites")]
    public ActionResult GetFavourites()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var list = _dbContext.Favourites
            .Where(f => f.UserId == userId)
            .Select(f => f.Recipe).ToList();
        list.ForEach(r => { r!.IsFavourite = true; });
        Console.WriteLine($"Get favourites for user {userId}, size = {list.Count}");
        return Ok(list);
    }
}