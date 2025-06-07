import React, { useEffect, useState } from "react";
import "./finances.css";
import ShowMoney from "../../components/showMoney/showMoney";
import ProgressBar from "../../components/progressBar/progressBar";
import BigInfoSection from "../../components/bigInfoSection/bigInfoSection";
import FloatingButton from "../../components/buttonMonth/buttonMonth";
import { useLocation } from "react-router-dom";
import Menu from "../../../Planner/components/navBar/navBar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactionsAsync,
  fetchGoalAsync,
} from "../../../../redux/finances/financesSlice";

const Finances = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [displayMonth, setDisplayMonth] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();

  const goal = useSelector((state) => state.finances.goal);
  const expenses = useSelector((state) => state.finances.expenses);
  const incomes = useSelector((state) => state.finances.incomes);

  useEffect(() => {
    // Al cargar el componente, obtener transacciones y goal de Firebase
    dispatch(fetchTransactionsAsync());
    dispatch(fetchGoalAsync());

    const params = new URLSearchParams(location.search);
    const monthParam = params.get("month");

    let targetMonth;
    if (monthParam) {
      targetMonth = monthParam;
    } else {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
      targetMonth = `${currentYear}-${currentMonth}`;
    }

    setSelectedMonth(targetMonth);

    const [year, monthIndex] = targetMonth.split("-");
    const date = new Date(parseInt(year), parseInt(monthIndex) - 1);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setDisplayMonth(`${monthNames[date.getMonth()]}, ${date.getFullYear()}`);
  }, [location.search, dispatch]);

  const filterDataByMonth = (data, month) => {
    if (!month || !data.length) return [];
    const [selectedYear, selectedMonthIndex] = month.split("-");
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();
      return (
        itemYear === parseInt(selectedYear) &&
        itemMonth === parseInt(selectedMonthIndex) - 1
      );
    });
  };

  const filteredData = [
    ...filterDataByMonth(expenses, selectedMonth),
    ...filterDataByMonth(incomes, selectedMonth),
  ];

  const totalExpenses = filterDataByMonth(expenses, selectedMonth).reduce(
    (sum, item) => sum + Number(item.value),
    0
  );
  const totalIncomes = filterDataByMonth(incomes, selectedMonth).reduce(
    (sum, item) => sum + Number(item.value),
    0
  );
  const balance = totalIncomes - totalExpenses;

  const progressPercent = goal
    ? Math.min(100, (goal.totalContributed / goal.value) * 100)
    : 0;

  const handleMonthSelection = (month) => {
    setSelectedMonth(month);

    if (month) {
      const [year, monthIndex] = month.split("-");
      const date = new Date(parseInt(year), parseInt(monthIndex) - 1);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      setDisplayMonth(`${monthNames[date.getMonth()]}, ${date.getFullYear()}`);
    }
  };

  return (
    <section className="Financescontainer">
      <section className="LeftColumn">
      <section className="financesHeader">
        <section className="WelcomeMessage">
          <h2 className={`youCanTittle `}>You can do it Cris!</h2>
          <h4 className="keepTrackTittle">💰 Keep track of your finances!</h4>
        </section>
        <FloatingButton
          onClick={handleMonthSelection}
          displayMonth={displayMonth}
        />
      </section>

      <section className="showMoneySection">
        <ShowMoney
          selectedMonth={selectedMonth}
          totalExpenses={totalExpenses}
          totalIncomes={totalIncomes}
          balance={balance}
        />
      </section>

         <section className="progressBarSection">
        <h2 className={`goalTittle`}>
          {goal
            ? `${goal.name} - $${goal.value.toLocaleString()}`
            : "No goal set"}
        </h2>
        <ProgressBar
          goal={goal || { name: "No goal set", value: 0 }}
          percent={progressPercent}
        />
      </section>
      
      </section>


      <section className="RightColumn">



        <BigInfoSection
          selectedMonth={selectedMonth}
          hasNoData={filteredData.length === 0}
          filteredData={filteredData}
        />
      </section>

      <section className="spaceiwwi"></section>

      <Menu></Menu>
    </section>
  );
};

export default Finances;
