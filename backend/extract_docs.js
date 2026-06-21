const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

async function extractDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

async function extractPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

async function main() {
  const baseDir = 'C:\\Users\\Fathima hana HS\\Documents\\internship\\internship';
  const docs = {
    srs: path.join(
      baseDir,
      'docs',
      'srs',
      'SRS_AI_Powered_Municipality_Management_Portal_Updated.docx'
    ),
    database: path.join(
      baseDir,
      'docs',
      '04-Database-Architecture',
      'SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md'
    ),
    security: path.join(
      baseDir,
      'docs',
      '03-Security-Architecture',
      'Security_Access_Control_Architecture_Document.md'
    ),
    ui: path.join(
      baseDir,
      'docs',
      '06-UI-Architecture',
      'Frontend_Architecture_Final_Merged_Updated.pdf'
    ),
    ai: path.join(
      baseDir,
      'docs',
      '07-AI-Architecture',
      'AI_Architecture_Final_Submission_Updated.pdf'
    ),
  };

  console.log('--- Extracting SRS Docx ---');
  try {
    const srsText = await extractDocx(docs.srs);
    fs.writeFileSync(path.join(__dirname, 'srs_text.txt'), srsText);
    console.log('SRS extracted successfully, length:', srsText.length);
  } catch (e) {
    console.error('SRS failed:', e.message);
  }

  console.log('--- Extracting UI Architecture PDF ---');
  try {
    const uiText = await extractPdf(docs.ui);
    fs.writeFileSync(path.join(__dirname, 'ui_text.txt'), uiText);
    console.log('UI Architecture extracted successfully, length:', uiText.length);
  } catch (e) {
    console.error('UI failed:', e.message);
  }

  console.log('--- Extracting AI Architecture PDF ---');
  try {
    const aiText = await extractPdf(docs.ai);
    fs.writeFileSync(path.join(__dirname, 'ai_text.txt'), aiText);
    console.log('AI Architecture extracted successfully, length:', aiText.length);
  } catch (e) {
    console.error('AI failed:', e.message);
  }
}

main();
