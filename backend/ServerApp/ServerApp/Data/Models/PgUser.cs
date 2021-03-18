using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Data.Models
{
    public class PgUser
    {
        [Key]
        public int userid { set; get; }

        [Required(ErrorMessage = "Enter some date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime regdate { set; get; }

        [Required(ErrorMessage = "Enter some date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime actdate { set; get; }
    }
}
