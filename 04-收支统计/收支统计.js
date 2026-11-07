// 生成最近十二个月及已有记录月份供用户选择。
function initMonths(){const now=new Date();const months=new Set(Array.from({length:12},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-i,1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`}));records.forEach(r=>months.add(r.date.slice(0,7)));$('monthSelect').innerHTML=[...months].sort().reverse().map(m=>`<option value="${m}">${m.slice(0,4)} 年 ${Number(m.slice(5))} 月</option>`).join('');$('monthSelect').value=monthNow()}
// 计算选定月份的收入、支出、结余，并更新图表。
function renderSummary(){const month=$('monthSelect').value;const monthRecords=records.filter(r=>r.date.startsWith(month));const income=monthRecords.filter(r=>r.type==='income'),expense=monthRecords.filter(r=>r.type==='expense');const sum=items=>items.reduce((n,r)=>n+Number(r.amount),0);$('incomeTotal').textContent=money(sum(income));$('expenseTotal').textContent=money(sum(expense));$('balanceTotal').textContent=money(sum(income)-sum(expense));$('incomeCount').textContent=`${income.length} 笔收入`;$('expenseCount').textContent=`${expense.length} 笔支出`;$('chartMonth').textContent=`${Number(month.slice(5))} 月`;renderChart(expense)}
// 切换月份时重新计算统计结果。
$('monthSelect').onchange=renderSummary;
