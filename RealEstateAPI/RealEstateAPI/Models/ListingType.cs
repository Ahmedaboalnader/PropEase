using System.Text.Json.Serialization;

namespace RealEstateAPI.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))] 
    public enum ListingType
    {
        ForSale,
        ForRent
    }
}
