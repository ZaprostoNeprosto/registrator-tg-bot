import { PDFDocument } from 'pdf-lib'
import fs from 'fs';
import fontkit from '@pdf-lib/fontkit';
import path from 'path';
import {currentDirectory} from "../../config/config.js";


async function savePDF(data) {
    try {
        const templatePdf = await PDFDocument.load(fs.readFileSync(path.join(currentDirectory, 'src/data/input/template_PDF', 'template.pdf')));
        templatePdf.registerFontkit(fontkit);
        const fontBytes = await fs.promises.readFile(path.join(currentDirectory, 'src/data/input/font', 'arial.ttf'));
        const myFont = await templatePdf.embedFont(fontBytes);

        const fields = templatePdf.getForm().getFields();

        const company = fields.find(field => field.getName() === 'fill_company');
        company.setText(`${data.company}`);
        company.updateAppearances(myFont);
        const position = fields.find(field => field.getName() === 'fill_position');
        position.setText(`${data.position}`);
        position.updateAppearances(myFont);
        const lastName = fields.find(field => field.getName() === 'fill_lastName');
        lastName.setText(`${data.lastName}`);
        lastName.updateAppearances(myFont);
        const firstName = fields.find(field => field.getName() === 'fill_firstName');
        firstName.setText(`${data.firstName}`);
        firstName.updateAppearances(myFont);
        const middleName = fields.find(field => field.getName() === 'fill_middleName');
        middleName.setText(`${data.middleName}`);
        middleName.updateAppearances(myFont);
        const adress = fields.find(field => field.getName() === 'fill_adress');
        adress.setText(`${data.adress}`);
        adress.updateAppearances(myFont);
        const phone = fields.find(field => field.getName() === 'fill_phone');
        phone.setText(`${data.phone}`);
        phone.updateAppearances(myFont);
        const email = fields.find(field => field.getName() === 'fill_email');
        email.setText(`${data.email}`);
        email.updateAppearances(myFont);
        const chckboxFirstOption = fields.find(field => field.getName() === 'chkbox_probopod-opt-micro');
        if (data.interest.includes('1')) {
          chckboxFirstOption.check();
        }
        const chckboxSecondOption = fields.find(field => field.getName() === 'chkbox_opt-micro');
        if (data.interest.includes('2')) {
          chckboxSecondOption.check();
        }
        const chckboxThirdOption = fields.find(field => field.getName() === 'chkbox_el-micro');
        if (data.interest.includes('3')) {
          chckboxThirdOption.check();
        }
        const chckboxFourthOption = fields.find(field => field.getName() === 'chkbox_him-faz-sostav');
        if (data.interest.includes('4')) {
          chckboxFourthOption.check();
        }
        const chckboxFifthOption = fields.find(field => field.getName() === 'chkbox_tomog-nerazrush-kontrol');
        if (data.interest.includes('5')) {
          chckboxFifthOption.check();
        }
        const chckboxSixthOption = fields.find(field => field.getName() === 'chkbox_fizmeh-ispytan');
        if (data.interest.includes('6')) {
          chckboxSixthOption.check();
        }
        const chckboxSeventhOption = fields.find(field => field.getName() === 'chkbox_tverdomer');
        if (data.interest.includes('7')) {
          chckboxSeventhOption.check();
        }
        const chckboxEighthOption = fields.find(field => field.getName() === 'chkbox_termoanaliz');
        if (data.interest.includes('8')) {
          chckboxEighthOption.check();
        }
        const chckboxFirstDay = fields.find(field => field.getName() === 'chkbox_23');
        if (data.days.includes('23')) {
          chckboxFirstDay.check();
        }
        const chckboxSecondDay = fields.find(field => field.getName() === 'chkbox_24');
        if (data.days.includes('24')) {
          chckboxSecondDay.check();
        }
        const chckboxThirdDay = fields.find(field => field.getName() === 'chkbox_25');
        if (data.days.includes('25')) {
          chckboxThirdDay.check();
        }
        const chckboxPracticeYes = fields.find(field => field.getName() === 'chkbox_individ-rabota-YES');
        if (data.practice.includes('Да')) {
          chckboxPracticeYes.check();
        }
        const chckboxPracticeNo = fields.find(field => field.getName() === 'chkbox_individ-rabota-NO');
        if (data.practice.includes('Нет')) {
          chckboxPracticeNo.check();
        }

        const pdfBytesFilled = await templatePdf.save();
        data.pdfFileName = `filled_${data.from.id}_${Date.now()}.pdf`
        const filename = path.join(currentDirectory, 'src/data/output/filled_PDF' , data.pdfFileName);

        await fs.promises.writeFile(filename, pdfBytesFilled, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`The PDF file has been saved to: ${filename}`);
            }
        });
    } catch (error) {
        console.error('An error occurred while SavePDF', error);
    }
}

export default savePDF;
