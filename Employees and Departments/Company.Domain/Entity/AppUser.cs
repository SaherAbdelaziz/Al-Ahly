using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Company.Domain.Entity
{
    [Table("User")]
    public partial class AppUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required()]
        [Key()]
        public Guid UserId { get; set; }

        [Required()]
        [StringLength(255)]
        public string UserName { get; set; }

        [Required()]
        [StringLength(255)]
        public string Password { get; set; }
        public List<Wizard> Wizards { get; set; }
    }
}
