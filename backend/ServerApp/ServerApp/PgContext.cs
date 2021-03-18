using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServerApp.Data.Models;

namespace ServerApp
{
    public class PgContext: DbContext
    {
        public DbSet<PgUser> Users { get; set; }
        public readonly string connString;
        public PgContext()
        {
            connString = "Host=84.38.189.95;Port=31788;Database=TestApp;Username=postgres;Password=12345";
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseNpgsql(connString);
        }
    }
}
