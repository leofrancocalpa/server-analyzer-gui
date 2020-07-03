<template>
  <div class="indicator-list">
    <v-list-item v-for="(server, k) in servers " :key="'k' + k">
      <template v-if="true">
        <v-list-item-content class="indicator-item">
          <div class="ind-color-rectangle" :style="{'background-color': colors[0]}" />
          <v-list-item-title class="indicator-name">IP Address {{k}} {{server.address}}</v-list-item-title>
          <br />
          <p class="indicator-desc">SSL Grade {{server.ssl_grade}}</p>
          <br />
          <p class="indicator-desc">Country {{server.country}}</p>
          <br />
          <p class="indicator-desc">Owner {{server.owner}}</p>

          <div class="btn_view_criterias">
            <v-btn small rounded @click="selectIndicator(indicatorp)">More Info</v-btn>
          </div>
          <div v-if="selectedIndicator == indicatorp" class="criteria_table">
            
            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Percentage</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="criteria in indicatorp.criterias" :key="criteria.id">
                    <td>{{criteria.percent}}%</td>
                    <td>{{criteria.description}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-list-item-content>
      </template>
    </v-list-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      colors: [
        "#2980B9",
        "#E74C3C",
        "#F1C40F",
        "#DC7633",
        "#2ECC71",
        "#8E44AD",
        "#85C1E9",
        "#808000",
        "#008080",
        "#00FF00"
      ]
    };
  },
  props: {
    servers: Array,
    subtable: Boolean
  },
  created() {},
  methods: {
    getColor() {
      var color;
      if (this.index == 0) {
        this.index = 1;
        color = this.colors[index];
      } else {
        this.index = 0;
        color = this.colors[index];
      }
      return color;
    }
  }
};
</script>
<style scoped>
.sheet-title {
  padding: 0.5em 1em;
  margin: 2cm;
}

.doughnut-chart {
  position: relative;
  top: 30%;
  width: 900px;
}

.chart {
  margin-top: 40px;
  align-items: center;
}

.chart-combobox {
  width: 50%;
  height: 50%;
  margin-right: 100px;
  align-items: center;
}

.criteria_table {
  margin-top: 2%;
}

.criteria_table_line {
  margin-top: 1%;
}

.btn_view_criterias {
  margin-left: 2%;
  margin-top: 2%;
}

.card-title {
  padding: 0.5em 1em;
  font-size: 24pt;
}

.ind-color-rectangle {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 10px;
}

.indicator-item {
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
}

.chart-side {
  flex: 1 1 300px;
}

.indicator-name {
  font-size: 15pt;
  font-weight: bold;
}

.indicator-list {
  margin-left: 30px;
}

.indicator-desc {
  max-width: 800px;
  padding: 15px;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: justify;
}

.combobox-charges {
  position: relative;
  width: 250px;
  left: 33%;
}

.indicator-perc {
  padding-left: 15px;
  margin-bottom: 0px;
  font-size: 15pt;
}
</style>