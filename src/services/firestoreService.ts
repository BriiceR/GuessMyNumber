import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getScores = async (difficulty: string): Promise<DocumentData[]> => {
  try {
    const firestore = getFirestore();
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(collection(firestore, difficulty + 'Results'));
    const scores: DocumentData[] = snapshot.docs.map(doc => doc.data());

    console.log(`Fetched scores for ${difficulty}Results:`, scores);

    return scores;
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
    throw error;
  }
};


export const addScore = async (difficulty: string, name: string, attempts: number) => {
  const scoresCollection = collection(db, difficulty); // 'difficulty' est utilisé comme nom de collection
  const newScore = {
    name: name,
    attempts: attempts,
    createdAt: new Date()
  };

  try {
    await addDoc(scoresCollection, newScore);
    console.log("Score ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout du score :", error);
    throw error;
  }
};


export const addTestData = async () => {

  const easyResults = collection(db, 'easyResults');
  const mediumResults = collection(db, 'mediumResults');
  const hardResults = collection(db, 'hardResults');

  await addDoc(easyResults, { name: 'XXX', attempts: 99, createdAt: new Date() });
  await addDoc(easyResults, { name: 'XXX', attempts: 99, createdAt: new Date() });

  await addDoc(mediumResults, { name: 'XXX', attempts: 99, createdAt: new Date() });
  await addDoc(mediumResults, { name: 'XXX', attempts: 99, createdAt: new Date() });

  await addDoc(hardResults, { name: 'XXX', attempts: 99, createdAt: new Date() });
  await addDoc(hardResults, { name: 'XXX', attempts: 99, createdAt: new Date() });
};

export const deleteAllScores = async (difficulty: string) => {
  const scoresCollection = collection(db, difficulty);

  try {
    // Récupérer tous les documents de la collection
    const querySnapshot = await getDocs(scoresCollection);

    // Supprimer chaque document de la collection
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Score supprimé avec succès: ${doc.id}`);
    });

    console.log(`Tous les scores de ${difficulty} ont été supprimés.`);
  } catch (error) {
    console.error(`Erreur lors de la suppression des scores de ${difficulty}:`, error);
    throw error;
  }
};
