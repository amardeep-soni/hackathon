using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Repositories
{
	public class CampsDbContext : DbContext
	{
		public CampsDbContext(DbContextOptions<CampsDbContext> options) : base(options) { }

		public DbSet<Camp> Camps { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Camp>().HasKey(e => e.Id);
		}
	}
}
