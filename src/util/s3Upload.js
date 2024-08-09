import AWS from "aws-sdk";

export const uploadS3 = async (file) => {
  const REGION = process.env.REACT_APP_REGION;
  const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

  AWS.config.update({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      ACL: "public-read",
      Bucket: BUCKET_NAME,
      Key: `proma-files/${file.name}`,
      Body: file,
      ContentType: file.type,
    },
  });

  try {
    const data = await upload.promise();
    console.log("Upload 성공:", data);
    return data.Location;
  } catch (err) {
    console.error("Upload 실패:", err);
    throw err;
  }
};
