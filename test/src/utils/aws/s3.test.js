/* Green Work ERP by Victor Martinez */

import * as dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as config from '../../configs/config.js';


import crypto from 'crypto';
import { vi, test, describe, it, expect, beforeAll, beforeEach } from 'vitest';

import {
  addObjectS3Bucket,
  createSignedUrls,
  updateS3ObjectBucket,
  deleteObjectS3Bucket,
} from '../../../../src/utils/aws/s3.js';

vi.mock('@aws-sdk/client-s3', () => {
  const S3Client = vi.fn()
});

vi.mock('@aws-sdk/s3-request-presigner', () => {

});


vi.mock('crypto');

vi.mock('PutObjectCommand', (params) => {
  return params.Key;
});

vi.spyOn(crypto, 'randomBytes');

vi.mock('../../configs/config.js', {
  aws: {
    bucketName: 'testBucketName',
    bucketRegion: 'testBucketRegion',
    accessKey: 'testAccesKey',
    secretAccessKey: 'secretAccessKey',
  },
});

describe('s3', () => {
  describe('addObjectS3Bucket', () => {
    const buffer = Buffer.from('image_something');
    const file = {
      mimetype: 'image/jpeg',
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should add an object to s3', async () => {
      const imageName = await addObjectS3Bucket(buffer, file);

      expect(imageName).toEqual('name-crypto-random-data');
    });

    // it('should execute the crypto.randomBytes', async () => {
    //     await addObjectS3Bucket(buffer, file);

    //     expect(crypto.randomBytes).toBeCalled();
    // });

    // it('should execute PutObjectCommand method', async () => {
    //     // const PutObjectCommandSpy = vi.spyOn(PutObjectCommand, 'constructor');

    //     await addObjectS3Bucket(buffer, file);

    //     expect(PutObjectCommand).toBeCalled();
    // });
  });
});



// 1) Crear prueba de funcion
// 2) Look what needs to be mocked (step by step)
// 3) Mock one thing