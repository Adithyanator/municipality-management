const ExcelJS = require('exceljs');
const path = require('path');

async function verify() {
  console.log('Starting verification of the generated workbook...');
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, '..', 'Municipality_Project_Advanced_Kanban_GoogleSheets_Ready.xlsx');
  await workbook.xlsx.readFile(filePath);

  const sheets = workbook.worksheets.map(w => w.name);
  console.log(`Total Sheets: ${sheets.length}`);
  console.log('Worksheet List:', sheets);

  // 1. Verify Sheet Count
  if (sheets.length !== 31) {
    throw new Error(`Expected 31 sheets, but found ${sheets.length}`);
  }

  // 2. Verify Dashboard Master Task List
  const dash = workbook.getWorksheet('Dashboard');
  const dashHeaders = dash.getRow(15).values.filter(v => v !== null);
  console.log('\nDashboard row 15 Headers count:', dashHeaders.length);
  console.log('Dashboard Headers:', dashHeaders);

  const expectedDashHeaders = [
    'Task ID', 'Module', 'Task Name', 'Assigned To', 'Priority', 'Status',
    'Progress %', 'Due Day', 'Dependency', 'Deliverable', 'Implementation Description', 
    'Suggested Tech Stack', 'Suggested Prompt Keywords', 'Reference Documents', 
    'Testing Status', 'Security Status', 'Remarks', 'Demo Critical?'
  ];

  for (let i = 0; i < expectedDashHeaders.length; i++) {
    if (dashHeaders[i] !== expectedDashHeaders[i]) {
      throw new Error(`Header mismatch at index ${i}: Expected "${expectedDashHeaders[i]}", but found "${dashHeaders[i]}"`);
    }
  }

  // Check tasks rows (16 to 111)
  let dashTasksCount = 0;
  let emptyDescriptionsCount = 0;
  for (let r = 16; r <= 111; r++) {
    const taskId = dash.getCell(r, 1).value;
    const desc = dash.getCell(r, 11).value;
    if (taskId && taskId.startsWith('TASK-')) {
      dashTasksCount++;
    }
    if (!desc || desc.toString().trim() === '' || desc.toString() === 'No description provided.') {
      emptyDescriptionsCount++;
      console.log(`Task ${taskId} at row ${r} has empty or default description`);
    }
  }
  console.log(`\nDashboard total tasks verified: ${dashTasksCount}`);
  console.log(`Dashboard empty/default descriptions count: ${emptyDescriptionsCount}`);
  
  if (dashTasksCount !== 96) {
    throw new Error(`Expected 96 tasks in Dashboard Master List, but verified ${dashTasksCount}`);
  }
  if (emptyDescriptionsCount > 0) {
    throw new Error(`Found ${emptyDescriptionsCount} tasks with empty or default descriptions!`);
  }

  // 3. Verify KPI card formulas
  console.log('\nVerifying Dashboard KPI card formulas...');
  const kpisToCheck = [
    { cell: 'A3', label: 'Overall Completion %', expectedFormula: '=COUNTIF(F16:F111, "Completed")/COUNTA(A16:A111)' },
    { cell: 'C3', label: 'Blocked Tasks', expectedFormula: '=COUNTIF(F16:F111, "Blocked")' },
    { cell: 'E3', label: 'Critical Issues Open', expectedFormula: '=COUNTIFS(E16:E111, "Critical", F16:F111, "<>Completed")' },
    { cell: 'M3', label: 'Demo Critical Tasks Remaining', expectedFormula: '=COUNTIFS(F16:F111, "<>Completed", R16:R111, "Yes")' }
  ];

  kpisToCheck.forEach(k => {
    const cell = dash.getCell(k.cell);
    console.log(`KPI ${k.label} at cell ${k.cell}: Formula = "${cell.value.formula}"`);
    if (cell.value.formula !== k.expectedFormula) {
      throw new Error(`Formula mismatch at cell ${k.cell}: Expected "${k.expectedFormula}", but found "${cell.value.formula}"`);
    }
  });

  // 4. Verify Timelines sheets (e.g. Sprint 0)
  const sprint0 = workbook.getWorksheet('Sprint 0');
  const sprint0Headers = sprint0.getRow(2).values.filter(v => v !== null);
  console.log('\nSprint 0 row 2 Headers count:', sprint0Headers.length);
  console.log('Sprint 0 Headers:', sprint0Headers);

  const expectedTimelineHeaders = [
    'Task ID', 'Task Name', 'Assigned To', 'Priority', 'Dependency', 'Status',
    'Deliverable', 'Implementation Description', 'Suggested Tech Stack', 
    'Suggested Prompt Keywords', 'Reference Documents', 'Testing Required', 
    'Security Check Required', 'Remarks'
  ];

  for (let i = 0; i < expectedTimelineHeaders.length; i++) {
    if (sprint0Headers[i] !== expectedTimelineHeaders[i]) {
      throw new Error(`Sprint 0 header mismatch at index ${i}: Expected "${expectedTimelineHeaders[i]}", but found "${sprint0Headers[i]}"`);
    }
  }

  // 5. Verify Module Task sheets (e.g. Backend Tasks)
  const beTasks = workbook.getWorksheet('Backend Tasks');
  const beHeaders = beTasks.getRow(2).values.filter(v => v !== null);
  console.log('\nBackend Tasks row 2 Headers count:', beHeaders.length);
  console.log('Backend Tasks Headers:', beHeaders);

  const expectedModuleHeaders = [
    'Task ID', 'Task Name', 'Assigned To', 'Priority', 'Status', 'Due Day', 'Dependency',
    'Deliverable', 'Implementation Description', 'Suggested Tech Stack', 
    'Suggested Prompt Keywords', 'Reference Documents', 'Testing Status', 'Remarks', 'Last Updated'
  ];

  for (let i = 0; i < expectedModuleHeaders.length; i++) {
    if (beHeaders[i] !== expectedModuleHeaders[i]) {
      throw new Error(`Backend Tasks header mismatch at index ${i}: Expected "${expectedModuleHeaders[i]}", but found "${beHeaders[i]}"`);
    }
  }

  // Verify that backend task remarks formula references column Q on Dashboard (row 41 corresponds to TASK-BE-001)
  const sampleRowRemarksValue = beTasks.getCell(3, 14).value;
  console.log(`Backend Tasks Row 3 Remarks formula:`, sampleRowRemarksValue);
  if (sampleRowRemarksValue.formula !== '=Dashboard!Q41') {
    throw new Error(`Backend Tasks Row 3 Remarks formula should be "=Dashboard!Q41", but is "${sampleRowRemarksValue.formula}"`);
  }

  // Verify backend task testing status formula references column O on Dashboard (row 41 corresponds to TASK-BE-001)
  const sampleRowTestValue = beTasks.getCell(3, 13).value;
  console.log(`Backend Tasks Row 3 Testing Status formula:`, sampleRowTestValue);
  if (sampleRowTestValue.formula !== '=Dashboard!O41') {
    throw new Error(`Backend Tasks Row 3 Testing Status formula should be "=Dashboard!O41", but is "${sampleRowTestValue.formula}"`);
  }

  // 6. Verify Google Sheets Migration Report sheet
  const repSheet = workbook.getWorksheet('Google Sheets Migration Report');
  if (!repSheet) {
    throw new Error('Google Sheets Migration Report worksheet is missing!');
  }
  const repTitleVal = repSheet.getCell('A1').value;
  console.log(`\nMigration Report Title cell value: "${repTitleVal}"`);
  if (repTitleVal !== 'Google Sheets Migration & Compatibility Report') {
    throw new Error(`Expected title "Google Sheets Migration & Compatibility Report", but found "${repTitleVal}"`);
  }
  
  const metricRowVal = repSheet.getCell(5, 1).value;
  console.log(`Migration Report Row 5 Metric description: "${metricRowVal}"`);
  if (metricRowVal !== 'Total Sheets Migrated') {
    throw new Error(`Expected metric "Total Sheets Migrated", but found "${metricRowVal}"`);
  }

  console.log('\nSUCCESS: Workbook verification passed perfectly! All 31 worksheets, column structures, task counts, metadata mapping, formula updates, and migration report details are correct.');
}

verify().catch(err => {
  console.error('\nFAILURE during verification:', err);
  process.exit(1);
});
