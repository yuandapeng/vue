<template>
    <div class="father">
        <h3>这里是父组件</h3>
        <!--第一次使用：用flex展示数据-->
        <child>
            <template slot-scope="user">
                <div class="tmpl">
                    <span v-for="item in user.data">{{item}}</span>
                </div>
            </template>

        </child>

        <!--第二次使用：用列表展示数据-->
        <child>
            <template slot-scope="user">
                <ul>
                    <li v-for="item in user.data">{{item}}</li>
                </ul>
            </template>

        </child>

        <!--第三次使用：直接显示数据-->
        <child>
            <template slot-scope="user">
                {{user.data}}
            </template>
        </child>

        <!--第四次使用：不使用其提供的数据, 作用域插槽退变成匿名插槽-->
        <child>
            我就是模板
        </child>
    </div>
</template>

<script>
    import child from "../components/child";

    export default {
        name: 'about',
        components: {
            child
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>