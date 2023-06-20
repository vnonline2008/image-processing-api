import path from 'path';
import sharp from 'sharp';

export interface ImageFile {
  filename: string;
  width: number;
  height: number;
}

export const IMAGES_FOLDER = 'images';
export const THUMB_FOLDER = 'thumbs';

/**
 * Get image path
 * @param folder folder name
 * @param fileName file name
 * @returns current image path
 */
export function getImagePath(folder: string, fileName: string): string {
  return path.join(__dirname, `../../${folder}`, `${fileName}.jpg`);
}

/**
 * Resize image
 * @param imagePath image path in folder images
 * @param imageFile include filename, width, height
 * @param outputFileName new file name in folder thumbs
 * @returns file name on folder thumbs (for caching purpose)
 */
export async function resizeImage(
  imagePath: string,
  imageFile: ImageFile,
  outputFileName: string
): Promise<sharp.OutputInfo> {
  try {
    return await sharp(imagePath)
      .resize({
        width: imageFile.width,
        height: imageFile.height
      })
      .toFile(outputFileName);
  } catch (error: unknown) {
    throw error;
  }
}
