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
      privateOpen: 'Chat',
      chats : [],
      activeChatId: "",
      activeChatPrintingTm: ""
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
    privateOpen: state => {
      return state.systemInfo.privateOpen;
    },
    getChats: state => {
      return state.systemInfo.chats;
    },
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
    setActiveChatContact: (state, item) => {
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].name = item.name;
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].login = item.login;
      state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].phone = item.phone;

      axios.post("/api/chat/" + state.systemInfo.activeChatId, {name:item.name, login:item.login, phone:item.phone}).then((res) => {
      }).catch(err => console.log(err.message))
    },
    setActiveChatPrintingTm: (state, val) => {
      state.systemInfo.activeChatPrintingTm = val;
    },
    socket_receive: (state, msg) => {
      console.log("receive");
      console.log(msg);
      let chatObj, chatId;
      console.log("hhh");
      if (msg.direction == "to_user") {
        chatId = msg.sender_id;
      } else {
        chatId = msg.recepient_id;
      }
      console.log("fff");
      chatObj = state.systemInfo.chats.filter(item => item.sitepower_id == chatId);
      let chatItem = chatObj[0];
      console.log("chatItem = " + chatItem);
      if (!chatItem) {
        axios.get("/api/chat/" + chatId).then((item) => {
          /* !!! TODO вынести в отдельный метод и реализовать через actions !!!*/
          item = item.data;
          item.lastMessage = () => {
            if (item.messages && item.messages.length) {
              return item.messages[item.messages.length - 1];
            }
            return {};
          };
          item.countUnread = () => {
            if (item.messages && item.messages.length) {
              let unread = item.messages.filter(u => moment(u.created) > moment(item.lastOpenDt) && u.direction === "to_user")
              if (unread && unread.length > 0) {
                return unread.length;
              }
            }
            return 0;
          }
          state.systemInfo.chats.push(item)
          state.systemInfo.chats.sort((a,b)=> {
            let alastMC = a.lastMessage().created;
            let blastMC = b.lastMessage().created;
            if (moment(alastMC) < moment(blastMC)) return 1
            else if (moment(alastMC) > moment(blastMC)) return -1
            else return 0
          });
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

