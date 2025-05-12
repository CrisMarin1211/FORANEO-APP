import React, { useState, useEffect } from 'react';
import { Button, Input, message, Modal } from 'antd';  // Usamos message y Modal para mostrar alertas
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal, setTransactions } from '../../../../redux/finances/financesSlice';  // Acción para actualizar la meta y el total disponible
import { updateGoalInFirestore, saveFinishedGoalToFirestore } from '../../../../services/firebaseUtils';  // Funciones para actualizar la meta y guardar metas completadas en Firestore
import './goalAdd.css';  // Importamos el archivo CSS


const GoalAdd = ({ goal }) => {
  const [amount, setAmount] = useState(0);  // Estado para el monto ingresado
  const [error, setError] = useState(null);  // Estado para manejar el mensaje de error
  const [congratulationsShown, setCongratulationsShown] = useState(false); // Estado para manejar el mensaje de felicitación
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para manejar la visibilidad del Modal
  const dispatch = useDispatch();
  const totalAvailable = useSelector((state) => state.finances.totalAvailable);  // Obtener totalAvailable desde Redux

  const handleAddAmount = async () => {
    // Restablecer el error antes de cada validación
    setError(null);

    // Verificar que la meta no haya sido alcanzada
    if (goal.totalContributed >= goal.value) {
      // Solo mostrar el mensaje de felicitación si no se ha mostrado antes
      if (!congratulationsShown) {
        setIsModalVisible(true); // Mostrar el Modal de felicitaciones
        setCongratulationsShown(true);  // Establecer la bandera para que no se muestre más
        saveFinishedGoalToFirestore(goal); // Enviar la meta completada a Firestore
      }
      return;
    }

    // Verificar que el monto sea válido
    if (amount <= 0) {
      setError('Please enter a valid amount!');
      return;
    }

    // Verificar que el monto no exceda el total disponible
    if (amount > totalAvailable) {
      setError('Amount exceeds the available funds!');
      return;
    }

    // Actualizamos la meta en Redux
    dispatch(updateGoal({ amount }));

    // Actualizamos el total disponible en Redux
    dispatch(setTransactions({
      expenses: state.expenses,  // Mantén los gastos actuales
      incomes: state.incomes,    // Mantén los ingresos actuales
      totalAvailable: totalAvailable - amount  // Resta solo el dinero añadido a la meta
    }));

    // Actualizamos la meta en Firestore
    await updateGoalInFirestore({
      ...goal,
      totalContributed: goal.totalContributed + amount,
      remaining: goal.value - (goal.totalContributed + amount),
    });

    // Actualizamos el total disponible en Firestore
    await updateTotalAvailableInFirestore(amount);  // Asegúrate de que esta función restando el valor de totalAvailable en Firebase

    // Verificar si la meta está completa
    if (goal.value - (goal.totalContributed + amount) === 0) {
      setIsModalVisible(true); // Mostrar el Modal de felicitaciones
      setCongratulationsShown(true);  // Marcar como mostrado
    }

    // Limpiar el input y mostrar el mensaje de éxito
    setAmount(0);
    message.success('Amount successfully added to your goal!');
  };

  const handleOk = () => {
    setIsModalVisible(false); // Cerrar el Modal al hacer click en "OK"
  };

  return (
    <div>
      <h3>Add money to your goal</h3>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount to add"
        style={{ marginBottom: '10px' }}
      />
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}  {/* Mostrar el error en rojo */}
      <Button type="primary" onClick={handleAddAmount}>Add to Goal</Button>

      {/* Modal de felicitaciones cuando la meta se complete */}
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
    </div>
  );
};

export default GoalAdd;
