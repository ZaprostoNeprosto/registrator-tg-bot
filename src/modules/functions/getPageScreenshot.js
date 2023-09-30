import fs from 'fs';
import { pdf } from 'pdf-to-img';
import path from 'path';
import { currentDirectory } from "../../config/config.js";

async function getPageScreenshot(data) {
  try {
    let result

    const pdfFilePath = path.join(currentDirectory, 'src/data/output/filled_PDF', data.pdfFileName);

    for await (const page of await pdf(pdfFilePath, { scale: 2.0 })) {
      result = page;
      data.screenshotFileName = `${data.pdfFileName.slice(0, -4)}.png`;
      const savePath = path.join(currentDirectory, 'src/data/output/filled_PDFScreenshots', data.screenshotFileName);

      fs.writeFile(savePath, page, (err) => {
        if (err) {
          console.error('Error while saving screenshot:', err);
          return;
        }
        console.log(`The screenshot has been saved to: ${savePath}`);
      });
    }

    return result
  } catch (error) {
    console.error('An error occurred while GetPageScreenshot', error);
  }
}

export default getPageScreenshot;
