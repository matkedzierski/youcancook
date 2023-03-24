using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using YouCanCook.Models;

namespace YouCanCook.Data;

public class RecipesDbContext : DbContext
{
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Favourite> Favourites { get; set; }
    public RecipesDbContext(DbContextOptions options)
        : base(options)
    {
    }
}