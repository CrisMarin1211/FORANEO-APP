import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();

// Guarda un evento de calendario para el usuario autenticado
export const saveCalendarEventToFirestore = async (eventData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      // Obtener eventos actuales
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const currentEvents = userData.calendarEvents || [];
        // Buscar si ya existe un evento para esa fecha
        const existingEvent = currentEvents.find(
          (ev) => ev.date === eventData.date
        );
        if (existingEvent) {
          // Eliminar el evento anterior
          await updateDoc(userRef, {
            calendarEvents: arrayRemove(existingEvent),
          });
        }
      }
      // Agregar el nuevo evento
      await updateDoc(userRef, {
        calendarEvents: arrayUnion(eventData),
      });
      console.log("Calendar event saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving calendar event to Firestore:", error);
  }
};

// Obtiene todos los eventos de calendario del usuario autenticado
export const getCalendarEventsFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.calendarEvents || [];
      }
    }
    return [];
  } catch (error) {
    console.error("Error getting calendar events from Firestore:", error);
    return [];
  }
};

// Elimina un evento de calendario del usuario autenticado
export const removeCalendarEventFromFirestore = async (eventData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        calendarEvents: arrayRemove(eventData),
      });
      console.log("Calendar event removed successfully from Firestore!");
    }
  } catch (error) {
    console.error("Error removing calendar event from Firestore:", error);
  }
};




export const saveTaskToFirestore = async (task) => {
	if (!auth.currentUser) return;
	const userId = auth.currentUser.uid;
	const userRef = doc(db, 'users', userId);

	const snapshot = await getDoc(userRef);
	if (snapshot.exists()) {
		const data = snapshot.data();
		const currentTasks = data.tasks || [];
		const existing = currentTasks.find(t => t.id === task.id);
		if (existing) {
			await updateDoc(userRef, {
				tasks: arrayRemove(existing),
			});
		}
		await updateDoc(userRef, {
			tasks: arrayUnion(task),
		});
	}
};

export const getTasksFromFirestore = async () => {
	if (!auth.currentUser) return [];
	const userId = auth.currentUser.uid;
	const userRef = doc(db, 'users', userId);
	const snapshot = await getDoc(userRef);
	if (snapshot.exists()) {
		return snapshot.data().tasks || [];
	}
	return [];
};

export const deleteTaskFromFirestore = async (taskId) => {
	if (!auth.currentUser) return;
	const userId = auth.currentUser.uid;
	const userRef = doc(db, 'users', userId);
	const snapshot = await getDoc(userRef);
	if (snapshot.exists()) {
		const data = snapshot.data();
		const currentTasks = data.tasks || [];
		const taskToDelete = currentTasks.find(t => t.id === taskId);
		if (taskToDelete) {
			await updateDoc(userRef, {
				tasks: arrayRemove(taskToDelete),
			});
		}
	}
};