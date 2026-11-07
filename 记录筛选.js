// 按收支类型、类别、日期和关键词筛选并排序。
function filtered(){const type=$('typeFilter').value,cat=$('categoryFilter').value,search=$('searchInput').value.trim().toLowerCase(),from=$('fromDate').value,to=$('toDate').value;return records.filter(r=>(type==='all'||r.type===type)&&(cat==='all'||r.category===cat)&&(!from||r.date>=from)&&(!to||r.date<=to)&&(!search||`${r.category} ${r.note}`.toLowerCase().includes(search))).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt)}
// 根据已有记录更新类别筛选选项。
function updateCategories(){const selected=$('categoryFilter').value;const unique=[...new Set(records.map(r=>r.category))].sort();$('categoryFilter').innerHTML='<option value="all">全部类别</option>'+unique.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');$('categoryFilter').value=unique.includes(selected)?selected:'all'}
// 筛选条件变化时刷新记录列表。
['searchInput','typeFilter','categoryFilter','fromDate','toDate'].forEach(id=>$(id).addEventListener('input',renderRows));
