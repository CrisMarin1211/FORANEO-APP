import React from "react";
import { Progress } from "antd";
import "./progressBar.css";

const twoColors = {
  "0%": "#6E6AD3",
  "100%": "#CEA8FC",
};

const ProgressBar = ({ goal, percent }) => {

  const roundedPercent = parseFloat(percent.toFixed(2));

  const raisedAmount = goal.totalContributed || 0;

  return (
    <section className="progressBarContainer">
      <section
        className="floatingNumber"
        style={{
          left: `min(90%, max(10%, ${roundedPercent}%))`,
          transform: "translateX(-50%)",
        }}
      >
        ${raisedAmount.toLocaleString()}
      </section>

      <Progress
        className="progressbar"
        percent={roundedPercent} 
        percentPosition={{ align: "end", type: "inner", justify: "center" }}
        strokeColor={twoColors}
        size={[390, 40]}
      />
    </section>
  );
};

export default ProgressBar;
