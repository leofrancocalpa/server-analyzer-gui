<template>
  <v-container grid-list-md>
    <v-progress-linear v-if="queryingFlag" indeterminate color="primary"></v-progress-linear>
    <v-row>
      <v-col>
        <v-row v-if="readyToRequestFlag">
          <v-col cols="2" lg="9">
            <v-text-field
              v-model="query"
              append-icon="mdi-magnify"
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
            >Search</v-btn>
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
              class="mr-3"
              height="55px"
              primary
              router
              color="primary"
              @click="resetFlags()"
            >Reset</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card width="800">
              <v-card-text>
                <div>
                  <v-col class="img-priority">
                    <img v-if="queryResponseFlag" :src="hostQueried.logo" />
                  </v-col>
                </div>
                <p v-if="query" class="display-1 text--primary">{{query}}</p>
                <p>Result:</p>
                <div v-if="queryResponseFlag" class="text--primary">
                  <p>Server has changed: {{hostQueried.servers_changed}}</p>
                  <p>SSL Grade: {{hostQueried.ssl_grade}}</p>
                  <p>Previous SSL Grade: {{hostQueried.previous_ssl_grade}}</p>
                  <p>Web site title: {{hostQueried.title}}</p>
                  <p>Server is down: {{hostQueried.is_down}}</p>
                </div>
                <div v-if="queryResponseFlag">
                  <serverstable :servers="hostQueried.servers"></serverstable>
                </div>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-card width="500">
          <v-card-title class="card-title">
            <h2>Servers searched before</h2>
          </v-card-title>
          <v-card-text>
            <div>
              <historytable :items="previousQueried.items"></historytable>
            </div>
          </v-card-text>
          <v-card-actions>
            <p></p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import serverstable from "./Table";
import historytable from "./HistoryTable";
export default {
  components: { serverstable, historytable },
  data() {
    return {
      query: "",
      queryResponseFlag: false,
      readyToRequestFlag: true,
      queryingFlag: false
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
      this.queryingFlag = true;
      this.readyToRequestFlag = false;
      this.$store
        .dispatch("analyzer/loadInfoHostQueried", hostname)
        .then(resp => {
          console.log("Info queried loaded");
          this.queryResponseFlag = true;
          this.queryingFlag = false;
        });
    },
    resetFlags() {
      this.readyToRequestFlag = true;
      this.queryResponseFlag = false;
      this.queryingFlag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.img-priority {
  img {
    width: 30px;
    height: auto;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
    border-radius: 50%;
  }

  .card-title {
    padding: 0.5em 1em;
    font-size: 24pt;
    font-weight: bold;
  }
}
</style>