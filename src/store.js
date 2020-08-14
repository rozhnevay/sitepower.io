import Vue from 'vue';
import Vuex from 'vuex';
import router from './router/index'
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import store from './store'



Vue.use(Vuex);

let socketio;

import axios from "axios";
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? 'https://ws.sitepower.io' : "/";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;

export default new Vuex.Store({
  state: {
    userInfo: {
      isLoggedIn: false,
      name: '',
      authStatus : "",
      admin: "Y",
      amount: 0,
      testFormId: "",
      id: ""
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
      activeChatPrintingName: "",
      payStatus: "",
      payError: "",
      component: "chat-list-component"
    }
  },

  getters: {
    USER_LOGGED_IN: state => {
      return state.userInfo.isLoggedIn;
    },
    USER_NAME: state => {
      return state.userInfo.name;
    },
    USER_ID: state => {
      return state.userInfo.id;
    },
    AUTH_STATUS: state => {
      return state.userInfo.authStatus;
    },
    PAY_STATUS: state => {
      return state.systemInfo.payStatus;
    },
    PAY_ERROR: state => {
      return state.systemInfo.payError;
    },
    getChats: state => {
      return state.systemInfo.chats;
    },
    FORMS: state => {
      return state.systemInfo.forms;
    },
    OPERATORS: state => {
      return state.systemInfo.operators;
    },
    getActiveChatId: state => {
      return state.systemInfo.activeChatId;
    },
    ACTIVE_FORM_ID: state => {
      return state.systemInfo.activeFormId;
    },
    ACTIVE_OPERATOR_ID: state => {
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
    getChatsStatus: state => {
      return state.systemInfo.chatsStatus;
    },
    ADMIN: state => {
      return state.userInfo.admin;
    },
    AMOUNT: state => {
      return state.userInfo.amount;
    },
    TEST_FORM_ID: state => {
      return state.userInfo.testFormId;
    },
    COMPONENT: state => {
      return state.systemInfo.component;
    },
  },
  mutations: {
    USER_LOGGED_IN: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },

    USER_NAME: (state, name) => {
      state.userInfo.name = name;
    },
    USER_ID: (state, id) => {
      state.userInfo.id = id;
    },
    AUTH_STATUS: (state, status, error) => {
      state.userInfo.authStatus = status;
      state.userInfo.authError = error;
    },
    PAY_STATUS: (state, status, error) => {
      state.systemInfo.payStatus = status;
      state.systemInfo.payError = error;
    },
    initChats: (state, chats) => {
      state.systemInfo.chats = chats;
      if (state.systemInfo.chats && state.systemInfo.chats[0]) {
        state.systemInfo.activeChatId = state.systemInfo.chats[0].sitepower_id;
      }
    },
    FORMS: (state, forms) => {
      state.systemInfo.forms = forms;
      if (forms && forms[0]) {
        state.systemInfo.activeFormId = forms[0].id;
      }
    },
    OPERATORS: (state, operators) => {
      state.systemInfo.operators = operators;
      if (operators && operators[0]) {
        state.systemInfo.activeOperatorId = operators[0].sitepower_id;
      }
    },
    ACTIVE_FORM_ID: (state, id) => {
      state.systemInfo.activeFormId = id;
    },
    ACTIVE_OPERATOR_ID: (state, id) => {
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
    ADMIN: (state, flag) => state.userInfo.admin = flag,
    AMOUNT:(state, amount) => state.userInfo.amount = amount,
    TEST_FORM_ID:(state, id) => state.userInfo.testFormId = id,
    COMPONENT:(state, comp) => state.systemInfo.component = comp,
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
    SOCKET_LOGIN: ({commit, state, dispatch}, props) => {
      if (!socketio) {
        socketio = new VueSocketIO({
          debug: true,
          connection: SocketIO(axios.defaults.baseURL, {path:'/socket.io', query: "userId=" + state.userInfo.id}),
          vuex: {
            store,
            actionPrefix: 'socket_',
            mutationPrefix: 'socket_'
          },
        });
        Vue.use(socketio);
      }

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
        console.log(props)
        axios.post("/api/auth/login", {}, {
          auth: {
            username: props.email,
            password: props.password
          }
        }).then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.login);
          commit('USER_ID', res.data.id);
          commit('AMOUNT', res.data.days_amount);
          commit('TEST_FORM_ID', res.data.test_form_id);
          dispatch('SOCKET_LOGIN');
          if (res.data.parent_sitepower_id) {
            commit('ADMIN', "N");
          }
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
        axios.post("/api/auth/login", props).then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.name);
          commit('AMOUNT', res.data.days_amount);
          commit('TEST_FORM_ID', res.data.test_form_id);
          dispatch('SOCKET_LOGIN');
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
        axios.get("/api/auth/user").then((res) => {
          commit('AUTH_STATUS', "Success")
          commit('USER_LOGGED_IN', true);
          commit('USER_NAME', res.data.login);
          commit('AMOUNT', res.data.days_amount);
          commit('USER_ID', res.data.id);
          commit('TEST_FORM_ID', res.data.test_form_id);
          dispatch('SOCKET_LOGIN');
          if (res.data.parent_sitepower_id) {
            commit('ADMIN', "N");
          }

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
        commit('AUTH_STATUS', "Success")
        commit('USER_LOGGED_IN', false);
        commit('USER_NAME', "");
        if (socketio) {
          socketio = null;
        };
        resolve();
        axios.get("/api/logout");
        // axios.get("/api/logout").then((res) => {
        //   commit('AUTH_STATUS', "Success")
        //   commit('USER_LOGGED_IN', false);
        //   commit('USER_NAME', "");
        //   if (socketio) {
        //     socketio = null;
        //   };
        //
        //   resolve();
        // }).catch((err) => {
        //   commit('AUTH_STATUS', "Error")
        //   reject(err);
        // });
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
    SET_ACTIVE_CHAT_SPAM: ({commit, state, dispatch}, val) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/chat/" + state.systemInfo.activeChatId, {class:val}).then((res) => {
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
    BLOCK_OPERATOR: ({commit, state, dispatch}, block) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/operator/" + state.systemInfo.activeOperatorId + "/block", {block}).then((res) => {
          dispatch('OPERATORS');
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    FORMS: ({commit, state, dispatch}, item) => {
      return new Promise((resolve, reject) => {
        axios.get("/api/forms").then((res) => {
          let forms = res.data;
          forms.sort((a,b)=> {
            if (a.created < b.created) return 1
            else if (a.created > b.created) return -1
            else return 0
          });
          commit('FORMS', forms);
          resolve();
        }).catch((err) => {
          reject(err);
        })
      });
    },
    OPERATORS: ({commit, state, dispatch}, item) => {
      return new Promise((resolve, reject) => {
        axios.get("/api/operators").then((res) => {
          let operators = res.data;
          commit('OPERATORS', operators);
          resolve();
        }).catch((err) => {
          reject(err);
        })
      });
    },
    FORM: ({commit, state, dispatch}, form) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/form/" + state.systemInfo.activeFormId, {color:form.color, gradient:form.gradient, label:form.label, position:form.position, message_placeholder:form.message_placeholder}).then((res) => {
          dispatch('FORMS');
          resolve();
        }).catch((err) => {
          reject(err)
        })
      });
    },
    FORM_CREATE: ({commit, state, dispatch}, origin) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/form/", {origin}).then((res) => {
          dispatch('FORMS');
          resolve();
        }).catch((err) => {
          reject(err)
        })
      });
    },
    PAY: ({commit, state, dispatch}, payment) => {
      return new Promise((resolve, reject) => {
        commit('PAY_STATUS', "Loading");
        axios.post("/api/pay/", payment).then((res) => {
          commit('PAY_STATUS', "Success");
          resolve(res);
        }).catch((err) => {
          commit('PAY_STATUS', "Error", err.message);
          reject(err)
        })
      });
    },
    VK_GET_GROUPS: ({commit, state, dispatch}, token) => {
      return new Promise((resolve, reject) => {
        axios.get("/api/vk/groups/" + token).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err)
        })
      });
    },
    VK_CREATE_FORM_GROUP: ({commit, state, dispatch}, obj) => {
      return new Promise((resolve, reject) => {
        axios.post("/api/vk/group", obj).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err)
        })
      });
    },
    VK_COMPLETE: ({commit, state, dispatch}, obj) => {
      return new Promise((resolve, reject) => {
        axios.get("/api/vk/group/" + obj.id + "/" + obj.code).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err)
        })
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
      } else {
        state.systemInfo.chats = Object.assign({chatId : chat}, state.systemInfo.chats);
        Vue.set(state.systemInfo.chats, chatId, chat);
      }

      /* уведомление */
      if (msg.direction === "to_user") {
        if (Notification.permission === "granted") {
          let notification = new Notification(chat.name, {body: msg.body, icon:"https://app.sitepower.io/static/icon-square_144.png"});
          notification.onclick = () => {
            try {
              window.focus();
              this.cancel();
            }
            catch (ex) {}
          };
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


