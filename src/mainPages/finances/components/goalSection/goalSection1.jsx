import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGoalAsync,
  fetchGoalAsync,
  removeGoalAsync,
} from "../../../../redux/finances/financesSlice";
import GoalForm from "../goalForm/goalForm";
import GoalInfo from "../goal/goalnfo";
import GoalAdd from "../goalAdd/goalAdd";
import "./goalSection.css";

const GoalSection = () => {
  const dispatch = useDispatch();
  const goal = useSelector((state) => state.finances.goal);

  const [isGoalCreated, setIsGoalCreated] = useState(false);

  const handleCreateGoal = async (goalData) => {

    await dispatch(setGoalAsync(goalData));
    setIsGoalCreated(true);
  };


  if (!goal) {
    return (
      <section className="goal-section">
        <GoalForm onSubmit={handleCreateGoal} />{" "}

      </section>
    );
  }


  return (
    <section className="goal-section">
      <GoalInfo goal={goal} onRemove={() => dispatch(removeGoalAsync())} />
      <GoalAdd goal={goal} />
    </section>
  );
};

export default GoalSection;
