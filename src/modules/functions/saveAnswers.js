import fs from 'fs';
import path from 'path';
import {currentDirectory} from "../../config/config.js";

async function saveAnswers(data) {
  const answers = {
    id: data.from.id,
    profileUserName: data.from.username,
    profileFirstName: data.from.first_name,
    profileLastName: data.from.last_name,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    company: data.company,
    position: data.position,
    adress: data.adress,
    email: data.email,
    phone: data.phone,
    interest: data.interest,
    days: data.days,
    practice: data.practice,
    date: data.formattedDate
}
  const content = Object.keys(answers).map((key) => `${key}: ${answers[key]}`).join('\n');
  const filename = path.join(currentDirectory, 'src/data/output/txt_files' , `answers_${data.from.id}_${Date.now()}.txt`);

  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Answers saved to: ${filename}`);
    }
  });
}

export default saveAnswers;
