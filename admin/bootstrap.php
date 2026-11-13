<?php
declare(strict_types=1);
$configFile=__DIR__.'/config.php';
if(!is_file($configFile)){http_response_code(500);exit('ابتدا config.php را طبق README تنظیم کنید.');}
$config=require $configFile;
session_name($config['session_name']??'rezvan_admin');
session_set_cookie_params(['httponly'=>true,'secure'=>!empty($_SERVER['HTTPS']),'samesite'=>'Strict']);
session_start();
try{$pdo=new PDO('mysql:host='.$config['db_host'].';dbname='.$config['db_name'].';charset=utf8mb4',$config['db_user'],$config['db_pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);}
catch(Throwable $e){http_response_code(500);exit('اتصال دیتابیس ناموفق است. تنظیمات config.php را بررسی کنید.');}
function e(string $s):string{return htmlspecialchars($s,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');}
function admin_required():void{if(empty($_SESSION['admin_id'])){header('Location: login.php');exit;}}
function csrf_token():string{if(empty($_SESSION['csrf']))$_SESSION['csrf']=bin2hex(random_bytes(32));return $_SESSION['csrf'];}
function csrf_check():void{if(!hash_equals($_SESSION['csrf']??'',$_POST['csrf']??'')){http_response_code(403);exit('درخواست نامعتبر است. صفحه را تازه‌سازی کنید.');}}
function header_ui(string $title):void{echo '<!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'.e($title).'</title><link rel="stylesheet" href="style.css"><body><header><b>⚽ رضوان‌آذر | مدیریت</b><nav><a href="index.php">داشبورد</a><a href="students.php">دانش‌آموزان</a><a href="exams.php">آزمون‌ها</a><a href="results.php">نتایج</a><a href="logout.php">خروج</a></nav></header><main><h1>'.e($title).'</h1>';}
function footer_ui():void{echo '</main><footer>پنل مدیریت کلاس درس · نسخه اولیه</footer></body></html>';}
