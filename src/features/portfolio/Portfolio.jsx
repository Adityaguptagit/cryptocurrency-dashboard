/*useState depedency is removed that is currency while using TrendingCoins*/
import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../../config/api";
import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Container } from "@mui/material";

function Portfolio() {
  const currency = useSelector((state) => state.currency.value);
  const [slicedCoins, setSlicedCoin] = useState([]);

  async function fetchCoins() {
    try {
      const jsonData = await fetch(TrendingCoins(currency));
      const coins = await jsonData.json();
      setSlicedCoin(coins.slice(5, 8)); //5,8
    } catch (error) {
      alert(`${error.message} : You've exceeded the Rate Limit`);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // items-center
  return (
    <Container className=" max-sm:w-full flex flex-col mt-5 p-3 h-80">
      <div
        style={{
          fontSize: "1.5rem",
          fontFamily: "Oswald",
        }}
      >
        Portfolio
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Oswald",
          fontSize: "1.5rem",
          color: "#008ae6",
          marginTop: "10px",
        }}
      >
        Total Value:{" "}
        {slicedCoins[0]?.current_price +
          slicedCoins[1]?.current_price +
          slicedCoins[2]?.current_price}
      </div>

      <div
        className="h-56"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pie
          data={{
            labels: [
              slicedCoins[0]?.name,
              slicedCoins[1]?.name,
              slicedCoins[2]?.name,
            ],
            datasets: [
              {
                data: [
                  slicedCoins[0]?.current_price,
                  slicedCoins[1]?.current_price,
                  slicedCoins[2]?.current_price,
                ],
                backgroundColor: ["#79d1a5", "#0d83b5", "#de7173"],
                hoverOffset: 4,
                borderWidth: 0,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </Container>
  );
}

export default Portfolio;
