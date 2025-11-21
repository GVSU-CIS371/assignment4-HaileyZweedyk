import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";


export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],

    bases: [] as BaseBeverageType[],
    currentBaseId: "" as string,  // store ID instead of object

    syrups: [] as SyrupType[],
    currentSyrupId: "" as string,

    creamers: [] as CreamerType[],
    currentCreamerId: "" as string,

    beverages: [] as BeverageType[],
    currentBeverageId: "", // ID of the selected saved beverage
    currentName: "",
  }),

  actions: {
    async init() {
      // Load bases
      const basesSnap = await getDocs(collection(db, "bases"));
      this.bases = basesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;
      this.currentBaseId = this.bases[0]?.id || "";

      // Load creamers
      const creamersSnap = await getDocs(collection(db, "creamers"));
      this.creamers = creamersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;
      this.currentCreamerId = this.creamers[0]?.id || "";

      // Load syrups
      const syrupsSnap = await getDocs(collection(db, "syrups"));
      this.syrups = syrupsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;
      this.currentSyrupId = this.syrups[0]?.id || "";

      await this.loadBeverages();
    },

     async loadBeverages() {
      const snap = await getDocs(collection(db, "beverages"));
      this.beverages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BeverageType[];
      this.currentBeverageId = this.beverages[0]?.id || "";
    },

    makeBeverage() {},

    showBeverage() {},
  },
});
