import db from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const initialBeverages = [
  {
    name: "London Fog",
    base: { id: "b3", name: "Coffee", color: "#6F4E37" },
    creamer: { id: "c1", name: "Whole Milk" },
    syrup: { id: "s1", name: "Vanilla" },
    temp: "Hot"
  },
  {
    name: "JJ Fog",
    base: { id: "b2", name: "Green Tea", color: "#C8E6C9" },
    creamer: { id: "c2", name: "Soy Milk" },
    syrup: { id: "s2", name: "Hazelnut" },
    temp: "Hot"
  },
  {
    name: "US Fog",
    base: { id: "b1", name: "Black Tea", color: "#8B4513" },
    creamer: { id: "c1", name: "Whole Milk" },
    syrup: { id: "s3", name: "Caramel" },
    temp: "Cold"
  }
];

async function populateBeverages() {
  for (const bev of initialBeverages) {
    await addDoc(collection(db, "beverages"), bev);
  }
  console.log("Initial beverages added to Firestore.");
}

populateBeverages();