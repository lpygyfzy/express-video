const crypto = require('crypto');

function md5(value) {
    // 创建 MD5 哈希对象
    const hash = crypto.createHash('md5');
    // 更新哈希对象的内容
    hash.update(value);
    // 获取十六进制表示的哈希值
    return hash.digest('hex');
}

module.exports = md5;