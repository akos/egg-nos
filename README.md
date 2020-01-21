# akos-egg-nos

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-nos.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-nos
[travis-image]: https://img.shields.io/travis/eggjs/egg-nos.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-nos
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-nos.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-nos?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-nos.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-nos
[snyk-image]: https://snyk.io/test/npm/egg-nos/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-nos
[download-image]: https://img.shields.io/npm/dm/egg-nos.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-nos

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
```js
 const result = await this.app.nos.uploadFile(__dirname + '/home.js');
返回:
{
  statusCode: 200,
  headers: {
    date: 'Tue, 21 Jan 2020 07:10:12 GMT',
    'content-type': 'application/javascript',
    'content-length': '0',
    connection: 'close',
    'x-nos-request-id': '5245eb29-fb6e-4e38-b30d-a15494f55b91',
    'x-nos-requesttype': 'PutObject',
    'x-nos-object-name': 'home_3fa36420c26b4f469c7bbc7ef1594402.js',
    etag: '7026e4bda37cf12fb33b15548ae645be',
    'x-nos-storage-class': 'STANDARD',
    server: 'nos/v1.0.0'
  },
  file_key: 'home_3fa36420c26b4f469c7bbc7ef1594402.js'//文件名
}
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
