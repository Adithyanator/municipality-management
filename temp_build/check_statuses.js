const ExcelJS = require('exceljs');
const path = require('path');

async function check() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, '..', 'Municipality_Project_Advanced_Kanban.xlsx');
  await workbook.xlsx.readFile(filePath);

  const dash = workbook.getWorksheet('Dashboard');
  const nonDefaultTasks = [];
  
  for (let r = 16; r <= 111; r++) {
    const taskId = dash.getCell(r, 1).value;
    const status = dash.getCell(r, 6).value;
    const progress = dash.getCell(r, 7).value;
    const testing = dash.getCell(r, 10).value;
    const security = dash.getCell(r, 11).value;
    
    if (status !== 'Not Started' || testing !== 'Pending' || security !== 'Pending') {
      nonDefaultTasks.push({ r, taskId, status, progress, testing, security });
    }
  }

  console.log(`Tasks with non-default status: ${nonDefaultTasks.length}`);
  if (nonDefaultTasks.length > 0) {
    console.log('Sample non-default tasks:', nonDefaultTasks.slice(0, 10));
  }
}

check().catch(console.error);
