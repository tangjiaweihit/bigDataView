
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        trainStart:""
    },
    methods:{
        startTrain(){
            this.$emit("updateTrainStart")
        }
    }


}

</script>
<template>
    <div class="index">
        <div class="content">
            <p class="first title">操作步骤：</p>
            <p class="type">1. 请将显示屏幕垂直固定在与被检查者2米距离处；</p>
            <p class="type">2. 请保持视线与屏幕水平；</p>
            <p class="type">3. 遮盖一只眼睛，检查另外一只眼睛的视力；</p>
            <p class="type">4. 点击“开始检测”按钮，通过点击“上、下、左、右”方向按钮判断字母E的朝向；</p>
            <p class="type">5. 视力检查结果会显示在测试结果页面上。</p>
            <p class="title">注意事项：</p>
            <p class="type">1. 先检查右眼视力，再检查左眼视力；</p>
            <p class="type">2. 如被检查者当前佩戴眼镜，请戴镜后进行检查。</p>
            <Btn @click="this.startTrain" >开始检测</Btn>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/css/color.scss';
.index {
    .content {
        margin: 25px;
        background:rgba(249,251,255,1);
        border-radius:4px;
        border:1px solid rgba(233,236,243,1);
        padding: 29px 26px 29px 29px;
        color: #8C8C8C;
        p {
            margin-top: 7px;
        }
        .first {
            margin-top: 0px;
        }
        .type {
            padding-left: 20px
        }
        .title {
            color: #00C1DE;
        }
    }
    .Btn {
        width: 100px;
        height: 38px;
        margin-top: 13px;
        border-radius:3px;
    }
}
</style>
