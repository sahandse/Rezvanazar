<?php
require __DIR__.'/bootstrap.php';
if(!empty($_SESSION['admin_id'])){header('Location: index.php');exit;}
$error='';
if($_SERVER['REQUEST_METHOD']==='POST'){csrf_check();$q=$pdo->prepare('SELECT id,password_hash FROM admins WHERE username=?');$q->execute([trim($_POST['username']??'')]);$a=$q->fetch();
if($a&&password_verify($_POST['password']??'',$a['password_hash'])){session_regenerate_id(true);$_SESSION['admin_id']=$a['id'];$_SESSION['csrf']=bin2hex(random_bytes(32));header('Location: index.php');exit;}
$error='نام کاربری یا رمز عبور اشتباه است.';}
?><!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="style.css"><main class="auth"><h1>ورود مدیر 🛡️</h1><?php if(isset($_GET['created']))echo '<p class="ok">مدیر ساخته شد؛ وارد شوید.</p>';if($error)echo '<p class="error">'.e($error).'</p>';?><form method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>نام کاربری<input name="username" required autocomplete="username"></label><label>رمز عبور<input type="password" name="password" required autocomplete="current-password"></label><button>ورود به پنل</button></form></main></html>
