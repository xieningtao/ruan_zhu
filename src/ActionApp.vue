<template>

    <div>
        <h1 class="code_header">代码转换器</h1>
        <transform-code></transform-code>
    </div>
</template>

<script>
import TransformCode from './views/transformCode'
export default {
    components:{
        'transform-code':TransformCode
    }
}
</script>

<style >

.code_header{
    text-align: center
}
</style>