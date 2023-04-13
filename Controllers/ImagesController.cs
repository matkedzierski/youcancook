using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using YouCanCook.Data;
using YouCanCook.Models;

namespace YouCanCook.Controllers;

public class ImagesController : Controller
{
    private readonly RecipesDbContext _dbContext;

    public ImagesController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("/Images/{recipeId:long}")]
    public ActionResult<List<RecipeImage>> GetImagesForRecipe(long recipeId)
    {
        var recipe = _dbContext.Recipes.Find(recipeId);
        if (recipe == null)
        {
            return NotFound();
        }

        var list = recipe.Images ?? new List<RecipeImage>();
        Console.WriteLine($"Get images for recipe, recipeId = {recipeId}, size = {list.Count}");
        return list;
    }

    [HttpGet]
    [Route("/Image/{imageId:long}")]
    public IActionResult GetImageById(long imageId)
    {
        var image = _dbContext.Images.Find(imageId);
        Console.WriteLine($"Get image, id = {imageId}");
        if (image == null) return NotFound();
        var content = Base64UrlEncoder.DecodeBytes(image.Content?.Split(',')[1]);
        var type = image.Content?.Split(":")[1].Split(";")[0];
        return File(content, type ?? "binary/octet-stream");
    }
}