import express from 'express';
import {
  getImagePath,
  ImageFile,
  THUMB_FOLDER
} from '../../utils/helper.utils';
import { existsSync } from 'fs';

export const validateThumbs = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): unknown => {
  try {
    const filename = req.query?.filename as unknown as string;
    const width = req.query?.width as unknown as number;
    const height = req.query?.height as unknown as number;

    if (!filename || !width || !height) {
      throw new Error('Invalid input');
    } else if (width <= 0 || height <= 0) {
      throw new Error(
        `Can not resize image with width ${width}px and ${height}px`
      );
    }

    const fileNameResized = `${filename}_${width}_${height}`;
    const thumbsPath: string = getImagePath(THUMB_FOLDER, fileNameResized);

    if (existsSync(thumbsPath)) {
      return res.sendFile(thumbsPath);
    }
    const data: ImageFile = {
      filename: filename,
      width: Number(width),
      height: Number(height)
    };
    req.imageFile = data;
    next();
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : 'Unknown Error';
    return res.status(400).send(message);
  }
};
