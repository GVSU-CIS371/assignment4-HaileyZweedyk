<template>
  <div
    class="baseBeverage"
    :style="{ backgroundColor: beverageStore.currentBase?.color }"
  ></div>
</template>

<script setup lang="ts">
import { useBeverageStore } from "../stores/beverageStore";
import {
  DocumentReference,
  setDoc,
  doc,
  collection,
  addDoc,
} from 'firebase/firestore';
import db from '../firebase.ts';
import { onMounted } from 'vue';

const beverageStore = useBeverageStore();

const baseCollection = [
  { "id": "b1", "name": "Black Tea", "color": "#8B4513" },
  { "id": "b2", "name": "Green Tea", "color": "#C8E6C9" },
  { "id": "b3", "name": "Coffee", "color": "#6F4E37" }
];

onMounted(async () => {
  for (const base of baseCollection) {
    const baseDoc: DocumentReference = doc(db, 'bases', base.id);
    await setDoc(baseDoc, { name: base.name, color: base.color });
  }
});

</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;
  /* // border-radius: 0.05em 0.05em 2.2em 2.2em; */
}
</style>
