let editingRecordId=null;

// 生成最近五笔或全部记录的表格，并处理空状态、行操作和查看全部按钮。
function renderRows(){
  const all=filtered();
  const list=showAll?all:all.slice(0,5);
  $('transactionRows').innerHTML=list.map(r=>`<tr><td><span class="tx-icon">${r.type==='income'?'↙':'↗'}</span><span class="tx-name">${r.type==='income'?'收入':'支出'}</span></td><td>${escapeHtml(r.category)}</td><td>${escapeHtml(r.date)}</td><td>${escapeHtml(r.note)||'—'}</td><td class="amount-cell ${r.type}">${r.type==='income'?'+':'−'} ¥${money(r.amount)}</td><td><div class="row-actions"><button class="edit-btn row-action-btn" data-id="${escapeHtml(r.id)}" title="编辑记录" aria-label="编辑记录">✎</button><button class="delete-btn row-action-btn" data-id="${escapeHtml(r.id)}" title="删除记录" aria-label="删除记录">×</button></div></td></tr>`).join('');
  $('emptyState').style.display=all.length?'none':'flex';
  $('recordCount').textContent=all.length;
  $('footerCount').textContent=`显示 ${list.length} / ${all.length} 笔记录`;
  $('viewAllBtn').hidden=all.length<=5;
  $('viewAllBtn').setAttribute('aria-expanded',String(showAll));
  $('viewAllBtn').textContent=showAll?'收起 ↑':'查看全部 →';
}

// 切换最近五笔与全部记录。
$('viewAllBtn').onclick=()=>{showAll=!showAll;renderRows()};

// 在新增和编辑状态之间切换弹窗文案及底部的保存按钮。
function setEntryMode(record=null){
  editingRecordId=record?record.id:null;
  $('dialogTitle').textContent=record?'编辑记录':'记一笔';
  $('entryForm').querySelector('button[type="submit"]').firstChild.textContent=record?'保存修改 ':'保存记录 ';
}

// 将待编辑记录回填到现有记账表单。
function openEditDialog(record){
  $('entryForm').reset();
  setType(record.type);
  setEntryMode(record);
  $('amountInput').value=record.amount;
  $('entryCategory').value=record.category;
  $('entryDate').value=record.date;
  $('noteInput').value=record.note||'';
  $('entryDialog').showModal();
  $('amountInput').focus();
  $('amountInput').select();
}

// 点击行内编辑按钮时找到对应记录并打开编辑弹窗。
$('transactionRows').addEventListener('click',e=>{
  const button=e.target.closest('.edit-btn');
  if(!button)return;
  const record=records.find(r=>r.id===button.dataset.id);
  if(!record){notify('记录不存在，请刷新后重试');renderRows();return}
  openEditDialog(record);
});

// 编辑提交时在新增提交处理器之前截获事件，更新原记录并刷新相关视图。
$('entryForm').addEventListener('submit',e=>{
  if(!editingRecordId)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  const amount=Number($('amountInput').value);
  const date=$('entryDate').value;
  if(!Number.isFinite(amount)||amount<=0||!date){notify('请填写有效金额和日期');return}
  const record=records.find(r=>r.id===editingRecordId);
  if(!record){notify('记录不存在，请刷新后重试');$('entryDialog').close();render();return}
  Object.assign(record,{type:$('entryType').value,date,amount:Math.round(amount*100)/100,category:$('entryCategory').value,note:$('noteInput').value.trim()});
  save();
  initMonths();
  $('monthSelect').value=date.slice(0,7);
  render();
  $('entryDialog').close();
  notify('记录已更新');
},true);

// 关闭弹窗后恢复新增模式，避免下一次记账沿用编辑状态。
$('entryDialog').addEventListener('close',()=>setEntryMode());
