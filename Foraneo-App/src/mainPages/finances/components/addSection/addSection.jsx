import React, { useState, useEffect } from "react";
import "./addSection.css";
import Categories from "../categories/categories";
import ValueInput from "../valueInput/valueInput";
import AddInputs from "../addInputs/addInputs";
import CalendarInput from "../calendarInput/calendarInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addTransactionAsync,
  removeTransactionAsync,
} from "../../../../redux/finances/financesSlice"; 
const AddSection = () => {
  const [activeTab, setActiveTab] = useState("Expenses");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState(10000);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isIncome = activeTab === "Incomes";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && (tab === "Expenses" || tab === "Incomes")) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSave = () => {
    if (!selectedCategory || !value || !name || !details || !date) {
      alert("Please fill in all fields!");
      return;
    }

    const transactionData = {
      category: selectedCategory,
      value,
      name,
      details,
      date,
      type: isIncome ? "Income" : "Expense",
      timestamp: new Date().toISOString(),
    };

    dispatch(addTransactionAsync(transactionData));

    setSelectedCategory("");
    setValue(10000);
    setName("");
    setDetails("");
    setDate("");


    const entryDate = new Date(date);
    const entryYear = entryDate.getFullYear();
    const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, "0");
    const monthParam = `${entryYear}-${entryMonth}`;


    navigate(`/finances?month=${monthParam}`);
  };

  const renderContent = () => {
    const categoryTitle = isIncome ? "Income Categories" : "Expense Categories";
    const valueTitle = isIncome
      ? "2. How much did you earn?"
      : "2. How much did you spend?";
    const detailTitle = isIncome ? "3. Income Details" : "3. Expense Details";

    return (
      <section>
        <h2 className="categorytitle">{categoryTitle}</h2>
        <Categories
          isIncome={isIncome}
          setSelectedCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <h2>{valueTitle}</h2>
        <ValueInput setValue={setValue} value={value} />
        <h2 className="detaitittle">{detailTitle}</h2>
        <AddInputs
          setName={setName}
          setDetails={setDetails}
          name={name}
          details={details}
        />
        <CalendarInput setDate={setDate} date={date} />
        <button className="add-btn2" onClick={handleSave}>
          Save
        </button>
      </section>
    );
  };

  return (
    <section className="Add-container">
      <section className="Addtabs">
        <section
          className={`Addtab ${
            activeTab === "Expenses" ? "active Expenses-tab" : ""
          }`}
          onClick={() => setActiveTab("Expenses")}
        >
          📃 Expenses
        </section>
        <section
          className={`Addtab ${
            activeTab === "Incomes" ? "active Incomes-tab" : ""
          }`}
          onClick={() => setActiveTab("Incomes")}
        >
          📊 Incomes
        </section>
      </section>

      <section className="Addtab-content">{renderContent()}</section>
    </section>
  );
};

export default AddSection;
