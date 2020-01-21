'use strict';

const uuid = require('node-uuid');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
module.exports = app => {
  const defaultConfig = {
    accessId: '',
    secretId: '',
    endpoint: '',
    port: '80',
  };
  const config = app.config.nos;
  app.nos = {};
  app.nos.nosClient = config.nosClient || require('nos-node-sdk');
  const nosClient = loadNosClient(Object.assign({}, defaultConfig, config));

  function loadNosClient(config = {}) {
    if (!config.secretId || !config.accessId || !config.endpoint) {
      throw new Error('please check config->accessId,secretId,endpoint');
    }
    console.log(config);
    const nosClient = new app.nos.nosClient();
    nosClient.setAccessId(config.accessId);
    nosClient.setSecretKey(config.secretId);
    nosClient.setEndpoint(config.endpoint);
    nosClient.setPort(config.port);
    return nosClient;
  }

  app.nos.uploadFile = async function(filepath) {
    const config = app.config.nos;
    const ext = path.extname(filepath);
    const file_key = uuid.v4() + ext;
    const map = {
      bucket: config.bucket, // 桶名
      key: file_key, // 对象名
      filepath,
    };
    const result = await new Promise(resolve => {
      try {
        nosClient.put_file(map, result => {
          if (result.statusCode === 200) {
            resolve(true);
          } else {
            resolve(null);
          }
        });
      } catch (err) {
        app.logger.error(err);
        resolve(null);
      }
    });
    if (config.rmFile) {
      _rmFile(filepath);
    }
    return result;
  };

  function _rmFile(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      app.logger.info(error);
    }
  }

  app.nos.getPrivateObjectUrl = function(bucketName, key, expire) {
    if (!bucketName || !key || !expire) {
      throw new Error('config is not right');
    }
    const config = app.config.nos;
    const httpVerb = 'GET';
    const resourcePath = `/${bucketName}/${encodeURI(key)}`;
    const expiration = parseInt((new Date().getTime() + expire) / 1000);
    const message = `${httpVerb}\n\n\n${expiration}\n${resourcePath}`;
    const secretMessage = crypto.createHmac('SHA256', config.secretKey).update(message).digest('base64');
    return `https://${config.bucket}.${config.endpoint}/${encodeURI(key)}?Signature=${encodeURIComponent(secretMessage)}&Expires=${expiration}&NOSAccessKeyId=${config.accesskey}`;
  };
};
