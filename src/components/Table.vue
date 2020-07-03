<template>
  <div class="server-list">
    <v-list-item v-for="(server, k) in servers " :key="'k' + k">
      <template v-if="true">
        <v-list-item-content class="server-item">
          <div class="ind-color-rectangle" :style="{'background-color': colors[0]}" />
          <v-list-item-title class="server-name">IP Address: [ {{server.address}} ]</v-list-item-title>
          <br />
          <p class="server-desc">SSL Grade: {{server.ssl_grade}}</p>
          <br />
          <p class="server-desc">Country: {{server.country}}</p>
          <br />
          <p class="server-desc">Owner: {{server.owner}}</p>
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
      colors: ["#2980B9"]
    };
  },
  props: {
    servers: Array,
    subtable: Boolean
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.ind-color-rectangle {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 10px;
}

.server-item {
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
}

.server-name {
  font-size: 15pt;
  font-weight: bold;
}

.server-list {
  margin-left: 1px;
}

.server-desc {
  max-width: 800px;
  padding: 4px;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: justify;
}
</style>