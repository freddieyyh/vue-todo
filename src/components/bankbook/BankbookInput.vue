<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="bankbookNameGroup"
                    label="통장명: "
                    label-for="bankbookName"
                    description="통장명은 사용자 편의성을 위해 겹치지 않게 입력하세요."
                    horizontal>
        <b-form-input id="bankbookName"
                      type="text"
                      v-model="bankbook.name"
                      required
                      placeholder="통장명을 입력하세요">
        </b-form-input>
      </b-form-group>
      <b-form-group id="bankbookBalanceGroup"
                    label="잔액: "
                    label-for="bankbookBalance"
                    horizontal>
        <b-form-input id="bankbookBalance"
                      type="number"
                      v-model="bankbook.balance.value"
                      required
                      placeholder="Enter bankbook balance">
        </b-form-input>
      </b-form-group>
      <b-form-group id="institutionGroup"
                    label="은행: "
                    label-for="institution"
                    horizontal>
        <b-form-select id="institution" v-model="bankbook.institution.id" :options="institutions" :value-field="'id'" :text-field="'name'" required class="mb-3">
          <option slot="first" :value="null">은행선택</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="assetTypeGroup"
                    label="통장타입: "
                    label-for="assetType"
                    horizontal>
        <b-form-select id="assetType" v-model="bankbook.assetType" :options="assetTypes" class="mb-3" required>
          <option slot="first" :value="null">통장타입선택</option>
        </b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
const defaultBankbook = () => {
  return {
    id: 0,
    name: '',
    balance: {
      value: 0
    },
    institution: {
      id: 0
    },
    assetType: null
  }
};

export default {
  props: ['initialBankbook', 'institutions', 'assetTypes'],
  data() {
    return {
      bankbook: this.initialBankbook || defaultBankbook()
    }
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line
      console.dir(this.bankbook);
      this.$emit('onSubmit', this.bankbook);
    },
    onReset() {
      this.bankbook = defaultBankbook();
    }
  },
  watch: {
    initialBankbook(value) {
      this.bankbook = value;
    }
  }
}
</script>

<style scoped>
  
</style>