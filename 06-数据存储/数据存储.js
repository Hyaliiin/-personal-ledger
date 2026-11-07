// 从浏览器本地存储读取记录，并过滤明显无效的数据。
function readRecords(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value.filter(x=>x&&['income','expense'].includes(x.type)&&Number.isFinite(Number(x.amount))):[]}catch{return []}}
// 把当前记录写回浏览器本地存储。
function save(){localStorage.setItem(KEY,JSON.stringify(records))}
// 点击下载按钮时，把记录转换为 CSV 文件并下载。
$('exportBtn').onclick=()=>{const rows=[['日期','类型','金额','类别','备注'],...records.map(r=>[r.date,r.type==='income'?'收入':'支出',r.amount,r.category,r.note])];const csv='\uFEFF'+rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`小账本-${dateNow()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('CSV 已导出')};
