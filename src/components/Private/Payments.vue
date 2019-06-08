<template>
  <div class="payments">
    <div class="row col-md-12">
      <div class="col-md-4"/>
      <div class="text-left col-md-4">
        <h4>Осталось: <span  class="badge" :class="[ amount <= 5 ?  'badge-danger' : 'badge-warning' ]">{{amount}} {{day}}</span></h4>
      </div>
    </div>
    <div class="row col-md-12 text-muted additional-info">
      <div class="col-md-4"/>
      <div class="col-md-4 text-muted additional-info">
        <p class="">Указан остаток дней использования сервиса на всех операторов. <br> Списание дней происходит ежедневно в зависимости от количества операторов в статусе "Активный"</p>
       </div>
    </div>

    <hr>
    <div class="row col-md-12 buy">
      <div class="col-md-4"/>
      <div class="col-md-4">
        <h4>Пополнить</h4>
      </div>
    </div>
    <div class="row col-md-12">
      <div class="col-md-4"/>
      <div class="col-md-4">
        <form style="padding-right: 10px">
          <div class="form-group row">
            <div class="col-md-6">
              <label for="days" class="col-form-label">Укажите количество дней</label>
              <select class="form-control" id="days" required v-model="cntDays">
                <option value="30" selected>30 дней</option>
                <option value="60">60 дней</option>
                <option value="90">90 дней</option>
                <option value="120">120 дней</option>
                <option value="365">365 дней</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="operators" class="col-form-label">Укажите число операторов</label>
              <select class="form-control" id="operators" required v-model="cntOperators">
                <option value="1" selected>1 оператор</option>
                <option value="2">2 оператора</option>
                <option value="3">3 оператора</option>
                <option value="4">4 оператора</option>
                <option value="5">5 операторов</option>
                <option value="6">6 операторов</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" style="padding-top: 25px;float: right;">
              <h5>Итого к оплате: <span class="badge badge-warning">{{paySum}}</span> &#8381;</h5>
            </div>
            <div class="col-md-6">
              <button class="btn btn-yellow mt-20 w-100" @click.prevent="pay" :disabled="!enablePay || status === 'Loading'">
                <span v-if="status !== 'Loading'">Оплатить</span>
                <div v-else class="spinner-border" role="status"></div>
              </button>
              <span v-if="status === 'Error'" class="badge badge-danger">Возникла ошибка при оплате. Повторите позже</span>
            </div>
          </div>

        </form>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'Payments',
    data () {
      return {
        cntOperators: "1",
        cntDays : "365",

      }
    },
    computed: {
      amount() {
        return this.$store.getters.AMOUNT;
      },
      status() {
        return this.$store.getters.PAY_STATUS;
      },
      day() {
        const d = this.amount;
        const rem = d%10;
        return rem === 1 ? 'день' : rem >= 2 && rem <= 4 ? 'дня' : 'дней';
      },
      isMobile: function() {
        return this.$isMobile();
      },
      paySum() {
        return parseInt(this.cntOperators)*parseInt(this.cntDays)*15;
      },
      enablePay() {
        if (!this.paySum || this.paySum < 1) {
          return false;
        }
        return true;
      }

    },
    methods: {
      pay: function() {
        if (!this.paySum || this.paySum < 1) return;
        this.$store.dispatch("PAY", {cnt_operators:this.cntOperators, cnt_days:this.cntDays, amount:this.paySum})
          .then(res => {
          window.location.replace(res.data.url);
        })
          .catch(err => console.log(err.message));
      }
    },
}
</script>

<style scoped>

</style>
