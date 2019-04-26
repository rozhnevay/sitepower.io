import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment';
import axios from "axios";
export default new Vuex.Store({
  state: {
    userInfo: {
      isLoggedIn: false,
      name: '',
      authStatus : ""
    },
    systemInfo: {
      chats : [],
      chatsStatus : "",
      chatsError : "",
      forms: [],
      operators : [],
      messages: [],
      activeFormId: "",
      activeChatId: "",
      activeOperatorId:"",
      activeChatPrintingTm: ""
    }
  },

  getters: {
    USER_LOGGED_IN: state => {
      return state.userInfo.isLoggedIn;
    },
    USER_NAME: state => {
      return state.userInfo.name;
    },
    AUTH_STATUS: state => {
      return state.userInfo.authStatus;
    },
    getChats: state => {
      return state.systemInfo.chats;
    },
    getForms: state => {
      return state.systemInfo.forms;
    },
    getOperators: state => {
      return state.systemInfo.operators;
    },
    getActiveChatId: state => {
      return state.systemInfo.activeChatId;
    },
    getActiveFormId: state => {
      return state.systemInfo.activeFormId;
    },
    getActiveOperatorId: state => {
      return state.systemInfo.activeOperatorId;
    },
    getActiveChatPrintingTm: state => {
      return state.systemInfo.activeChatPrintingTm;
    },
    getMessages: state => {
      return state.systemInfo.messages;
    },

  },
  mutations: {
    USER_LOGGED_IN: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },

    USER_NAME: (state, name) => {
      state.userInfo.name = name;
    },
    AUTH_STATUS: (state, status, error) => {
      state.userInfo.authStatus = status;
      state.userInfo.authError = error;
    },
    initChats: (state, chats) => {
      state.systemInfo.chats = chats;
      if (state.systemInfo.chats && state.systemInfo.chats[0]) {
        state.systemInfo.activeChatId = state.systemInfo.chats[0].sitepower_id;
      }
    },
    initForms: (state, forms) => {
      state.systemInfo.forms = forms;
      if (forms && forms[0]) {
        state.systemInfo.activeFormId = forms[0].id;
      }
    },
    initOperators: (state, operators) => {
      state.systemInfo.operators = operators;
      if (operators && operators[0]) {
        state.systemInfo.activeOperatorId = operators[0].id;
      }
    },
    setActiveFormId: (state, id) => {
      state.systemInfo.activeFormId = id;
    },
    setActiveOperatorId: (state, id) => {
      state.systemInfo.activeOperatorId = id;
    },
    setActiveChatId: (state, id) => {
      //let lastOpenDt = moment().format()
      //state.systemInfo.chats.filter(item => item.sitepower_id === state.systemInfo.activeChatId)[0].lastOpenDt = lastOpenDt;
      state.systemInfo.activeChatId = id;
      state.systemInfo.activeChatPrintingTm = "";
      state.systemInfo.messages = [];
      /*axios.post("/api/chat/" + state.systemInfo.activeChatId, {lastOpenDt:lastOpenDt}).then((res) => {
        console.log("lastUpd SUCCESS")
      }).catch(err => console.log(err.message))*/
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
    },
    CHATS_STATUS:   (state, status, error) => {
      state.systemInfo.chatsStatus = status;
      state.systemInfo.chatsError = error;
    },
    CHATS: (state, chats) => state.systemInfo.chats = chats,
    MESSAGES_STATUS:   (state, status, error) => {
      state.systemInfo.chatsStatus = status;
      state.systemInfo.chatsError = error;
    },
    MESSAGES: (state, messages) => state.systemInfo.messages = messages,
  },

  actions: {
    CHATS_REQUEST: ({commit, state, dispatch}, props) => {
      commit('CHATS_STATUS', "Loading");
      axios.get("/api/chats")
        .then(res => {
          commit('CHATS_STATUS', "Success");
          commit('CHATS', res.data);
        }).catch(err => {
        commit('CHATS_STATUS', "Error", err.message);
      })
    },
    MESSAGES_REQUEST: ({commit, state, dispatch}, props) => {
      commit('MESSAGES_STATUS', "Loading");
      axios.get("/api/chat/" + state.systemInfo.activeChatId)
        .then(res => {
          commit('MESSAGES_STATUS', "Success");
          commit('MESSAGES', res.data);
        }).catch(err => {
        commit('MESSAGES_STATUS', "Error", err.message);
      })
    },
    AUTH_LOGIN: ({commit, state, dispatch}, props) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', "Loading");
        axios.post("/api/login", props).then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.name);
          resolve();
        }).catch((err) => {
          commit('AUTH_STATUS', "Error")
          commit('USER_LOGGED_IN', false);
          commit('USER_NAME', "");
          reject(err);
        });
      });
    },
    AUTH_REGISTER: ({commit, state, dispatch}, props) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', "Loading");
        axios.post("/api/register", props).then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.name);
          resolve();
        }).catch((err) => {
          commit('AUTH_STATUS', "Error")
          commit('USER_LOGGED_IN', false);
          commit('USER_NAME', "");
          reject(err);
        });
      });
    },
    AUTH_USER: ({commit, state, dispatch}, props) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', "Loading");
        axios.get("/api/user").then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.user.name);
          resolve();
        }).catch((err) => {
          commit('AUTH_STATUS', "Error")
          commit('USER_LOGGED_IN', false);
          commit('USER_NAME', "");
          reject(err);
        });
      });
    },
    AUTH_LOGOUT: ({commit, state, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', "Loading");
        axios.get("/api/logout").then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', false);
          commit('USER_NAME', "");
          resolve();
        }).catch((err) => {
          commit('AUTH_STATUS', "Error")
          reject(err);
        });
      });
    },
    AUTH_RESET: ({commit, state, dispatch}, props) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_STATUS', "Loading");
        axios.post("/api/reset", props).then((res) => {
          commit('AUTH_STATUS', "Success")
          resolve();
        }).catch((err) => {
          commit('AUTH_STATUS', "Error")
          reject(err);
        });
      });
    },
  }
});

