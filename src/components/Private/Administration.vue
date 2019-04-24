<template>
   <div>
     <div class="main ws">
       <div class="left-side ws">
         <div class="top">
           <span class="title">Your websites</span>
           <button type="button" class="btn btn-light btn-sm" data-target="#newsite" data-toggle="modal" @click="showNewSiteModal">+ ADD WEBSITE</button>
         </div>
         <div class="chats overflow-auto">
           <div v-for="form in forms" @click="openForm(form)" v-bind:id="form.id" class="item" :class="[ form.id == activeFormId ?  'selected' : '' ]">
             <div class="left">
               <div class="img">
                 <img src="../../assets/logo-lightning.svg" height="25px" alt="">
               </div>
               <div class="text">
                <span class="title">{{form.origin}}</span>
                 <div class="message">Chat on site</div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="center ws">
         <div class="container">
           <div class="row mt-4">
             <div class="col-lg-12 d-flex justify-content-between">
               <span class="title">Widget settings</span>
               <!--<span class="title">{{form.origin}}</span>-->
             </div>
           </div>
           <form>
             <div class="form-row mt-3">
               <div class="form-group col-md-6">
                 <span class="subtitle">Setup a color</span>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" checked name="setup_colors" id="radio_color" value="0" v-model="gradient">
                   <label class="form-check-label" for="radio_color">Single Color</label>
                 </div>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="setup_colors" id="radio_gradient" value="1" v-model="gradient">
                   <label class="form-check-label" for="radio_gradient">Gradient</label>
                 </div>
                 <div id="collapse_color" class="mt-3">
                   <div class="colors">
                     <div :class="[ color==='white' ? 'active' : '' ]" @click="setColor('white')" class="color color-white"></div>
                     <div :class="[ color==='green' ? 'active' : '' ]" @click="setColor('green')" class="color color-green"></div>
                     <div :class="[ color==='blue' ? 'active' : '' ]" @click="setColor('blue')" class="color color-blue"></div>
                     <div :class="[ color==='red' ? 'active' : '' ]" @click="setColor('red')" class="color color-red"></div>
                     <div :class="[ color==='pink' ? 'active' : '' ]" @click="setColor('pink')" class="color color-pink"></div>
                     <div :class="[ color==='orange' ? 'active' : '' ]" @click="setColor('orange')" class="color color-orange"></div>
                     <div :class="[ color==='purple' ? 'active' : '' ]" @click="setColor('purple')" class="color color-purple"></div>
                     <div :class="[ color==='black' ? 'active' : '' ]" @click="setColor('black')" class="color color-black"></div>
                   </div>
                 </div>

               </div>
               <div class="form-group col-md-6">
                 <span class="subtitle">Setup a position</span>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="setup_pos" id="ratio_br" checked value="0" v-model="position">
                   <label class="form-check-label" for="ratio_br">Внизу справа</label>
                 </div>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="setup_pos" id="ratio_ls" value="1" v-model="position">
                   <label class="form-check-label" for="ratio_ls">Внизу слева</label>
                 </div>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="setup_pos" id="ratio_bl" checked value="2" v-model="position">
                   <label class="form-check-label" for="ratio_bl">Левый край</label>
                 </div>
                 <div class="form-check form-check-inline ml-13">
                   <input class="form-check-input" type="radio" name="setup_pos" id="ratio_rs" value="3" v-model="position">
                   <label class="form-check-label" for="ratio_rs">Правый край</label>
                 </div>
               </div>
               <div class="form-row w-100">
                 <div class="form-group col-md-4">
                   <label class="subtitle" for="setup_label">Setup a label</label>
                   <input type="text" class="form-control" id="setup_label" placeholder="Label..." v-model="label">
                 </div>
                 <div class="form-group col-md-6">
                   <label class="subtitle" for="setup_msg">Setup a message</label>
                   <input type="text" class="form-control" id="setup_msg" placeholder="Text message..." v-model="message_placeholder">
                 </div>
                 <div class="form-group col-md-2">
                   <!--<label class="subtitle" for="setup_lang">Setup a language</label>-->
                   <!--<select id="setup_lang" class="form-control">-->
                     <!--<option selected>Choose...</option>-->
                     <!--<option>English</option>-->
                   <!--</select>-->
                   <button type="button" class="btn btn-light btn-md save-button" @click="saveForm">Apply</button>
                 </div>
               </div>
             </div>
           </form>
         </div>
       </div>
       <div class="right-side ws">
         <span class="title mt-2">JS Code</span>
         <textarea class="form-control" rows="9" disabled>{{script}}</textarea>
       </div>

   </div>

     <div class="bar ws">
       <span class="title">Your operators</span>
       <button type="button" class="btn btn-light btn-sm ml-3" @click="showNewOperatorModal" data-target="#newoperator" data-toggle="modal" >+ Invite Operator</button>
     </div>

     <div class="tableFixHead table-block ws">
       <table class="table ws">
         <thead class="thead-dark">
         <tr>
           <th class="w1" scope="col">Name</th>
           <th class="w1" scope="col">Email</th>
           <th class="w1" scope="col">Admin</th>
           <th class="w1" scope="col">Created</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="operator in operators" @click="openOperator(operator)">
           <th scope="row">{{operator.name}}</th>
           <td>{{operator.login}}</td>
           <td>
             <div class="form-group form-check m-0">
               <input type="checkbox" class="form-check-input" :checked="operatorAdmin(operator)" id="is_admin">
                <label class="form-check-label" for='is_admin' value="Is Admin"/>
             </div>
           </td>
           <td>{{operator.created | moment("DD.MM.YYYY HH:mm")}}</td>
         </tr>
         </tbody>
       </table>
     </div>
   <new-site-modal-component></new-site-modal-component>
   <new-operator-modal-component></new-operator-modal-component>
  </div>
