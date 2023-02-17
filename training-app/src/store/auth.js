import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async login({dispatch, commit}, {email, password}) {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({commit}) {
            const auth = getAuth()
            await signOut(auth)
            commit('clearInfo')
        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                const database = getDatabase()
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid')
                const reference = ref(database, `/users/${uid}/info`)
                await set(reference, {
                    bill: 10000,
                    name
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        }
    }
}