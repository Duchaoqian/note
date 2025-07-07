import area from "./area.js"

var province=document.getElementById("province");

    // 初始化省份
    // 遍历area 获取键
    for(var pro_value in area){
        // 创建option节点
        var node=document.createElement("option");
        node.innerHTML=pro_value;
        // 插入province
        province.appendChild(node);
    }

    // 初始化市
    for(var city_value in area[province.value][0]){
        // 创建option节点
        var node=document.createElement("option");
        node.innerHTML=city_value;
        // 插入city
        city.appendChild(node);
    }

    // 初始化区
    var place_list=area[province.value][0][city.value]
    for(var i=0;i<place_list.length;i++){
        for(var place_value in place_list[i]){
            var node=document.createElement("option");
            node.innerHTML=place_value;
            place.appendChild(node)
        }
    }

    // 监听省份切换
    province.onchange=function(){

        // 把原来的市 清空
        city.innerHTML="";

        for(var city_value in area[province.value][0]){
            // 创建option节点
            var node=document.createElement("option");
            node.innerHTML=city_value;
            // 插入city
            city.appendChild(node);
        }

        // 清空
        place.innerHTML="";
        // 初始化区
        var place_list=area[province.value][0][city.value]
        for(var i=0;i<place_list.length;i++){
            for(var place_value in place_list[i]){
                var node=document.createElement("option");
                node.innerHTML=place_value;
                place.appendChild(node)
            }
        }
    }


    // 监听市的变化
    city.onchange=function(){

        // 清空
        place.innerHTML="";
        // 初始化区
        var place_list=area[province.value][0][city.value]
        for(var i=0;i<place_list.length;i++){
            for(var place_value in place_list[i]){
                var node=document.createElement("option");
                node.innerHTML=place_value;
                place.appendChild(node)
            }
        }

    }


    toggle.onclick=function(){
        alert("您选择了"+province.value+"-"+city.value+"-"+place.value)
    }