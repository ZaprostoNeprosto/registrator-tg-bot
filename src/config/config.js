import dotenv from "dotenv";
import path from "path";

export const currentDirectory = process.cwd(); // Получаем текущий рабочий каталог
dotenv.config({ path: path.resolve(currentDirectory, 'src', 'config', '.env') });

export const schedule = [
    { path: './src/data/input/schedule/page_1.png', caption: '23 мая' },
    { path: './src/data/input/schedule/page_2.png', caption: '24 мая' },
    { path: './src/data/input/schedule/page_3.png', caption: '25 мая' },
    { path: './src/data/input/schedule/page_4.png', caption: '🔬' },
]

export const contact = {
    firstName: 'Марина',
    lastName: 'Иванова',
    position: 'секретарь',
    tel: '+78121234567',
    formattedTel: '+7(812)123-45-67',
}

export const eventPlace = {
    latitude: 59.9319651,
    longitude: 30.3558674,
    address: 'Лиговский пр., 10/118, Санкт-Петербург, 191036',
    locationTitle: `Гостиница "Октябрьская"`,
}
