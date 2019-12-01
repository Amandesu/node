
const userService = require('./../services/user')
const { createSucResult, createFailResult } = require("../utils/createResult")


// 注册
const register = async (ctx) => {
    let formData = ctx.request.body;
    let loginResult = await userService.queryUserByName({username:formData.username} );
    console.log(loginResult)
    if (loginResult && loginResult.length) {
        ctx.body = createFailResult({message:"该账户已注册"});
        return;
    }
    let registerResult = await userService.register( formData );
    if (registerResult) {
        ctx.body = createSucResult({message:"注册成功"})
    } else {
        ctx.body = createFailResult({});
    }
}

// 登录
const login = async (ctx) => {
    let formData = ctx.request.body;
    let userResult = await userService.login( formData );

    if (userResult && userResult[0]) {
        ctx.session.user = userResult[0];
        ctx.body = createSucResult({})
    } else {
        ctx.body = createFailResult({message:"登录失败"})
    }
   
}
// 根据关键字查询多个用户
const queryUsersLikeName =  async (ctx) => {
    let result = {};
    let formData = ctx.query
    let userResults = await userService.queryUsersLikeName( formData );
    if (userResults && userResults[0]) {
        userResults.forEach(result => result.createTime = +new Date(result.createTime))
        ctx.body =  createSucResult({
            data:userResults
        })
    } 
    
}

module.exports = {
    register,
    login,
    queryUsersLikeName
}