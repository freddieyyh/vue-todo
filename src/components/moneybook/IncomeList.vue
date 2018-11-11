<template>
  <b-container fluid>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="내용" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="검색할 내용을 입력해주세요." />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- 선택 --</option>
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <b-table show-empty
              stacked="md"
              :items="incomes"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              @filtered="onFiltered"
      >
      <template slot="category" slot-scope="row">{{row.value}}</template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="showUpdateModal(row.item, row.index, $event.target)" class="mr-1">
          수정하기
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? '상세' : '닫기' }}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="6" class="my-1">
        <b-btn v-b-modal.incomeModal>추가</b-btn>
      </b-col>
    </b-row>

    <income-form id="incomeModal"
                 :title="'입력'"
                 :category-options="categoryOptions"
                 :payment-type-options="paymentTypeOptions">
    </income-form>

  </b-container>
</template>


<script>
export default {
    props: ['bankbooks'],
    data() {
      return {
        modal: { 
          title: '',
          income: {}
        },
        fields: [
          {
            key: 'money',
            label: '금액',
            sortable: true
          },
          {
            key: 'description',
            label: '내용',
            sortable: false
          },
          {
            key: 'category',
            label: '카테고리',
            sortable: true
          },
          {
            key: 'assetType',
            label: '자산분류',
            sortable: true
          },
          {
            key: 'datetime',
            label: '일시',
            sortable: true,
            variant: 'danger'
          }
        ],
        incomes: [],
        currentPage: 1,
        perPage: 5,
        totalRows: incomes.length,
        pageOptions: [ 20, 50, 100 ],
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    created: function() {
      this.incomes = [
        { money: 10000, description: '피자', category: '식비', datetime: '2018. 11. 07. 21:30' },
        { money: 11000, description: '치킨', category: '의료', datetime: '2018. 11. 07. 22:30' },
        { money: 12000, description: '햄버거', category: '교통', datetime: '2018. 11. 07. 23:30' },
        { money: 13000, description: '라면', category: '교통', datetime: '2018. 11. 07. 20:30' }
      ];

      this.totalRows = this.incomes.length

      // this.$http.get(`/apis/incomes`)
      // .then((result) => {
      //     let {success, body} = apis.getBody(result.data)
      //     if (!success) {
      //         return;
      //     }
      //     this.incomes = body
      // })
    },
    computed: {
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => { return { text: f.label, value: f.key } })
      }
    },
    methods: {
      showUpdateModal(item, index, button) {
        this.modal.title = `수정하기`
        this.modal.content = item
        this.$root.$emit('bv::show::modal', 'updateModal', button)
      },
      resetModal () {
        this.modal.title = ''
        this.modal.content = {}
      },
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