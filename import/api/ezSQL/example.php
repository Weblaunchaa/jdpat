<?php 

include_once "inc/shared/ez_sql_core.php";  
 
include_once "inc/mysql/ez_sql_mysql.php";  



//连接数据库
$db = new ezSQL_mysql('ppms', 'ppms', 'ppms', '10.187.19.247:9013',$encoding = 'UTF-8'); 

//查询
$result = $db->get_results("SELECT * FROM dataPool_group where `id` = ".$poolId,$output = "ARRAY_A");

//插入
$db->query("INSERT INTO dataPool_group (name, create_time,creator,lastmodifed_time,lastmodifed_person,custom_fields) VALUES ('$name',NOW(),'$creator',NOW(),'$creator','')");
// 返回刚插入的ID
$insert_id = $db->insert_id;






?>