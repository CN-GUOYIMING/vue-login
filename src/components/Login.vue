<template>
  <div id="Login">
    <section v-show="error" class="message-container">
      <h3 class="message-body">
        {{ error }}
      </h3>
    </section>

    <section class="login-box">
      <!-- v-mdoal="xxx" 與 :value="xxx" @input="xxx = $evnet.target.value"相等
        フォーム項目の種類	v-bind:	v-on:
        テキストボックス、テキストエリア	value	input
        チェックボックス、ラジオボタン	checked	change
        セレクトボックス	value	change
       -->
      <input
        class="email input"
        type="email"
        placeholder="Eメール"
        v-model="email"
        @blur="validateMail()"
      />

      <input
        class="password input"
        type="password"
        placeholder="パスワード"
        v-model="password"
      />

      <button class="button" @click="login()">ログイン</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      securityCode: "1234"
    };
  },
  methods: {
    login() {
      if (this.email === "vue@test.com" && this.password === "123") {
        window.location = `${this.getUrlParameter("redirect_uri")}?code=${
          this.securityCode
        }&state=${this.getUrlParameter("state")}`;
      } else {
        this.error = "入力内容に誤りがあります。";
      }
    },

    validateMail() {
      const isRightMail = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
        this.email
      );

      this.error = isRightMail
        ? ""
        : "正しいメールアドレスを入力してください。";
    },

    getUrlParameter(parameterName) {
      const parameters = window.location.search.substring(1);
      const parametersArray = parameters.split("&");

      const target = parametersArray.find(parameter => {
        return parameter.split("=")[0] === parameterName;
      });

      return target.split("=")[1];
    }
  },

  created() {
    // urlのパラメータに"client_secret"があることは認証の段階を経たと意味する。
    if (window.location.search.includes("client_secret")) {
      if (
        this.getUrlParameter("code") === this.securityCode &&
        this.getUrlParameter("client_id") === "client01" &&
        this.getUrlParameter("client_secret") === "password"
      ) {
        this.$axios
          .get("/static/api/success.json")
          .then(response => {
            window.location = `${this.getUrlParameter("redirect_uri")}?token=${
              response.data.token
            }`;
          })
          .catch(error => (this.error = error));
      } else {
        this.error = "認証に失敗しました。";
      }
    }
  }
};
</script>

<!-- scoped 属性は該当スタイルがこの対象内のみ有効であると意味する -->
<style scoped>
#Login {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 30rem;
  justify-content: center;
  padding: 1rem 0 1rem 0;
}
.message-body {
  color: #f76cad;
}
.login-box {
  border: 0.1rem solid gray;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 15rem;
}
.input {
  border-radius: 0.2rem;
}
.password {
  margin-top: 0.5rem;
}
.checkbox {
  align-self: center;
  margin-top: 0.5rem;
}
.button {
  background-color: royalblue;
  border-radius: 0.2rem;
  color: #fff;
  margin-top: 0.5rem;
}
</style>
