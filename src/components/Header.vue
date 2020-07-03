<template>
  <v-toolbar color="white"  max-height="80px">
    <v-toolbar-title>
      <router-link :to="{path:'/'}">Server Analyzer</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <div >
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-3" text color="primary" max-height="80px"  v-on="on" router :to="{path:'#'}">
            Products
            <v-icon right dense>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item router :to="{path:'#'}">
            <v-list-item-title>SSL Certificade</v-list-item-title>
          </v-list-item>
          <v-list-item router :to="{path:'#'}">
            <v-list-item-title>DNS</v-list-item-title>
          </v-list-item>
          <v-list-item router :to="{path:'#'}">
            <v-list-item-title>Hosting</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-3" text color="primary" router :to="{path:'#'}" v-on="on">
            Dev
            <v-icon right dense>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item router :to="{path:'#'}">
            <v-list-item-title>Documentation</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-3" text color="primary" v-on="on" router :to="{path:'#'}">
            Pricing
            <v-icon right dense>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item router :to="{path:'#'}">
            <v-list-item-title>Option 1</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div >
      <v-btn class="mr-3"  dark router color="primary" :to="{path:'/'}">LogIn</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "header-menu",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
        return this.currentUser.roles.includes("ROLE_ADMIN");

    },
    showObserverBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_OBSERVER");
      }

      return false;
    },
    showEmployeeBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_EMPLOYEE");
      }

      return false;
    },
    showEvaluatorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_EVALUATOR");
      }

      return false;
    }
  },
  methods: {
    logOut: function() {
      this.$store.dispatch("auth/logout", this.user).then(
        () => {
          this.$router.push("/login");
        },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>