<template>
  <div class="fade modal"  id="newsite" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <form @submit="checkForm" action="#" method="POST">
              <div class="form-group">
                <label for="name">Your website address</label>
                <input type="name" class="form-control" id="name" required placeholder="sitepower.io" v-model="origin">
              </div>
              <button class="btn btn-black mt-20 w-100">Add</button>
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
    name: 'ModalNewSite',
    data () {
      return {
        origin: ''
      };
    },
    methods: {
      checkForm (e) {
        e.preventDefault();
        axios.post("/api/form", {origin:this.origin}).then(() => {
          axios.get("/api/forms").then((res) => {
            let forms = res.data;

            forms.sort((a,b)=> {
              if (a.created < b.created) return 1
              else if (a.created > b.created) return -1
              else return 0
            });
            this.$store.commit('initForms', forms);
            this.$root.$emit("newsite_added");
          }).catch((err) => {
            console.log("Error in getting chats: ", err.message)
          })
        }).catch((err) => {
          console.log("Error in creating form: ", err.message)
        })

        jquery('#newsite').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },

    },
    mounted: function () {
      let that = this;
      this.$root.$on('newsite_open', function () {
        that.origin = '';
      })
    }

  }
</script>


