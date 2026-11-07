/**
 * 08‑交互反馈模块
 * 任务：完善保存成功、导入失败、删除确认、键盘操作反馈
 */

// 显示短暂的操作结果提示。对外全局函数，供记账录入、数据存储模块调用
function notify(s){
    const el=$('toast');
    el.textContent=s;
    el.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}

// 点击列表中的删除按钮时确认、删除并刷新页面。
$('transactionRows').addEventListener('click',e=>{
    const btn=e.target.closest('.delete-btn');
    if(!btn)return;
    // 修改提示：强调不可恢复
    if(!confirm('确定删除这笔记录吗？该操作不可恢复！')){
        return;
    }
    records = records.filter(r=>r.id!==btn.dataset.id);
    save();
    render();
    notify('✅记录已删除');
});

// 新增：键盘ESC弹窗交互
document.addEventListener('keydown', ev => {
    const dialog = $('entryDialog');
    // 仅弹窗打开的时候才响应按键
    if(dialog.open && ev.key === "Escape"){
        notify("已关闭记账弹窗");
    }
});

/*
【约定其他模块调用notify】
1. 记账录入模块：
    保存成功 → notify("✅记账保存成功！")
    表单输入非法 → notify("⚠️金额必须大于0，请检查输入！")
2. 数据存储模块：
    CSV导出成功 → notify("✅CSV文件导出完成")
    CSV导入失败 → notify("❌CSV导入失败，文件格式错误！")
本模块不修改其他js，只对外提供notify全局函数
*/

// 表单提交预留钩子，业务交给记账录入模块
$('entryForm').addEventListener('submit', ()=>{
});
