export default {
    install (Vue, options) {
        Vue.config.globalProperties.$message = function(html) {
            window.M.toast({html})
        }
        Vue.config.globalProperties.$error = function(html) {
             window.M.toast({html: `[Error] ${html}`})
        }
        console.log(options)
    }
}