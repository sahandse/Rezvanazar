<?php
require __DIR__.'/bootstrap.php';admin_required();
$students=(int)$pdo->query('SELECT COUNT(*) FROM students')->fetchColumn();
$exams=(int)$pdo->query('SELECT COUNT(*) FROM exams WHERE active=1')->fetchColumn();
$results=(int)$pdo->query('SELECT COUNT(*) FROM results')->fetchColumn();
$avg=$pdo->query('SELECT AVG(score/NULLIF(total,0)*100) FROM results WHERE total>0')->fetchColumn();
header_ui('داشبورد مدیریتی');
?><div class="grid"><div class="card">👨‍🎓 دانش‌آموزان<div class="num"><?=e((string)$students)?></div></div><div class="card">📝 آزمون فعال<div class="num"><?=e((string)$exams)?></div></div><div class="card">🏅 نتایج ثبت‌شده<div class="num"><?=e((string)$results)?></div></div><div class="card">📊 میانگین درصد<div class="num"><?=e(number_format((float)$avg,1))?>٪</div></div></div><div class="card" style="margin-top:18px"><h2>شروع سریع</h2><p><a href="students.php">مدیریت دانش‌آموزان ←</a></p><p><a href="exams.php">مدیریت آزمون‌ها و تکالیف ←</a></p><p><a href="results.php">گزارش نتایج و خروجی CSV ←</a></p><p class="ok">اتصال دیتابیس برقرار است.</p></div><?php footer_ui();?>
