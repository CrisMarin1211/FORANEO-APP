import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setGoal, removeGoal } from '../../../../redux/finances/financesSlice';
import { updateGoalInFirestore, removeGoalFromFirestore } from '../../../../services/firebaseUtils';
import './goal.css';

const GoalInfo = ({ goal, onRemove }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleEditGoal = async () => {
    dispatch(setGoal({ goal: editedGoal }));

    await updateGoalInFirestore(editedGoal);

    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleDeleteGoal = async () => {
    dispatch(removeGoal());

    await removeGoalFromFirestore();
  };

  const remaining = goal ? (goal.value - (goal.totalContributed || 0)) : 0;

  return (
    <section className="goal-container">
      <h3>{goal.name}</h3>
      <h4>💰Amount: ${goal.value}</h4>
      <p><strong>📥Remaining:</strong> ${remaining.toFixed(2)}</p>
      <p><strong>Start Date:</strong> {new Date(goal.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(goal.endDate).toLocaleDateString()}</p>
      <p><strong>Details:</strong> {goal.details}</p>
      <p><strong>📈Amount Added:</strong> ${goal.totalContributed}</p>

      <section className="goal-actions">
        <Button onClick={handleEditClick} className='editGoalButton' type="primary" style={{ marginRight: '1rem' }}>Edit Goal</Button>
        <Button onClick={handleDeleteGoal} type="danger" className='deletegoalButton' >Delete Goal</Button>
      </section>

      <Modal
        className="edit-goal-modal"
        title="Edit Goal"
        visible={isModalVisible}
        onOk={handleEditGoal}
        onCancel={() => setIsModalVisible(false)} // Cierra el modal cuando se hace clic en la X
        footer={[
          <Button key="ok" type="primary" onClick={handleEditGoal}>
            OK
          </Button>
        ]}
      >
        <section>
          <label>Name: </label>
          <Input
            name="name"
            value={editedGoal.name}
            onChange={handleInputChange}
            placeholder="Goal name"
          />
        </section>
        <section>
          <label>Value: </label>
          <Input
            name="value"
            type="number"
            value={editedGoal.value}
            onChange={handleInputChange}
            placeholder="Goal value"
          />
        </section>
        <section>
          <label>Start Date: </label>
          <Input
            name="startDate"
            type="date"
            value={editedGoal.startDate}
            onChange={handleInputChange}
          />
        </section>
        <section>
          <label>End Date: </label>
          <Input
            name="endDate"
            type="date"
            value={editedGoal.endDate}
            onChange={handleInputChange}
          />
        </section>
        <section>
          <label>Details: </label>
          <Input
            name="details"
            value={editedGoal.details}
            onChange={handleInputChange}
            placeholder="Goal details"
          />
        </section>
      </Modal>
    </section>
  );
};

export default GoalInfo;
