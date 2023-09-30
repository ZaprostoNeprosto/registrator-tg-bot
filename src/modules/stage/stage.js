import {firstName, firstNameCallback} from "./questions/firstName.js";
import {middleName, middleNameCallback} from "./questions/middleName.js";
import {lastName, lastNameCallback} from "./questions/lastName.js";
import {company, companyCallback} from "./questions/company.js";
import {address, addressCallback} from "./questions/address.js";
import {position, positionCallback} from "./questions/position.js";
import {phone, phoneCallback} from "./questions/phone.js";
import {email, emailCallback} from "./questions/email.js";
import {interest, interestCallback, interestFinalCallback, interestListCallback} from "./questions/interest.js";
import {days, daysCallback, daysFinalCallback, daysListCallback} from "./questions/days.js";
import {check, checkCallback, checkFinalCallback, checkListCallback} from "./questions/check.js";
import {
    saveData,
    saveDataBackCallback,
    saveDataCallback,
    saveDataEditCallback, saveDataExitCallback,
    saveDataListCallback, saveDataReadyCallback
} from "./questions/saveData.js";
import {Scenes} from "telegraf";

firstName.use(firstNameCallback);
middleName.on('message', middleNameCallback);
lastName.on('message', lastNameCallback);
company.on('message', companyCallback);
address.on('message', addressCallback);
position.on('message', positionCallback);
phone.on('message', phoneCallback);
email.on('message', emailCallback);
interest.on('message', interestCallback);
interest.action(/^([12345678])$/, interestListCallback);
interest.action('готово', interestFinalCallback);
days.on('message', daysCallback)
days.action(/^(23|24|25)$/, daysListCallback);
days.action('готово', daysFinalCallback);
check.on('message', checkCallback);
check.action(/^(Да|Нет)$/, checkListCallback);
check.action('ok', checkFinalCallback);
saveData.on('message', saveDataCallback);
saveData.action('edit', saveDataEditCallback);
saveData.action('back', saveDataBackCallback);
saveData.action(/^(editLastName|editFistName|editMiddleName|editCompany|editPosition|editAdress|editDays|editPractice|editPhone|editEmail)$/, saveDataListCallback);
saveData.action('/allIsOk', saveDataReadyCallback);
saveData.action('/exitAnketa', saveDataExitCallback);

const menuScene = new Scenes.WizardScene('sceneWizard', firstName, middleName, lastName, company, address, position, phone, email, interest, days, check, saveData)
const stage = new Scenes.Stage([menuScene]);

export default stage;
