import { getDatabase, ref, push } from 'firebase/database'

export default {
    actions: {
        async createCategory({dispatch, commmit}, {title, limit}) {
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
                commmit('setError', e);
                throw e
            }
        }
    }
}