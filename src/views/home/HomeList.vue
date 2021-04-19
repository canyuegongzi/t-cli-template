<template lang="pug">
  div
      p 这是首页列表
      HelloWorldComponent(:title="parentTitle" :propA="1" @valueChange="childValueChange")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HelloWorldComponent from "../../components/mini/HelloWorldComponent";
import Store, { appModule } from '../../store';
@Component({
    name: 'HomeList',
    components: {
        'HelloWorldComponent': HelloWorldComponent
    }
})
export default class HomeList extends Vue {
    protected parentTitle: string = '这是父组件传递的title';

    private childValueChange(value: number) {
        console.log('父组件接受到子组件的值', value);
    }
    computed: {
        rootState: () => appModule.vuexStatus,
    }
    created() {
        console.log('组件初化');
        console.log(appModule);
    }
}
</script>

<style scoped>

</style>
