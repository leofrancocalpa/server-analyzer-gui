<template>
  <v-container grid-list-md>
    <v-row>
      <v-col>
        <v-row v-if="queryRequestFlag">
          <v-col cols="2" lg="9">
            <v-text-field
              v-model="query"
              label="Dominio del Servidor"
              outlined
              clearable
              height="30px"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              class="mr-3"
              height="55px"
              primary
              router
              color="primary"
              @click="startQuery(query)"
            >Consultar</v-btn>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="2" lg="9">
            <v-text-field
              v-model="query"
              disabled="true"
              label="Dominio del Servidor"
              outlined
              clearable
              height="30px"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              disabled="true"
              class="mr-3"
              height="55px"
              primary
              router
              color="primary"
              @click="startQuery(query)"
            >Consultar</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card width="800">
              <v-card-text>
                <div>
                  <img v-if="queryResponseFlag" :src="hostQueried.logo" /> Server info
                </div>
                <p v-if="query" class="display-1 text--primary">{{query}}</p>
                <p>Result</p>
                <div v-if="queryResponseFlag" class="text--primary">
                  <p>Server has changed: {{hostQueried.servers_changed}}</p>
                  <p>SSL Grade: {{hostQueried.ssl_grade}}</p>
                  <p>Previous SSL Grade: {{hostQueried.previous_ssl_grade}}</p>
                  <p>Web site title: {{hostQueried.title}}</p>
                  <p>Server is down: {{hostQueried.is_down}}</p>
                </div>
                <div>
                  <serverstable
                  :servers="hostQueried.servers"
                  >
                  </serverstable>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="resetFlags">reset</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-card width="500">
          <v-card-text>
            <div>Word of the Day</div>
            <p class="display-1 text--primary">queried before</p>
            <p>adjective</p>
            <div class="text--primary">
              well meaning and kindly.
              <br />"a benevolent smile"
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import serverstable from "./Table";
export default {
  components: { serverstable },
  data() {
    return {
      query: "",
      queryResponseFlag: false,
      queryRequestFlag: true
    };
  },
  created() {
    this.$store.dispatch("analyzer/loadPreviousQueries").then(resp => {
      console.log("Previous queries loaded");
    });
  },
  computed: {
    hostQueried() {
      return this.$store.getters["analyzer/infoHostQueried"];
    },
    previousQueried() {
      return this.$store.getters["analyzer/previousQueries"];
    }
  },
  methods: {
    startQuery(hostname) {
      this.queryRequestFlag = false;
      //this.$forceUpdate();
      this.$store
        .dispatch("analyzer/loadInfoHostQueried", hostname)
        .then(resp => {
          console.log("Info queried loaded");
          this.queryResponseFlag = true;
        });
      this.queryResponseFlag = true;
    },
    resetFlags() {
      this.queryRequestFlag = true;
      this.queryResponseFlag = false;
    }
  }
};
</script>

<style scoped>
</style>