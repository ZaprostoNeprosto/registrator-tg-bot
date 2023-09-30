import fs from 'fs';
import path from 'path';
import {currentDirectory} from "../../config/config.js";

async function readMyFilledForms(ctx) {
    try {
        return new Promise((resolve, reject) => {
            const directoryPath = path.join(currentDirectory, 'src/data/output/filled_PDFScreenshots'); // абсолютный путь к директории
            const fileNamePart = `${ctx.chat.id}`; // часть имени файлов
            const startNumber = 1; // начальный номер для caption

            let myForms = []; // массив объектов с путями и порядковыми номерами

            fs.readdir(directoryPath, (error, files) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }

                let counter = startNumber; // счетчик для caption

                files.forEach((file) => {
                    if (file.includes(fileNamePart)) {
                        const filePath = path.join(directoryPath, file);
                        myForms.push({ path: filePath, caption: counter.toString() });
                        counter++;
                    }
                });

                resolve(myForms);
            });
        });
    } catch (error) {
        console.error('An error occurred while readMyFilledForms', error);
    }
}

export default readMyFilledForms;

