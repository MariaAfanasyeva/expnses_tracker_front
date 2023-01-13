import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
        }
    }
}