import { useQuery } from "react-query";
import { normalize } from "./normalize";

type Location = { latitude: number; longitude: number };

const fetchWeather = (location: Location | string) => {
  const searchParam =
    typeof location === "string"
      ? "q=" + location
      : "lat=" + location.latitude + "&lon=" + location.longitude;
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      searchParam +
      "&appid=cf61ba7bba440089d7c442c97d356595"
  )
    .then((res) => res.json())
    .then((data) => normalize(data));
};

export const useWeatherInfo = (location: Location | string) => {
  const { isLoading, error, data } = useQuery(location.toString(), () =>
    fetchWeather(location)
  );

  return {
    weather: data,
    error,
    isLoading,
  };
};
