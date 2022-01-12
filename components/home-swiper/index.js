// components/home-swiper/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex4: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /* 实现控制中间凸显图片的样式 */
        handleChangeTwo: function (e) {
            this.setData({
                currentIndex4: e.detail.current
            })
        },
    }
})