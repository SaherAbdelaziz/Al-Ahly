using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Company.Domain.Entity
{
    public class Wizard
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Item> Items { get; set; }
        public Guid AppUserId { get; set; }

    }
}
