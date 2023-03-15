<template>
  <div ref="container" class="theme-container shadow-dark" @click="setTheme">
    <img
      ref="container-img"
      id="theme-icon"
      src="https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
      alt="ERR"
    />
  </div>
</template>

<script lang="js">

export default {
  name: "SwitchTheme",
  data() {
    return {
      theme: "dark",
      sun: "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg",
      moon: "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
    };
  },
  methods: {
    setTheme() {
      switch (this.theme) {
        case "dark":
          this.setLight();
          this.theme = "light";
          break;
        case "light":
          this.setDark();
          this.theme = "dark";
          break;
      }
    },
    setLight() {
      localStorage.setItem("theme", "light");
      this.$refs.container.classList.remove("shadow-dark");
      setTimeout(() => {
        this.$refs.container.classList.add("shadow-light");
        this.$refs["container-img"].classList.remove("change");
      }, 300);
      this.$refs["container-img"].classList.add("change");
      this.$refs["container-img"].src = this.sun;
      this.$vuetify.theme.dark = false;
    },
    setDark() {
      localStorage.setItem("theme", "dark");
      this.$refs.container.classList.remove("shadow-light");
      setTimeout(() => {
        this.$refs.container.classList.add("shadow-dark");
        this.$refs["container-img"].classList.remove("change");
      }, 300);
      this.$refs["container-img"].classList.add("change");
      this.$refs["container-img"].src = this.moon;
      this.$vuetify.theme.dark = true;
    },
  },
  created() {
    this.setTheme();
  }
}
</script>

<style scoped>
:root {
  --bs-dark: #212529;
}

.theme-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

.theme-container:hover {
  opacity: 0.8;
}

.shadow-dark {
  background: linear-gradient(145deg, #23282c, #1e2125);
  box-shadow: 17px 17px 23px #1a1d20, -17px -17px 23px #282d32, inset 5px 5px 4px #1e2226, inset -5px -5px 4px #24282c;
}

.shadow-light {
  box-shadow: 7px 7px 15px -10px #bbcfda, -4px -4px 13px #ffffff, inset 7px 7px 3px rgba(209, 217, 230, 0.35),
    inset -11px -11px 3px rgba(255, 255, 255, 0.3);
}

@keyframes change {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.4);
  }
}

.change {
  animation-name: change;
  animation-duration: 1s;
  animation-direction: alternate;
}
</style>
