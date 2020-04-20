<script>
import Index from "@/components/vision/Index.vue";
import Result from "@/components/vision/Result.vue";
export default {
    components:{
        Index,
        Result
    },
    data(){
        return {
            fiveList:[4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0,5.1,5.2,5.3],
            twoList:[0.10,0.12,0.15,0.2,0.25,0.3,0.4,0.5,0.6,0.8,1.0,1.2,1.5,2.0],
            eye:[28.95,23.00,18.27,14.51,11.53,9.16,7.27,5.78,4.59,3.64,2.90,2.30,1.83,1.45],
            isActiuve:false,
            target:0,
            fiveRecord:4.0,
            floatRecord:0.10,
            index:0,
            randomNum:"",
            trueCount:0,
            falseCount:0,
            step:1,
            direction:"",
            testResult:"",
            eyeWidth:"",
            eyeHeight:"",
            isAnimation:false,
            isQuit:false,
            isJump:false,
            toPath:"",
            ppi:128.65
        }
    },
    created(){
        let train = this;
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if(key === 38){
                train.click(1);
            }else if(key === 40){
                train.click(3);
            }else if(key === 37){
                train.click(2);
            }else if(key === 39){
                train.click(0);
            }else if(key === 32){
                train.notClear();
            }
        }
    },
    mounted(){
        this.eyeChartRotate();
    },
    beforeRouteLeave(to,from,next){
        this.isQuit = true;
        this.toPath = to;
        if(this.isJump === true){
            next(true);
        }else if(this.isJump === false){
            next(false);
        }
   
    },
    methods:{
        changeCount(){
            this.trueCount = 0;
            this.falseCount = 0;
        },
        updateTrainStart(){
            this.$store.commit("changeTrainStart",{result:true});
            this.change(0,this.fiveList[0],this.twoList[0]);
            this.changeCount();

        },
        updateTrainResult(){
            this.changeCount();
            this.$store.commit("changeTrainResult",{result:false});

        },
        toResult(){
            this.step = 1;
            this.testResult = "";
            this.changeCount();
            this.$store.commit("changeTrainStart",{result:false});
            this.$store.commit("changeTrainResult",{result:true});

        },
        change(index,five,float){ //改变active类名的挂载
            this.target = index;
            this.index = index;
            this.fiveRecord = five;
            this.floatRecord = float;
            this.eyeChartRotate();
        },
        goStep(status){   //前进或后退
            if(status==='add' && this.index<this.fiveList.length-1){
                this.index ++;
            }else if(status==='minus' && this.index>0){
                this.index --;
            }
            let i = this.index;
            if(this.index<0){
                i=0
            }else if(this.index>this.fiveList.length-1){
                i=this.fiveList.length-1;
            }
            this.change(i,this.fiveList[i],this.twoList[i]);
        },
        eyeChartRotate(){ 
            this.randomNum = Math.floor(Math.random()*4);
            this.eyeWidth = this.eye[this.index]/25.4*this.ppi;
            this.eyeHeight = this.eye[this.index]/25.4*this.ppi;
        },
        clickTest(sum){ //测试起始位置
            let i = this.index;
            if(this.randomNum===sum){
                i++;
                this.eyeChartRotate();
                this.goStep("add");
                if(i === 14){
                    this.step++;
                }
                return true;
            }else{
                this.step++;
                return false;
            }
        },
        detection(sum){ //判断点击是否匹配
            let flag;
            if(this.randomNum===sum){
                flag = true;
            }else{
                flag = false;
            }
            if(flag === true){
                this.trueCount++;
                this.eyeChartRotate();
            }else{
                this.falseCount++;
                this.eyeChartRotate();
            }
        },
        test(sum){ //检测方法
            this.detection(sum);
            if(this.trueCount === 3 && this.falseCount != 3){
                this.trueCount = 0;
                this.falseCount = 0;
                this.testResult = "ok";
                return true;
            }else if(this.falseCount === 3 && this.trueCount != 3){
                this.trueCount = 0;
                this.falseCount = 0;
                this.testResult = "not";
                return false;
            }
        },
        testDirection(sum){ //测试方向
            this.detection(sum);
            if(this.trueCount === 3){
                this.trueCount = 0;
                this.falseCount = 0;
                this.direction = "right";
                this.step++;
                if(this.index<13){
                    this.index++;
                    this.change(this.index,this.fiveList[this.index],this.twoList[this.index])
                }
                return true;
            }else if(this.falseCount === 3){
                this.falseCount = 0;
                this.trueCount = 0;
                this.direction = "left";
                this.step++;
                if(this.index>0){
                    this.index--;
                    this.change(this.index,this.fiveList[this.index],this.twoList[this.index])
                }
                return false;
            }
        },
        lastTest(sum){ //视力测试
            let i = this.index;
            if(this.direction === "left"){
                this.test(sum);
                if(this.testResult === "ok"){
                    this.toResult();
                }else if(this.testResult === "not"){
                    this.testResult = "";
                    this.goStep("minus");
                    i--;
                    this.test(sum);
                    this.trueCount = 0;
                    this.falseCount = 0;
                    if(i === -1){
                        this.toResult();
                    }
                }
            }else if(this.direction === "right"){
                this.test(sum);
                if(this.testResult === "ok"){
                    this.testResult = "";
                    this.goStep("add");
                    i++;
                    this.test(sum);
                    this.trueCount = 0;
                    this.falseCount = 0;
                    if(i === 14){
                        this.toResult();
                    }
                }else if(this.testResult === "not"){
                    this.index--;
                    this.toResult();        
                }
            }
        },
        notClear(){ //看不清按钮 逻辑
            this.isAnimation = !this.isAnimation;
            this.falseCount++;
            this.eyeChartRotate();
            if(this.falseCount === 1 && this.step === 1){
                this.step++;
                this.falseCount = 0;
            }else if(this.falseCount === 3 && this.step === 2){
                this.direction = "left";
                this.step++;
                if(this.index>0){
                    this.index--;
                    this.change(this.index,this.fiveList[this.index],this.twoList[this.index]);
                }
                this.falseCount = 0;
            }else if(this.falseCount === 3 && this.step === 3 && this.direction === "left"){
                    this.testResult = "";
                    this.goStep("minus");
                    this.falseCount = 0;
                    this.trueCount = 0;
                    if(this.index === 0){
                        this.toResult();
                    }
            }else if(this.falseCount === 3 && this.step === 3 && this.direction === "right"){
                this.index--;
                this.toResult();
            }
        },
         click(sum){
             this.isAnimation = !this.isAnimation;
             if(this.step === 1){
                 this.clickTest(sum);
             }else if(this.step === 2){
                this.testDirection(sum);
             }else if(this.step === 3){
                this.lastTest(sum);
             }
         },
         confirmJump(){
            this.isJump = true;
            this.step = 1;
            this.isQuit = false;
            this.$store.commit("changeTrainStart",{result:false});
            this.$store.commit("changeTrainResult",{result:false});
            this.$router.push({path:this.toPath.fullPath})
         }
    }
}
</script>

