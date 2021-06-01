<template>
  <div id="HomePage">
    <h1>My Token Is：{{ token }}</h1>

    <button @click="clearToken()">Clear Token</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      token: sessionStorage.getItem("token")
    };
  },
  methods: {
    checkToken() {
      if (!this.token) this.$router.push("/login");
    },

    clearToken() {
      sessionStorage.setItem("token", "");
      location.reload();
    }
  },
  created() {
    this.checkToken();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
