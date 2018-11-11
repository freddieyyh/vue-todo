<template>
  <section>
      <transition-group name="list" tag="ul">
          <li v-for="bankbook in bankbooks" :key="bankbook.id">
              {{ bankbook.name }}
              <b-button :size="'sm'" :variant="'primary'" @click="openBankbookForm(bankbook)">Update</b-button>
              <b-button :size="'sm'" :variant="'danger'" @click="removeBankbook(bankbook.id)">Remove</b-button>
          </li>
      </transition-group>
  </section>
</template>

<script>
export default {
    props: ['bankbooks'],
    methods: {
        removeBankbook(bankbookId) {
          // eslint-disable-next-line
          console.log(bankbookId);
          this.$emit('click:removeButton', bankbookId);
        },
        openBankbookForm(bankbook) {
          this.$emit('click:updateButton', bankbook);
        }
    }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>