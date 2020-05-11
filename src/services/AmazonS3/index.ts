import {
	S3_ACCESS_KEY,
	S3_SECRET_KEY,
	AVATAR_BUCKET_NAME,
} from "../../util/secrets";
import { S3_BUCKET_PERMISSIONS, CACHE_CONTROL } from "./utils";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
	accessKeyId: S3_ACCESS_KEY,
	secretAccessKey: S3_SECRET_KEY,
});

const getOneYearFromNow = () => {
	const oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
	return oneYearFromNow;
};

export const uploadFile = async (
	fileName: string,
	buffer: Buffer
): Promise<string> => {
	return new Promise((resolve, reject) => {
		s3.upload(
			{
				Bucket: AVATAR_BUCKET_NAME,
				Key: fileName,
				Body: buffer,
				ACL: S3_BUCKET_PERMISSIONS,
				CacheControl: CACHE_CONTROL,
				Expires: getOneYearFromNow(),
			},
			(error, data) => {
				if (error) reject();
				resolve(data.Location);
			}
		);
	});
};
