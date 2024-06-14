using Microsoft.EntityFrameworkCore;
using StudentCrudProject.Models;

namespace StudentCrudProject.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }

        public DbSet<StudentModel> Students { get; set; }
    }
}
