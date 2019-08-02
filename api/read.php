<?php

require 'database.php';

$user = [];
$user_sql = "SELECT id,name,username,password,image,user_type,remember_token,slack_user_id,token,bot_acess_token,web_hook_url,created_at,updated_at,workspace_id,user_lists,mytheme  FROM users";

if($user_result = mysqli_query($con,$user_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($user_result))
  {
   $user[$i]['id']    = $row['id'];
   $user[$i]['name'] = $row['name'];
   $user[$i]['username'] = $row['username'];
   $user[$i]['password'] = $row['password'];
   $user[$i]['image'] = $row['image'];
   $user[$i]['user_type'] = $row['user_type'];
   $user[$i]['remember_token'] = $row['remember_token'];
   $user[$i]['slack_user_id'] = $row['slack_user_id'];
   $user[$i]['token'] = $row['token'];
   $user[$i]['bot_acess_token'] = $row['bot_acess_token'];
   $user[$i]['web_hook_url'] = $row['web_hook_url'];
   $user[$i]['created_at'] = $row['created_at'];
   $user[$i]['updated_at'] = $row['updated_at'];
   $user[$i]['workspace_id'] = $row['workspace_id'];
   $user[$i]['user_lists'] = $row['user_lists'];
   $user[$i]['mytheme'] = $row['mytheme'];
    $i++;
  }

  echo json_encode($user);
}
else
{
  http_response_code(404);
}





?>