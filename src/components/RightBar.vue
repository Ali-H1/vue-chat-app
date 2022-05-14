<template>
  <div v-if="isLogin">
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light col-12"
      style="height: 100vh;"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-4">{{ refuser.providerData[0].displayName.charAt(0).toUpperCase() + refuser.providerData[0].displayName.slice(1) }}</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="col-8">
          <div
            class="input-group input-group-sm ms-5 mb-3 col-5 search_username"
          >
            <input
              type="text"
              class="form-control"
              placeholder="username"
              aria-label="username"
              aria-describedby="basic-addon2"
              @keyup.enter="search_user"
              v-model="username_searched"
            />
            <span class="input-group-text" id="basic-addon2">@gmail.com</span>
          </div>
        </li>
        <div v-if="refallcontacts!==null && isLogin">
          <div v-for="contact in refallcontacts" :key="contact.uid">
            <!-- {{ contact }} -->
            <li>
              <ChatCard
                @messages="messages"
                @chat_uid="chat_id"
                :user_uid="user.providerData[0].uid"
                :contact="contact"
                class="col-12"
              />
            </li>
          </div>
        </div>

        <li>
          <div class="col-8"></div>
          <div v-if="isLogin && refallcontacts===null" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="user.providerData[0].photoURL"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
            @click="signOut"
          />
          <strong>{{ refuser.providerData[0].displayName.split(" ")[0].charAt(0).toUpperCase() + refuser.providerData[0].displayName.split(" ")[0].slice(1) }}</strong>
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" @click="signOut">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ChatCard from "@/components/ChatCard.vue";
//import Usercard from "@/components/Usercard.vue";
import { ref, watch } from "@vue/runtime-core";
import { useAuth, user_search ,allcontacts_global} from "@/firebase";

export default {
  components: {
    ChatCard,
    
  },
  setup(props, { emit }) {
    let { user, isLogin, signIn, signOut, allcontacts, isProcesed } = useAuth();
    let refuser = ref(user);
    let username_searched = ref(null);
    let refallcontacts = ref(allcontacts_global);
    let message = ref(null);
    function messages(event) {
      message.value = event;
      emit("messages", event);
    }
    function chat_id(event) {
      emit("chat_uid", event);
    }
    //let refisProcesed = ref(isProcesed);
    watch(sessionStorage.getItem("contacts"), (prop) => {
      refallcontacts.value = JSON.parse(sessionStorage.getItem("contacts"));
      console.log("changed");
      prop;
    });
    function search_user() {
      let found = false;
      for (let i = 0; i < allcontacts.value.length; i++) {
        if (
          allcontacts.value[i].value.email ==
          username_searched.value + "@gmail.com"
        ) {
          found = true;
          console.log("found");
          break;
        }
      }
      if (!found) {
        console.log(refallcontacts.value);
        const data = user_search(
          username_searched.value + "@gmail.com",
          user.value.providerData[0].uid,
          user.value.providerData[0].contacts
        );
        console.log("asynchronous logging has val:", data);
        console.log("asynchronous logging has val:", data[0]);
        data.then((value) => {
          refallcontacts.value = value;
        });
        console.log(refallcontacts);
        console.log(refallcontacts.value);
      }
      console.log("refcontact", refallcontacts.value);
      console.log(username_searched.value);
    }
    return {
      refallcontacts,
      isProcesed,
      signIn,
      signOut,
      refuser,
      isLogin,
      allcontacts,
      user,
      messages,
      message,
      chat_id,
      search_user,
      username_searched,
    };
  },
};
</script>

<style scoped>
.bar {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  border-right: 2px solid rgb(0, 0, 0);
  padding: 0;
}
</style>
