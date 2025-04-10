import React from "react";
import { Progress } from "antd";
import "./progressBar.css";

const twoColors = {

  "0%": "#79CFD9",
  "100%": "#CEA8FC",
};

const ProgressBar = ({ goal = 1000000, percent = 70 }) => {
  const raisedAmount = Math.round((percent / 100) * goal);

  return (
    <section className="progressBarContainer">
    
      <section
        className="floatingNumber"
        style={{
          left: `min(90%, max(10%, ${percent}%))`,
          transform: "translateX(-50%)",
        }}
      >
        ${raisedAmount.toLocaleString()}
      </section>


      <Progress
        className="progressbar"
        percent={percent}
        percentPosition={{ align: "end", type: "inner", justify: "center" }}
        strokeColor={twoColors}
        size={[390, 40]}
      />
    </section>
  );
};

export default ProgressBar;
