using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Data;
using ServerApp.Data.Models;

namespace ServerApp.Data
{
    public class DataRepository: IDataRepository
    {
        public DataRepository()
        {
        }
        public IEnumerable<PgUser> GetUsers()
        {
            using (PgContext pg = new PgContext())
            {
                return pg.Users.ToList();
            }
        }
        public PgUser GetUser(int id)
		{
            using (PgContext pg = new PgContext())
			{
                var recs = pg.Users.Where(user => user.userid == id).ToList();
                if (recs.Count > 0) return recs[0];
                return null;
			}
		}
        public void SaveUsers(IEnumerable<PgUser> users)
        {
            using (PgContext pg = new PgContext())
            {
                foreach (PgUser user in users)
				{
                    PgUser u = GetUser(user.userid);
                    if (u == null) pg.Users.Add(user);
					else pg.Users.Update(user);
				}
                pg.SaveChanges();
            }
        }
    }
}
