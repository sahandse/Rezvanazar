<?php
require __DIR__.'/bootstrap.php';
$count=(int)$pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn();
if($count>0){http_response_code(403);exit('مدیر قبلاً ساخته شده است. برای امنیت، نصب اولیه قفل شد.');}
$error='';
if($_SERVER['REQUEST_METHOD']==='POST'){csrf_check();$u=trim($_POST['username']??'');$p=$_POST['password']??'';
if(strlen($u)<4||strlen($p)<12)$error='نام کاربری حداقل ۴ و رمز عبور حداقل ۱۲ کاراکتر باشد.';
else{$s=$pdo->prepare('INSERT INTO admins(username,password_hash) VALUES(?,?)');$s->execute([$u,password_hash($p,PASSWORD_DEFAULT)]);header('Location: login.php?created=1');exit;}}
?><!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="style.css"><main class="auth"><h1>ساخت مدیر اصلی 🔐</h1><p>این صفحه فقط یک بار قابل استفاده است.</p><?php if($error)echo '<p class="error">'.e($error).'</p>';?><form method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>نام کاربری<input name="username" required minlength="4" autocomplete="username"></label><label>رمز عبور قوی (۱۲ کاراکتر یا بیشتر)<input type="password" name="password" required minlength="12" autocomplete="new-password"></label><button>ساخت مدیر</button></form></main></html>
