<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id">{{ c.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input id="name" type="text" class="validate"
          v-model.trim="title"
          :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"/>
          <label for="name">Название</label>
          <small 
          v-if="v$.title.$dirty && v$.title.required.$invalid"
          class="helper-text invalid">Category name is required</small>
        </div>

        <div class="input-field">
          <input id="limit" type="number" class="validate"
          v-model.trim="limit"
          :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
          />
          <label for="limit">Лимит</label>
          <small 
          v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
          class="helper-text invalid">Minimal value for this category is {{ v$.limit.minValue.$params.min }}</small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import messages from '../utils/message_plugin/messages'
export default {
    props: {
        categories: {
            type: Array,
            required: true,
        }
    },
    data: () => ({
        select: null,
        title: '',
        limit: 1,
        current: null
    }),
    validations: () =>  ({
        title: { required },
        limit: { required, minValue: minValue(1) }
    }),
    watch: {
        current(catId) {
            const {title, limit} = this.categories.find(c => c.id == catId)
            this.title = title
            this.limit = limit
        }
    },
    async created() {
        // const {id, title, limit} = await this.categories[0]
        // const category = await this.categories[0].title
        // console.log(category)
        // this.current = id
        // this.title = title
        // this.limit = limit
    },
    mounted() {
        this.select = window.M.FormSelect.init(this.$refs.select);
        window.M.updateTextFields()
        if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
    },
    setup () {
            return { v$: useVuelidate() }
    },
    unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
    methods: {
        async submitHandler() {
            if(this.v$.$invalid) {
                // touch() отвечает за то, что если форма инвалидная, нужно применять все валидации
                this.v$.$touch()
                return
            }
            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                await this.$store.dispatch('updateCategory', categoryData)
                this.$message("Category updated successfully")
            // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    }
}
</script>
