import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDatabase = async (database) => {
  try {
    await AsyncStorage.setItem('database', JSON.stringify(database));
    console.log('Base de données sauvegardée avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la base de données:', error);
  }
};

const loadDatabase = async () => {
  try {
    const database = await AsyncStorage.getItem('database');
    if (database !== null) {
      return JSON.parse(database);
    } else {
      return null; // Base de données vide au démarrage
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la base de données:', error);
    return null;
  }
};

const addCategory = async (category) => {
  let database = await loadDatabase();
  if (database === null) {
    database = { categories: [] };
  }
  database.categories.push(category);
  await saveDatabase(database);
};

const updateCategory = async (categoryId, updatedCategory) => {
  let database = await loadDatabase();
  if (database !== null) {
    const index = database.categories.findIndex(category => category.id_categorie === categoryId);
    if (index !== -1) {
      database.categories[index] = { ...database.categories[index], ...updatedCategory };
      await saveDatabase(database);
      return true; // Mise à jour réussie
    }
  }
  return false; // Échec de la mise à jour
};

const deleteCategory = async (categoryId) => {
  let database = await loadDatabase();
  if (database !== null) {
    database.categories = database.categories.filter(category => category.id_categorie !== categoryId);
    await saveDatabase(database);
    return true; // Suppression réussie
  }
  return false; // Échec de la suppression
};

const addPlat = async (plat) => {
  let database = await loadDatabase();
  if (database === null) {
    database = { plats: [] };
  }
  database.plats.push(plat);
  await saveDatabase(database);
};

const updatePlat = async (platReference, updatedPlat) => {
  let database = await loadDatabase();
  if (database !== null) {
    const index = database.plats.findIndex(plat => plat.reference === platReference);
    if (index !== -1) {
      database.plats[index] = { ...database.plats[index], ...updatedPlat };
      await saveDatabase(database);
      return true; // Mise à jour réussie
    }
  }
  return false; // Échec de la mise à jour
};

const deletePlat = async (platReference) => {
  let database = await loadDatabase();
  if (database !== null) {
    database.plats = database.plats.filter(plat => plat.reference !== platReference);
    await saveDatabase(database);
    return true; // Suppression réussie
  }
  return false; // Échec de la suppression
};

const addFournisseur = async (fournisseur) => {
  let database = await loadDatabase();
  if (database === null) {
    database = { fournisseurs: [] };
  }
  database.fournisseurs.push(fournisseur);
  await saveDatabase(database);
};

const updateFournisseur = async (fournisseurId, updatedFournisseur) => {
  let database = await loadDatabase();
  if (database !== null) {
    const index = database.fournisseurs.findIndex(fournisseur => fournisseur.id_fournisseur === fournisseurId);
    if (index !== -1) {
      database.fournisseurs[index] = { ...database.fournisseurs[index], ...updatedFournisseur };
      await saveDatabase(database);
      return true; // Mise à jour réussie
    }
  }
  return false; // Échec de la mise à jour
};

const deleteFournisseur = async (fournisseurId) => {
  let database = await loadDatabase();
  if (database !== null) {
    database.fournisseurs = database.fournisseurs.filter(fournisseur => fournisseur.id_fournisseur !== fournisseurId);
    await saveDatabase(database);
    return true; // Suppression réussie
  }
  return false; // Échec de la suppression
};

const addIngredient = async (ingredient) => {
  let database = await loadDatabase();
  if (database === null) {
    database = { ingredients: [] };
  }
  database.ingredients.push(ingredient);
  await saveDatabase(database);
};

const updateIngredient = async (ingredientId, updatedIngredient) => {
  let database = await loadDatabase();
  if (database !== null) {
    const index = database.ingredients.findIndex(ingredient => ingredient.id_ingredient === ingredientId);
    if (index !== -1) {
      database.ingredients[index] = { ...database.ingredients[index], ...updatedIngredient };
      await saveDatabase(database);
      return true; // Mise à jour réussie
    }
  }
  return false; // Échec de la mise à jour
};

const deleteIngredient = async (ingredientId) => {
  let database = await loadDatabase();
  if (database !== null) {
    database.ingredients = database.ingredients.filter(ingredient => ingredient.id_ingredient !== ingredientId);
    await saveDatabase(database);
    return true; // Suppression réussie
  }
  return false; // Échec de la suppression
};

const addCompositionPlat = async (compositionPlat) => {
  let database = await loadDatabase();
  if (database === null) {
    database = { compositionPlats: [] };
  }
  database.compositionPlats.push(compositionPlat);
  await saveDatabase(database);
};

const updateCompositionPlat = async (platId, ingredientId, updatedCompositionPlat) => {
  let database = await loadDatabase();
  if (database !== null) {
    const index = database.compositionPlats.findIndex(compPlat => compPlat.id_plat === platId && compPlat.id_ingredient === ingredientId);
    if (index !== -1) {
      database.compositionPlats[index] = { ...database.compositionPlats[index], ...updatedCompositionPlat };
      await saveDatabase(database);
      return true; // Mise à jour réussie
    }
  }
  return false; // Échec de la mise à jour
};

const deleteCompositionPlat = async (platId, ingredientId) => {
  let database = await loadDatabase();
  if (database !== null) {
    database.compositionPlats = database.compositionPlats.filter(compPlat => !(compPlat.id_plat === platId && compPlat.id_ingredient === ingredientId));
    await saveDatabase(database);
    return true; // Suppression réussie
  }
  return false; // Échec de la suppression
};

const getAllCategories = async () => {
  const database = await loadDatabase();
  return database !== null ? database.categories : [];
};

const getAllPlats = async () => {
  const database = await loadDatabase();
  return database !== null ? database.plats : [];
};


const getAllFournisseurs = async () => {
  const database = await loadDatabase();
  return database !== null ? database.fournisseurs : [];
};

const getAllIngredients = async () => {
  const database = await loadDatabase();
  return database !== null ? database.ingredients : [];
};

const getAllCompositionPlats = async () => {
  const database = await loadDatabase();
  return database !== null ? database.compositionPlats : [];
};

export {
    saveDatabase,
    loadDatabase,
    addCategory,
    updateCategory,
    deleteCategory,
    addPlat,
    updatePlat,
    deletePlat,
    addFournisseur,
    updateFournisseur,
    deleteFournisseur,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addCompositionPlat,
    updateCompositionPlat,
    deleteCompositionPlat,
    getAllCategories,
    getAllPlats,
    getAllFournisseurs,
    getAllIngredients,
    getAllCompositionPlats,
};
