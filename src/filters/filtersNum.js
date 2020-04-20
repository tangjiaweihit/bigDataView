export default{
    install:function(Vue){
        Vue.filter("filtersNum",function(value){
            if(value === 1.0 || value === 2.0 || value === 4.0 || value === 5.0){
                return value = value + ".0";
            }else if(value === 0.10){
                return value = value + "0";
            }else{
                return value;
            }
        })
    }
    
}