import React, { useState, useEffect } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal, setTransactions } from '../../../../redux/finances/financesSlice';
import { updateGoalInFirestore, saveFinishedGoalToFirestore } from '../../../../services/firebaseUtils';  
import './goalAdd.css';

const GoalAdd = ({ goal }) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [congratulationsShown, setCongratulationsShown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const totalAvailable = useSelector((state) => state.finances.totalAvailable);

  const handleAddAmount = async () => {
    setError(null);

    if (goal.totalContributed >= goal.value) {

      if (!congratulationsShown) {
        setIsModalVisible(true);
        setCongratulationsShown(true);
        saveFinishedGoalToFirestore(goal);
      }
      return;
    }

    if (amount <= 0) {
      setError('Please enter a valid amount!');
      return;
    }

    if (amount > totalAvailable) {
      setError('Amount exceeds the available funds!');
      return;
    }

    dispatch(updateGoal({ amount }));

    dispatch(setTransactions({
      expenses: state.expenses,
      incomes: state.incomes,
      totalAvailable: totalAvailable - amount
    }));

    await updateGoalInFirestore({
      ...goal,
      totalContributed: goal.totalContributed + amount,
      remaining: goal.value - (goal.totalContributed + amount),
    });

    await updateTotalAvailableInFirestore(amount);

    if (goal.value - (goal.totalContributed + amount) === 0) {
      setIsModalVisible(true);
      setCongratulationsShown(true);
    }


    setAmount(0);
    message.success('Amount successfully added to your goal!');
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <h3>Add money to your goal</h3>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount to add"
        style={{ marginBottom: '10px' }}
      />
      {error && <section style={{ color: 'red', marginBottom: '10px' }}>{error}</section>}
      <Button type="primary" onClick={handleAddAmount}>Add to Goal</Button>

      <Modal
        title="Congratulations!"
        visible={isModalVisible}
        onOk={handleOk}
        okText="OK"
      >
        <p>Congratulations! You have reached your goal!</p>
        <p>Goal Name: {goal.name}</p>
        <p>Total Amount Collected: ${goal.totalContributed}</p>
      </Modal>
    </section>
  );
};

export default GoalAdd;
