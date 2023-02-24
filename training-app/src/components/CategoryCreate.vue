<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Создать
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
    name: 'CategoryCreate',
    data: () => ({
        title: '',
        limit: 1
    }),
    validations: () =>  ({
        title: { required },
        limit: { required, minValue: minValue(1) }
    }),
    mounted() {
        window.M.updateTextFields()
        if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
    },
    setup () {
            return { v$: useVuelidate() }
    },
    methods: {
        async submitHandler() {
            if(this.v$.$invalid) {
                // touch() отвечает за то, что если форма инвалидная, нужно применять все валидации
                this.v$.$touch()
                return
            }
            try {
                const formData = {
                    title: this.title,
                    limit: this.limit
                }
                const category = await this.$store.dispatch('createCategory', formData)
                this.title = ""
                this.limit = this.v$.limit.minValue.$params.min
                this.$message("Category created successfully")
                // emit говорит, что можно слушать событие created, которое находится в файле CategoriesView.vue
                this.$emit('created', category)
                this.v$.value.$reset()
            // eslint-disable-next-line no-empty
            } catch (e) {}
            
        }
    }

}
</script>
