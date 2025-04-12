using RealEstateAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Offer
{
    public int Id { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    public int PropertyId { get; set; }
    public Property Property { get; set; } = null!;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