</template>

<script>
  import axios from "axios";
  import * as jquery from 'jquery';
  import NewSiteModal from './ModalNewSite';
  import NewOperatorModal from './ModalNewOperator';
  export default {
    name: 'Administration',
    data () {
      return {
        origin: '',
        color: '',
        gradient: '',
        label: '',
        position: '',
        message_placeholder: '',
        script: ''
      };
    },
    beforeCreate() {
      axios.get("/api/forms").then((res) => {
        let forms = res.data;

        forms.sort((a,b)=> {
          if (a.created < b.created) return 1
          else if (a.created > b.created) return -1
          else return 0
        });
        this.$store.commit('initForms', forms);
        this.refreshModel();
      }).catch((err) => {
        console.log("Error in getting chats: ", err.message)
      })

      axios.get("/api/operators").then((res) => {
        let operators = res.data;

        operators.sort((a,b)=> {
          if (a.created < b.created) return 1
          else if (a.created > b.created) return -1
          else return 0
        });
        this.$store.commit('initOperators', operators);
      }).catch((err) => {
        console.log("Error in getting operators: ", err.message)
      })

    },
    methods: {
      refreshModel() {
        this.color = this.form.color;
        this.gradient = this.form.gradient;
        this.label = this.form.label;
        this.position = this.form.position;
        this.message_placeholder = this.form.message_placeholder;
        let scriptUrl = window.location.origin + '/api/widget/' + this.form.sitepower_id;
        this.script = '<script type="text/javascript" src="' + scriptUrl + '"/>';
        let $script = jquery("<script type='text/javascript' id='widgetdemo' src='" + scriptUrl + "'/>");
       /*if (jquery("#widgetdemo")) {
          jquery("#widgetdemo").remove();
        }
        jquery("body").append($script);*/
      },
      openForm (form) {
        this.$store.commit('setActiveFormId', form.id);
        this.refreshModel();
      },
      openOperator (operator) {
        this.$store.commit('setActiveOperatorId', operator.sitepower_id);
        this.refreshModel();
      },
      operatorAdmin(operator) {
        let res = operator.admin == 0 ? false: true;
        return res;
      },
      showNewSiteModal() {
        this.$root.$emit("newsite_open");
      },
      showNewOperatorModal() {
        this.$root.$emit("newoperator_open");
      },
      saveForm() {
        axios.post("/api/form/" + this.getId, {color:this.color, gradient:this.gradient, label:this.label, position:this.position, message_placeholder:this.message_placeholder}).then((res) => {
          console.log("Save success!")
        }).catch((err) => {
          console.log("Error in getting chats: ", err.message)
        })
      },
      setColor(color) {
        this.color = color;
      }
    },
    computed: {
      getId () {
        return this.$store.getters.getActiveFormId;
      },
      forms() {
        return this.$store.getters.getForms;
      },
      operators() {
        return this.$store.getters.getOperators;
      },
      activeFormId() {
        return this.$store.getters.getActiveFormId;
      },
      form () {
        let form = this.$store.getters.getForms.filter(item => item.id == this.getId);
        if (form && form[0] && form[0].origin) {
          return form[0];
        }
        return null;
      }
    },
    mounted: function () {
      let that = this;
      this.$root.$on('newsite_added', function () {
        that.refreshModel();
      })
    },
    components : {
      'new-site-modal-component' : NewSiteModal,
      'new-operator-modal-component' : NewOperatorModal
    }

  }
</script>

