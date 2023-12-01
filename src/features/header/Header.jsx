import { Paper } from "@mui/material";
import React from "react";

const Header = function () {
  return (
    <header>
      <Paper elevation={4} square>
        <div className="text-black w-full h-20 max-sm:h-16 text-2xl font-medium max-sm:text-lg flex items-center pl-8 max-sm:pl-2 font-merriweather">
          Cryptocurrency Dashboard
        </div>
      </Paper>
    </header>
  );
};

export default Header;
