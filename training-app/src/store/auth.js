import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async login({dispatch, commit}, {email, password}) {
            // eslint-disable-next-line no-useless-catch
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                throw e
            }
        },
        async logout() {
            const auth = getAuth()
            await signOut(auth)
        },
        async register({dispatch}, {email, password, name}) {
            try {
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = dispatch('getUid')
                // TODO: complete this part of code (lesson 8 timecode: 6.13)
                await 
            } catch (e) {
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        }
    }
}