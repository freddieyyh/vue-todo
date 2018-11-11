<template>
  <b-modal :id="id"
            ref="incomeModal"
            :title="title"
            @ok="handleSave">
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group label="금액: "
                    label-for="incomeMoney"
                    horizontal>
        <b-form-input id="incomeMoney"
                      type="number"
                      v-model="income.money"
                      required
                      placeholder="금액을 입력해주세요.">
        </b-form-input>
      </b-form-group>
      <b-form-group label="내용: "
                    label-for="incomeDescription"
                    horizontal>
        <b-form-input id="incomeDescription"
                      type="text"
                      v-model="income.description"
                      required
                      placeholder="내용을 입력하세요">
        </b-form-input>
      </b-form-group>
      <b-form-group label="카테고리: "
                    label-for="incomeCategory"
                    horizontal>
        <b-form-select id="incomeCategory" v-model="income.category.id" :options="categoryOptions" :value-field="'id'" :text-field="'name'" required class="mb-3">
          <option slot="first" :value="null">-- 선택 --</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="자산타입: "
                    label-for="assetType"
                    horizontal>
        <b-form-select id="assetType" v-model="income.assetType" :options="assetTypeOptions" required class="mb-3">
          <option slot="first" :value="null">-- 선택 --</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="날짜: "
                    label-for="incomeDatetime"
                    horizontal>
        <b-form-input id="incomeDatetime" :type="'datetime-local'" v-model="income.datetime" lazy-formatter></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
const defaultIncome = () => {
  return {
    description: '',
    money: 0,
    category: {
      id: null
    },
    assetType: null,
    datetime: ''
  }
};

export default {
  props: ['id', 'title', 'initialIncome', 'categoryOptions', 'assetTypeOptions'],
  data() {
    return {
      income: this.initialIncome || defaultIncome()
    }
  },
  methods: {
    show() {
      this.$refs.incomeModal.show()
    },
    handleSave(evt) {
      evt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      // eslint-disable-next-line
      console.dir(this.income);
      if (!this.income.category.id) {
        alert('방지');
      } else {
        this.$emit('saveIncome', this.income);
        this.$refs.incomeModal.hide()
        this.clearIncome()
      }
    },
    clearIncome() {
      this.income = defaultIncome()
    }
  },
  watch: {
    initialIncome(value) {
      this.income = value;
    }
  }
}
</script>

<style scoped>
  
</style>