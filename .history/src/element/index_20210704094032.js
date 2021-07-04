import {
    Input,
    InputNumber,
    Form,
    FormItem,
    Button,
} from 'element-ui'
const element = {
    install: function(Vue) {
  
        Vue.use(Option)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Button)


    }
}

export default element

