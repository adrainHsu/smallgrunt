module.exports = function(grunt){
    //省事的插件，有了这个可以不用写一堆的 grunt.loadNpmTasks('xxx')
    require('load-grunt-tasks')(grunt);

    //如果要使用 time-grunt 插件
    require('time-grunt')(grunt);


    //构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg:grunt.file.readJSON('package.json'),

        //connect
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '../'  //主目录
                    ]
                }
            }
        },

        //grunt任务配置－－压缩js
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name%> <%= grunt.template.today("yyyy-mm - dd") %> */\n'
            },
            //具体任务配置
            build:{
                //源文件位置
                src: '../js/xxy.js',
                //目标文件
                dest: '../js/xxy.min.js'
            }
        },

        // imagemin插件的配置信息－－压缩图片
        imagemin: {
            dynamic:{
                files:[{
                    expand: true,
                    cwd:    '../img',                   //图片原始路径
                    src:    ['**/*.{png,jpg,gif}'],  //图片格式，注找到图片根目录上级再**/*
                    dest:   '../optiimg/'               //优化后的路径
                }]
            }
        },

        //sass生成css文件
        sass:{
            dist:{
                options:{
                    style: 'expanded'
                },
                files:{
                    '../css/xxy.css':'../sass/xxy.scss'    //可以写多条
                }
            }
        },

        //autoprefixer给样式加前缀如-web-kit-等
        autoprefixer:{
            dist:{
                options:{
                    browsers: ['> 1%']
                },
                files:{
                    '../css/xxy.css':'../css/xxy.css'
                }
            }
        },

        // watch插件的配置信息－－自动执行
        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },

                files: [  //下面文件的改变就会实时刷新网页
                    '../**/*.html',
                    '../sass/**/*.scss',
                    '../css/**/*.css',
                    '../js/**/*.js',
                    '../img/**/*.{png,jpg,gif}'
                ]
            },
            scripts:{
                files: ['../js/xxy.js'],
                asks: ['uglify'],
                options: {  spawn:false }
            },
            images: {
                files:['../img/**/*.{png,jpg,gif}'],
                tasks:['imagemin'],
                options:{spawn:false}
            },
            sass:{
                files:['../sass/xxy.scss'],
                tasks:['sass'],
                options:{spawn:false}
            },
            styles:{
              files:['../css/xxy.css'],
              tasks:['autoprefixer'],
              options:{spawn:true}
            }


        }
    });



    //告诉grunt我们将使用插件
    /*
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    */

    //告诉命令窗口grunt时候执行的任务
    grunt.registerTask('default',[
        //'connect:server',
        'uglify',
        'imagemin',
        'sass',
        'autoprefixer',
        'watch'
    ]);

}

/*
 CSS文件压缩合并: CssMinify
 压缩图片：      imagemin
 去掉注析、换行符:htmlMin
 合并文件：grunt-contrib-concat
 语法检查：grunt-contrib-jshint
 Scss 编译：grunt-contrib-sass
 压缩文件：grunt-contrib-uglify
 监听文件变动：grunt-contrib-watch
 建立本地服务器：grunt-contrib-connect

*/