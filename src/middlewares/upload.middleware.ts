import path from 'path'
import fs from 'fs'
import multer from 'multer'
import type { Request } from 'express'

export class UploadImgMiddleware {
  static uploadImg(folder: string) {
    const uploadPath = path.join(process.cwd(), 'uploads', folder)

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, uploadPath)
      },
      filename: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        const name = path
          .basename(file.originalname, ext)
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
        const unique = `${Date.now()}-${name}${ext}`
        callback(null, unique)
      },
    })

    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      callback: multer.FileFilterCallback
    ) => {
      const allowed = ['image/jpeg', 'image/png', 'image/jpg']
      if (!allowed.includes(file.mimetype)) {
        return callback(new Error('Only JPEG and PNG images are allowed'))
      }
      callback(null, true)
    }

    return multer({
      storage,
      fileFilter,
      limits: { fileSize: 3 * 1024 * 1024 },
    })
  }

  static uploadImgProduct = [
    UploadImgMiddleware.uploadImg('product').single('image'),
  ]

  static uploadAvatar = [
    UploadImgMiddleware.uploadImg('profile').single('avatar'),
  ]
}
