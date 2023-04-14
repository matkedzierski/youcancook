using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouCanCook.Data;
using YouCanCook.Models;

namespace YouCanCook.Controllers;

public class RecipesController : Controller
{
    private readonly RecipesDbContext _dbContext;

    public RecipesController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("/Recipes")]
    public List<Recipe> GetRecipes()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var fav = _dbContext.Favourites.Where(f => f.UserId == userId).Select(f => f.Recipe!.Id);
        var list = _dbContext.Recipes
            .Include(r => r.Images!.Where(im => im.Order == 0))
            .ToList();
        list.ForEach(r =>
        {
            r.Content = null;
            if (!fav.Contains(r.Id)) return;
            r.IsFavourite = true;
        });
        Console.WriteLine($"Get all recipes, user = {userId}, size = {list.Count}");
        return list;
    }

    [HttpGet]
    [Route("/Recipes/{id:long}")]
    public ActionResult<Recipe> GetRecipe(long id)
    {
        var recipe = _dbContext
            .Recipes
            .Include(r => r.Images)
            .FirstOrDefault(r => r.Id == id);
        Console.WriteLine($"Get recipe, id = {id}");
        if (recipe != null)
        {
            return recipe;
        }

        return NotFound();
    }

    [HttpDelete]
    [Route("/Recipes/{id:long}")]
    public ActionResult DeleteRecipe(long id)
    {
        var recipe = _dbContext.Recipes.Find(id);
        Console.WriteLine($"Get recipe, id = {id}");
        if (recipe == null) return NotFound();

        _dbContext.Recipes.Remove(recipe);
        _dbContext.Favourites.RemoveRange(
            _dbContext.Favourites.Where(f => f.Recipe == recipe)
        );
        _dbContext.SaveChanges();
        return Ok();
    }

    [Authorize]
    [Route("/Recipes/My")]
    public List<Recipe> GetOwnRecipes()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var list = _dbContext.Recipes
            .Include(r => r.Images!.Where(im => im.Order == 0))
            .Where(r => r.Author == userId)
            .ToList();
        list.ForEach(re => re.Content = null);
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
        return Ok(recipe);
    }

    [Authorize]
    [HttpPut]
    [Route("/Recipes/{id:long}")]
    public ActionResult UpdateRecipe(long id, [FromBody] Recipe recipe)
    {
        recipe.Id = id;

        _dbContext.Images.RemoveRange(_dbContext.Images.Where(i =>
            i.Recipe == recipe && (recipe.Images == null || !recipe.Images.Contains(i))));
        _dbContext.Recipes.Update(recipe);
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {recipe.Id} added");
        return Ok();
    }
}