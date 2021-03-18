using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Data.Models;


namespace ServerApp.Data
{
    public interface IDataRepository
    {
        IEnumerable<PgUser> GetUsers();
        PgUser GetUser(int id);
        void SaveUsers(IEnumerable<PgUser> users);

    }
}
