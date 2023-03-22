import { getDatabase, ref, push, onValue } from 'firebase/database'

export default {
    actions: {
        async fetchCategories({dispatch, commit}) {
            try {
                const database = getDatabase()
                const uid = await dispatch('getUid')
                const reference = ref(database, `/users/${uid}/categories`)
                const categories = await onValue(reference, (snapshot) => {
                    const data = snapshot.val()
                    let cats = []
                    return Object.keys(data).forEach(key => {
                        cats.push({
                            title: data[key].title,
                            limit: data[key].limit,
                            id: key
                        })
                    })
                  })
                  return categories
            }catch(e) {
                commit('setError', e);
                throw e
            }
        },
        async createCategory({dispatch, commit}, {title, limit}) {
            try {
                const database = getDatabase()
                const uid = await dispatch('getUid')
                const reference = ref(database, `/users/${uid}/categories`)
                const category = await push(reference, {
                    title,
                    limit
                })
                return {title, limit, id: category.key}

            }catch(e) {
                commit('setError', e);
                throw e
            }
        },
        async updateCategory({dispatch, commit}, {title, limit, id}) {
            try {
                const database = getDatabase()
                const uid = await dispatch('getUid')
                await ref(database, `/users/${uid}/categories`).child(id).update({title, limit})

            }catch(e) {
                commit('setError', e);
                throw e
            }
        },
    }
}