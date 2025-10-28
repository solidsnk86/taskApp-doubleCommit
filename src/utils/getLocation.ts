interface LocationProps {
  ip: string;
  city: { name: string };
  country: { name: string };
}

export const getLocation = async () => {
  const locationResponse = await fetch(
    "https://solid-geolocation.vercel.app/location"
  );
  const location: LocationProps = await locationResponse.json();
  const { ip, city, country } = location;
  return { ip, city: city.name, country: country.name };
};
