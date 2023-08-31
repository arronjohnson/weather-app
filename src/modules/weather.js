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

    return await response.json();
  } catch (error) {
    alert('Invalid location, please use format city country, e.g. London UK');
    return undefined;
  }
}
