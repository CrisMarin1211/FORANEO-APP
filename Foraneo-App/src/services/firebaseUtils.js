import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  Timestamp,
  getDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();


export const saveTransactionToFirestore = async (transactionData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      const collectionField =
        transactionData.type === "Income" ? "incomes" : "expenses";


      await updateDoc(userRef, {
        [collectionField]: arrayUnion(transactionData),
        totalAvailable: increment(
          transactionData.type === "Income"
            ? transactionData.value
            : -transactionData.value
        ),
      });

      console.log(`${transactionData.type} successfully added to Firestore!`);
    }
  } catch (error) {
    console.error("Error saving transaction to Firestore:", error);
  }
};

export const getTransactionsFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        return {
          expenses: userData.expenses || [],
          incomes: userData.incomes || [],
          totalAvailable: userData.totalAvailable || 0,
        };
      } else {
        return { expenses: [], incomes: [], totalAvailable: 0 };
      }
    }
  } catch (error) {
    console.error("Error getting transactions from Firestore: ", error);
  }
};

export const removeTransactionFromFirestore = async (transactionData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      const collectionField =
        transactionData.type === "Income" ? "incomes" : "expenses";


      await updateDoc(userRef, {
        [collectionField]: arrayRemove(transactionData),
        totalAvailable: increment(
          transactionData.type === "Income"
            ? -transactionData.value
            : transactionData.value
        ),
      });

      console.log(
        `${transactionData.type} successfully removed from Firestore!`
      );
    }
  } catch (error) {
    console.error("Error removing transaction from Firestore:", error);
  }
};


export const saveGoalToFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);


      const goalDataToSave = {
        ...goalData,
        startDate:
          goalData.startDate instanceof Date
            ? Timestamp.fromDate(goalData.startDate)
            : null,
        endDate:
          goalData.endDate instanceof Date
            ? Timestamp.fromDate(goalData.endDate)
            : null,
        totalContributed: goalData.totalContributed || 0,
        remaining: goalData.value - (goalData.totalContributed || 0),
        weeklySavings: goalData.weeklySavings,
      };

      await updateDoc(userRef, {
        goal: goalDataToSave,
      });

      console.log("Goal saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving goal to Firestore:", error);
  }
};


export const updateGoalInFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        goal: goalData,
      });

      console.log("Goal updated successfully in Firestore!");
    }
  } catch (error) {
    console.error("Error updating goal in Firestore:", error);
  }
};


export const removeGoalFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        goal: null,
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
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        totalAvailable: increment(-amount),
      });

      console.log("Total available updated successfully in Firestore!");
    }
  } catch (error) {
    console.error("Error updating totalAvailable in Firestore:", error);
  }
};


export const saveFinishedGoalToFirestore = async (goalData) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);


      await updateDoc(userRef, {
        finishedGoals: arrayUnion({
          name: goalData.name,
          value: goalData.value,
          totalContributed: goalData.totalContributed,
          completedAt: Timestamp.now(),
        }),
      });

      console.log("Finished goal saved successfully to Firestore!");
    }
  } catch (error) {
    console.error("Error saving finished goal to Firestore:", error);
  }
};


export const getUserDataFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        return {
          ...userData,
          finishedGoals: userData.finishedGoals || [],
        };
      } else {
        console.log("No user data found in Firestore.");
        return null;
      }
    } else {
      console.log("No user is logged in.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    return null;
  }
};


export const saveWeeklyPlanToFirestore = async (weeklyPlan) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        weeklyPlan: weeklyPlan,
      });
      console.log("Weekly plan saved to Firestore!");
    } else {
      throw new Error("No user authenticated");
    }
  } catch (error) {
    console.error("Error saving weekly plan to Firestore:", error);
  }
};


export const getWeeklyPlanFromFirestore = async () => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.weeklyPlan || [];
      } else {
        return [];
      }
    } else {
      throw new Error("No user authenticated");
    }
  } catch (error) {
    console.error("Error fetching weekly plan from Firestore:", error);
    return [];
  }
};
