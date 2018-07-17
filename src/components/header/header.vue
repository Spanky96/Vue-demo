<template>
    <div class="hearder">
        <span>我是{{name}}</span>
        <span class="icon-add_circle" @click="sayHello"></span>
        <input type="checkbox" name="sex" :checked="sex=='男'">男
        <input type="checkbox" name="sex" :checked="sex=='女'">女
        <input type="text" v-model="yym">
        {{yym}}
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data () {
            var yym = '仰一鸣';
            return {
                yym: yym,
                name: '仰一鸣',
                sex: '女',
                sayHello: function () {
                    alert(yym);
                }
            };
        }
    };
</script>

<style>

</style>
