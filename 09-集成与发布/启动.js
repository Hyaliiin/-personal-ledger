// 统一刷新类别选项、记录列表和月度统计。
function render(){updateCategories();renderRows();renderSummary()}
// 页面启动时从本地存储读取已有记录。
records=readRecords();
// 填入当前日期、初始化月份和表单，再首次绘制页面。
$('todayLabel').textContent=new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'});initMonths();$('entryDate').value=dateNow();setType('expense');render();
