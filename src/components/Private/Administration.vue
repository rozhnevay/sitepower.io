<template>
   <div>
     <div class="main ws">
       <div class="left-side ws">
         <div class="top">
           <span class="title">Каналы</span>
           <button type="button" class="btn btn-light btn-sm" data-target="#newsite" data-toggle="modal" @click="showNewSiteModal">Добавить</button>
         </div>
         <div class="chats overflow-auto">
           <div v-for="form in forms" @click="openForm(form)" v-bind:id="form.id" class="item" :class="[ form.id == activeFormId ?  'selected' : '' ]">
             <div class="left">
               <div class="img">
                 <img src="../../assets/logo-lightning.svg" height="25px" alt="">
               </div>
               <div class="text">
                <span class="title">{{form.origin}}</span>
                 <div v-if="form.test === 'Y'" class="message">Тестовая форма</div>
                 <div v-if="form.type === 'vk'" class="message">VK группа</div>
                 <div v-else class="message">Чат на сайте</div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="center ws" >
         <div class="container">
           <div class="row mt-4">
             <div class="col-lg-12 d-flex justify-content-between">
               <span class="title">Настройки виджета</span>
               <!--<span class="title">{{form.origin}}</span>-->
             </div>
           </div>
           <form>
             <div class="form-row mt-3">
               <div class="form-group col-md-3">
                 <span class="subtitle">Установите цвет</span>
                 <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" checked name="setup_colors" id="radio_color" value="0" v-model="gradient">
                 <label class="form-check-label" for="radio_color">Один цвет</label>
               </div>
                 <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="setup_colors" id="radio_gradient" value="1" v-model="gradient">
                   <label class="form-check-label" for="radio_gradient">Градиент</label>
                 </div>
                 <div :class="[ gradient === '0' ? 'collapse_color' : 'collapse_gradient']" class="mt-3">
                   <div class="colors">
                     <!--<div :class="[ color==='white' ? 'active' : '' ]" @click="setColor('white')" class="color color-white"></div>-->
                     <div :class="[ color==='sitepower' ? 'active' : '' ]" @click="setColor('sitepower')" class="color color-sitepower"></div>
                     <div :class="[ color==='green' ? 'active' : '' ]" @click="setColor('green')" class="color color-green"></div>
                     <div :class="[ color==='blue' ? 'active' : '' ]" @click="setColor('blue')" class="color color-blue"></div>
                     <div :class="[ color==='red' ? 'active' : '' ]" @click="setColor('red')" class="color color-red"></div>
                     <div :class="[ color==='pink' ? 'active' : '' ]" @click="setColor('pink')" class="color color-pink"></div>
                     <div :class="[ color==='orange' ? 'active' : '' ]" @click="setColor('orange')" class="color color-orange"></div>
                     <div :class="[ color==='purple' ? 'active' : '' ]" @click="setColor('purple')" class="color color-purple"></div>
                     <!--<div :class="[ color==='black' ? 'active' : '' ]" @click="setColor('black')" class="color color-black"></div>-->
                   </div>
                 </div>

               </div>
               <!--<div class="form-group col-md-6">-->
                 <!--<span class="subtitle">Setup a position</span>-->
                 <!--<div class="form-check form-check-inline">-->
                   <!--<input class="form-check-input" type="radio" name="setup_pos" id="ratio_br" checked value="0" v-model="position">-->
                   <!--<label class="form-check-label" for="ratio_br">Внизу справа</label>-->
                 <!--</div>-->
                 <!--<div class="form-check form-check-inline">-->
                   <!--<input class="form-check-input" type="radio" name="setup_pos" id="ratio_ls" value="1" v-model="position">-->
                   <!--<label class="form-check-label" for="ratio_ls">Внизу слева</label>-->
                 <!--</div>-->
                 <!--<div class="form-check form-check-inline">-->
                   <!--<input class="form-check-input" type="radio" name="setup_pos" id="ratio_bl" checked value="2" v-model="position">-->
                   <!--<label class="form-check-label" for="ratio_bl">Левый край</label>-->
                 <!--</div>-->
                 <!--<div class="form-check form-check-inline ml-13">-->
                   <!--<input class="form-check-input" type="radio" name="setup_pos" id="ratio_rs" value="3" v-model="position">-->
                   <!--<label class="form-check-label" for="ratio_rs">Правый край</label>-->
                 <!--</div>-->
               <!--</div>-->
               <!--<div class="form-row w-100">-->
                 <div class="form-group col-md-3">
                   <label class="subtitle" for="setup_label">Установите заголовок</label>
                   <input type="text" class="form-control" id="setup_label" placeholder="Напишите нам" v-model="label">
                 </div>
                 <div class="form-group col-md-4">
                   <label class="subtitle" for="setup_msg">Установите текст в поле для ввода</label>
                   <input type="text" class="form-control" id="setup_msg" placeholder="Напишите ваш вопрос..." v-model="message_placeholder">
                 </div>
                 <div class="form-group col-md-2">
                   <!--<label class="subtitle" for="setup_lang">Setup a language</label>-->
                   <!--<select id="setup_lang" class="form-control">-->
                     <!--<option selected>Choose...</option>-->
                     <!--<option>English</option>-->
                   <!--</select>-->
                   <button type="button" class="btn btn-light btn-md save-button" :class="!enableApply ? 'disabled' : ''" @click="saveForm">Применить</button>
                 </div>
               </div>
             <div class="row mt-3 text-muted m-2">
               <p class="">В нижней части экрана можно посмотреть, как будет выглядеть Ваш виджет. Для сохранения настроек нажмите "Применить".</p>
               <p class="">Протестируйте диалог с <a :href="testFormId" target="_blank">тестовой страницы</a></p>
             </div>
             <!--</div>-->
           </form>
         </div>
       </div>
       <div class="right-side ws">
         <div class="mt-3" style="display: inline-block;" >
         <span class="title">Код виджета</span>
         <a class="quicklink" @click.stop.prevent="copyCode">Скопировать</a>
         </div>
         <textarea class="form-control" rows="9" disabled id="adminscript">{{script}}</textarea>
         <p class="text">Пожалуйста, установите данный код на Ваш сайт. Это необходимо для начала работы с сервисом.</p>
         <p class="text-muted">При возникновении любых вопросов напишите нам на <a href="mailto:support@sitepower.io">support@sitepower.io</a></p>
       </div>

   </div>

     <div class="bar ws">
       <span class="title">Ваши операторы</span>
       <button type="button" class="btn btn-light btn-sm ml-3" @click="showNewOperatorModal" data-target="#newoperator" data-toggle="modal" >Пригласить оператора</button>
       <button type="button" class="btn btn-light btn-sm ml-3" @click="blockOperator" :disabled="activeOperator && activeOperator.admin === 'Y'">{{activeOperator && activeOperator.status === 'Заблокирован' ? 'Разблокировать' : 'Заблокировать'}}</button>
     </div>

     <div class="tableFixHead table-block ws">
       <table class="table ws">
         <thead class="thead-dark">
         <tr>
           <th class="w1" scope="col">Имя</th>
           <th class="w1" scope="col">Email</th>
           <th class="w1" scope="col">Статус</th>
           <th class="w1" scope="col">Роль</th>
           <th class="w1" scope="col">Дата добавления</th>
           <!--<th class="w1" scope="col">Дата последнего сообщения</th>-->
           <!--<th class="w1" scope="col">Сообщений, отправлено</th>-->
         </tr>
         </thead>
         <tbody>
         <tr v-for="operator in operators" @click="openOperator(operator)" class="operator-row" :class="[ operator.sitepower_id == activeOperatorId ?  'selected' : '' ]">
           <th scope="row">{{operator.name}}</th>
           <td>{{operator.login}}</td>
           <td><span class="badge" :class="[operator.status === 'Заблокирован' ? 'badge-danger' : 'badge-warning']">{{operator.status}}</span></td>
           <td>{{operator.admin === "Y" ? "Администратор" : "Оператор"}}</td>
           <td>{{operator.created | moment("DD.MM.YYYY HH:mm")}}</td>
           <!--<td>-</td>-->
           <!--<td>0</td>-->
         </tr>
         </tbody>
       </table>
     </div>

     <div class="chatbox" :class="[expanded  ? '' : 'chatbox--tray']">
       <div class="chatbox__title" :class="[gradient === '0' ? 'collapse_color color-' + this.color : 'collapse_gradient color-' + this.color] + ' ' + [expanded  ? 'hidden' : '']" @click="toggleShow">
         <h5><a href="#">{{label}}</a></h5>
         <div class="chat-logo"></div>
       </div>
       <div class="chatbox__title__full" :class="[gradient === '0' ? 'collapse_color color-' + this.color : 'collapse_gradient color-' + this.color] + ' ' + [expanded  ? '' : 'hidden']" @click="toggleShow">
         <!--<h5><a href="#">Online Chat</a> | <span class="operator-name">Maxim Ivanov</span></h5>-->
         <h5><a href="#">Онлайн диалог</a></h5>
         <button class="chatbox__title__close">
            <span>
                <svg viewBox="0 0 12 12" width="12px" height="12px">
                    <line stroke="#FFFFFF" x1="11.75" y1="0.25" x2="0.25" y2="11.75"></line>
                    <line stroke="#FFFFFF" x1="11.75" y1="11.75" x2="0.25" y2="0.25"></line>
                </svg>
            </span>
         </button>
       </div>
       <div class="chatbox__body">
         <div class="chatbox__body__message chatbox__body__message--left">
           <div class="info-left">
             <small class="text-muted">Вы</small>
             <small class="text-muted">18:10</small>
           </div>
           <p>Здравствуйте, помогите мне с регистрацией</p>
         </div>
         <div class="chatbox__body__message chatbox__body__message--right">
           <div class="info-right">
             <small class="text-muted">Оператор</small>
             <small class="text-muted">18:10</small>
           </div>
           <p>Добрый день, где именно у вас возникли трудности?
             Вот пошаговая инструкция:
             1. Нажмите на кнопку «Регистрация» в правом верхнем углу.
             2. Заполните поля и нажмите «Зарегистрироваться».
             3. Подтвердите вашу почту по сообщению которое пришло вам на Email.
             4. Войдите с помощью ваших данных. Если возникли вопросы, позвоните нам: +7(708)32-32-1 Звонок Бесплатный</p>
         </div>
         <div class="chatbox__body__message--file">
           <div class="info-left">
             <small class="text-muted">Вы</small>
             <small class="text-muted">18:10</small>
           </div>
           <div class="info-file">
             <div class="info-file__left">
               <i class="fas fa-file"></i>
             </div>
             <div class="info-file__right">
               <p class="info-file__name">Files.txt</p>
               <p class="info-file__info"><a href="">Скачать</a></p>
             </div>
           </div>
         </div>
         <div class="chatbox__body__message--file chatbox__body__message__right--file">
           <div class="info-left">
             <small class="text-muted">Оператор</small>
             <small class="text-muted">18:10</small>
           </div>
           <div class="info-file">
             <div class="info-file__left">
               <i class="fas fa-file"></i>
             </div>
             <div class="info-file__right">
               <p class="info-file__name">Documents.rar</p>
               <p class="info-file__info"><a href="">Скачать</a></p>
             </div>
           </div>
         </div>
       </div>
       <div class="chatbox__message">
         <div class="pin">
           <input type="file" name="file-6[]" id="file-6" class="inputfile inputfile-5" hidden data-multiple-caption="{count} files selected" multiple />
           <label for="file-6"><img src="../../assets/files.svg" width="16px" height="16px" alt=""></label>
         </div>
         <!--<div class="smile ml-2"><i class="fas fa-smile"></i></div>-->
         <br>
         <textarea class="chatbox__message" :placeholder="message_placeholder"></textarea>
         <div class="send"><img src="../../assets/send.svg" height="23px" width="25px" alt=""></div>
       </div>
     </div>

   <new-site-modal-component></new-site-modal-component>
   <new-operator-modal-component></new-operator-modal-component>
  </div>
