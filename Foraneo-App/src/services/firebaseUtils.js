
import { getFirestore, doc, updateDoc, arrayRemove, Timestamp, getDoc, arrayUnion, increment } from 'firebase/firestore';
import { auth } from './firebaseConfig';

const db = getFirestore();

// Función para agregar un ingreso o gasto
export const saveTransactionToFirestore = async (transactionData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId); // Documento del usuario

      const collectionField = transactionData.type === 'Income' ? 'incomes' : 'expenses';

      // Agregar la transacción al campo correspondiente y actualizar el total disponible
      await updateDoc(userRef, {
        [collectionField]: arrayUnion(transactionData), // Agregar la transacción al array de ingresos o gastos
        totalAvailable: increment(transactionData.type === 'Income' ? transactionData.value : -transactionData.value), // Actualizar totalAvailable
      });

      console.log(`${transactionData.type} successfully added to Firestore!`);
    }
  } catch (error) {
    console.error("Error saving transaction to Firestore:", error);
  }
};

// Función para obtener los gastos e ingresos de un usuario
export const getTransactionsFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId); // Documento del usuario
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        return {
          expenses: userData.expenses || [],
          incomes: userData.incomes || [],
          totalAvailable: userData.totalAvailable || 0
        };
      } else {
        return { expenses: [], incomes: [], totalAvailable: 0 };
      }
    }
  } catch (error) {
    console.error("Error getting transactions from Firestore: ", error);
  }
};

// Función para eliminar una transacción
export const removeTransactionFromFirestore = async (transactionData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId); // Documento del usuario

      const collectionField = transactionData.type === 'Income' ? 'incomes' : 'expenses';

      // Eliminar la transacción y actualizar el total disponible
      await updateDoc(userRef, {
        [collectionField]: arrayRemove(transactionData), // Eliminar de los arrays de ingresos/gastos
        totalAvailable: increment(transactionData.type === 'Income' ? -transactionData.value : transactionData.value), // Actualizar el total disponible
      });

      console.log(`${transactionData.type} successfully removed from Firestore!`);
    }
  } catch (error) {
    console.error("Error removing transaction from Firestore:", error);
  }
};
// firebaseUtils.js

// Función para guardar la meta en Firestore
export const saveGoalToFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);

      // Asegúrate de que startDate y endDate sean Timestamp
      const goalDataToSave = {
        ...goalData,
        startDate: goalData.startDate instanceof Date ? Timestamp.fromDate(goalData.startDate) : null,
        endDate: goalData.endDate instanceof Date ? Timestamp.fromDate(goalData.endDate) : null,
        totalContributed: goalData.totalContributed || 0,
        remaining: goalData.value - (goalData.totalContributed || 0),
        weeklySavings: goalData.weeklySavings,  // Asegurarnos de guardar weeklySavings
      };

      await updateDoc(userRef, {
        goal: goalDataToSave
      });

      console.log("Goal saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving goal to Firestore:", error);
  }
};

// Función para actualizar la meta en Firestore
export const updateGoalInFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);

      await updateDoc(userRef, {
        goal: goalData
      });

      console.log("Goal updated successfully in Firestore!");
    }
  } catch (error) {
    console.error("Error updating goal in Firestore:", error);
  }
};

// Función para eliminar la meta en Firestore
export const removeGoalFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);

      await updateDoc(userRef, {
        goal: null
      });

      console.log("Goal removed successfully from Firestore!");
    }
  } catch (error) {
    console.error("Error removing goal from Firestore:", error);
  }
};


export const updateTotalAvailableInFirestore = async (amount) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId); // Documento del usuario

      await updateDoc(userRef, {
        totalAvailable: increment(-amount)  // Resta el monto al total disponible
      });

      console.log("Total available updated successfully in Firestore!");
    }
  } catch (error) {
    console.error("Error updating totalAvailable in Firestore:", error);
  }
};

// Función para guardar la meta completada en Firestore
export const saveFinishedGoalToFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);

      // Guarda la meta completada en un array "finishedGoals"
      await updateDoc(userRef, {
        finishedGoals: arrayUnion({
          name: goalData.name,
          value: goalData.value,
          totalContributed: goalData.totalContributed,
          completedAt: Timestamp.now(), // Fecha en que se completó la meta
        }),
      });

      console.log("Finished goal saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving finished goal to Firestore:", error);
  }
};
