import {
    Select,
    Option,
    OptionGroup,
    Input,
    InputNumber,
    Radio,
    Tree,
    Dialog,
    Row,
    Col,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Cascader,
    Switch,
    Slider,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tag,
    Button,
    Progress,
    Pagination,
    Badge,
    Avatar,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    MenuItem,
    Submenu,
    Container,
    Header,
    Aside,
    Main,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Tooltip,
    Icon,
    Tabs,
    TabPane,
    Steps,
    Step,
    Checkbox
} from 'element-ui'
const element = {
    install: function(Vue) {
        Vue.use(Checkbox)
        Vue.use(CheckboxGroup)
        Vue.use(Step)
        Vue.use(Steps)
        Vue.use(TabPane)
        Vue.use(Tabs)
        Vue.use(Card)
        Vue.use(Select)
        Vue.use(Breadcrumb)
        Vue.use(BreadcrumbItem)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Radio)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Checkbox)
        Vue.use(CheckboxButton)
        Vue.use(CheckboxGroup)
        Vue.use(Cascader)
        Vue.use(Switch)
        Vue.use(Slider)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Tag)
        Vue.use(Button)
        Vue.use(Progress)
        Vue.use(Pagination)
        Vue.use(Badge)
        Vue.use(Avatar)
        Vue.use(Alert)
        Vue.use(Loading)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(Submenu)
        Vue.use(Container)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Tooltip)
        Vue.use(Icon)
        Vue.prototype.$message = Message;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$notify = Notification;

    }
}

export default element

