using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateAPI.Models
{
    public class Favorite
    {
        public int Id { get; set; }

     
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

       
        public int PropertyId { get; set; }
        [ForeignKey(nameof(PropertyId))]
        public Property Property { get; set; }
    }
}
