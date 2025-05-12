function getEmbedUrl(googleMapsUrl) {
    const coordRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = googleMapsUrl.match(coordRegex);

    if (match) {
    const lat = match[1];
    const lng = match[2];
    return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
    } else {
    const placeRegex = /\/place\/([^/]+)/;
    const placeMatch = googleMapsUrl.match(placeRegex);
    if (placeMatch) {
        const place = placeMatch[1];
        return `https://www.google.com/maps?q=${encodeURIComponent(
        place
        )}&output=embed`;
    }
    }

    return null;
}

export default getEmbedUrl;
