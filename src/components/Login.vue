<template>
  <div id="Login">
    <section v-show="errorMessage" class="message-container">
      <h3 class="message-body">
        {{ errorMessage }}
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
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  computed: {
    ...mapState("message", ["message"]),
    errorMessage() {
      return this.message.error;
    }
  },

  methods: {
    ...mapActions("auth", ["create"]),
    login() {
      this.create({
        user: {
          email: this.email,
          password: this.password
        }
      });
    }
  }
};
</script>

<!-- 有 scoped 屬性表示樣式衹在此組件内生效 -->
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
