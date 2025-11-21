import { createApp } from "vue";
import "./styles/mug.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import { useBeverageStore } from "./stores/beverageStore";

// 1️⃣ Create the Vue app
const app = createApp(App);

// 2️⃣ Create Pinia and use plugins
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);

const beverageStore = useBeverageStore();

beverageStore.init().then(() => {
  app.mount("#app");
});