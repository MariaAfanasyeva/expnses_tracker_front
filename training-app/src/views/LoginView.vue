<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input 
                    id="email" 
                    type="text" 
                    class="validate" 
                    v-model.trim="email" 
                    :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"
                >
                <label for="email">Email</label>
                <small 
                    v-if="v$.email.$dirty && v$.email.required.$invalid"
                    class="helper-text invalid">
                        Field email is required
                </small>
                <small 
                    v-else-if="v$.email.$dirty && v$.email.email.$invalid"
                    class="helper-text invalid">
                        Ivalid email address
                </small>
            </div>
            <div class="input-field">
                <input 
                    id="password" 
                    type="password" 
                    class="validate" 
                    v-model.trim="password" 
                    :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}">
                    <label for="password">Пароль</label>
                <small 
                    class="helper-text invalid"
                    v-if="v$.password.$dirty && v$.password.required.$invalid">Enter the password
                </small>
                <small 
                    class="helper-text invalid"
                    v-if="v$.password.$dirty && v$.password.minLength.$invalid">
                    Password must be at least {{ v$.password.minLength.$params.min }} elements long
                </small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>
    
            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>

</template>

<script>

    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    import messages from '../utils/message_plugin/messages'

    export default {
        name: "loginPage",
        data: () => ({
            email: "",
            password: "",
        }),
        validations: () =>  ({
            email: { email, required },
            password: { required, minLength: minLength(6) }
        }),
        setup () {
            return { v$: useVuelidate() }
        },
        mounted() {
            if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
        },
        methods: {
            submitHandler() {
                if (this.v$.$invalid) {
                    this.v$.$touch()
                    return
                }
                this.$router.push('/')
            }
        }
    }
</script>