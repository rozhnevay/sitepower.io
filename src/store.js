import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment';
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
      activeChat: {},
      activeChatMessages: []
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
    /*getActiveChat: state => {
      return state.systemInfo.activeChat;
    }
    ,
    getActiveChatMessages: state => {
      return state.systemInfo.activeChatMessages;
    }*/
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
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].lastOpenDt = moment().format();
      state.systemInfo.activeChatId = id;

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
      if (!chatItem) return;
      chatItem = chatItem ? chatItem : {};
      chatItem.messages = chatItem.messages ? chatItem.messages : [];
      chatItem.messages.push(msg);
    }

  },

  actions: {

  }
});
