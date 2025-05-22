import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const getRecipesByType = async (type) => {
  try {
    const recipesCol = collection(db, type);
    const recipeSnapshot = await getDocs(recipesCol);
    return recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${type} recipes from Firestore:`, error);
    return [];
  }
};


export const getAllRecipes = async () => {
  const [breakfast, lunch, dinner] = await Promise.all([
    getRecipesByType("breakfast"),
    getRecipesByType("lunch"),
    getRecipesByType("dinner"),
  ]);
  return { breakfast, lunch, dinner };
};
