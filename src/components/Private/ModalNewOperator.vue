<template>
  <div class="fade modal"  id="newoperator" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <form @submit="checkForm" action="#" method="POST">
              <div class="form-group">
                <label for="email">Email оператора</label>
                <input type="email" class="form-control" id="email" required placeholder="ivan@gmail.com" v-model="login">
                <label for="name">Имя оператора</label>
                <input type="text" class="form-control" id="name" required placeholder="Ivan" v-model="name">
                <label for="password">Пароль оператора</label>
                <input type="password" class="form-control" id="password" required placeholder="Password" v-model="password">
              </div>
              <button class="btn btn-black mt-20 w-100">Добавить</button>
            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as jquery from 'jquery';
  import axios from "axios";
  export default {
    name: 'ModalNewOperator',
    data () {
      return {
        login: '',
        name: '',
        password: ''
      };
    },
    methods: {
      checkForm (e) {
        e.preventDefault();
        axios.post("/api/employee", {login:this.login, name:this.name, password:this.password}).then(() => {
          axios.get("/api/employee").then((res) => {
            let operators = res.data;

            operators.sort((a,b)=> {
              if (a.createdDate < b.createdDate) return 1
              else if (a.createdDate > b.createdDate) return -1
              else return 0
            });
            this.$store.commit('OPERATORS', operators);
          }).catch((err) => {
            console.log("Error in getting operators: ", err.message)
          })
        }).catch((err) => {
          console.log("Error in creating form: ", err.message)
        })

        jquery('#newoperator').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },

    },
    mounted: function () {
      let that = this;
      this.$root.$on('newoperator_open', function () {
        that.login = '';
      })
    }
  }
</script>

