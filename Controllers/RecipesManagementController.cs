using Microsoft.AspNetCore.Mvc;
using YouCanCook.Data;

namespace YouCanCook.Controllers;

public class RecipesManagementController : Controller
{
    RecipesDbContext _dbContext;
    
    public RecipesManagementController(RecipesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

}