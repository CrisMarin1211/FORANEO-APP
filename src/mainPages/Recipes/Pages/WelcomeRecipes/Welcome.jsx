import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import WelcomeNoData from "../../Components/Welcome Component/welcomeComp";
import Menu from "../../../Planner/components/navBar/navBar";

function Welcome() {
  const weeklyPlan = useSelector((state) => state.recipes.weeklyPlan);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (weeklyPlan && weeklyPlan.length > 0) {
      navigate("/weeklyplan");
    }
  }, [weeklyPlan, navigate]);

  return (
    <section className="welcomeContainer">
      <WelcomeNoData />
      <Menu className="menusection"></Menu>
    </section>
  );
}

export default Welcome;
