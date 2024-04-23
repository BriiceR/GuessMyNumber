import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getScores = async (difficulty: string): Promise<DocumentData[]> => {
  try {
    const firestore = getFirestore();
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(collection(firestore, difficulty + 'Results'));
    const scores: DocumentData[] = snapshot.docs.map(doc => doc.data());
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


// export const addTestData = async () => {
//   // Ajoutez vos données de test ici
//   const easyResults = collection(db, 'easyResults');
//   const mediumResults = collection(db, 'mediumResults');
//   const hardResults = collection(db, 'hardResults');

//   await addDoc(easyResults, { name: 'DAN', attempts: 5 });
//   await addDoc(easyResults, { name: 'AMY', attempts: 8 });

//   await addDoc(mediumResults, { name: 'DAN', attempts: 15 });
//   await addDoc(mediumResults, { name: 'AMY', attempts: 20 });

//   await addDoc(hardResults, { name: 'DAN', attempts: 25 });
//   await addDoc(hardResults, { name: 'AMY', attempts: 40 });
// };
