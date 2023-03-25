using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouCanCook.Data;
using YouCanCook.Models;

namespace YouCanCook.Controllers;

public class FavouritesController : Controller
{
    readonly RecipesDbContext _dbContext;

    public FavouritesController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [Authorize]
    [HttpPost]
    [Route("/Recipes/Favourites/{id:long}")]
    public ActionResult AddToFavourites(long id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var recipe = _dbContext.Recipes.Find(id);
        if (recipe == null)
        {
            return NotFound();
        }

        _dbContext.Favourites.Add(new Favourite { UserId = userId, Recipe = recipe });
        _dbContext.SaveChanges();
        Console.WriteLine($"Recipe {id} added to favourites");
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
        Console.WriteLine($"Recipe {id} deleted by {userId}");
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