<template>

    <div>
        原数据：
        <el-input v-model="value1" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="jiami" plain>加密</el-button>
        <el-button type="primary" @click="jiemi" plain>解密</el-button>

        加密数据：
        <el-input v-model="value2" placeholder="请输入内容"></el-input>

    </div>
</template>

<script>
    import {Decrypt, Encrypt} from "../../utils/AESUtils";

    export default {
        name: "Test",
        data() {
            return {
                value1: "",
                value2: ""
            }
        },
        methods: {
            jiami() {
                console.log("加密-----", this.value1);
                let dd = Encrypt(this.value1)
                console.log(dd)
                this.value2 = dd
            },
            jiemi() {
                console.log("解密-----", this.value2);
                this.value1 = Decrypt(this.value2)
            },
        }
    }
</script>

<style scoped>

</style>