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
      openResetModal: false
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
  },

  actions: {

  }
});
