import Vue from 'vue';
import Vuex from 'vuex';
import router from './router/index'



Vue.use(Vuex);

import axios from "axios";
export default new Vuex.Store({
  state: {
    userInfo: {
      isLoggedIn: false,
      name: '',
      authStatus : ""
    },
    systemInfo: {
      chats : {},
      chatsStatus : "",
      chatsError : "",
      forms: [],
      operators : [],
      messages: [],
      lastId : "",
      activeFormId: "",
      activeChatId: "",
      activeCategory: "",
      activeOperatorId:"",
      activeChatPrintingTm: "",
      activeChatPrintingName: ""
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
    getActiveChatPrintingName: state => {
      return state.systemInfo.activeChatPrintingName;
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

    ACTIVE_CHAT_CATEGORY: (state, cat) => {
      state.systemInfo.chats[state.systemInfo.activeChatId].class = cat;
    },
    ACTIVE_CHAT_SPAM: (state) => {
      delete state.systemInfo.chats[state.systemInfo.activeChatId];

    },
    ACTIVE_CHAT_CONTACT: (state, item) => {
      state.systemInfo.chats[state.systemInfo.activeChatId].name = item.name;
      state.systemInfo.chats[state.systemInfo.activeChatId].login = item.login;
      state.systemInfo.chats[state.systemInfo.activeChatId].phone = item.phone;
    },
    setActiveChatPrintingTm: (state, val) => {
      state.systemInfo.activeChatPrintingTm = val;
    },

    socket_print: (state, msg) => {
      console.log("print");
      console.log(msg);
      if (msg.sender_id === state.systemInfo.activeChatId || (msg.chat_id && msg.chat_id === state.systemInfo.activeChatId)) {
        state.systemInfo.activeChatPrintingTm = msg.created;
        state.systemInfo.activeChatPrintingName = msg.operator_name ? msg.operator_name : "Посетитель";
      }
    },
    ACTIVE_CATEGORY: (state, category) => {

    },
    ACTIVE_CHAT_ID: (state, id) => {
      state.systemInfo.activeChatId = id;
      state.systemInfo.activeChatPrintingTm = "";
    },
    CHATS_STATUS:   (state, status, error) => {
      state.systemInfo.chatsStatus = status;
      state.systemInfo.chatsError = error;
    },
    CHATS: (state, chats) => {
      console.log(Object.keys(chats));
      Object.keys(chats).forEach(key => {
        Vue.set(state.systemInfo.chats, key, chats[key]);
      });
    },
    MESSAGES_STATUS:   (state, status, error) => {
      state.systemInfo.chatsStatus = status;
      state.systemInfo.chatsError = error;
    },
    MESSAGES: (state, messages) => state.systemInfo.messages = messages,
    LAST_ID: (state, id) => state.systemInfo.lastId = id,
  },

  actions: {
    CHATS_REQUEST: ({commit, state}, props) => {
      return new Promise((resolve, reject) => {
        commit('CHATS_STATUS', "Loading");
        let params = {limit:20};
        if (state.systemInfo.lastId) params.beforeId = state.systemInfo.lastId;
        axios.get("/api/chats", {params:params})
          .then(res => {
            commit('CHATS_STATUS', "Success");
            commit('CHATS', res.data.chats);

            if (!state.systemInfo.activeChatId && res.data.chats && Object.keys(res.data.chats)[0]) {
              commit('ACTIVE_CHAT_ID', Object.keys(res.data.chats)[0]);
            }

            commit('LAST_ID', res.data.meta.lastId);
            resolve();
          }).catch(err => {
          commit('CHATS_STATUS', "Error", err.message);
          reject(err);
        })
      })
    },
    MESSAGES_REQUEST: ({commit, state, dispatch}, props) => {
      return new Promise((resolve, reject) => {
        commit('MESSAGES_STATUS', "Loading");
        axios.get("/api/chat/" + state.systemInfo.activeChatId)
          .then(res => {
            commit('MESSAGES_STATUS', "Success");
            commit('MESSAGES', res.data);
          }).catch(err => {
          commit('MESSAGES_STATUS', "Error", err.message);
        })
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
    SET_ACTIVE_CHAT_CATEGORY: ({commit, state, dispatch}, category) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/chat/" + state.systemInfo.activeChatId, {class:category}).then((res) => {
          commit('ACTIVE_CHAT_CATEGORY', category)
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    SET_ACTIVE_CHAT_SPAM: ({commit, state, dispatch}) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/chat/" + state.systemInfo.activeChatId, {class:"SPAM"}).then((res) => {
          commit('ACTIVE_CHAT_SPAM')
          if (state.systemInfo.chats && Object.keys(state.systemInfo.chats)[0]) {
            commit('ACTIVE_CHAT_ID', Object.keys(state.systemInfo.chats)[0]);
            dispatch('MESSAGES_REQUEST');
          }
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    ACTIVE_CHAT_SEND: ({commit, state, dispatch}) => {
      return new Promise((resolve, reject) => {
        axios.get("/api/chat/" + state.systemInfo.activeChatId + "/send").then((res) => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    SET_ACTIVE_CHAT_CONTACT: ({commit, state, dispatch}, item) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/chat/" + state.systemInfo.activeChatId + "/contact", {name:item.name, login:item.login, phone:item.phone}).then((res) => {
          commit('ACTIVE_CHAT_CONTACT', item)
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    socket_receive: ({commit, state, dispatch}, receive_msg) => {
      console.log("receive");
      const msg = receive_msg.msg;
      const chat = receive_msg.chat;
      if (!msg || !chat) return;
      console.log(receive_msg);console.log(msg);console.log(chat);

      let chatItem, chatId;
      chatId = msg.direction === "to_user" ? msg.sender_id : msg.recepient_id;
      chatItem = state.systemInfo.chats[chatId];
      // 1. Такой чат - уже есть
      if (chatItem) {
        // 1. Если это активный чат - пушаем в него сообщение
        chatId === state.systemInfo.activeChatId ? state.systemInfo.messages.push(msg) : null;
        // 2. Обновляем состояние чата
        Object.assign(state.systemInfo.chats[chatId], chat);
        // 3. пересортировка чатов
      } else {
        dispatch('CHATS_REQUEST');
      }

      /* уведомление */
      if (msg.direction === "to_user") {
        if (Notification.permission === "granted") {
          let notification = new Notification(chat.name, {body: msg.body});
          notification.onclick = () => console.log("click");
        }
      }
    },
  }
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    router.push({name : 'Home'});
  }
  return Promise.reject(error);
});

