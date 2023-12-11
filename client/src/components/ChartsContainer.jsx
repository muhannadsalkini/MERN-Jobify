/* eslint-disable react/prop-types */
import { useState } from "react";

import BarChartComp from "./BarChart";
import AreaChartComp from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
