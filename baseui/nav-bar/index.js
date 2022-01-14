// base-ui/nav-bar/index.js
import {
    NavBarHeight
} from '../../constants/device-const'
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        NavBarHeight: NavBarHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})