# akos-egg-nos

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/akos-egg-nos.svg?style=flat-square
[npm-url]: https://npmjs.org/package/akos-egg-nos
[travis-image]: https://img.shields.io/travis/eggjs/akos-egg-nos.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/akos-egg-nos
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/akos-egg-nos.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-nos?branch=master
[david-image]: https://img.shields.io/david/eggjs/akos-egg-nos.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/akos-egg-nos
[snyk-image]: https://snyk.io/test/npm/akos-egg-nos/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/akos-egg-nos
[download-image]: https://img.shields.io/npm/dm/akos-egg-nos.svg?style=flat-square
[download-url]: https://npmjs.org/package/akos-egg-nos

<!--
Description here.
-->

## Install

```bash
$ npm i akos-egg-nos --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.nos = {
  enable: true,
  package: 'akos-egg-nos',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.nos = {
  accessId: '', // accessId
  secretId: '', // secretId
  endpoint: '', // eg:nos-eastchina1.126.net
  bucket: '', // testnos
  port: '', // eg: 80, 443
  rmFile: '',// 是否删除上报源文件
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->
```
// 上传文件至nos
 const result = await this.app.nos.uploadFile(__dirname + '/home.js');
返回:
{
    "code":200,
    "result":{
        "statusCode":200,
        "headers":{
            "date":"Wed, 22 Jan 2020 03:09:52 GMT",
            "content-type":"text/plain",
            "content-length":"0",
            "connection":"close",
            "x-nos-request-id":"b0f88003-f2cb-4a46-a01e-cfd7acede85f",
            "x-nos-requesttype":"PutObject",
            "x-nos-object-name":"test_dfb57d12fe50453ca10e9ae06ef6d643.txt",
            "etag":"c8e0a8b69178a6f9c8f2d926be0aff18",
            "x-nos-storage-class":"STANDARD",
            "server":"nos/v1.0.0"
        },
        "file_key":"test_dfb57d12fe50453ca10e9ae06ef6d643.txt"
    },
    "requestId":"39c4031d-15c7-4e6f-bf8a-4d43a86e1f91",
    "machine":"lgfshrdeMacBook-Pro.local"
}
// 获取文件地址
 const key = 'test_358.txt';
 const result = this.app.nos.getPrivateObjectUrl('testnos', key, 10 * 60 * 1000);
 eg: result-> https://testnos.nos-eastchina1.126.net/test_358.txt?Signature=xxx&Expires=1579662403&NOSAccessKeyId=xxx
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
