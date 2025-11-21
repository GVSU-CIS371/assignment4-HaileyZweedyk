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
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    async init() {
      // Load bases
      const basesSnap = await getDocs(collection(db, 'bases'));
      this.bases = basesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;

      // Load creamers
      const creamersSnap = await getDocs(collection(db, 'creamers'));
      this.creamers = creamersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;

      // Load syrups
      const syrupsSnap = await getDocs(collection(db, 'syrups'));
      this.syrups = syrupsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;

      // Set default selections
      this.currentBase = this.bases[0] || null;
      this.currentCreamer = this.creamers[0] || null;
      this.currentSyrup = this.syrups[0] || null;
    },
    makeBeverage() {},

    showBeverage() {},
  },
});
