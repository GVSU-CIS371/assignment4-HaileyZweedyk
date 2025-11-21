<template>
  <div class="froth">
    <div
      v-for=" in 5"
      class="foam"
      :style="{ backgroundColor: beverageStore.currentCreamer?.color }"
    ></div>
  </div>
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

const creamerCollection = [
  { "id": "c1", "name": "No Cream", "color": "transparent" },
  { "id": "c2", "name": "Milk", "color": "AliceBlue" },
  { "id": "c3", "name": "Cream", "color": "#F5F5DC" },
  { "id": "c4", "name": "Half & Half", "color": "#FFFACD" }
]

onMounted(async () => {
  for (const creamer of creamerCollection) {
    const creamerDoc: DocumentReference = doc(db, 'creamers', creamer.id);
    await setDoc(creamerDoc, { name: creamer.name, color: creamer.color });
  }
});

const beverageStore = useBeverageStore();
</script>
<style lang="scss" scoped>
.froth {
  overflow: visible;
  transform: translateY(400%);
  position: relative;
  height: 20%;
  width: 100%;
  background-color: #c6c6c6;
  animation: pour-tea 2s 2s forwards;
}
.foam {
  display: block;
  background: #e4e0d2;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
}

.foam:nth-child(1) {
  top: 0px;
  left: -3px;
}

.foam:nth-child(2) {
  top: 0px;
  left: 55px;
}

.foam:nth-child(3) {
  width: 30px;
  height: 30px;
  border-radius: 40px;
  top: 3px;
  left: 30px;
}

.foam:nth-child(4) {
  width: 30px;
  height: 30px;
  border-radius: 45px;
  top: 5px;
  right: -2px;
}

.foam:nth-child(5) {
  top: 2px;
  right: 10px;
}
</style>
