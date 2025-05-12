function getCountryFromGoogleMapsUrl(url) {
    const egyptianGovernorates = [
        'Alexandria',
        'Aswan',
        'Asyut',
        'Beheira',
        'Beni Suef',
        'Cairo',
        'Dakahlia',
        'Damietta',
        'Faiyum',
        'Gharbia',
        'Giza',
        'Ismailia',
        'Kafr El Sheikh',
        'Luxor',
        'Matruh',
        'Minya',
        'Monufia',
        'New Valley',
        'North Sinai',
        'Port Said',
        'Qalyubia',
        'Qena',
        'Red Sea',
        'Sharqia',
        'Sohag',
        'South Sinai',
        'Suez'
    ];
    
    // Check if any Egyptian governorate is in the URL
    for (const governorate of egyptianGovernorates) {
        if (url.includes(governorate)) {
            return 'Egypt';
        }
    }
    
    // If no governorate found (shouldn't happen with this URL)
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lng = parseFloat(coordMatch[2]);
        
        // Simple geographic check (Egypt is roughly between 22-32°N and 25-35°E)
        if (lat >= 22 && lat <= 32 && lng >= 25 && lng <= 35) {
            return 'Egypt';
        }
    }
    
    return 'Country not identified';
}
export default getCountryFromGoogleMapsUrl;
