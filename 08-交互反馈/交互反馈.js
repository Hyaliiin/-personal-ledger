// 显示短暂的操作结果提示。
function notify(s){const el=$('toast');el.textContent=s;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
// 点击列表中的删除按钮时确认、删除并刷新页面。
$('transactionRows').addEventListener('click',e=>{const btn=e.target.closest('.delete-btn');if(!btn)return;if(!confirm('确定删除这笔记录吗？'))return;records=records.filter(r=>r.id!==btn.dataset.id);save();render();notify('记录已删除')});
