/* Green Work ERP by Victor Martinez */

import { vi, test, describe, it, expect, beforeAll, beforeEach } from 'vitest';

import {
  addObjectS3Bucket,
  createSignedUrls,
  updateS3ObjectBucket,
  deleteObjectS3Bucket,
} from '../../../../src/utils/aws/s3.js';

// Mocks
vi.mock('@aws-sdk/client-s3', () => {
  const S3Client = vi.fn(() => ({
    send: vi.fn(() => {
      return;
    }),
  }));
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
vi.mock('@aws-sdk/s3-request-presigner', () => {
  const getSignedUrl = vi.fn();

  return {
    getSignedUrl,
  };
});
vi.mock('crypto', () => {
  return {
    default: {
      randomBytes: vi.fn(() => {
        return 'name-crypto-random-data';
      }),
    },
  };
});

vi.mock('../../configs/config.js', () => {
  return {
    aws: {
      bucketName: 'testBucketName',
      bucketRegion: 'testBucketRegion',
      accessKey: 'testAccesKey',
      secretAccessKey: 'secretAccessKey',
    },
  };
});

// Spies
const expected = 'name-crypto-random-data';
// vi.spyOn(crypto, 'randomBytes').mockReturnValue(expected);

describe('s3', () => {
  describe('addObjectS3Bucket', () => {
    const buffer = Buffer.from('image_data');
    const file = {
      mimetype: 'image/jpeg',
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should add an object to s3', async () => {
      const imageName = await addObjectS3Bucket(buffer, file);

      expect(imageName).toEqual(expected);
    });

    it('should execute the crypto.randomBytes', async () => {
      await addObjectS3Bucket(buffer, file);

      expect(crypto.randomBytes).toBeCalled();
    });

    it('should execute PutObjectCommand method', async () => {
      await addObjectS3Bucket(buffer, file);

      expect(PutObjectCommand).toBeCalled();
    });

    // it('should execute s3.send method', async () => {
    //   await addObjectS3Bucket(buffer, file);

    //   expect(S3Client).toBeCalled();
    // });
  });
});

// 1) Crear prueba de funcion
// 2) Look what needs to be mocked (step by step)
// 3) Mock one thing
