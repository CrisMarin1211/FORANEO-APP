// GoalInfo.jsx
import React, { useState, useEffect } from 'react';
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
    // Actualizar la meta en Redux
    dispatch(setGoal({ goal: editedGoal }));

    // Actualizar la meta en Firestore
    await updateGoalInFirestore(editedGoal);

    // Cerrar el modal
    setIsModalVisible(false);
  };

  const handleCancelEdit = () => {
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
    // Eliminar la meta en Redux
    dispatch(removeGoal());

    // Eliminar la meta en Firestore
    await removeGoalFromFirestore();
  };

  const remaining = goal ? (goal.value - (goal.totalContributed || 0)) : 0;

  // Cálculo de ahorro semanal


  return (
    <section className="goal-container">
      <h3>{goal.name}</h3>
      <p>Goal Amount: ${goal.value}</p>
      <p>Remaining: ${remaining.toFixed(2)}</p>
      <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
      <p>Details: {goal.details}</p>
      <p>Amount Added: ${goal.totalContributed}</p>

      <section className="goal-actions">
        <Button onClick={handleEditClick} type="primary" style={{ marginRight: '1rem' }}>Edit Goal</Button>
        <Button onClick={handleDeleteGoal} type="danger" style={{ backgroundColor: '#ffb0b0' }} >Delete Goal</Button>
      </section>

      {/* Modal para editar la meta */}
      <Modal
        title="Edit Goal"
        visible={isModalVisible}
        onOk={handleEditGoal}
        onCancel={handleCancelEdit}
      >
        <div>
          <label>Name: </label>
          <Input
            name="name"
            value={editedGoal.name}
            onChange={handleInputChange}
            placeholder="Goal name"
          />
        </div>
        <div>
          <label>Value: </label>
          <Input
            name="value"
            type="number"
            value={editedGoal.value}
            onChange={handleInputChange}
            placeholder="Goal value"
          />
        </div>
        <div>
          <label>Start Date: </label>
          <Input
            name="startDate"
            type="date"
            value={editedGoal.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>End Date: </label>
          <Input
            name="endDate"
            type="date"
            value={editedGoal.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Details: </label>
          <Input
            name="details"
            value={editedGoal.details}
            onChange={handleInputChange}
            placeholder="Goal details"
          />
        </div>
      </Modal>
    </section>
  );
};

export default GoalInfo;
