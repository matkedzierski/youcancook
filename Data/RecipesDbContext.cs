using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using YouCanCook.Models;

namespace YouCanCook.Data;

public class RecipesDbContext : DbContext
{
    public DbSet<Recipe> Recipes { get; set; } = null!;
    public DbSet<Favourite> Favourites { get; set; } = null!;
    public DbSet<RecipeImage> Images { get; set; } = null!;

    public RecipesDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        setIngredientsColumn(modelBuilder);
    }

    private void setIngredientsColumn(ModelBuilder modelBuilder)
    {
        var valueComparer = new ValueComparer<List<string>>(
            (c1, c2) => c2 != null && c1 != null && c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList());

        modelBuilder.Entity<Recipe>().Property(p => p.Ingredients)
            .HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<string>>(v) ?? new List<string>())
            .Metadata.SetValueComparer(valueComparer);
    }
}