import { DeleteObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import config from "../../config/config.js";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import helper from "../../helper/common.js";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: config.cloud.digitalocean.endpoint,
  region: config.cloud.digitalocean.region,
  credentials: {
    accessKeyId: config.cloud.digitalocean.credentials.accessKeyId,
    secretAccessKey: config.cloud.digitalocean.credentials.secretAccessKey,
  },
});

// upload file
const uploadFile = async ({ mimetype, buffer, ACL = "public-read" }) => {
  const prefix = config.cloud.digitalocean.rootDirname;
  const uuid = uuidv4();
  const extension = mime.extension(mimetype);

  const fileKey = `${prefix}/${uuid}.${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.cloud.digitalocean.bucketName,
      Key: fileKey,
      Body: buffer,
      ACL: ACL,
    })
  );

  return config.cloud.digitalocean.baseUrl + "/" + fileKey;
};

// update file
const updateFile = async ({ url, mimetype, buffer, ACL = "public-read" }) => {
  try {
    const newFileKey = await uploadFile({
      buffer: buffer,
      mimetype: mimetype,
      ACL,
    });

    if (url) {
      const fileKey = helper.extractFileKey(url);
      await deleteFile({
        fileKey: fileKey,
      });
    }

    return config.cloud.digitalocean.baseUrl + "/" + newFileKey;
  } catch (error) {
    console.log(error);
  }
};

// delete file
const deleteFile = async ({ fileKey }) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.cloud.digitalocean.bucketName,
      Key: fileKey,
    })
  );

  return config.cloud.digitalocean.baseUrl + "/" + fileKey;
};

export default {
  uploadFile,
  deleteFile,
  updateFile,
};
