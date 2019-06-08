<template>
  <div v-if="isDataLoaded">
    <div class="row col-md-12">
      <div class="col-md-4"/>
      <div class="col-md-4" v-if="token">
        <div class="vk-logo"></div>
        <h4 class="text-center">Выберите группу для подключения</h4>
        <div class="text-center"><span class="text-muted">Чтобы подключить группу Вконтакте, вы должны быть ее администратором</span></div>
        <div class="form-group text-left mt-20 vk-groups">
          <div class="form-check mt-2" v-for="group in groups">
            <input class="form-check-input" type="radio" :id="group.id" :value="group.id" v-model="choosen">
            <label class="form-check-label" :for="group.id" v-model="choosen">{{group.name}}</label>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-yellow mt-20 w-40 align-content-center" @click.prevent="connect" :disabled="!choosen">
            <span>Подключить</span>
          </button>
        </div>
        <div v-if="error" class="level text-center"><p class="text-danger">Ошибка при получении групп. Убедитесь, что Вы являетесь администратором, и повторите попытку</p></div>
      </div>
      <div class="col-md-4" v-if="code">
        <div class="vk-logo"></div>
        <h4 class="text-center">Почти готово!</h4>
        <div class="text-center"><span>Для применения настроек нажмите кнопку "Завершить".</span></div>
        <div class="text-center">
          <button class="btn btn-yellow mt-20 w-40 align-content-center" @click.prevent="complete">
            <span>Завершить</span>
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'Vk',
    data () {
      return {
        //token : "",//"021e8715982144a896704f99bcdae2cb159cede5d0d1601937ed02d79f5de688f7857524036208fcf84f8",
        //code: "",//"52e596660ad6cd04b",
        groups : [],
        error  : "",
        isDataLoaded : false,
        choosen: "",
        //state: "182935844"
      };
    },
    methods: {
      getAllUrlParams(url) {
          let queryString = url;
          let obj = {};
          if (queryString) {
            if (queryString.split('#')[1]){
              queryString = queryString.split('#')[1];
            }
            if (queryString.split('?')[1]){
              queryString = queryString.split('?')[1];
            }
            let arr = queryString.split('&');
            for (let i = 0; i < arr.length; i++) {
              let a = arr[i].split('=');
              let paramName = a[0];
              let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
              paramName = paramName.toLowerCase();
              if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
              if (paramName.match(/\[(\d+)?\]$/)) {
                let key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];
                if (paramName.match(/\[\d+\]$/)) {
                  let index = /\[(\d+)\]/.exec(paramName)[1];
                  obj[key][index] = paramValue;
                } else {
                  obj[key].push(paramValue);
                }
              } else {
                if (!obj[paramName]) {
                  obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                  obj[paramName] = [obj[paramName]];
                  obj[paramName].push(paramValue);
                } else {
                  obj[paramName].push(paramValue);
                }
              }
            }
          }
          return obj;
        },
      connect() {
        this.$store.dispatch('VK_CREATE_FORM_GROUP', {id:this.choosen, name:this.groups.filter(item => item.id === this.choosen)[0].name})
          .then((res) => {
            window.location.replace('https://oauth.vk.com/authorize?client_id=7003708&display=page&group_ids='+this.choosen+'&redirect_uri=https://app.sitepower.io/private/vk&scope=messages,manage&state=ru&response_type=code&v=5.95&state='+this.choosen);
          })
          .catch((err) => {
            this.error = "Ошибка при добавлении группы VK. Попробуйте позже"
            console.log(err.message);
          })
      },
      complete() {
        this.$store.dispatch('VK_COMPLETE', {id:this.state, code:this.code})
          .then((res) => {
              console.log("Good Baby");
          })
          .catch((err) => {
            this.error = "Ошибка при добавлении группы VK. Попробуйте позже"
            console.log(err.message);
          })
      }
    },
    computed: {
      token () {
        return this.getAllUrlParams(window.location.href).access_token;
      },
      code () {
        return this.getAllUrlParams(window.location.href).code;
      },
      state () {
        return this.getAllUrlParams(window.location.href).state;
      },
    },
    beforeMount () {
      if (this.token) {
        this.$store.dispatch('VK_GET_GROUPS', this.token)
          .then((res) => {
            this.groups = res;
            this.isDataLoaded = true;
          })
          .catch((err) => {
            console.log(err.message);
            this.isDataLoaded = true;
          })
      }
      if (this.code) {
        this.isDataLoaded = true;
      }

    }
  }
</script>

<style scoped>
  .vk-logo {
    background: url(../../assets/vk-banner@2x-3PzPX.png) 50% 50% no-repeat;
    background-size: cover;
    display: inline-block;
    width: 100%;
    height: 270px;
    border-radius: 4px;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  .vk-groups {
    margin-left: 160px;
  }
</style>
