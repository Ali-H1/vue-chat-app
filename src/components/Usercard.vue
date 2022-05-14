<template>
  <div class="row align-items-center usercard">
    <div class="col-8 ms-1 name">
      <h6 v-if="isLogin">{{ user.providerData[0].displayName }}</h6>
      <h4 v-else>Chat App</h4>
    </div>
    <div class="col-2">
      <img
        @click="signOut"
        v-if="isLogin"
        class="logo"
        :src="user.providerData[0].photoURL"
        alt=""
      />
      <p v-else @click="signIn">SignIn</p>
    </div>
  </div>
</template>

<script>
//import { useAuth } from "@/firebase";

export default {
  props: ["isLogin", "signIn", "signOut", "user"],
  setup() {},
};
</script>

<style scoped>
.usercard {
  background-color: rgb(255, 255, 255);
  height: 70px;
  margin: 10px 0 30px;
  border-bottom: 2px solid gray;
  padding: 0;
}
.logo {
  max-width: 50px;
  border-radius: 50%;
  border: 1px solid white;
}
.logo:hover {
  opacity: 0.7;
}
.name {
  text-align: center;
}
</style>
