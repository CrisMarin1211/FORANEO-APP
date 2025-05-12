// ProgressBar.jsx
import React from "react";
import { Progress } from "antd";
import "./progressBar.css";

const twoColors = {
  "0%": "#79CFD9",
  "100%": "#CEA8FC",
};

const ProgressBar = ({ goal, percent }) => {
  // Limitar el porcentaje a dos decimales
  const roundedPercent = parseFloat(percent.toFixed(2));  // Redondeamos a 2 decimales

  const raisedAmount = Math.round((roundedPercent / 100) * goal.value); // Recalcular el monto recaudado

  return (
    <section className="progressBarContainer">
      <section
        className="floatingNumber"
        style={{
          left: `min(90%, max(10%, ${roundedPercent}%))`, // Mueve la burbuja en función del porcentaje redondeado
          transform: "translateX(-50%)",  // Ajuste para centrar la burbuja
        }}
      >
        ${raisedAmount.toLocaleString()} {/* Muestra la cantidad recaudada */}
      </section>

      <Progress
        className="progressbar"
        percent={roundedPercent}  // Usamos el porcentaje redondeado
        percentPosition={{ align: "end", type: "inner", justify: "center" }}
        strokeColor={twoColors}
        size={[390, 40]}
      />
    </section>
  );
};

export default ProgressBar;
