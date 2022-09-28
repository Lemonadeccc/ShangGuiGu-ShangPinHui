import { v4 as uuidv4 } from 'uuid';
//要生成一个随即的祖符串，并且每次执行不能发生变化，而且游客身份持久储存
export const getUUID = () => {
    //先从本地存储获取uuid（看一肖本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有我生成
    if(!uuid_token){
        //生成临时游客身份
        uuid_token = uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    //切记有返回值，没有返回值undefined
    return uuid_token;

    //有问题的考虑 1、userTempId是否正确 2、重新跑一次项目3、uuid看下是不是准确传上去了
}