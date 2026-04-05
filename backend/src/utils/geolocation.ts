export const getCoordinates = async (address: string, city: string, province: string, postal_code: string) => {
    const query = `${address}, ${city}, ${province}, ${postal_code}, Canada`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'GoPopup/1.0 (carinahuang673@gmail.com)'
        }
    });

    console.log('Nominatim status:', response.status);
    const text = await response.text();
    console.log('Nominatim response:', text);

    const data = JSON.parse(text);

    if (data.length === 0) throw new Error('Address not found');

    return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
    };
};