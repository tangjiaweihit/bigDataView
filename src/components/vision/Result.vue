<script>
import axios from "axios";
import cookie from 'js-cookie';
import moment from 'moment';
export default {
    props:{
        result:Number
    },
    data(){
        return {
          options: [
        {
          value: '选项1',
          label: '左眼'
        }, 
        {
          value: '选项2',
          label: '右眼'
        }
        ],
        value: '',
        isTure:true,
        arrs:{
            time:'',
            "report_test":{
                    "vision_test_2m":{
                        "time":this.time,
                        "result":{},
                        "instrument":"Web"
                    }
                },
                "report_type":"视力",
                "report_format_code":"normal_1"
            }
        }
    },
    methods:{
        again(){
            this.$emit("updateTrainResult");
        },
        fileot(){
            this.clearTimer = setTimeout(()=>{
                this.again()
            },750)
            this.$message({
                message: '上传成功',
                type: 'success',
                duration:'500'
            });
            var now = moment().toDate();
            now = moment().format('YYYY-MM-DD HH:MM:SS.SSSZ');
            this.arrs.time = now
            let params ={
                patientId:`${localStorage.getItem('id')}`,
                content:this.arrs
            }
            axios.post('/report',params,{headers: this.authHeader()}).then(res=>{
            })
        },
        authHeader() {
        return {
            'x-auth-token': localStorage.getItem('token')
        }
        },
        isChange(value){
            let bot = document.getElementById("bot");
            bot.style.background="#3CA8F5";
            bot.style.border="1px solid #3CA8F5";
            this.isTure = false
            let obj ={};
            obj = this.options.find((item)=>{
            return item.value === value;
            });
            if(obj.label==="左眼"){
                this.arrs["report_test"]["vision_test_2m"]["result"]={}
                this.arrs["report_test"]["vision_test_2m"]["result"]["left_vision"]= this.result.toFixed(1)
            }else if(obj.label==="右眼"){
                this.arrs["report_test"]["vision_test_2m"]["result"]={}
                this.arrs["report_test"]["vision_test_2m"]["result"]["right_vision"]= this.result.toFixed(1)
            }
        }
    }
}
</script>

<template>
    <div class="start">
        <div class="content">
            <h1>您的视力为{{result|filtersNum}}</h1>
            <Btn @click="this.again" >重新检测</Btn>
            <el-button :plain="true" style="display:none"></el-button>
            <el-button type="info" class="botton" id="bot" @click="fileot()" :disabled="isTure">上传结果</el-button>
            <el-select v-model="value" placeholder="请选择" @change="isChange" style="width:100px;margin:5px 0 0 129px;user-select:none">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>      
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/css/color.scss';
.start {

    .content {
        position: absolute;
        top: 60%;
        left: 50%;
        width: 250px;
        text-align: center;
        transform: translate(0%, -150%);
        h1{
            height:40px;
            font-size:30px;
            color:#03AEF0;
            line-height:40px;
            margin-bottom: 19px;
            margin-left: auto;
            margin-right: auto;
            user-select:none;
        }
        .mnum{
            width:250px;
            height:19px;
            font-size:14px;
            color:rgba(140,140,140,1);
            line-height:19px;
            margin-bottom: 31px;
        }
        .num{
            color: #03AEF0;
        }
    }
    .Btn {
        width: 100px;
        height: 38px;
        margin-top: 13px;
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        border-radius:3px;
        float:left;
        user-select:none;
    }
    .botton{
        float:left;
        margin-left:40px;
        margin-top:12px;
        background:#ccc;
    }
}
</style>