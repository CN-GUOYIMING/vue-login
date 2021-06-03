<template>
  <div id="HomePage">
    <div>ここは認証サーバーのホームページ</div>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  methods: {
    getUrlParameter(parameterName) {
      /**
       * location.search: "?xxx"の部分を戻す。
       * substring(1): "?"を無視した部分を戻す。
       */
      const parameters = window.location.search.substring(1);
      const parametersArray = parameters.split("&");

      const target = parametersArray.find(parameter => {
        return parameter.split("=")[0] === parameterName;
      });

      return target.split("=")[1];
    }
  },

  created() {
    // クライアント側の請求であるかをチェック
    if (this.getUrlParameter("client_id") !== "client01") return;

    // TODO: DBにJWTトークンが存在するかをチェック
    // 無ければログイン画面にリダイレクト
    this.$router.push("login");
  }
};
</script>
