const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFun = async (c) => { 
     //连接数据库
     await client.connect()
     //打开集合
     const db = client.db('mytest')
     //打开子项
     return db.collection(c)
} 

const main = async () => { 
    const cc = await clientFun('cc')
    //查询子项内容
    //var d = await cc.find()

    //写入数据
    //var d = await cc.insertOne({username:'lisi',age:16})
    // var d = await cc.insertMany([
    //     {username:'li1',age:16},
    //     {username:'li2',age:17},
    //     {username:'li3',age:18}
    // ])
    //更新数据
    //var d = await cc.updateOne({age:{$gt:15}},{$set:{username:'lisi'}})
    //var d = await cc.updateMany({age:{$gt:15}},{$set:{username:'lisi'}})
    //删除数据
    //var d = await cc.deleteOne({age:{$gt:15}})
    var d = await cc.deleteMany({age:{$gt:16}})
    //打印
    console.log(d);
}
main().finally(() => client.close())