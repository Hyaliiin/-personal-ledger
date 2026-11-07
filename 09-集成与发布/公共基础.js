// 浏览器本地存储使用的键名。
const KEY='money-notes-records-v1';
// 收入与支出的可选类别。
const categories={expense:['饮食','交通','购物','居住','娱乐','医疗','学习','其他'],income:['工资','兼职','投资','礼金','退款','其他']};
// 支出分布图使用的颜色。
const colors=['#7868e8','#f6aa77','#56c8a3','#77b9e9','#e996b3','#b4a1e7','#d6bc70','#a2b3c3'];
// 共用 DOM 查找函数，以及当前记录和列表展开状态。
const $=id=>document.getElementById(id);let records=[],showAll=false;
// 把数字格式化为两位小数的金额。
function money(n){return Number(n||0).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2})}
// 取得本机当天日期，格式为 YYYY-MM-DD。
function dateNow(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
// 取得本机当前月份。
function monthNow(){return dateNow().slice(0,7)}
// 转义用户输入，避免备注等内容被当作 HTML 执行。
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
