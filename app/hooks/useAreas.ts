import areas from "areas-areas";

const formattedAreas = areas.map((area) => ({
  value: area.areacodename,
  label: area.name.official,
  latlng: area.latlng,
  region: area.region,
}));

const useAreas = () => {
  const getAll = () => formattedAreas;

  const getByValue = (value: string) => {
    return formattedAreas.find((item) => item.value === value);
  };

  return { getAll, getByValue };
};

export default useAreas;