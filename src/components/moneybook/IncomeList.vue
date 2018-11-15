<template>
  <b-container fluid>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="검색" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="검색할 내용을 입력해주세요." />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="정렬" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- 선택 --</option>
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">오름차순</option>
              <option :value="true">내림차순</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="페이지당 노출" class="mb-0">
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
        <b-button :variant="'outline-primary'" size="sm" @click.stop="showUpdateModal(row.item, row.index, $event.target)" class="mr-1">
          수정
        </b-button>
        <b-button :variant="'outline-success'" size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? '닫기' : '상세' }}
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
      <b-col offset-md="5" md="3" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col offset-md="3" md="1" class="my-1">
        <b-btn :variant="'outline-primary'" v-b-modal.incomeModal>추가</b-btn>
      </b-col>
    </b-row>

    <income-form id="incomeModal"
                 :title="modal.title"
                 :category-options="categoryOptions"
                 :asset-type-options="assetTypeOptions"
                 @hidden="resetModal">
    </income-form>

  </b-container>
</template>


<script>
import IncomeForm from './IncomeForm.vue'

export default {
    components: {
      IncomeForm
    },
    props: ['initialIncomes', 'categoryOptions', 'assetTypeOptions'],
    data() {
      return {
        modal: {
          title: '',
          income: {}
        },
        fields: [
          {
            key: 'datetime',
            label: '일시',
            sortable: true
          },
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
              key: 'actions',
              label: '기능',
              sortable: false,
          }
        ],
        incomes: [],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        pageOptions: [ 20, 50, 100 ],
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    created: function() {
      this.incomes = [
        { money: 10000, description: '피자', category: '식비', assetType: 'CASH', datetime: '2018. 11. 07. 21:30' },
        { money: 11000, description: '치킨', category: '의료', assetType: 'CASH', datetime: '2018. 11. 07. 22:30' },
        { money: 12000, description: '햄버거', category: '교통', assetType: 'CASH', datetime: '2018. 11. 07. 23:30' },
        { money: 13000, description: '라면', category: '교통', assetType: 'CASH', datetime: '2018. 11. 07. 20:30' }
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
        this.$root.$emit('bv::show::modal', 'incomeModal', button)
      },
      resetModal () {
        this.modal.title = '입력하기'
        this.modal.content = {}
      },
      onFiltered (filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length
          this.currentPage = 1
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