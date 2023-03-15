import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: {
    dark: localStorage.getItem("theme") === "dark",
    themes: {
      light: {
        primary: colors.indigo.lighten1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.purple.darken1,
      },
    },
  },
});
