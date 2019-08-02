<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->id) === '')
  {
    return http_response_code(400);
  }
   
  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)trim($request->id));
  $name = mysqli_real_escape_string($con, trim($request->name));
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));
  $image = mysqli_real_escape_string($con, trim($request->image));
  $user_type = mysqli_real_escape_string($con, (int)trim($request->user_type));
  $remember_token = mysqli_real_escape_string($con, trim($request->remember_token));
  $slack_user_id = mysqli_real_escape_string($con, trim($request->slack_user_id));
  $token = mysqli_real_escape_string($con, trim($request->token));
  $bot_acess_token = mysqli_real_escape_string($con, trim($request->bot_acess_token));
  $web_hook_url = mysqli_real_escape_string($con, trim($request->web_hook_url));
//   $created_at = mysqli_real_escape_string($con, trim($request->created_at));
//   $updated_at = mysqli_real_escape_string($con, trim($request->updated_at));
  $workspace_id = mysqli_real_escape_string($con, trim($request->workspace_id));
  $user_lists = mysqli_real_escape_string($con, trim($request->user_lists));
  $mytheme = mysqli_real_escape_string($con, (int)trim($request->mytheme));
  
//   echo $id.$name.$username.$password.$image.$user_type.$remember_token.$slack_user_id.$token.$bot_acess_token.$web_hook_url.$created_at.
//   $updated_at.$workspace_id.$user_lists.$mytheme;


  // Create.
  $user_sql = "INSERT INTO `users`(`id`,`name`,`username`,`password`,`image`,`user_type`,`remember_token`,`slack_user_id`,`token`,`bot_acess_token`,`web_hook_url`,`workspace_id`,`user_lists`,`mytheme`) VALUES ('{$id}','{$name}','{$username}','{$password}','{$image}','{$user_type}','{$remember_token}','{$slack_user_id}','{$token}','{$bot_acess_token}','{$web_hook_url}','{$workspace_id}','{$user_lists}','{$mytheme}')";

  if(mysqli_query($con,$user_sql))
  {
    http_response_code(201);
    $user = [
          'id' => $id,
          'name' => $name,
          'username'=> $username,
          'password'=> $password,
          'image'=> $image,
          'user_type'=> $user_type,
          'remember_token'=> $remember_token,
          'slack_user_id'=>$slack_user_id,
          'token'=> $token,
          'bot_acess_token'=>$bot_acess_token,
          'web_hook_url'=> $web_hook_url,
        //   'created_at'=> $created_at,
        //   'updated_at'=>$updated_at,
          'workspace_id'=> $workspace_id,
          'user_lists'=> $user_lists,
          'mytheme'=> $mytheme,
        //   'id'=> mysqli_insert_id($con)
    ];
    echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}

?>