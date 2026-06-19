const ExcelJS = require('exceljs');
const path = require('path');

async function inspectHeaders() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, '..', 'Municipality_Project_Advanced_Kanban.xlsx');
  await workbook.xlsx.readFile(filePath);

  const sheetsToInspect = [
    'Dashboard',
    'Sprint 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7',
    'Backend Tasks', 'Frontend Tasks', 'Database Tasks', 'AI Tasks',
    'Face Recognition Tasks', 'Documentation & QA Tasks', 'Infrastructure Tasks'
  ];

  for (const name of sheetsToInspect) {
    const ws = workbook.getWorksheet(name);
    if (!ws) {
      console.log(`Sheet not found: ${name}`);
      continue;
    }
    // Find first row that has elements, usually row 2 or row 15
    let headerRow = null;
    if (name === 'Dashboard') {
      headerRow = ws.getRow(15);
    } else {
      headerRow = ws.getRow(2);
    }
    console.log(`${name} Header:`, headerRow.values.filter(v => v !== null));
  }
}

inspectHeaders().catch(console.error);
