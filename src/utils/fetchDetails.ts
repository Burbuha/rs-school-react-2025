export const fetchDetails = async (name: string) => {
  const data = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const result = await data.json();

  return {
    details: result.results?.[0] || null,
    error: result.error || null,
  };
};