</template>

<script>
  import * as $ from 'jquery';
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
        script: '',
        expanded: false,
        enableApply: false
      };
    },
    beforeCreate() {

    },
    methods: {
      toggleShow() {
        this.expanded = !this.expanded;
      },
      refreshModel() {
        this.color = this.form.color;
        this.gradient = this.form.gradient;
        this.label = this.form.label;
        this.position = this.form.position;
        this.message_placeholder = this.form.messagePlaceholder;
        let scriptUrl = 'https://ws.sitepower.io/api/widget/' + this.form.sitepower_id;
        this.script = '<script type="text/javascript" src="' + scriptUrl + '"/>';
        this.enableApply = false;
       // let $script = jquery("<script type='text/javascript' id='widgetdemo' src='" + scriptUrl + "'/>");
       /*if (jquery("#widgetdemo")) {
          jquery("#widgetdemo").remove();
        }
        jquery("body").append($script);*/
      },

      openForm (form) {
        this.$store.commit('ACTIVE_FORM_ID', form.id);
        this.refreshModel();
      },
      openOperator (operator) {
        this.$store.commit('ACTIVE_OPERATOR_ID', operator.sitepower_id);

      },
      showNewSiteModal() {
        this.$root.$emit("newsite_open");
      },
      showNewOperatorModal() {
        this.$root.$emit("newoperator_open");
      },
      saveForm() {
        const form = {color:this.color, gradient:this.gradient, label:this.label, position:this.position, messagePlaceholder:this.message_placeholder};
        this.$store.dispatch('FORM', form);
        this.enableApply = false;
      },
      blockOperator(){
        this.$store.dispatch('BLOCK_OPERATOR', this.activeOperator.status !== "Заблокирован");
      },
      setColor(color) {
        this.color = color;
      },
      copyCode() {
        let input = document.createElement('input');
        input.value = document.getElementById('adminscript').textContent;
        input.id = 'inputID';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      },
      titleClass(mode) {
        let classes = this.gradient === '0' ? 'collapse_color color-' + this.color : 'collapse_gradient color-' + this.color;
        let hidden = ''
        if (mode === 'min') {
          hidden =  this.expanded  ? 'hidden' : '';
        } else {
          hidden =  this.expanded  ? '' : 'hidden';
        }
        return classes + ' ' + hidden;
      },
    },
    computed: {
      forms() {
        return this.$store.getters.FORMS;
      },
      operators() {
        return this.$store.getters.OPERATORS;
      },
      activeFormId() {
        return this.$store.getters.ACTIVE_FORM_ID;
      },
      activeOperatorId() {
        return this.$store.getters.ACTIVE_OPERATOR_ID;
      },
      activeOperator() {
        return this.operators.filter(item => item.sitepower_id === this.activeOperatorId)[0];
      },
      form () {
        let form = this.$store.getters.FORMS.filter(item => item.id === this.activeFormId);
        if (form && form[0] && form[0].origin) {
          return form[0];
        }
        return null;
      },
      testFormId() {
        const domain = process.env.NODE_ENV === "production" ? 'https://ws.sitepower.io' : 'http://localhost:8080';
        return domain + '/page/' + this.$store.getters.TEST_FORM_ID;
      }
    },
    created: function () {
      let that = this;
      this.$root.$on('newsite_added', function () {
        that.refreshModel();
      })

      this.$store.dispatch('FORMS').then(() => {
        this.refreshModel();
      }).catch(err => console.log(err.message));
      this.$store.dispatch('OPERATORS');

      $('.chatbox').on('transitionend', function() {
        if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
      });
    },
    components : {
      'new-site-modal-component' : NewSiteModal,
      'new-operator-modal-component' : NewOperatorModal
    },
    watch: {
      color: function() {
        this.enableApply = true;
      },
      gradient: function() {
        this.enableApply = true;
      }
      ,
      label: function() {
        this.enableApply = true;
      },
      message_placeholder: function() {
        this.enableApply = true;
      }
    },

  }
