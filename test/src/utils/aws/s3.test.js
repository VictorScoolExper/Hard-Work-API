/* Green Work ERP by Victor Martinez */

import { vi, test, describe, it, expect, beforeAll, beforeEach } from "vitest";

import {
  addObjectS3Bucket,
  createSignedUrls,
  updateS3ObjectBucket,
  deleteObjectS3Bucket,
} from "../../../../src/utils/aws/s3.js";

// Added because weird error when checking functions we called
// seems to be that when mocks are created, spy arent properly set up
import crypto from "crypto";
import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

describe("s3", () => {
  // Mocks
  vi.mock("@aws-sdk/client-s3", () => {
    const S3Client = vi.fn();
    S3Client.prototype.send = vi.fn(() => {
      return;
    });
    const PutObjectCommand = vi.fn();
    const GetObjectCommand = vi.fn();
    const DeleteObjectCommand = vi.fn();

    return {
      S3Client,
      PutObjectCommand,
      GetObjectCommand,
      DeleteObjectCommand,
    };
  });
  vi.mock("@aws-sdk/s3-request-presigner", () => {
    const getSignedUrl = vi.fn(() => {
      return 'fake_url.com';
    });

    return {
      getSignedUrl,
    };
  });
  vi.mock("crypto", () => {
    return {
      default: {
        randomBytes: vi.fn(() => {
          return "name-crypto-random-data";
        }),
      },
    };
  });

  vi.mock("../../configs/config.js", () => {
    return {
      aws: {
        bucketName: "testBucketName",
        bucketRegion: "testBucketRegion",
        accessKey: "testAccesKey",
        secretAccessKey: "secretAccessKey",
      },
    };
  });

  // mocked variables
  const expected = "name-crypto-random-data";
  const buffer = Buffer.from("image_data");
  const file = {
    mimetype: "image/jpeg",
  };

  const s3 = new S3Client({
    credentials: {
      accessKeyId: "testAccessKey",
      secretAccessKey: "testSecretAccessKey",
    },
    region: "testBucketRegion",
  });

  describe("addObjectS3Bucket", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should add an object to s3", async () => {
      const imageName = await addObjectS3Bucket(buffer, file);

      expect(imageName).toEqual(expected);
    });

    it("should execute the crypto.randomBytes", async () => {
      await addObjectS3Bucket(buffer, file);

      expect(crypto.randomBytes).toBeCalled();
    });

    it("should execute PutObjectCommand method", async () => {
      await addObjectS3Bucket(buffer, file);

      expect(PutObjectCommand).toBeCalled();
    });

    it("should execute s3.send method", async () => {
      await addObjectS3Bucket(buffer, file);

      expect(s3.send).toBeCalled();
    });

    it("should through an error if s3.send fails", async () => {
      const fakeError = new Error("s3.send Error");
      s3.send.mockRejectedValueOnce(fakeError);

      await addObjectS3Bucket(buffer, file);

      setTimeout(() => {
        expect(s3.send).toThrowError();
      }, 2000);
    });
  });

  describe("createSignedUrls", () => {
    const fakeParamsList = [
      {
        image_name: 'testImage1'
      },
      {
        image_name: 'testImage2'
      },
      {
        image_name: 'testImage3'
      }
    ];

    const expectedList = [
      {
        image_name: 'testImage1',
        imageUrl: 'fake_url.com'
      },
      {
        image_name: 'testImage2',
        imageUrl: 'fake_url.com'
      },
      {
        image_name: 'testImage3',
        imageUrl: 'fake_url.com'
      }
    ];

    it('should it should return a list with the image property', async () => {
      const response = await createSignedUrls(fakeParamsList);
      
      expect(response).toStrictEqual(expectedList);
    });

    it('should execute the method getSignedUrl', async () => {
      const command = new GetObjectCommand()

      await createSignedUrls(fakeParamsList);

      expect(getSignedUrl).toBeCalledWith(s3, expect.any(Object), { expiresIn: 1000 });
      expect(getSignedUrl).toBeCalled();
    });

    it('should execute the GetObjectCommand', async () => {
      await createSignedUrls(fakeParamsList);

      expect(GetObjectCommand).toBeCalledWith(expect.any(Object));
      expect(GetObjectCommand).toBeCalled();
    })
  });

  describe("updateS3ObjectBucket", () => {
    const image_name = 'fakeImageName';
   
    it('should return an object', async () => {
      const response = await updateS3ObjectBucket(image_name, file, buffer);

      expect(response).toEqual({msg: 'updated!', status: '200'});
    });

    it('should execute the PutObjectCommand and s3.send method', async () => {

      await updateS3ObjectBucket(image_name, file, buffer);

      expect(PutObjectCommand).toBeCalled();
      expect(s3.send).toBeCalled();
    })
  });

  describe('deleteObjectS3Bucket', () => {
    const objectKey = '123KeyTest';
    
    it('should execute the DeleteObjectCommand and S3Client.send', async () => {
      await deleteObjectS3Bucket(objectKey);

      expect(DeleteObjectCommand).toBeCalled();
      expect(s3.send).toBeCalled();
    });
    it('should return a 200 response', async () => {
      const response = await deleteObjectS3Bucket(objectKey);

      expect(response).toStrictEqual({msg: 'deleted correctly', status: 200});
    })
  })
});


