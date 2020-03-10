'use strict';

const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const intoStream = require('into-stream');
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
  app.nos.loadNosClient = function loadNosClient(config = {}) {
    if (!config.secretId || !config.accessId || !config.endpoint) {
      throw new Error('please check config->accessId,secretId,endpoint');
    }
    const nosClient = new app.nos.nosClient();
    nosClient.setAccessId(config.accessId);
    nosClient.setSecretKey(config.secretId);
    nosClient.setEndpoint(config.endpoint);
    nosClient.setPort(config.port);
    return nosClient;
  };

  const nosClient = app.nos.loadNosClient(Object.assign({}, defaultConfig, config));

  app.nos.uploadText = async function uploadFile(key, content, hash) {
    const config = app.config.nos;

    if (hash) { // 给文件带 hash
      const ext = path.extname(key);
      const basename = path.basename(key, ext);
      key = `${basename}_${uuid.v4().replace(/-/g, '')}${ext}`;
    }

    const result = await new Promise((resolve, reject) => {
      try {
        nosClient.put_object_stream(Object.assign({
          bucket: config.bucket,
          key,
          body: intoStream(content),
          length: content.length,
        }), result => {
          result.bucket = config.bucket;
          result.endpoint = config.endpoint;
          result.port = config.port;
          result.key = key;
          if (result.statusCode === 200) {
            resolve(result);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        app.logger.error(err);
        reject(err);
      }
    });
    return result;
  };

  app.nos.uploadFile = async function uploadFile(filepath, key, hash) {
    const config = app.config.nos;

    if (!key) { key = path.basename(filepath); }
    if (hash) { // 给文件带 hash
      const ext = path.extname(key);
      const basename = path.basename(key, ext);
      key = `${basename}_${uuid.v4().replace(/-/g, '')}${ext}`;
    }

    const result = await new Promise((resolve, reject) => {
      try {
        nosClient.put_file(Object.assign({
          bucket: config.bucket,
          key,
          filepath,
        }), result => {
          result.bucket = config.bucket;
          result.endpoint = config.endpoint;
          result.port = config.port;
          result.key = key;
          if (result.statusCode === 200) {
            resolve(result);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        app.logger.error(err);
        reject(err);
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
    const config = app.config.nos;
    bucketName = bucketName || config.bucket;
    expire = expire || 120 * 60 * 1000;
    if (!bucketName || !key || !expire) {
      throw new Error('config is not right');
    }
    const httpVerb = 'GET';
    const resourcePath = `/${bucketName}/${encodeURI(key)}`;
    const expiration = parseInt((new Date().getTime() + expire) / 1000);
    const message = `${httpVerb}\n\n\n${expiration}\n${resourcePath}`;
    const secretMessage = crypto.createHmac('SHA256', config.secretId).update(message).digest('base64');
    return `https://${config.bucket}.${config.endpoint}/${encodeURI(key)}?Signature=${encodeURIComponent(secretMessage)}&Expires=${expiration}&NOSAccessKeyId=${config.accessId}`;
  };
};
