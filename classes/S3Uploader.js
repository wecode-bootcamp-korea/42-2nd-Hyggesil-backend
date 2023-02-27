require('dotenv').config()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

class S3Uploader {
  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      },
      region: process.env.AWS_S3_REGION,
      bucket: process.env.AWS_S3_BUCKET
    })
  }

  async upload(imageBuffer) {
    const uuid = uuidv4()
    const params = {
      Bucket: this.client.config.bucket,
      Key: uuid,
      Body: imageBuffer
    }

    const command = new PutObjectCommand(params)
    try {
      await this.client.send(command)
      const uploadedURL = path.join(this.client.config.bucket, uuid)
      return uploadedURL
    } catch (err) {
      throw new Error('FAILED_TO_UPLOAD')
    }
  }

  async uploadLocalFile(directory, hotelId, fileName, tableName) {
    const localFilePath = getLocalFilePath(directory, hotelId, fileName)
    try {
      const imageBuffer = fs.readFileSync(localFilePath)
      const uploadPath = path.join(tableName, hotelId, fileName)

      const params = {
        Bucket: this.client.config.bucket,
        Key: uploadPath,
        Body: imageBuffer
      }

      const command = new PutObjectCommand(params)
      try {
        await this.client.send(command)
        const url = path.join(process.env.AWS_S3_HOSTNAME, uploadPath)
        console.log(`image is uploaded ${url}`)
        return url
      } catch (err) {
        throw new Error('FAILED_TO_UPLOAD')
      }

    } catch (err) {
      console.log(err)
    }
  }
}

const getLocalFilePath = (directory, hotelId, fileName) => {
  if (!directory || !hotelId || !fileName) {
    throw new Error('UNDEFINED_PATH')
  }

  const localFilePath = path.resolve(
    path.join(directory, hotelId, fileName)
  )

  return localFilePath
}

module.exports = S3Uploader