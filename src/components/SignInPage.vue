<template>
  <div class="row">
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <a
            href="/"
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              class="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlink:href="#bootstrap" />
            </svg>
          </a>

          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </ul>

          <div class="text-end">
            <button type="button" class="btn btn-warning" @click="signIn">
              Sign-In
            </button>
          </div>
        </div>
      </div>
    </header>
    <!-- ___________________________________________ -->
    <div class="main background">
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <div class="message_window ms-1">
              <div class="message_pack">
                <div class="row reciever_message" :load="updateScroll">
                  <img
                    class="contact_pic mt-2 reciever_message_img"
                    src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                    alt=""
                  />
                  <div class="col-auto message mt-2 reciever_message_txt">
                    Hi!<span>&#128515;</span>
                  </div>
                </div>
              </div>
              <div class="message_pack">
                <div class="row reciever_message" :load="updateScroll">
                  <img
                    class="contact_pic reciever_message_img"
                    src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                    alt=""
                  />
                  <div class="col-auto message reciever_message_txt">
                    wow, you are using this amazing app too?
                  </div>
                </div>
              </div>
              <div class="message_pack">
                <div class="row sender_message" :load="updateScroll">
                  <img
                    class="contact_pic mt-2 reciever_message_img"
                    src="https://www.vhv.rs/dpng/d/144-1443023_transparent-people-png-icon-people-women-icon-png.png"
                    alt=""
                  />
                  <div class="col-auto message mt-2 sender_message_txt">
                    Hi <br />
                    yes i love this app &#128525;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3 anim-typewriter line-1">Vue Chat App</h1>
            <p class="lead" style="color: white">
              Simple and useful Chat application made with Vue.js.<br />
              Hope you would like it .
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                @click="signIn"
                class="btn btn-primary btn-lg px-4 me-md-2"
              >
                Sign-In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/firebase";

export default {
  setup() {
    let { user, isLogin, signIn, signOut, allcontacts } = useAuth();

    return { user, isLogin, signIn, signOut, allcontacts };
  },
};
</script>

<style scoped>
.main {
  min-height: 100vh;
}
.background {
  background: rgb(14, 65, 92);
  background: linear-gradient(
    132deg,
    rgba(14, 65, 92, 1) 0%,
    rgba(16, 168, 236, 1) 100%
  );
}
.heading {
  font-size: 5vw;
  color: white;
}
.page {
  background-color: rgb(255, 255, 255);
  height: 60vh;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.message_window {
  background: rgba(255, 255, 255, 0.415);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.3px);
  -webkit-backdrop-filter: blur(9.3px);
  border: 1px solid rgba(255, 255, 255, 0.258);
  word-wrap: break-word;
}
.message {
  background-color: rgba(247, 247, 247, 0.904);
  border-radius: 20px;
  padding: 7px 10px;
  margin-bottom: px;
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
.message_pack {
  opacity: 0.85;
  margin: 20px;
}
.btn-google {
  background-color: rgb(245, 245, 245);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.line-1{
  position: relative;
    margin: 0 auto;
    border-right: 2px solid rgba(255,255,255,.75);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(-50%);
}
/* Animation */
.anim-typewriter{
  animation: typewriter 5s steps(40) 1s normal both infinite,
             blinkTextCursor 500ms steps(40) infinite normal;
}
@keyframes typewriter{
  0%{width: 0;}
  25%{width: 6.7em;}
  75%{width: 6.7em;}
  100%{width: 0em;}
}
@keyframes blinkTextCursor{
  0%{border-right-color: rgba(255,255,255,.75);}
  25%{border-right-color: transparent;}
  75%{border-right-color: transparent;}
  100%{border-right-color: rgba(255,255,255,.75);}
}
</style>
