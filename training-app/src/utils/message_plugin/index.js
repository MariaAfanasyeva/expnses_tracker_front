export default {
     // eslint-disable-next-line no-unused-vars
    install (Vue, options) {
        Vue.config.globalProperties.$message = function(html) {
            window.M.toast({html})
        }
        Vue.config.globalProperties.$error = function(html) {
             window.M.toast({html: `[Error] ${html}`})
        }
    }
}