<template>
    <Dialog v-if="isQuit" title="确定退出视力检测？"  simple @close="isQuit=false" @confirm="confirmJump"/>
    <Index @updateTrainStart="updateTrainStart" 
    v-else-if="this.$store.state.trainResult === false && this.$store.state.trainStart === false"/>
    <Result :result="fiveList[this.index]" @updateTrainResult="updateTrainResult" v-else-if="this.$store.state.trainResult"/>
    <div v-else class="train">
        <div class="content">
            <div class="top">
                <p class="header">检查距离2米</p>
                <div class="topLeft">
                    <p class="title">五分记录</p>
                    <p class="num">{{fiveRecord|filtersNum}}</p>
                </div>
                <div class="topRight">
                    <p class="title">小数记录</p>
                    <p class="num">{{floatRecord|filtersNum}}</p>
                </div>
                <div class="eyeChart" 
                :class="[randomNum===0?'rightRotate'
                        :randomNum===1?'topRotate'
                        :randomNum===2?'leftRotate'
                        :randomNum===3?'underRotate':'',
                        {animationOne:isAnimation},
                        {animationTwo:!isAnimation}
                        ]" 
                        
                        :style="{width:eyeWidth+'px',height:eyeHeight+'px'}">
                    <img src="@/assets/echart.svg" >
                </div>
            </div>
            <div class="middle">
                <div class="proportion">
                    <img src="@/assets/scoal.png">
                </div>

                <ul>
                    <li v-for="(item,index) in fiveList" :key="index"
                    :class="[index===target?'active': '']">
                        <span>{{item|filtersNum}}</span>
                        <span>{{twoList[index]|filtersNum}}</span>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <Btn class="top" @click="click(1)" >上</Btn>
                <Btn class="under" @click="click(3)" >下</Btn>
                <Btn class="not" @click="this.notClear" >看不清</Btn>
                <Btn class="left" @click="click(2)" >左</Btn>
                <Btn class="right" @click="click(0)" >右</Btn>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.train {
    position: relative;
    width: 100%;
    .content {
        .top{
            .header{
                margin-top: 40px;
                text-align: center;
                font-size:14px;
                color:rgba(154,155,155,1);
                line-height:19px;
            }
            .topLeft{
                position:absolute;
                left: 40px;
                top: 70px;
            }
            .topRight{
                position: absolute;
                right: 40px;
                top: 70px;
            }
            .title{
                width:56px;
                height:19px;
                font-size:14px;
                color:rgba(154,155,155,1);
                line-height:19px;
            }
            .num{
                width:31px;
                height:26px;
                font-size:20px;
                font-weight:bold;
                color:#03AEF0;
                line-height:26px;
            }
            .eyeChart{
                position: absolute;
                top: 500%;
                left: 50%;
                transform: translate(-50%,0);
                img{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            // @keyframes appearOne {
            //     0%{opacity: 0;}
            //     100%{opacity: 1;}
            // }
            // @keyframes appearTwo {
            //     0%{opacity: 0.2;}
            //     100%{opacity: 1;}
            // }
            .animationOne{
                animation: appearOne 2.5s 1;
            }
            .animationTwo{
                animation: appearTwo 2.5s 1;
            }
            .underRotate{
                transform: translate(-50%,0) rotate(90deg);
            }
            .topRotate{
                transform: translate(-50%,0) rotate(-90deg);
            }
            .rightRotate{
                transform: translate(-50%,0) rotate(0deg);
            }
            .leftRotate{
                transform: translate(-50%,0) rotate(180deg);
            }
        }

        .middle{
            position: absolute;
            top: 326px;
            width: 100%;
            img{
                width: 100%;
            }
            ul{
                clear: both;
                margin-top: 13px;
                height:52px;
                background:rgba(242,243,246,1);
                color:rgba(154,155,155,1);
                :first-child{
                    width: 6.471%;
                    span{
                        width: 100%;
                        display: block;
                    }
                }
                >li:not(:first-child){
                    width: 7.19%;
                    span{
                        width: 100%;
                        display: block;
                    }
                }
                li{
                    cursor: pointer;
                    height: 52px;
                    text-align: center;
                    list-style: none;
                    float: left;
                    font-size:14px;
                    line-height:19px;
                    :first-child{
                        margin-top: 7px;
                    }
                    span{
                        margin: 0 auto;

                    }
                }
            }
        }
        .bottom{
            position: absolute;
            top: 474px;
            left: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            .top{
                position: absolute;
                top: 53px;
            }
            .under{
                position: absolute;
                top:153px;
            }
            .left{
                position: absolute;
                top:103px;
                right: 60px;
            }
            .right{
                position: absolute;
                top:103px;
                left: 60px;
            }
            .not{
                position: absolute;
                top:103px;
                background:rgba(188,189,189,1);
            }
        }
    }
    .Btn {
        border-radius:3px;
        width: 100px;
        height: 38px;
        margin-top: 13px;
        border-radius:3px;
    }
    .active{
        background:#03AEF0;
        color:rgba(255,255,255,1);
    }
}
</style>