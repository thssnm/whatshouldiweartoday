export const normalize = (data: {
  cod: string;
  clouds: { all: number };
  rain: { [x: string]: any };
  main: { temp: number };
  name: string;
  dt: number;
  wind: { speed: number };
  sys: any;
}) => {
  if (data.cod === "404") {
    return {
      name: "no result",
      extras: [],
      top: "",
      legs: "",
      bottom: "",
      additionalInfo: [],
    };
  }
  const now = new Date();
  const sunrise = new Date(data?.sys?.sunrise * 1000);
  const sunset = new Date(data?.sys?.sunset * 1000);
  const sun = now > sunrise && now < sunset;

  const sunglasses = data?.clouds?.all <= 50 && sun ? "sunglasses" : undefined;
  const rain = data?.rain ? data?.rain["1h"] + data?.rain["3h"] : 0;
  const umbrella = rain >= 0.5 ? "umbrella" : undefined;
  const temp = data?.main?.temp - 273.15 || 0;
  const beanie = temp <= 5 ? "beanie" : undefined;
  const scarf = temp <= 0 ? "scarf" : undefined;
  const extras = [umbrella, beanie, sunglasses, scarf].filter(Boolean);
  const top =
    temp > 20
      ? "shirt"
      : temp > 12
      ? "sweatshirt"
      : temp > 0
      ? "jacket"
      : "coat";
  const legs = temp > 22 ? "shorts" : "jeans";
  const bottom = temp > 25 ? "flip-flops" : temp > 10 ? "sneaker" : "boots";
  const name: string = data?.name || "no result";
  const date = new Date(data?.dt * 1000);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const wind = data?.wind?.speed * 3.6;

  const additionalInfo = [
    temp.toFixed(1) + " °C",
    time,
    rain > 0 ? rain.toFixed(1) + " mm" : undefined,
    wind.toFixed(0) + " km/h",
  ]
    .filter(Boolean)
    .join(" - ");
  const info = { name, extras, top, legs, bottom, additionalInfo };
  return info;
};
