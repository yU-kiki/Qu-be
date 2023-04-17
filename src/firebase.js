import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBj6yaYKzuezq5UQkIB6KOHsEj3h0ZakW4",
  authDomain: "qubee-bcd93.firebaseapp.com",
  projectId: "qubee-bcd93",
  storageBucket: "qubee-bcd93.appspot.com",
  messagingSenderId: "696552193759",
  appId: "1:696552193759:web:3ab53b2da9d8b97cafb36a",
  measurementId: "G-2LLWQCKLED"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;