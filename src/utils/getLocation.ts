interface LocationProps {
  ip: string;
  city: { name: string };
  country: { name: string, timezone: string };
}

export const getLocation = async () => {
  const locationResponse = await fetch(
    "https://solid-geolocation.vercel.app/location"
  );
  const location: LocationProps = await locationResponse.json();
  const { ip, city, country } = location;
  const timezone = country.timezone
  const state = timezone.replace(/^([^/]+\/){2}/, "");
  return { ip, city: city.name, country: country.name, state  };
};
