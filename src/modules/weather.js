export default async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1e9bcfae8abd4e01b81104420232908&q=${location}&aqi=no`,
      { mode: 'cors' },
    );

    // in the event the user enters an invalid location, the response will also be invalid
    // to avoid errors, we must abort gracefully
    if (!response.ok) {
      throw new Error('Invalid location');
    }

    const data = await response.json();
    return {
      icon: `https:${data.current.condition.icon}`,
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      precipitation: data.current.precip_mm,
      humidity: data.current.humidity,
      wind: data.current.wind_mph,
      city: data.location.name,
      country: data.location.country,
      time: data.current.last_updated,
      condition: data.current.condition.text,
    };
  } catch (error) {
    alert('Invalid location, please use format city country, e.g. London UK');
    return undefined;
  }
}