</script>
<style scoped>
  .chatbox .collapse_color.color-green {
    background-color: #A1DD70;
  }
  .chatbox .collapse_color.color-blue {
    background-color: #70B7DD;
  }
  .chatbox .collapse_color.color-red {
    background-color: #DD7070;
  }
  .chatbox .collapse_color.color-pink {
    background-color: #DD70D9;
  }
  .chatbox .collapse_color.color-orange {
    background-color: #DDA670;
  }
  .chatbox .collapse_color.color-purple {
    background-color: #8970DD;
  }
  .chatbox .collapse_color.color-black {
    background: black;
  }
  .chatbox .collapse_color.color-sitepower {
    background-color: #1f2836;
  }

  .chatbox .collapse_gradient.color-white {
    background: -moz-linear-gradient(45deg, #e8e8e8 0%, #ffffff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #e8e8e8 0%,#ffffff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #e8e8e8 0%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e8e8e8', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
    border: 1px solid #E0E0E0;
  }
  .chatbox .collapse_gradient.color-green {
    background: -moz-linear-gradient(45deg, #a1dd70 0%, #9bed57 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #a1dd70 0%,#9bed57 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #a1dd70 0%,#9bed57 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a1dd70', endColorstr='#9bed57',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .chatbox .collapse_gradient.color-blue {
    background: -moz-linear-gradient(45deg, #70b7dd 0%, #76d0ff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #70b7dd 0%,#76d0ff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #70b7dd 0%,#76d0ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70b7dd', endColorstr='#76d0ff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .chatbox .collapse_gradient.color-red {
    background: -moz-linear-gradient(45deg, #de4343 0%, #dd7070 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #de4343 0%,#dd7070 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #de4343 0%,#dd7070 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#de4343', endColorstr='#dd7070',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .chatbox .collapse_gradient.color-pink {
    background: -moz-linear-gradient(45deg, #dd70d9 0%, #ff84fb 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #dd70d9 0%,#ff84fb 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #dd70d9 0%,#ff84fb 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dd70d9', endColorstr='#ff84fb',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .chatbox .collapse_gradient.color-purple {
    background: -moz-linear-gradient(45deg, #8970dd 0%, #a386ff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #8970dd 0%,#a386ff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #8970dd 0%,#a386ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8970dd', endColorstr='#a386ff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

  .chatbox .collapse_gradient.color-orange {
    background: -moz-linear-gradient(45deg, #dda670 0%, #ffae60 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #dda670 0%,#ffae60 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #dda670 0%,#ffae60 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dda670', endColorstr='#ffae60',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .chatbox .collapse_gradient.color-black {
    background: -moz-linear-gradient(45deg, #000000 0%, #464646 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #000000 0%,#464646 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #000000 0%,#464646 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#464646',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

  .chatbox .collapse_gradient.color-sitepower {
    background: -moz-linear-gradient(45deg, #2F324C 0%, #424869 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #2F324C 0%, #424869 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #2F324C 0%, #424869 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2F324C', endColorstr='#424869',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

  .chatbox {
    position: fixed;
    bottom: 0;
    right: 30px;
    width: 300px;
    background-color: transparent;
    font-family: 'Montserrat', sans-serif;
    height: 450px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 9999;
  }

  .chatbox--tray {
    height: 40px;
    -webkit-transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .chatbox__title,
  .chatbox__body {
    border-bottom: none;
    box-sizing: border-box;
  }

  .chatbox--tray .chatbox__body,
  .chatbox--tray .chatbox__message {
    display: none!important;
  }


  .chatbox__title {
    height: 40px;
    padding-right: 10px;
    /*background: linear-gradient(0.25turn,#2F324C, #424869);
    background-color: #1f2836;*/
    border-top-left-radius: 10px;
    border-top-right-radius: 20px;
    cursor: pointer;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }

  .chatbox__title__full {
    height: 50px;
    padding-right: 10px;
    /*background: linear-gradient(0.25turn,#2F324C, #424869);
    background-color: #1f2836;*/
    border-top-left-radius: 10px;
    border-top-right-radius: 20px;
    cursor: pointer;
    color:white;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
  .chatbox__title__full h5 {
    margin: 0;
    padding: 0;
    position: relative;
    font-size: 14px;
    font-weight: bold;
    padding-left: 30px;
    display: flex;
    align-items: center;
    -webkit-flex-grow: 1;
    flex-grow: 1;
  }
  .chatbox__title__full h5:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 10px;
    width: 11px;
    height: 18px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMS4xOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDExLjE4IDE4Ij4KICA8ZyBpZD0ibGlnaHRuaW5nIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTYuOTg0IDApIj4KICAgIDxwYXRoIGlkPSJQYXRoXzEiIGRhdGEtbmFtZT0iUGF0aCAxIiBkPSJNMTAxLjE3LDE3LjkwNmw2Ljk0Mi0xMS45NTVhLjM3Ni4zNzYsMCwwLDAtLjM3Ni0uNTYybC00LjYxOC42MjgsMS4xLTUuNzkzYS4xODguMTg4LDAsMCwwLS4zMzUtLjE0OUw5Ny4wNjIsOS4wODdhLjM3Ni4zNzYsMCwwLDAsLjMzOS42bDUuMDkxLS41MzYtMS42NjksOC42MjRBLjE4OC4xODgsMCwwLDAsMTAxLjE3LDE3LjkwNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiIGZpbGw9IiNmZmRjNjAiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzIiIGRhdGEtbmFtZT0iUGF0aCAyIiBkPSJNOTkuMiw4LjQ2NGEuMTU2LjE1NiwwLDAsMS0uMTQ0LS4yMzhsNS4xLTguMTY2YS4xODUuMTg1LDAsMCwwLS4yNjguMDMyTDk3LjA2Miw5LjFhLjM3Ni4zNzYsMCwwLDAsLjMzOS42bDUuMDkyLS41MzYtMS42NjksOC42MjRhLjE4My4xODMsMCwwLDAsLjE0OC4yMThsMi44Ni05LjA1MWEuNjI3LjYyNywwLDAsMC0uNjQ4LS44MTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0wLjAxNikiIGZpbGw9IiNmZmM4NDAiLz4KICA8L2c+Cjwvc3ZnPgo=');
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .chatbox__title__full h5 a {
    color: #fff;
    max-width: 195px;
    display: inline-block;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chatbox__title__full a {
    padding-right: 10px;
  }
  .chatbox__title__full .operator-name {
    padding-left: 10px;
  }
  .chatbox__title:after {
    content: ' ';
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCAxNDEgNTEiPgogIDxnIGlkPSJHcm91cF8xMzMiIGRhdGEtbmFtZT0iR3JvdXAgMTMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTExMyAtNjQ4KSI+CiAgICA8cGF0aCBpZD0iUmVjdGFuZ2xlXzIxMyIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjEzIiBkPSJNMCwwSDEyMWEyMCwyMCwwLDAsMSwyMCwyMFY1MWEwLDAsMCwwLDEsMCwwSDIwQTIwLDIwLDAsMCwxLDAsMzFWMEEwLDAsMCwwLDEsMCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTExMyA2NDgpIiBmaWxsPSIjZmZmIi8+CiAgICA8ZyBpZD0ibG9nbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEzMyA2NjMuNTUxKSI+CiAgICAgIDxnIGlkPSJHcm91cF8xMDkiIGRhdGEtbmFtZT0iR3JvdXAgMTA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS4xMTEgNC4xOSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ0IiBkYXRhLW5hbWU9IlBhdGggNDQiIGQ9Ik04MC44NTMsMjMzLjQ1YTQuNTMxLDQuNTMxLDAsMCwxLTEuMzUzLS41MDdsLjcxOS0xLjY0OWEzLjc0NCwzLjc0NCwwLDAsMCwxLjEuNDY1LDQuMzY1LDQuMzY1LDAsMCwwLDEuMjY5LjE2OSwyLjA4LDIuMDgsMCwwLDAsLjg0Ni0uMTI3LjQuNCwwLDAsMCwuMjU0LS4zMzhjMC0uMTI3LS4wODUtLjI1NC0uMy0uMzM4YTMuNjcyLDMuNjcyLDAsMCwwLS45My0uMTY5cS0uODI1LS4xMjctMS40LS4yNTRhMi4wODQsMi4wODQsMCwwLDEtMS4wMTUtLjU5MiwxLjY2OCwxLjY2OCwwLDAsMS0uNDIzLTEuMjI2LDEuOTc4LDEuOTc4LDAsMCwxLC4zODEtMS4xODQsMi42MzUsMi42MzUsMCwwLDEsMS4xNDItLjgsNC42ODQsNC42ODQsMCwwLDEsMS44MTgtLjMsNS44OTIsNS44OTIsMCwwLDEsMS40OC4xNjksNC4xNTIsNC4xNTIsMCwwLDEsMS4yMjYuNDIzbC0uNzE5LDEuNjQ5YTMuOTcyLDMuOTcyLDAsMCwwLTEuOTg3LS41MDcsMi4wOCwyLjA4LDAsMCwwLS44NDYuMTI3LjQuNCwwLDAsMC0uMjU0LjMzOGMwLC4xNjkuMDg1LjI1NC4zLjMzOGE1LjkyNCw1LjkyNCwwLDAsMCwuOTczLjIxMSw3Ljg4Nyw3Ljg4NywwLDAsMSwxLjQuMywyLjYyNCwyLjYyNCwwLDAsMSwuOTczLjU5MiwxLjk0NywxLjk0NywwLDAsMSwuMDQyLDIuMzY4LDIuNjM1LDIuNjM1LDAsMCwxLTEuMTQyLjgsNC45MTEsNC45MTEsMCwwLDEtMS44NjEuM0ExMS42NzUsMTEuNjc1LDAsMCwxLDgwLjg1MywyMzMuNDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzkuNSAtMjIzLjMwMikiIGZpbGw9IiMzNzNiNTgiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF80NSIgZGF0YS1uYW1lPSJQYXRoIDQ1IiBkPSJNOTcuMDIzLDIyMS4wNDFhMS4yODEsMS4yODEsMCwwLDEtLjQyMy0uOTMsMS4xNDEsMS4xNDEsMCwwLDEsLjQyMy0uOTMsMS40NzQsMS40NzQsMCwwLDEsMS4wNTctLjM4MSwxLjY2NSwxLjY2NSwwLDAsMSwxLjA1Ny4zMzgsMS4xOSwxLjE5LDAsMCwxLC40MjMuODg4LDEuMTQxLDEuMTQxLDAsMCwxLS40MjMuOTMsMS40NzQsMS40NzQsMCwwLDEtMS4wNTcuMzgxQTEuNDM1LDEuNDM1LDAsMCwxLDk3LjAyMywyMjEuMDQxWm0tLjE2OSwxLjFoMi40MXY2Ljg5M2gtMi40MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OS4zNjkgLTIxOC44KSIgZmlsbD0iIzM3M2I1OCIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ2IiBkYXRhLW5hbWU9IlBhdGggNDYiIGQ9Ik0xMTAuMywyMzEuMWEzLjE3NCwzLjE3NCwwLDAsMS0uNzYxLjMsMy4zMTgsMy4zMTgsMCwwLDEtLjkzLjA4NSwyLjg0OSwyLjg0OSwwLDAsMS0yLjA3Mi0uNjc3LDIuNTg5LDIuNTg5LDAsMCwxLS43MTktMS45ODd2LTIuMzI2SDEwNC44di0xLjgxOGgxLjAxNVYyMjIuOWgyLjQxdjEuNzc2aDEuNTY1djEuODE4aC0xLjUyMnYyLjI4M2EuOTE3LjkxNywwLDAsMCwuMjExLjU5Mi43LjcsMCwwLDAsLjUwNy4yMTEsMS4zMSwxLjMxLDAsMCwwLC43MTktLjIxMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05NC4xMDIgLTIyMS4xNjYpIiBmaWxsPSIjMzczYjU4Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDciIGRhdGEtbmFtZT0iUGF0aCA0NyIgZD0iTTEyNiwyMzAuNTI5aC00Ljk5YTEuMjc4LDEuMjc4LDAsMCwwLC41OTIuOCwxLjg2MywxLjg2MywwLDAsMCwxLjEuMywyLjM3NSwyLjM3NSwwLDAsMCwuODQ2LS4xMjcsMi4zMDYsMi4zMDYsMCwwLDAsLjcxOS0uNDY1bDEuMjY5LDEuMzExYTMuNjc2LDMuNjc2LDAsMCwxLTIuOTE4LDEuMSw0LjcyMiw0LjcyMiwwLDAsMS0yLjExNC0uNDY1LDMuMTM2LDMuMTM2LDAsMCwxLTEuNC0xLjI2OSwzLjQxLDMuNDEsMCwwLDEtLjUwNy0xLjg2MSwzLjM2NywzLjM2NywwLDAsMSwuNTA3LTEuODE4LDMuMjY1LDMuMjY1LDAsMCwxLDEuMzUzLTEuMjY5LDQuMjU5LDQuMjU5LDAsMCwxLDEuOTQ1LS40NjUsMy44ODksMy44ODksMCwwLDEsMS44NjEuNDIzLDMuMDYyLDMuMDYyLDAsMCwxLDEuMzExLDEuMjI2LDMuNTU2LDMuNTU2LDAsMCwxLC41MDcsMS45QTEuNzg5LDEuNzg5LDAsMCwwLDEyNiwyMzAuNTI5Wm0tNC41NjctMi4xMTRhMS4zMDYsMS4zMDYsMCwwLDAtLjQ2NS44NDZIMTIzLjhhMS4zODksMS4zODksMCwwLDAtMS40LTEuMTg0QTEuNDI3LDEuNDI3LDAsMCwwLDEyMS40MzMsMjI4LjQxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDIuMDY2IC0yMjMuMTI5KSIgZmlsbD0iIzM3M2I1OCIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ4IiBkYXRhLW5hbWU9IlBhdGggNDgiIGQ9Ik0xNDQuOSwyMjYuODA3YTMuNDA5LDMuNDA5LDAsMCwxLDEuMjI2LDEuMjI2LDMuNzkyLDMuNzkyLDAsMCwxLC40NjUsMS44NjEsMy42NzYsMy42NzYsMCwwLDEtLjQ2NSwxLjg2MSwzLjEwOSwzLjEwOSwwLDAsMS0xLjIyNiwxLjIyNiwzLjM1MSwzLjM1MSwwLDAsMS0xLjY5MS40MjMsMi41ODMsMi41ODMsMCwwLDEtMS45LS43MTl2My4wODdIMTM4Ljl2LTkuMzQ1aDIuMjgzdi42NzdhMi41LDIuNSwwLDAsMSwyLjAzLS44QTQuNjI1LDQuNjI1LDAsMCwxLDE0NC45LDIyNi44MDdabS0xLjE4NCw0LjMxM2ExLjc1LDEuNzUsMCwwLDAsLjQyMy0xLjE4NCwxLjU2NywxLjU2NywwLDAsMC0uNDIzLTEuMTg0LDEuMzQyLDEuMzQyLDAsMCwwLTEuMDU3LS40MjMsMS40LDEuNCwwLDAsMC0xLjA1Ny40MjMsMS43NSwxLjc1LDAsMCwwLS40MjMsMS4xODQsMS41NjcsMS41NjcsMCwwLDAsLjQyMywxLjE4NCwxLjUzMywxLjUzMywwLDAsMCwyLjExNCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExMy43ODIgLTIyMy4xMjkpIiBmaWxsPSIjMzczYjU4Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDkiIGRhdGEtbmFtZT0iUGF0aCA0OSIgZD0iTTE2MC41LDIzMy4wODFhMy4zNzUsMy4zNzUsMCwwLDEtMS40LTEuMjY5LDMuNDEsMy40MSwwLDAsMS0uNTA3LTEuODYxLDMuNDA5LDMuNDA5LDAsMCwxLDEuOS0zLjA4Nyw0LjQ3OCw0LjQ3OCwwLDAsMSwzLjk3NSwwLDMuNDA5LDMuNDA5LDAsMCwxLDEuOSwzLjA4NywzLjUxMywzLjUxMywwLDAsMS0uNTA3LDEuODYxLDMuMzc1LDMuMzc1LDAsMCwxLTEuNCwxLjI2OSw0LjQ3OCw0LjQ3OCwwLDAsMS0zLjk3NSwwWm0zLjA0NS0xLjlhMS43ODYsMS43ODYsMCwwLDAsLjQyMy0xLjIyNiwxLjU2NywxLjU2NywwLDAsMC0uNDIzLTEuMTg0LDEuMzQyLDEuMzQyLDAsMCwwLTEuMDU3LS40MjMsMS40LDEuNCwwLDAsMC0xLjA1Ny40MjMsMS43NSwxLjc1LDAsMCwwLS40MjMsMS4xODQsMS42NjgsMS42NjgsMCwwLDAsLjQyMywxLjIyNiwxLjM0MiwxLjM0MiwwLDAsMCwxLjA1Ny40MjNBMS40LDEuNCwwLDAsMCwxNjMuNTQ3LDIzMS4xNzhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI1LjE1MiAtMjIzLjE4NikiIGZpbGw9IiMzNzNiNTgiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF81MCIgZGF0YS1uYW1lPSJQYXRoIDUwIiBkPSJNMTg5LjQyMSwyMjYuN2wtMi40NTMsNi44OTNoLTIuMzI2bC0xLjMxMS0zLjcyMS0xLjM1MywzLjcyMWgtMi4zMjZMMTc3LjIsMjI2LjdoMi4yODNsMS40LDQuMTQ0LDEuNDM4LTQuMTQ0aDIuMDcybDEuNDM4LDQuMTg2LDEuNDM4LTQuMTg2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNS44ODcgLTIyMy4zNTkpIiBmaWxsPSIjMzczYjU4Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTEiIGRhdGEtbmFtZT0iUGF0aCA1MSIgZD0iTTIxMy45LDIzMC41MjloLTQuOTlhMS4yNzgsMS4yNzgsMCwwLDAsLjU5Mi44LDEuODYzLDEuODYzLDAsMCwwLDEuMS4zLDIuMzc1LDIuMzc1LDAsMCwwLC44NDYtLjEyNywyLjMwNiwyLjMwNiwwLDAsMCwuNzE5LS40NjVsMS4yNjksMS4zMTFhMy42NzYsMy42NzYsMCwwLDEtMi45MTgsMS4xLDQuNzIyLDQuNzIyLDAsMCwxLTIuMTE0LS40NjUsMy4xMzYsMy4xMzYsMCwwLDEtMS40LTEuMjY5LDMuNDEsMy40MSwwLDAsMS0uNTA3LTEuODYxLDMuMzY3LDMuMzY3LDAsMCwxLC41MDctMS44MTgsMy4yNjUsMy4yNjUsMCwwLDEsMS4zNTMtMS4yNjksNC4yNTksNC4yNTksMCwwLDEsMS45NDUtLjQ2NSwzLjg4OSwzLjg4OSwwLDAsMSwxLjg2MS40MjMsMy4wNjIsMy4wNjIsMCwwLDEsMS4zMTEsMS4yMjYsMy41NTYsMy41NTYsMCwwLDEsLjUwNywxLjlDMjEzLjksMjI5LjkzNywyMTMuOSwyMzAuMTQ4LDIxMy45LDIzMC41MjlabS00LjU2Ny0yLjExNGExLjMwNiwxLjMwNiwwLDAsMC0uNDY1Ljg0NkgyMTEuN2ExLjM4OSwxLjM4OSwwLDAsMC0xLjQtMS4xODRBMS41MDgsMS41MDgsMCwwLDAsMjA5LjMzMywyMjguNDE0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi43OTcgLTIyMy4xMjkpIiBmaWxsPSIjMzczYjU4Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTIiIGRhdGEtbmFtZT0iUGF0aCA1MiIgZD0iTTIyOS45NTYsMjI2LjY1NGEzLjM1OCwzLjM1OCwwLDAsMSwxLjM1My0uMjU0djIuMTU3YTIuOCwyLjgsMCwwLDAtLjU1LS4wNDIsMS42NjgsMS42NjgsMCwwLDAtMS4yMjYuNDIzLDEuNzA4LDEuNzA4LDAsMCwwLS40MjMsMS4yNjl2My4xNzFIMjI2Ljd2LTYuODkzaDIuMjgzdi44NDZBMy4zMiwzLjMyLDAsMCwxLDIyOS45NTYsMjI2LjY1NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjQuNDU2IC0yMjMuMTg2KSIgZmlsbD0iIzM3M2I1OCIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzUzIiBkYXRhLW5hbWU9IlBhdGggNTMiIGQ9Ik0yMzkuMDIzLDIzOS4wMWExLjQyOSwxLjQyOSwwLDAsMSwwLTIuMDMsMS40NCwxLjQ0LDAsMCwxLDEuMDE1LS4zODEsMS41NDYsMS41NDYsMCwwLDEsMS4wNTcuMzgxLDEuNCwxLjQsMCwwLDEsLjQyMywxLjAxNSwxLjI1NCwxLjI1NCwwLDAsMS0uNDIzLDEuMDE1LDEuNTYsMS41NiwwLDAsMS0xLjAxNS40MjNBMS40LDEuNCwwLDAsMSwyMzkuMDIzLDIzOS4wMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzEuMzI0IC0yMjkuMDczKSIgZmlsbD0iIzM3M2I1OCIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzU0IiBkYXRhLW5hbWU9IlBhdGggNTQiIGQ9Ik0yNDcuOTIzLDIyMS4wNDFhMS4yODEsMS4yODEsMCwwLDEtLjQyMy0uOTMsMS4xNDIsMS4xNDIsMCwwLDEsLjQyMy0uOTMsMS40NzQsMS40NzQsMCwwLDEsMS4wNTctLjM4MSwxLjY2NSwxLjY2NSwwLDAsMSwxLjA1Ny4zMzgsMS4xOSwxLjE5LDAsMCwxLC40MjMuODg4LDEuMTQxLDEuMTQxLDAsMCwxLS40MjMuOTMsMS40NzQsMS40NzQsMCwwLDEtMS4wNTcuMzgxQTEuMjc0LDEuMjc0LDAsMCwxLDI0Ny45MjMsMjIxLjA0MVptLS4xMjcsMS4xaDIuNDF2Ni44OTNIMjQ3LjhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc2LjQ2IC0yMTguOCkiIGZpbGw9IiMzNzNiNTgiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF81NSIgZGF0YS1uYW1lPSJQYXRoIDU1IiBkPSJNMjU4LjQsMjMzLjA4MWEzLjM3NSwzLjM3NSwwLDAsMS0xLjQtMS4yNjksMy40MSwzLjQxLDAsMCwxLS41MDctMS44NjEsMy40MDgsMy40MDgsMCwwLDEsMS45LTMuMDg3LDQuNDc4LDQuNDc4LDAsMCwxLDMuOTc1LDAsMy40MDksMy40MDksMCwwLDEsMS45LDMuMDg3LDMuNTEzLDMuNTEzLDAsMCwxLS41MDcsMS44NjEsMy4zNzUsMy4zNzUsMCwwLDEtMS40LDEuMjY5LDQuNDc4LDQuNDc4LDAsMCwxLTMuOTc1LDBabTMuMDQ1LTEuOWExLjc4NiwxLjc4NiwwLDAsMCwuNDIzLTEuMjI2LDEuNTY3LDEuNTY3LDAsMCwwLS40MjMtMS4xODQsMS4zNDIsMS4zNDIsMCwwLDAtMS4wNTctLjQyMywxLjQsMS40LDAsMCwwLTEuMDU3LjQyMywxLjc1LDEuNzUsMCwwLDAtLjQyMywxLjE4NCwxLjY2OCwxLjY2OCwwLDAsMCwuNDIzLDEuMjI2LDEuMzQyLDEuMzQyLDAsMCwwLDEuMDU3LjQyM0ExLjQsMS40LDAsMCwwLDI2MS40NDcsMjMxLjE3OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODEuNjU0IC0yMjMuMTg2KSIgZmlsbD0iIzM3M2I1OCIvPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJsaWdodG5pbmciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIj4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8xIiBkPSJNMTAxLjY1MSwyMC4xN2w3LjgyMy0xMy40ODlhLjQyOC40MjgsMCwwLDAtLjE2OS0uNTkyLjI4LjI4LDAsMCwwLS4yNTQtLjA0MmwtNS4yLjcxOUwxMDUuMDc2LjI1NGMuMDQyLS4xMjctLjA0Mi0uMjExLS4xNjktLjI1NC0uMDg1LDAtLjE2OSwwLS4yMTEuMDg1TDk3LDEwLjIzM2EuNDU1LjQ1NSwwLDAsMCwuMDg1LjU5Mi40LjQsMCwwLDAsLjMuMDg1bDUuNzUxLS41OTItMS45LDkuNzI2Yy0uMDQyLjEyNy4wNDIuMjExLjE2OS4yNTRBLjI1Ni4yNTYsMCwwLDAsMTAxLjY1MSwyMC4xN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05Ni45MjYgMC4wNDYpIiBmaWxsPSIjZmZkYzYwIi8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMiIgZD0iTTk5LjU2Nyw5LjQ1MWEuMTgyLjE4MiwwLDAsMS0uMTY5LS4xNjkuMTU1LjE1NSwwLDAsMSwuMDQyLS4xMjdsNS43NTEtOS4yMThhLjIwOS4yMDksMCwwLDAtLjMuMDQyaDBMOTcuMiwxMC4xMjhhLjQ1NS40NTUsMCwwLDAsLjA4NS41OTIuNC40LDAsMCwwLC4zLjA4NWw1Ljc1MS0uNTkyLTEuOSw5LjcyNmMtLjA0Mi4xMjcuMDQyLjIxMS4xNjkuMjU0aDBMMTA0LjgxMSwxMGEuNy43LDAsMCwwLS40NjUtLjg4OC41MzYuNTM2LDAsMCwwLS4yNTQtLjA0MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05Ny4wNDEgMC4xMDkpIiBmaWxsPSIjZmZjODQwIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    position: absolute;
    right: 3px;
    top: 3px;
    display: block;
    width: 110px;
    height: 40px;
  }

  .chatbox__title h5 {
    margin: 0;
    padding: 0;
    position: relative;
    font-size: 14px;
    font-weight: bold;
    padding-left: 15px;

    -webkit-flex-grow: 1;
    flex-grow: 1;
  }

  .chatbox__title h5 a {
    color: #fff;
    max-width: 195px;
    display: inline-block;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chatbox__title__tray,
  .chatbox__title__close {
    width: 24px;
    height: 24px;
    outline: 0;
    border: none;
    background-color: transparent;
    opacity: 0.5;
    cursor: pointer;

    -webkit-transition: opacity 200ms;
    transition: opacity 200ms;
  }

  .chatbox__title__tray:hover,
  .chatbox__title__close:hover {
    opacity: 1;
  }

  .chatbox__title__tray span {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-bottom: 2px solid #fff
  }

  .chatbox__title__close svg {
    vertical-align: middle;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.2px;
  }

  .chatbox__body,
  .chatbox__credentials {
    padding: 15px;
    border-top: 0;
    background-color: #f5f5f5;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    -webkit-flex-grow: 1;
    flex-grow: 1;
  }

  .chatbox__credentials {
    display: none;
  }

  .chatbox__credentials .form-control {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .chatbox__body {
    overflow-y: auto;
    height: 330px;
  }
  .chatbox__body::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
    background-color: #F5F5F5;
  }
  .chatbox__body::-webkit-scrollbar-thumb {
    background-color: #A0A0A0;
    border-radius: 10px;
  }


  .chatbox__message textarea::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
    background-color: #F5F5F5;
  }
  .chatbox__message textarea::-webkit-scrollbar-thumb {
    background-color: #A0A0A0;
    border-radius: 10px;
  }

  .chatbox__body__message {
    position: relative;
  }

  .chatbox__body__message p {
    padding: 10px;
    border-radius: 3px;
    font-size: 14px;
    background-color: #fff;
    -webkit-box-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    box-shadow: 1px 1px rgba(100, 100, 100, 0.1);
  }
  .chatbox__body__message--file .info-file{
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 3px;
    font-size: 14px;
    background-color: #63D381;
    margin-left: 15px;
    text-align: left;
    -webkit-box-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    box-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    margin-bottom: 1rem;
  }
  .chatbox__body__message--file .info-file__left {
    background-color: white;
    color: #63D381;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chatbox__body__message__right--file .info-file{
    margin-right: 15px;
    margin-left: 0;
    background-color: #91D5FF;
  }
  .chatbox__body__message__right--file .info-left {
    margin-right: 15px;
    margin-left: 0px !important;
    display: flex;
    justify-content: space-between;
  }
  .chatbox__body__message__right--file .info-file .info-file__left{
    color: #91D5FF;
  }
  .chatbox__body__message--file .info-left {
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
  }
  .chatbox__body__message--file .info-right {
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
  }
  .chatbox__body__message--file .info-file__right {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
    color:white;
  }
  .chatbox__body__message--file .info-file__right {
    margin-left: 10px;
  }
  .chatbox__body__message--file .info-file__right p {
    padding: 0;
    margin: 0;
  }
  .chatbox__body__message--file .info-file__right .info-file__name {
    font-size: 14px;
    font-weight: bold;
    max-width: 150px;
  }
  .chatbox__body__message--file .info-file__right .info-file__info {
    font-size: 14px;
  }
  .chatbox__body__message--file .info-file__right .info-file__info a {
    color:white;
    text-decoration: underline;
  }
  .chatbox__body__message--file .info-file__right .info-file__info a:hover {
    color:white;
  }
  .chatbox__body__message img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 2px solid #fcfcfc;
    position: absolute;
    top: 15px;
  }

  .chatbox__body__message--left p {
    margin-left: 15px;
    text-align: left;
    background-color: #63D381;
    color:white;

  }
  .chatbox__body__message--left .info-left {
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
  }
  .chatbox__body__message--right .info-right {
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
  }
  .chatbox__body__message--left img {
    left: -5px;
  }

  .chatbox__body__message--right p {
    margin-right: 15px;
    text-align: left;
    background-color: #91D5FF;
    color:white;
  }

  .chatbox__body__message--right img {
    right: -5px;
  }

  .chatbox__message {
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    border-bottom: none;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    height: 80px;
    background-color: white;

  }
  .chatbox__message .pin, .chatbox__message .send  {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .chatbox__message .pin label:hover {
    cursor: pointer;
  }

  .chatbox__message .smile {
    color:#A0A0A0;
    font-size: 16px;
    cursor: pointer;
  }
  .chatbox__message textarea {
    padding-top: 30px;
    padding-left: 10px;
    outline: 0;
    resize: none;
    border: none;
    font-size: 14px;
    background-color: #fefefe;
    width: 90%;
  }

  .chatbox--empty {
    height: 290px;
  }

  .chatbox--empty.chatbox--tray {
    bottom: -240px;
  }

  .chatbox--empty.chatbox--closed {
    bottom: -262px;
  }

  .chatbox--empty .chatbox__body,
  .chatbox--empty .chatbox__message {
    display: none;
  }

  .chatbox--empty .chatbox__credentials {
    display: block;
  }
  .hidden {
    display: none!important;
  }

</style>
