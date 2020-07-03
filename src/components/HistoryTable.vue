<template>
  <v-card>
    <v-card-title>
      Hostname
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="itemstable"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="hostname"
      show-expand
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.logo="{ item }">
        <v-col class="img-logo">
          <img :src="item.logo" />
        </v-col>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <br />
        <p class="item-hostname">{{item.hostname}}</p>

        <div class="item-list">
          <h2 hidden>{{item}}</h2>
          <v-list-item v-for="(server, k) in getServers(item.hostname) " :key="'k' + k">
            <template v-if="true">
              <v-list-item-content class="item-item">
                <div class="ind-color-rectangle" :style="{'background-color': colors[0]}" />
                <v-list-item-title class="item-name">IP Address: [ {{server.address}} ]</v-list-item-title>
                <br />
                <p class="item-desc">SSL Grade: {{server.ssl_grade}}</p>
                <br />
                <p class="item-desc">Country: {{server.country}}</p>
                <br />
                <p class="item-desc">Owner: {{server.owner}}</p>
              </v-list-item-content>
            </template>
          </v-list-item>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      index: 0,
      search: "",
      colors: ["#2980B9"]
    };
  },
  props: {
    items: Array,
    subtable: Boolean
  },
  created() {},
  computed: {
    headers() {
      var headers = [
        {
          text: "LOGO",
          align: "start",
          sortable: true,
          value: "logo"
        },
        {
          text: "HOSTNAME",
          align: "start",
          sortable: true,
          value: "hostname"
        },
        {
          text: "SSL GRADE",
          align: "start",
          sortable: true,
          value: "sslgrade"
        },
        {
          text: "PREVIOUS",
          align: "start",
          sortable: true,
          value: "previous"
        }
        //{ text: "", value: "data-table-expand" }
      ];

      return headers;
    },
    itemstable() {
      var itemsFromBackend = this.items;
      var result = [];
      itemsFromBackend.forEach(item => {
        result.push({
          logo: item.data.logo,
          hostname: item.dns,
          sslgrade: item.data.ssl_grade,
          previous: item.data.previous_ssl_grade
        });
      });
      return result;
    }
  },
  methods: {
    getServers(hostname) {
      console.info(">>> geting servers");
      var servers = [];
      this.items.forEach(item => {
        if (item.dns == hostname) {
          //alert(item.dns + "###"+hostname)
          console.info(item.data.servers);
          servers = item.data.servers;
        }
      });
      return servers;
    }
  }
};
</script>
<style lang="scss" scoped>
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

.item-item {
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
}

.item-hostname {
  font-size: 14pt;
  font-weight: bold;
  margin-left: 15px;
}

.item-name {
  font-size: 12pt;
  font-weight: bold;
}

.item-list {
  margin-left: 0px;
}

.item-desc {
  max-width: 800px;
  padding: 2px;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: justify;
}

.img-logo {
  img {
    width: 20px;
    height: auto;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
    border-radius: 50%;
  }
}
</style>