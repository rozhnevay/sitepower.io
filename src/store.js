import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
      return state.userInfo.isLoggedIn;
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
    getActiveChat: state => {
      return state.systemInfo.activeChat;
    }
    ,
    getActiveChatMessages: state => {
      return state.systemInfo.activeChatMessages;
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
    },
    setActiveChatId: (state, id) => {
      state.systemInfo.activeChatId = id;
      state.systemInfo.activeChat = state.systemInfo.chats.filter(item => item.sitepower_id == state.systemInfo.activeChatId);
      if (state.systemInfo.activeChat && state.systemInfo.activeChat[0] && state.systemInfo.activeChat[0].chat) {
        state.systemInfo.activeChatMessages = state.systemInfo.activeChat[0].chat.messages;
      } else {
        state.systemInfo.activeChatMessages = [];
      }
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
      chatItem.chat = chatItem.chat ? chatItem.chat : {};
      chatItem.chat.messages = chatItem.chat.messages ? chatItem.chat.messages : [];
      chatItem.chat.messages.push(msg);
      if (state.systemInfo.activeChatId == chatId) {
        state.systemInfo.activeChatMessages = chatItem.chat.messages;
      }


    }

  },

  actions: {

  }
});
