import { createApp } from "vue";
import "./styles/mug.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();

beverageStore.init().then(() => {
  createApp(App).use(pinia).mount("#app");
});
