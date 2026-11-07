// 切换收入或支出时更新类别选项。
function setType(type){$('entryType').value=type;document.querySelectorAll('.type-option').forEach(b=>b.classList.toggle('selected',b.dataset.type===type));$('entryCategory').innerHTML=categories[type].map(c=>`<option>${c}</option>`).join('')}
// 重置并打开新增记录弹窗。
function openEntry(type='expense'){$('entryForm').reset();setType(type);$('entryDate').value=dateNow();$('entryDialog').showModal();$('amountInput').focus()}
// 连接顶部、空状态、快捷入口及弹窗按钮。
$('addTopBtn').onclick=()=>openEntry();$('emptyAddBtn').onclick=()=>openEntry();document.querySelectorAll('.quick-action').forEach(b=>b.onclick=()=>openEntry(b.dataset.type));document.querySelectorAll('.type-option').forEach(b=>b.onclick=()=>setType(b.dataset.type));$('closeDialog').onclick=$('cancelDialog').onclick=()=>$('entryDialog').close();$('entryDialog').onclick=e=>{if(e.target===$('entryDialog'))$('entryDialog').close()};
// 提交表单时校验并保存新记录，然后刷新页面。
$('entryForm').addEventListener('submit',e=>{e.preventDefault();const amount=Number($('amountInput').value),date=$('entryDate').value;if(!Number.isFinite(amount)||amount<=0||!date){notify('请填写有效金额和日期');return}records.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random(),type:$('entryType').value,date,amount:Math.round(amount*100)/100,category:$('entryCategory').value,note:$('noteInput').value.trim(),createdAt:Date.now()});save();initMonths();$('monthSelect').value=date.slice(0,7);render();$('entryDialog').close();notify('记录已保存')});
