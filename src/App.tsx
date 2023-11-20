import React from "react";
import "./App.css";
import { useWeatherInfo } from "./hooks/useWeatherInfo";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import LocationOn from "@mui/icons-material/LocationOn";
import { useLocation } from "./hooks/useLocation";
import Typography from "@mui/joy/Typography";
import { useLocationWithIp } from "./hooks/useLocationWithIp";

function App() {
  const [searchInput, setSearchInput] = React.useState("");
  const [showAdditionalInfos, toggleAdditionalInfos] = React.useState(false);
  const [ipAddress, setIPAddress] = React.useState("");

  const { userLocation, getUserLocation } = useLocation();
  const [location, setLocation] = React.useState(userLocation);

  const { locationFromIp } = useLocationWithIp(ipAddress);

  const { weather } = useWeatherInfo(location);

  const isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;

  const inputRef = React.useRef<any>(null);

  const getLocation = React.useCallback(() => {
    if (isChrome && locationFromIp) {
      setLocation(locationFromIp);
      inputRef.current.value = "";
      return;
    }
    getUserLocation();
    inputRef.current.value = "";
    setLocation(userLocation);
  }, [getUserLocation, isChrome, locationFromIp, userLocation]);

  React.useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isChrome) {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => setIPAddress(data.ip))
        .catch((error) => console.log(error));
    }
  }, [isChrome]);

  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={4}>
          {weather && !showAdditionalInfos ? (
            <Typography
              onClick={() => toggleAdditionalInfos(true)}
              level="h1"
              color="neutral"
            >
              {weather.name}
            </Typography>
          ) : (
            <Typography
              level="h1"
              color="neutral"
              onClick={() => toggleAdditionalInfos(false)}
            >
              {weather?.additionalInfo}
            </Typography>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setLocation(searchInput);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Input
              placeholder={"search city name"}
              slotProps={{ input: { ref: inputRef } }}
              onChange={(event) =>
                event.currentTarget.value
                  ? setSearchInput(event.currentTarget.value)
                  : undefined
              }
              startDecorator={
                <Button
                  onClick={getLocation}
                  variant="soft"
                  color="neutral"
                  startDecorator={<LocationOn />}
                >
                  Locate
                </Button>
              }
              sx={{ width: 300 }}
            />
          </form>
          {weather?.extras?.map((item) => (
            <Typography level="h1" color="neutral" key={item}>
              {item}
            </Typography>
          ))}
          {weather?.top ? (
            <Typography level="h1" color="neutral">
              {weather?.top}
            </Typography>
          ) : undefined}
          {weather?.legs ? (
            <Typography level="h1" color="neutral">
              {weather?.legs}
            </Typography>
          ) : undefined}
          {weather?.bottom ? (
            <Typography level="h1" color="neutral">
              {weather?.bottom}
            </Typography>
          ) : undefined}
        </Stack>
      </header>
    </div>
  );
}

export default App;
