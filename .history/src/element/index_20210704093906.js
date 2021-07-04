import {
    Input,
    InputNumber,
    Dialog,
    Row,
    Form,
    FormItem,
    Button,
    Progress,
    Pagination,

    Menu,
    MenuItemGroup,
    MenuItem,
    Submenu,
} from 'element-ui'
const element = {
    install: function(Vue) {
  
        Vue.use(Option)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Button)
        Vue.use(Progress)
        Vue.use(Pagination)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Submenu)


    }
}

export default element

