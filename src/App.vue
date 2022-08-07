<template>
  <SignInPage v-if="!isLogin"/>
  <div class="row" v-else>
    <Rightbar
      @messages="messages"
      @chat_uid="chat_id"
      class="col-3 rightbar pr-0"
      :user="user"
      :signOut="signOut"
      :allcontacts="allcontacts"
      :isProcesed="isProcesed"
    />
    <div class="test col-9">
      <!-- <div @click="signOut">sign out</div>
      <button @click="updateScroll" style="width: 150px"></button> -->
      <div class="main-page" id="main-page" :scroll="scrolled_main">
        <div v-if="messages_.value != null">
          <div v-if="messages_.length != 0" class="messages">
            <div
              v-for="(message, index) in messages_.value.messages"
              :key="index"
            >
              <div
                class="row"
                :class="
                  message.sender_data.uid == user.providerData[0].uid
                    ? 'sender_message'
                    : 'reciever_message'
                "
                :load="updateScroll"
              >
                <img
                  class="contact_pic mt-2"
                  :class="
                    message.sender_data.uid == user.providerData[0].uid
                      ? 'sender_message_img'
                      : 'reciever_message_img'
                  "
                  :src="message.sender_data.img"
                  alt=""
                />
                <div
                  class="col-auto col-2 message mt-2"
                  :class="
                    message.sender_data.uid == user.providerData[0].uid
                      ? 'sender_message_txt'
                      : 'reciever_message_txt'
                  "
                >
                  {{ message.message }}
                  <span class="chat_time">{{ message.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom"></div>
      </div>
      <div class="chat-box col-12">
        <div class="input-group mb-3">
          <button
            class="btn btn-primary"
            type="button"
            id="button-addon1"
            @click="sendmessage"
          >
            Send
          </button>
          <input
            v-model="message_content"
            type="text"
            class="form-control send_space"
            placeholder="Write a message..."
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            @keyup.enter="sendmessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth, sendMessage, import_chat_data } from "@/firebase";
import Rightbar from "@/components/RightBar.vue";
import SignInPage from "@/components/SignInPage.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "App",
  components: {
    Rightbar,
    SignInPage,
  },
  setup() {
      const { user, isLogin, signIn, signOut, isProcesed, allcontacts } =
      useAuth();
    const chat_uid = ref(null);
    let messages_ = ref(ref([]));
    const message_content = ref(null);
    function messages(event) {
      //messages_.value = event;
      console.log(event);
    }
    function sendmessage(e) {
      console.log(user)
      if (e.ctrlKey || e.type =="click") {
        if (chat_uid.value != null) {
          const obj = {
            img: user.value.providerData[0].photoURL,
            name: user.value.providerData[0].displayName,
            uid: user.value.providerData[0].uid,
          };
          sendMessage(message_content.value, chat_uid.value, obj).then(() => {
            updateScroll();
          });
        }
        message_content.value = "";
      }
    }
    var scrolled = false;
    function updateScroll() {
      const ele = document.getElementById("main-page");
      ele.scrollTop = ele.scrollHeight;
      if (!scrolled) {
        var element = document.getElementById("main-page");
        console.log(element);
        element.scrollTop = element.scrollHeight;
        scrolled = false;
      }
    }

    function scrolled_main() {
      scrolled = true;
    }
    function chat_id(event) {
      chat_uid.value = event;
      import_chat_data(chat_uid)
        .then((data) => {
          console.log(data);
          messages_.value = data;
          console.log(messages_);
          updateScroll();
          //emit("messages", data.value);
        })
        .then(() => {
          updateScroll();
        });
      updateScroll();
    }
    watch(messages_.value, (prop, prevCount) => {
      console.log("watched messages_");
      updateScroll();
      console.log("messages_ new: ", prop);
      console.log("messages_ pre: ", prevCount);
    });
    return {
      signOut,
      messages_,
      messages,
      user,
      sendmessage,
      message_content,
      chat_id,
      scrolled_main,
      updateScroll,
      signIn,
      isLogin,
      isProcesed,
      allcontacts,
    };
  },
};
</script>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  max-width: 99%;
}
.rightbar {
  padding: 0;
}
.test {
  max-height: 100vh;
  padding: 0 !important;
}
.main-page {
  background: rgb(14, 65, 92);
  background: linear-gradient(
    132deg,
    rgba(14, 65, 92, 1) 0%,
    rgba(16, 168, 236, 1) 100%
  );
  /* background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  ); */
  overflow-y: scroll;
  overflow-x: hidden;
  height: 94vh;
  border-bottom: 2px solid black;
}
.chat-box {
  height: 6vh !important;
}
.message {
  background-color: rgba(247, 247, 247, 0.904);
  border-radius: 20px;
  padding: 7px 10px;
  margin-bottom: 4px;
  max-width: 40% !important;
}
.contact_pic {
  max-height: 50px;
  max-width: 75px !important;
  width: auto;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: -5px;
}
.sender_message {
  /* background-color:rgba(31, 169, 31, 0.864); */
  direction: rtl;
}
.sender_message_img {
  /* background-color:rgba(31, 169, 31, 0.864); */
  direction: rtl;
  margin-right: 20px;
}
.sender_message_txt {
  background-color: #25d366;
  color: #ffffff;
  direction: ltr;
}
.chat_time {
  margin: 0 3px;
  float: right;
  color: #159f1a;
  font-size: 12px;
}
.send_space {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
</style>
