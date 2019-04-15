import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment';
import axios from "axios";
export default new Vuex.Store({
  state: {
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      name: ''
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openResetModal: false,
      privateOpen: 'Chat',
      chats : [],
      activeChatId: "",
      activeChatPrintingTm: ""
    }
  },

  getters: {
    isUserLoggedIn: state => {
      return true;//state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignupModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isResetModalOpen: state => {
      return state.systemInfo.openResetModal;
    },
    privateOpen: state => {
      return state.systemInfo.privateOpen;
    }
    ,
    getChats: state => {
      return state.systemInfo.chats;
    }
    ,
    getActiveChatId: state => {
      return state.systemInfo.activeChatId;
    },
    getActiveChatPrintingTm: state => {
      return state.systemInfo.activeChatPrintingTm;
    }

  },
  mutations: {
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },

    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    },
    showResetModal: (state, show) => {
      state.systemInfo.openResetModal = show;
      if (show) state.systemInfo.openLoginModal = !show;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    privateOpen: (state, type) => {
      state.systemInfo.privateOpen = type;
    },
    initChats: (state, chats) => {
      state.systemInfo.chats = chats;
      if (state.systemInfo.chats && state.systemInfo.chats[0]) {
        state.systemInfo.activeChatId = state.systemInfo.chats[0].sitepower_id;
      }

    },
    setActiveChatId: (state, id) => {
      let lastOpenDt = moment().format()
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].lastOpenDt = lastOpenDt;
      state.systemInfo.activeChatId = id;
      state.systemInfo.activeChatPrintingTm = "";
        axios.post("/api/chat/" + state.systemInfo.activeChatId, {lastOpenDt:lastOpenDt}).then((res) => {
        console.log("lastUpd SUCCESS")
      }).catch(err => console.log(err.message))
    },
    setActiveChatCategory: (state, cat) => {
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].class = cat;

      axios.post("/api/chat/" + state.systemInfo.activeChatId, {class:cat}).then((res) => {
      }).catch(err => console.log(err.message))

    },
    setActiveChatSpam: (state) => {
      axios.post("/api/chat/" + state.systemInfo.activeChatId, {class:"SPAM"}).then((res) => {
      }).catch(err => console.log(err.message))

      state.systemInfo.chats = state.systemInfo.chats.filter(item => item.sitepower_id !== state.systemInfo.activeChatId);
      if (state.systemInfo.chats.length > 0)
        state.systemInfo.activeChatId = state.systemInfo.chats[0].sitepower_id
      else
        state.systemInfo.activeChatId = "";



    },
    setActiveChatPrintingTm: (state, val) => {
      state.systemInfo.activeChatPrintingTm = val;
    },
    socket_receive: (state, msg) => {
      console.log("receive");
      console.log(msg);
      let chatObj, chatId;
      if (msg.direction == "to_user") {
        chatId = msg.sender_id;
      } else {
        chatId = msg.recepient_id;
      }
      chatObj = state.systemInfo.chats.filter(item => item.sitepower_id == chatId);
      let chatItem = chatObj[0];
      if (!chatItem) {
        axios.get("/api/chat/" + chatId).then((res) => {
          state.systemInfo.chats.push(res)
        }).catch(err => console.log(err.message))
      } else {
        chatItem.messages.push(msg);
      }
      //chatItem = chatItem ? chatItem : {};
      //chatItem.messages = chatItem.messages ? chatItem.messages : [];

    },
    socket_print: (state, msg) => {
      console.log("print");
      console.log(msg);
      if (msg.sender_id === state.systemInfo.activeChatId) {
        state.systemInfo.activeChatPrintingTm = msg.created;
      }
    }
  },

  actions: {

  }
});

