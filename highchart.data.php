<?php
namespace Home\Model;
class HighchartData{
    /* 成员变量 */
    var $_sqlRes;
    var $_opt=array();
    var $_xkey;
    var $_name;
    var $_seriesArr=array();
    var $_json=0;
    var $_xtype="number";
    var $_valueType="number";

    /* 构造函数 */
    function __construct(){
    }

    /* 成员函数 */
    function setArray($sqlResult){
        $this->_sqlRes=$sqlResult;
    }
    function setX($x){
        $this->_xkey=$x;
    }
    function setName($name){
        $this->_name=$name;
    }
    function setOpt($opt){
        $this->_opt=$opt;
    }
    function setXtype($type){
        $this->_xtype=$type;
    }
    function setValueType($type){
        $this->_valueType=$type;
    }
    function getXtypeValue($value){
        if($this->_xtype == "number"){
            return floatval($value);
        }
        if($this->_xtype == "string"){
            return strval($value);
        }
    }
    function getValueTypeValue($value){
        if($this->_valueType == "number"){
            return floatval($value);
        }
        if($this->_valueType == "string"){
            return strval($value);
        }
    }
    function setJson(){
        $this->_json=1;
    }
    //从数组中取得x轴数值,一般是日期
    function getxData(){
        return array_column($this->_sqlRes,$this->_xkey);
    }
    //从数组中取得含name字段的值
    function getNameData(){
        return array_column($this->_sqlRes,$this->_name);
    }
    //从数组中取得所有字段名
    function getKeys(){
        return array_keys($this->_sqlRes[0]);
    }
    //从所有字段名中取得做为data值的字段名:1 除了x,2除了x和name
    function getValueKey($type=1){
        $keys=$this->getKeys();
        if($type==2){
            $tmpArr=array($this->_xkey,$this->_name);
        }
        if($type==1){
            $tmpArr=array($this->_xkey);
        }
        return array_diff ( $keys , $tmpArr );
    }
    //从数组中取得data值
    function getNameyValue(){
        $keyArr=$this->getValueKey(2);
        $keyStr=array_shift($keyArr);
        return array_column($this->_sqlRes,$keyStr);
    }
    //从数组中取得data值
    function getValue($key){
        return array_column($this->_sqlRes,$key);
    }
    //取name的字段值对应的key,做为索引去对应x,data
    function getNameKeys($name){
        $nameData=$this->getNameData();
        return array_keys ($nameData , $name);
    }
    //生成Series的data
    function generateSeriesData($name){
        $dataTmpArr=array();
        $xData=$this->getxData();
        if($this->_name){
            $valueData=$this->getNameyValue();
            $indexArr=$this->getNameKeys($name);
            foreach ($indexArr as $index) {
                $dataTmpArr[]=array($this->getXtypeValue($xData[$index]),$this->getValueTypeValue($valueData[$index]));
            }
        }else{
            $valueData=$this->getValue($name);
            $size=count($valueData);
            for($i = 0; $i < $size; $i++){
                $dataTmpArr[]=array($this->getXtypeValue($xData[$i]),$this->getValueTypeValue($valueData[$i]));
            }
        }
        return $dataTmpArr;
    }
    //有指定name，除x外，其他都是值。只能有两个字段，一个name，一个值.
    function generateName(){
        $nameData=$this->getNameData();
        $nameData=array_unique($nameData);
        $size=count($nameData);
        for($i = 0; $i < $size; $i++){
            $seriesName=$nameData[$i];
            $_seriesArr[$i]["name"]=$seriesName;
            $_seriesArr[$i]["data"]=$this->generateSeriesData($seriesName);
        }
        return $_seriesArr;
    }
    //没有指定name，除x外，其他都是name
    function generate(){
        $keysArr=$this->getValueKey();
        $i=0;
        foreach ($keysArr as $key) {
            $seriesName=$key;
            $_seriesArr[$i]["name"]=$seriesName;
            $_seriesArr[$i]["data"]=$this->generateSeriesData($seriesName);
            if($this->_opt && isset($this->_opt[$seriesName])){
                $optArr=$this->_opt[$seriesName];
                foreach ($optArr as $k => $v) {
                    $_seriesArr[$i][$k]=$v;
                }
            }
            $i++;
        }
        return $_seriesArr;
    }
    //返回数据
    function getData(){
        $returnArr=array();
        $returnData="";
        if($this->_name){
            $returnData=$this->generateName();
        }else{
            $returnData=$this->generate();
        }
        if($this->_json){
            $returnArr["data"]=json_encode($returnData);
        }else{
            $returnArr["data"]=$returnData;
        }
        return $returnArr;
    }

    function __destruct() {}

}
