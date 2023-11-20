import { useQuery } from "react-query";

const fetchLocation = (ip: string) => {
  return fetch("https://ip-api.com/json/" + ip).then((res) =>
    res.json().then((response) => {
      return response.city;
    })
  );
};

export const useLocationWithIp = (ip: string) => {
  const { isLoading, error, data } = useQuery(ip, () => fetchLocation(ip));

  return {
    locationFromIp: data,
    error,
    isLoading,
  };
};
