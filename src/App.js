import "./App.css";
import Header from "./features/header/Header";
import Nav from "./features/nav/Nav";
import Sidebar from "./features/sidebar/Sidebar";
import Chart from "./features/chart/Chart";
import Portfolio from "./features/portfolio/Portfolio";
import ExcahangeCurrency from "./features/exchange/ExchangeCurrency";

function App() {
  return (
    <div className="max-sm:h-fit h-screen ">
      <Header />
      <div className="flex max-lg:flex-col">
        <div className="w-9/12 max-lg:w-full">
          <Nav />
          <Chart />
          <div className="w-full flex max-sm:flex-col gap-3 max-sm:gap-2">
            <Portfolio />
            <ExcahangeCurrency />
          </div>
        </div>
        <div className="w-3/12 max-lg:w-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
