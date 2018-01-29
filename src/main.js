import Vue from 'vue'
// import App from './App.vue'
import App from './App.vue'

export function createApp(propsData) {
    return new Vue({
        el: '#app',
        render: h => h(App, {
            props: {
                content: propsData
            }
        })
    });
};
