using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Data;
using ServerApp.Data.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        public UsersController(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        [HttpGet]
        public IEnumerable<PgUser> GetUsers()
        {
            IDataRepository rep = _serviceProvider.GetService<IDataRepository>();
            var users = rep.GetUsers();
            return users;
        }

        [HttpPost("save")]
        public ActionResult PutUsers(IEnumerable<PgUser> users)
        {
            IDataRepository rep = _serviceProvider.GetService<IDataRepository>();
            rep.SaveUsers(users);
            return Ok();
        }
    }
}
