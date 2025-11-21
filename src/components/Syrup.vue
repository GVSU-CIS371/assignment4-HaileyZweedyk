<template>
  <div
    class="syrup"
    :style="{ '--texture-color': beverageStore.currentSyrup?.color }"
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

const syrupCollection = [
  { "id": "s1", "name": "No Syrup", "color": "transparent" },
  { "id": "s2", "name": "Vanilla", "color": "#FFEFD5" },
  { "id": "s3", "name": "Caramel", "color": "#DAA520" },
  { "id": "s4", "name": "Hazelnut", "color": "#6B4423" }
]

onMounted(async () => {
  for (const syrup of syrupCollection) {
    const syrupDoc: DocumentReference = doc(db, 'syrups', syrup.id);
    await setDoc(syrupDoc, { name: syrup.name, color: syrup.color });
  }
});

const beverageStore = useBeverageStore();
</script>
<style lang="scss" scoped>
.syrup { 
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
  background: repeating-linear-gradient(
    45deg,
    var(--texture-color),
    var(--texture-color) 10px,
    rgba(225, 207, 149, 1) 10px,
    rgba(225, 207, 149, 1) 20px
  );
}
</style>
