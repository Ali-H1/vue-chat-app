<template>
  <a
    href="#"
    class="list-group-item list-group-item-action  py-3 lh-tight"
    aria-current="true"
    @click="clicked"
  >
    <div>
      <div class="d-flex w-100 align-items-center justify-content-between">
        <img class="logo" :src="contact.value.photo" alt="" />
        <strong class="mb-1" @click="chat_data = ''">{{ contact.value.name }}</strong>
        <span class="badge rounded-pill bg-warning">12 </span>
      </div>
      <div class="col-2 ms-3">
      </div>
    </div>
  </a>
  <!-- <div
    @click="clicked"
    :class="'row card justify-content-center ' + clicked_style"
  >
    <div class="col-2 ms-3">
      <img class="logo" :src="contact.value.photo" alt="" />
    </div>
    <div class="col-8 name">
      <h6 @click="chat_data = ''">
        {{ contact.value.name }}
        <span class="badge rounded-pill bg-primary">12 </span>
      </h6>
    </div>
  </div> -->
</template>

<script>
import { ref } from "@vue/reactivity";
import { import_chat_data } from "@/firebase";
import { watch } from "vue";
export default {
  props: ["contact", "user_uid"],
  setup(props, { emit }) {
    let clicked_style = ref("");
    let chat_data = ref(null);
    let result = ref(null);
    let chat_uid = ref(null);
    const clicked = () => {
      let uid1 = props.contact.value.uid;
      let uid2 = props.user_uid;
      if (uid1 > uid2) chat_uid.value = uid1 + "," + uid2;
      else chat_uid.value = uid2 + "," + uid1;
      console.log(uid1, uid2, chat_uid);
      emit("chat_uid", chat_uid.value);
      clicked_style.value = "clicked_card";
    };
    if (chat_uid.value != null) {
      result = import_chat_data(chat_uid);
      console.log(result);
    }
    // chat_data = result;
    // console.log(chat_data);
    // emit("chat_uid", chat_uid);

    watch(chat_uid, (prop, prevCount) => {
      console.log("watched data");
      console.log("barchart: ", prop);
      console.log("barchart pre: ", prevCount);
    });
    return { clicked, clicked_style, chat_data, chat_uid };
  },
};
</script>

<style scoped>
.card {
  height: 70px;
  background-color: white;
  background: linear-gradient(
    60deg,
    rgb(255, 255, 255) 0%,
    rgb(253, 253, 253) 100%
  );
  border: none;
  border-radius: 0;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
}
.logo {
  max-width: 50px;
  border-radius: 50%;
  border: 1px solid white;
}

.clicked_card {
  background: rgb(88, 165, 233) !important;
}
</style>
