<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="b in beverageStore.bases" :key="b.id">
          <label>
            <input
              type="radio"
              name="bases"
              :id="`r${b.id}`"
              :value="b.id"
              v-model="beverageStore.currentBaseID"
            />
            {{ b.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="s in beverageStore.syrups" :key="s.id">
          <label>
            <input
              type="radio"
              name="syrups"
              :id="`r${s.id}`"
              :value="s.id"
              v-model="beverageStore.currentSyrupID"
            />
            {{ s.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="c in beverageStore.creamers" :key="c.id">
          <label>
            <input
              type="radio"
              name="creamers"
              :id="`r${c.id}`"
              :value="c.id"
              v-model="beverageStore.currentCreamerID"
            />
            {{ c.name }}
          </label>
        </template>
      </li>
    </ul>
    <input type="text" placeholder="Beverage Name" />
    <button @click="beverageStore.makeBeverage()">🍺 Make Beverage</button>
  </div>
  <div id="beverage-container" style="margin-top: 20px">
    <ul>
      <li v-for="bev in beverageStore.beverages" :key="bev.id">
        <label>
          <input
            type="radio"
            :value="bev.id"
            v-model="beverageStore.currentBeverageId"
            @change="beverageStore.showBeverage(bev.id)"
          />
          {{ bev.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import db from './firebase.ts';
import {
  DocumentReference,
  setDoc,
  doc,
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';

const beverageStore = useBeverageStore();

const initialBeverages = [
  {
    name: "London Fog",
    base: { id: "b1", name: "Black Tea", color: "#6F4E37" },
    creamer: { id: "c3", name: "Cream" },
    syrup: { id: "s2", name: "Vanilla" },
    temp: "Hot"
  },
  {
    name: "Stella",
    base: { id: "b2", name: "Green Tea", color: "#C8E6C9" },
    creamer: { id: "c2", name: "Milk" },
    syrup: { id: "s2", name: "Vanilla" },
    temp: "Hot"
  },
  {
    name: "US Fog",
    base: { id: "b3", name: "Coffee", color: "#8B4513" },
    creamer: { id: "c3", name: "Half & Half" },
    syrup: { id: "s4", name: "Hazelnut" },
    temp: "Cold"
  }
];

async function populateBeverages() {
  const beveragesCollection = collection(db, "beverages");

  // Optionally check if any beverages exist
  const snap = await getDocs(beveragesCollection);
  if (snap.empty) {
    for (const bev of initialBeverages) {
      await addDoc(beveragesCollection, bev);
    }
    console.log("Initial beverages added to Firestore");
  } else {
    console.log("Beverages already exist in Firestore");
  }
}

populateBeverages();
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
