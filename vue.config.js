module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    pages:{
        
        index:{
            entry:'src/main.js',
            template:'public/index.html',
            filename:'index.html',
            title:"首页"
        },
        action:{
            entry:'src/action.js',
            template:'public/action.html',
            filename:'action.html',
            title:"首页"
        }
    }
}
