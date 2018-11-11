<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <b-btn v-b-modal.incomeModal>추가</b-btn>
    <income-list></income-list>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import TodoHeader from './components/TodoHeader.vue'
import IncomeList from './components/moneybook/IncomeList.vue'

export default {
  name: 'app',
  components: {
    TodoHeader,
    IncomeList
  },
  data: function() {
    return {
      categoryOptions: [
        { 'id': 1, 'name': '식비' },
        { 'id': 2, 'name': '교통' },
        { 'id': 3, 'name': '의료' }
      ],
      paymentTypeOptions: [
        'CASH', 'CREDITCARD', 'CHECKCARD'
      ]
    }
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>
