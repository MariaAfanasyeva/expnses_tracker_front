import { getDatabase, ref, onValue } from 'firebase/database'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            // eslint-disable-next-line no-useless-catch
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                const reference = ref(db, `/users/${uid}/info`)
                await onValue(reference, (snapshot) => {
                    const data = snapshot.val();
                    commit('setInfo', data)
                  });
                // const info = (await once(reference, 'value')).val()
                // console.log(info)
                // commit('setInfo', info)
            } catch(e) {
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}