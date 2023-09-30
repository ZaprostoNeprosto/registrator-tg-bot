import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { currentDirectory } from "../../config/config.js";

async function sendEmail(data) {
    try {
        // Создаем транспорт для отправки писем
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // адрес SMTP-сервера
            port: 465, // порт SMTP-сервера
            secure: true, // использовать SSL
            auth: {
                user: process.env.BOT_EMAIL_ADDRESS, // адрес электронной почты
                pass: process.env.BOT_EMAIL_PASSWORD, // пароль от почты
            },
        });

        // Читаем файл, который нужно отправить
        const filename = data.screenshotFileName;
        const content = fs.readFileSync(path.join(currentDirectory, 'src/data/output/filled_PDFScreenshots', data.screenshotFileName));

        // Определяем опции для отправки письма
        const mailOptions = {
            from: process.env.BOT_EMAIL_ADDRESS, // от кого
            to: process.env.ORGANIZER_EMAIL_ADDRESS, // кому
            subject: 'Новая регистрация в боте', // тема письма
            text: `Добрый день!\n\n${data.firstName} ${data.lastName} из ${data.company} заполнил(а) регистрационную форму.\n\nС уважением,\nТелеграм Бот`,
            attachments: [
                {
                    filename, // название файла
                    content, // содержимое файла
                },
            ],
        };

        // Отправляем письмо
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`The email has been sent: ${info.response}`);
            }
        });
    } catch (error) {
        console.error('An error occurred while SendEmail', error);
    }
}

export default sendEmail;
