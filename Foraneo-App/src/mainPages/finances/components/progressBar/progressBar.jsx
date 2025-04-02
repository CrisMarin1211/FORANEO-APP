import React from "react";
import { Progress } from "antd";

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

const ProgressBar = ({ goal = 1000000, percent = 10 }) => {
  const raisedAmount = Math.round((percent / 100) * goal);

  return (
    <div style={{ position: "relative", width: "500px", textAlign: "center" }}>
      {/* Pop Number*/}
      <div
        style={{
          position: "absolute",
          left: `${percent}%`,
          transform: "translateX(-50%)",
          top: "-30px",
          background: "#E3E3E3",
          color: "black",
          padding: "6px 12px",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ${raisedAmount.toLocaleString()}
      </div>

      <Progress
        percent={percent}
        percentPosition={{ align: 'end', type: 'inner' , justify: 'center'}}

        strokeColor={twoColors}
        size={[450, 40]}
      />
    </div>
  );
};

export default ProgressBar;
