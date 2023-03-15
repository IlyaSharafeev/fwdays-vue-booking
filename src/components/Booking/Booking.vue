<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" lg="8">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"> Choose destination</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"> Choose flight</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Final information</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="DestinationForm">
                <v-autocomplete
                  v-model="currentDestination"
                  class="mt-1"
                  @input="isValid = true"
                  :items="destinations"
                  :rules="[(v) => !!v || 'Destination is required']"
                  placeholder="choose destination"
                  label="destination"
                  dense
                  outlined
                  rounded
                ></v-autocomplete>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      :value="dates[0]"
                      @click="dateDialog = true"
                      outlined
                      rounded
                      label="start"
                      :rules="dateStartRules"
                      dense
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      :value="dates[1]"
                      @click="dateDialog = true"
                      outlined
                      rounded
                      label="end"
                      :rules="dateEndRules"
                      dense
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn @click="searchFlights" block color="primary" rounded :disabled="!isValid">
                  Search flights
                </v-btn>
              </v-form>
              <v-dialog v-model="dateDialog" width="400">
                <v-card>
                  <div class="d-flex flex-column">
                    <v-date-picker v-model="dates" range></v-date-picker>
                    <v-btn @click="dateDialog = false" color="success">Submit</v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-list class="list-flights">
                <v-virtual-scroll :items="flightsList" height="500" item-height="80px" bench="10">
                  <template v-slot:default="{ item }">
                    <v-list-item
                      two-line
                      :key="item"
                      @click="flightId = item.id"
                      :class="flightId === item.id ? 'selected-item' : ''"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ `${item.dates[0]} - ${item.dates[1]}` }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list>
              <v-row>
                <v-col>
                  <v-btn rounded dense block color="primary-darken-1" @click="e1 = 1"> Cancel</v-btn>
                </v-col>
                <v-col>
                  <v-btn rounded dense block color="primary" :disabled="flightId == null" @click="e1 = 3">Search</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card v-if="selectedFlight" class="mb-12 ma-auto" color="grey lighten-1" max-width="374">
                <v-img :src="selectedFlight.image">
                  <v-card-title class="white--text" v-text="selectedFlight.title"></v-card-title>
                </v-img>
                <v-card-text>
                  <div class="text-subtitle-1">{{ selectedFlight.dates[0] }} - {{ selectedFlight.dates[1] }}</div>
                </v-card-text>
              </v-card>
              <v-row>
                <v-col>
                  <v-btn rounded dense block color="primary-darken-1" @click="e1 = 2"> Cancel</v-btn>
                </v-col>
                <v-col>
                  <v-btn rounded dense block color="primary" :disabled="flightId == null">Search</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fakeList } from "@/helpers/fakeData";

export default {
  name: "Booking",
  data() {
    return {
      e1: 2,
      dateDialog: false,
      dates: [],
      destinations: ["Mars", "Moon"],
      dateStartRules: [(v) => !!v || "Start date is required"],
      dateEndRules: [(v) => !!v || "End date is required"],
      currentDestination: null,
      isValid: null,
      flightId: null,
    };
  },
  methods: {
    searchFlights() {
      this.isValid = this.$refs.DestinationForm.validate();
      if (!this.isValid) {
        return;
      }
      this.e1 = 2;
    },
  },
  computed: {
    flightsList() {
      return fakeList(["2021-01-01", "2021-01-02"], 1000);
    },
    selectedFlight() {
      return this.flightsList[this.flightId];
    },
  },
};
</script>

<style scoped lang="scss">
.list-flights {
  height: 60vh;
  overflow-y: auto;
}

.selected-item {
  background-color: rgba(175, 174, 174, 0.49);
  border-radius: 5px;
}
</style>
