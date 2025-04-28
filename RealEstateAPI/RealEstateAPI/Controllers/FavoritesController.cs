﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Services;
using System.Security.Claims;

namespace RealEstateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // لازم تسجيل دخول
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoritesService _favoritesService;

        public FavoritesController(IFavoritesService favoritesService)
        {
            _favoritesService = favoritesService;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

        [HttpPost("toggle/{propertyId}")]
        public async Task<IActionResult> ToggleFavorite(int propertyId)
        {
            var userId = GetUserId();
            var isAdded = await _favoritesService.ToggleFavoriteAsync(userId, propertyId);

            return Ok(new { success = true, isFavorite = isAdded });
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = GetUserId();
            var favorites = await _favoritesService.GetUserFavoritesAsync(userId);

            return Ok(favorites);
        }
    }
}
