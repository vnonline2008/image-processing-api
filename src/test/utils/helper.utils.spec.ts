import { getImagePath, ImageFile, resizeImage } from '../../utils/helper.utils';
import path from 'path';
import { existsSync } from 'fs';

describe('Test get image path', () => {
  it('Get the image path', () => {
    const folder = 'testFolder';
    const fileName = 'testFileName';
    const imagePath = getImagePath(folder, fileName);
    const expectedPath: string = path.join(
      __dirname,
      `../../../${folder}`,
      `${fileName}.jpg`
    );
    expect(imagePath).toContain(`${fileName}.jpg`);
    expect(expectedPath).toEqual(imagePath);
  });
});

describe('Test processing Image', () => {
  it('Test the image should be resized successfully', async () => {
    const imagePath: string = path.join(
      __dirname,
      `../../../images`,
      `icelandwaterfall.jpg`
    );
    const imageFile: ImageFile = {
      filename: 'icelandwaterfall',
      width: 200,
      height: 300
    };
    const outputFileName: string = path.join(
      __dirname,
      `../../../thumbs`,
      `icelandwaterfall_200_300.jpg`
    );
    const result = await resizeImage(imagePath, imageFile, outputFileName);
    const isExistingFile = existsSync(outputFileName);
    expect(result).not.toBeNull();
    expect(isExistingFile).toBeTruthy();
  });
});
