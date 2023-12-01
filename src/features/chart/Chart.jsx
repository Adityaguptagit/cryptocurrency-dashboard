import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CoinList, HistoricalChart } from "../../config/api";
import { Line, Bar } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import { chartDays } from "../../config/data";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SelectButton from "../SelectButton";

function Chart() {
  const currency = useSelector((state) => state.currency.value);
  const search = useSelector((state) => state.search.value);
  let [coins, setCoins] = useState([]);
  let [selectedCoin, setSelectedCoin] = useState("bitcoin");
  let [historicData, setHistoricData] = useState();
  let [days, setDays] = useState(1);
  const [selectedChart, setSelectedChart] = useState("Line");

  async function fetchCoins() {
    try {
      const jsonData = await fetch(CoinList(currency));
      const data = await jsonData.json();
      setCoins(data);
    } catch (error) {
      alert(`${error.message} : You've exceeded the Rate Limit`);
    }
  }

  async function fetchHistoricData() {
    try {
      const jsonData = await fetch(
        HistoricalChart(selectedCoin, days, currency)
      );
      const data = await jsonData.json();
      setHistoricData(data.prices);
    } catch (error) {
      alert(`${error.message} : You've exceeded the Rate Limit`);
    }
  }

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days, selectedCoin, selectedChart]);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  let handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return days === 1
      ? `${date.getHours()}:${date.getMinutes()}${
          date.getHours() >= 12 ? "PM" : "AM"
        }`
      : date.toLocaleDateString();
  };

  const filterCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    );
  });

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.display = true;
  defaults.plugins.title.color = "black";
  defaults.plugins.title.font.size = 20;

  return (
    <>
      <div className="relative  mt-5">
        <div className="  rounded-lg h-full w-full">
          <div className="absolute w-full bg-white">
            {search ? (
              <Box
                style={{
                  marginLeft: "10px",
                  maxHeight: "150px",
                  overflowY: "scroll",
                  fontFamily: "Oswald",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                {filterCoins.map((coin) => (
                  <div
                    style={{ margin: "5px" }}
                    onClick={(e) => {
                      setSelectedCoin(coin.id);
                    }}
                  >
                    {coin.name}
                  </div>
                ))}
              </Box>
            ) : null}
          </div>
          <div className="flex max-sm:flex-col p-3 lg:pt-6 ">
            <Box className="w-1/3 max-sm:w-full py-4 lg:pl-10 ">
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label2}
                  </SelectButton>
                );
              })}
            </Box>
            <div className="w-2/3 max-sm:w-full flex max-sm:flex-col gap-4 p-2 max-sm:pt-4">
              <FormControl className="w-1/2 max-sm:w-full">
                <InputLabel>Cryptocurrency</InputLabel>
                <Select
                  label="Cryptocurrency"
                  onChange={handleCoinChange}
                  value={selectedCoin}
                >
                  {coins.map((coin) => (
                    <MenuItem value={coin.id} key={coin.id}>
                      {coin.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="w-1/2 max-sm:w-full">
                <InputLabel>Chart type</InputLabel>
                <Select
                  label="Charttype"
                  onChange={handleChartChange}
                  value={selectedChart}
                  defaultValue="Line"
                >
                  <MenuItem value="Line">Line</MenuItem>
                  <MenuItem value="Bar">Bar</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {/************Chart*************/}
          <Box className="h-72">
            {!historicData ? (
              ""
            ) : (
              <Box className="h-full px-4 lg:px-12">
                {selectedChart === "Line" ? (
                  <Line
                    data={{
                      labels: historicData.map((coin) => formatDate(coin[0])),
                      datasets: [
                        {
                          label: "Price",
                          data: historicData.map((coin) => coin[1]),
                          backgroundColor: "#3399ff",
                          borderColor: "#3399ff",
                        },
                      ],
                    }}
                    options={{
                      elements: {
                        line: {
                          tension: 0.5,
                        },
                      },
                    }}
                  />
                ) : (
                  /*******Bar start*****/
                  <Bar
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      datasets: [
                        {
                          label: "Price",
                          data: historicData.map((coin) => coin[1]),
                          backgroundColor: ["#3399ff", "#cce6ff"],
                          borderRadius: 5,
                        },
                      ],
                    }}
                  />
                  /*******Bar end*****/
                )}
              </Box>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Chart;
