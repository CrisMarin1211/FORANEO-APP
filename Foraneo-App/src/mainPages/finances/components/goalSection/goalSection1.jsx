// GoalSection.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGoal } from '../../../../redux/finances/financesSlice'; // Acción de Redux
import { saveGoalToFirestore } from '../../../../services/firebaseUtils'; // Función para guardar la meta en Firestore
import GoalForm from '../goalForm/goalForm'; // Importa GoalForm
import GoalInfo from '../goal/goalnfo'; // Asegúrate de que GoalInfo esté importado
import GoalAdd from '../goalAdd/goalAdd'; // Asegúrate de que GoalAdd esté importado
import './goalSection.css'; // Importa el archivo CSS para estilos

const GoalSection = () => {
  const dispatch = useDispatch();
  const goal = useSelector((state) => state.finances.goal); // Obtener la meta desde Redux

  const [isGoalCreated, setIsGoalCreated] = useState(false); // Estado para manejar si la meta fue creada

  const handleCreateGoal = async (goalData) => {
    // Guardar la meta en Redux
    dispatch(setGoal({ goal: goalData }));

    // Guardar la meta en Firestore
    await saveGoalToFirestore(goalData);

    // Actualizamos el estado para que el formulario se oculte
    setIsGoalCreated(true); // Cambiamos el estado a true para ocultar el formulario
  };

  // Si no hay meta creada, mostrar el formulario de GoalForm
  if (!goal) {
    return (
      <section className="goal-section">
        <GoalForm onSubmit={handleCreateGoal} /> {/* Usamos GoalForm para crear la meta */}
      </section>
    );
  }

  // Si la meta ya ha sido creada, mostrar GoalInfo y GoalAdd
  return (
    <section className="goal-section">
      <GoalInfo goal={goal} />
      <GoalAdd goal={goal} />
    </section>
  );
};

export default GoalSection;
