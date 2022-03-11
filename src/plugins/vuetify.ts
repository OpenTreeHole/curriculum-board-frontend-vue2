import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#03a9f4",
        secondary: "#00bcd4",
        accent: "#ff9800",
        error: "#f44336",
        warning: "#ff5722",
        info: "#009688",
        success: "#8bc34a",
      },
    },
  },
});
