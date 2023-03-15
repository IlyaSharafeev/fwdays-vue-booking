<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon size="40"> mdi-rocket-launch </v-icon>
        <div class="pa-4 text-uppercase">RocketBook</div>
      </div>
    </v-app-bar>

    <v-main>
      <Booking />
    </v-main>

    <SwitchTheme />
  </v-app>
</template>

<script>
import Booking from "@/components/Booking/Booking";
import SwitchTheme from "@/components/SwitchTheme";
export default {
  name: "App",

  components: {
    SwitchTheme,
    Booking,
  },

  data: () => ({
    //
  }),
};
</script>
