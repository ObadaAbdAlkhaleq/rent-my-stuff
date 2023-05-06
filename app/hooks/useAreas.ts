import countries from "world-countries";

const formattedAreas = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useAreas = () => {
  const getAll = () => formattedAreas;

  const getByValue = (value: string) => {
    return formattedAreas.find((item) => item.value === value);
  }

  return { getAll, getByValue }
};

export default useAreas;