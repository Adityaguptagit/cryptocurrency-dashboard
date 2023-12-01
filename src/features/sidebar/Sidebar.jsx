import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TrendingCoins, CoinList } from "../../config/api";
import {
  Typography,
  Container,
  Table,
  TableContainer,
  LinearProgress,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Pagination,
} from "@mui/material";

function Sidebar() {
  const [page, setPage] = useState(1);

  const currency = useSelector((state) => state.currency.value);

  const search = useSelector((state) => state.search.value);
  const symbol = useSelector((state) => state.symbol.value);

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCoins() {
    try {
      setLoading(true);
      // const data = await fetch(TrendingCoins(currency));
      const data = await fetch(CoinList(currency));
      const Trendingcoins = await data.json();
      setTrending(Trendingcoins); //dispatch
      setLoading(false);
    } catch (error) {
      alert(`${error.message} : You've exceeded the Rate Limit`);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    if (search) {
      return trending.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
        );
      });
    }
    return trending; //state
  };
  return (
    <>
      <Container className="mt-10">
        {/*Heading*/}
        <Typography
          variant="h6"
          style={{
            fontFamily: "Oswald",
          }}
        >
          Cryptocurrency by
          <br />
          market cap
        </Typography>
        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "rgba(86, 172, 255, 0.8)" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead>
                <TableRow> 
                  {["Coin", "Price", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          fontWeight: 700,
                          color: "black",
                          fontFamily: "Merriweather",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 7)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow key={row.id}>
                        {/*Currency Data*/}
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            className="w-[40px] rounded-full"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 18,
                                fontFamily: "Merriweather",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "darkgrey",
                                fontFamily: "Merriweather",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {symbol.concat(row.current_price.toString())}
                          <br />
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol.concat(
                            row.market_cap.toString().slice(0, -6)
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {/*Pagination Component*/}
        <Pagination
          style={{
            display: "flex",
            padding: 20,
            width: "100%",
            justifyContent: "center",
          }}
          count={Number((handleSearch().length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </>
  );
}
export default Sidebar;
