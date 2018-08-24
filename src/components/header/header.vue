<template>
    <div class="hearder">
        <span :class="{red: name=='仰一鸣'}">我是{{name}}</span>
        <span class="icon-add_circle" @click="sayHello">123</span>
        <input type="checkbox" name="sex" :checked="sex=='男'">男
        <input type="checkbox" name="sex" :checked="sex=='女'">女
        <input type="text" v-model="yym">
        {{contact}}
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
                contactType: 'QQ',
                contactNumber: '819062398'
            };
        },
        mounted () {
            this.$http.get('api/general_0/_ext/mytest/wos/food/test.jsp?id=1pk9suo6qdf2w')
                .then(function (res) {
                    console.log(res.data);
                });
        },
        methods: {
            sayHello: function () {
                alert(this.yym);
            }
        },
        computed: {
            contact: function () {
                return this.contactType + ': ' + this.contactNumber;
            }
        },
        watch: {
            yym: function (n, o) {
                this.name = 'Vue';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .red{
        color: red;
    }
</style>
