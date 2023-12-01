import React, { useState, useEffect } from "react";
import { Container, Select, MenuItem, Button } from "@mui/material";
import { CoinList } from "../../config/api";
import { useSelector } from "react-redux";

function ExcahangeCurrency() {
  const [coins, setCoins] = useState([]);
  const [enteredAmount, setEnteredAmount] = useState(null);
  const [sellCurrentPrice, setSellCurrentPrice] = useState("");
  const [buyCurrentPrice, setBuyCurrentPrice] = useState("");
  const currency = useSelector((state) => state.currency.value);

  const [totalBtc, setTotalBtc] = useState(`${0} Btc`);

  async function fetchCoins() {
    try {
      const jsonData = await fetch(CoinList(currency));
      const coins = await jsonData.json();
      setCoins(coins.slice(0, 10));
    } catch (error) {
      alert(`${error.message} : You've exceeded the Rate Limit`);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  function onAmountchange(event) {
    console.log(event.target.value);
    return setEnteredAmount(event.target.value);
  }

  return (
    <>
      <Container className=" bg-white m-2 max-sm:w-full p-4 max-sm:p-2 mt-3 h-80 ">
        <div
          style={{
            fontSize: "1.5rem",
            fontFamily: "Oswald",
          }}
        >
          Exchange Coins
        </div>
        <div className="flex gap-2 items-center max-sm:flex-col mt-6">
          {" "}
          {}
          <div className="w-1/2 max-sm:w-full flex items-center justify-between gap-2">
            <label
              className="w-2/12 text-center"
              htmlFor="sell"
              style={{ color: "red", fontFamily: "Oswald" }}
            >
              Sell
            </label>
            <Select
              className="w-10/12"
              id="sell"
              value={sellCurrentPrice}
              onChange={(event) => {
                setSellCurrentPrice(event.target.value);
              }}
            >
              {coins.map((coin) => {
                return (
                  <MenuItem key={coin.id} value={coin.current_price}>
                    {coin.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="w-1/2 max-sm:w-full max-sm:mt-2 flex items-center justify-between gap-2">
            <label
              className="w-2/12 text-center"
              htmlFor="buy"
              style={{ color: "green", fontFamily: "Oswald" }}
            >
              Buy
            </label>
            <Select
              className="w-10/12"
              id="buy"
              value={buyCurrentPrice}
              onChange={(event) => {
                setBuyCurrentPrice(event.target.value);
              }}
            >
              <MenuItem value={coins[0]?.current_price}>
                {coins[0]?.name}
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 items-center max-sm:flex-col mt-8">
          {" "}
          {}
          <div className="w-1/2 max-sm:w-full flex items-center justify-between gap-2">
            <div className="w-2/12"></div>
            <input
              type="number"
              className="w-10/12"
              placeholder="Enter Amount"
              onChange={onAmountchange}
            />
          </div>
          <div className="w-1/2 max-sm:w-full max-sm:mt-2 flex items-center justify-between gap-2">
            <div className="w-2/12"></div>
            <div className="w-10/12 font-bold font-oswald text-lg">
              Total: {totalBtc}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center max-sm:flex-col mt-7">
          {" "}
          {/*4 */}
          <div className="w-1/2 max-sm:w-full flex items-center justify-between gap-2">
            <div className="w-2/12"></div>
            <div className="w-10/12"></div>
          </div>
          <div className="w-1/2 max-sm:w-full max-sm:mt-2 flex items-center justify-between gap-2">
            <div>
              <Button
                style={{
                  width: "16.666667%",
                }}
                variant="text"
                onClick={(event) => {
                  const totalBtc =
                    (Number(sellCurrentPrice) / Number(buyCurrentPrice)) *
                    Number(enteredAmount);
                  setTotalBtc(`${totalBtc.toFixed(2)}`);
                }}
              >
                Exchange
              </Button>
            </div>
            <div className="w-10/12"> </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ExcahangeCurrency;
