<template>
    <div class="login-container">

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                 label-position="left">

            <div class="title-container">
                <h3 class="title">{{ $t('login.title') }}</h3>
                <lang-select class="set-language"/>
            </div>

            <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
                <el-input
                        v-model="loginForm.username"
                        placeholder="输入手机号"
                        name="username"
                        type="text"
                        auto-complete="on"
                />
            </el-form-item>


            <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
                <el-input
                        :type="passwordType"
                        v-model="loginForm.password"
                        placeholder="输入密码"
                        name="password"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"/>
                <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
            </el-form-item>


            <el-form-item prop="mobileCode">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
                <el-input

                        v-model="loginForm.mobileCode"
                        placeholder="手机验证码"

                        auto-complete="on"
                />


            </el-form-item>


            <!--<el-form-item label="手机验证码" prop="mobileCode">-->
            <!--<el-input v-model="loginForm.mobileCode"-->
            <!--style="width: 50%;margin-right: 20px;"></el-input>-->

            <!--</el-form-item>-->
            <!---->

            <el-button class="btn" type="primary" :disabled="btnMobileDisabled" @click="sendMobileCode" style="">
                {{mobileSendText}}
            </el-button>
            <br>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                       @click.native.prevent="handleLogin">{{ $t('login.logIn') }}
            </el-button>

            <div class="tips">
                <span>{{ $t('login.username') }} : admin</span>
                <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
            </div>
            <div class="tips">
                <span style="margin-right:18px;">{{ $t('login.username') }} : editor</span>
                <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
            </div>

            <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{ $t('login.thirdparty') }}
            </el-button>
        </el-form>

        <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
            {{ $t('login.thirdpartyTips') }}
            <br>
            <br>
            <br>
            <social-sign/>
        </el-dialog>

    </div>
</template>

<script>
    import {isvalidUsername} from '@/utils/validate'
    import LangSelect from '@/components/LangSelect'
    import SocialSign from './socialsignin'
    import {validMobileCodeApi, userLoginApi, sendMobileCodeApi} from "../../api/article";
    import {setToken, setTokenKey} from "../../utils/auth";

    export default {
        name: 'Login',
        components: {LangSelect, SocialSign},
        data() {
            const validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter the correct user name'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 5) {
                    callback(new Error('The password can not be less than 5 digits'))
                } else {
                    callback()
                }
            }
            return {

                btnMobileDisabled: false,
                mobileSendText: "免费获取手机验证码",
                loginForm: {
                    username: '13273091192',
                    password: "091192",
                    mobileCode: "091192"
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false,
                redirect: undefined,
                // 可以登录的用户列表
                userList: [
                    {
                        username: '13273091192',
                        password: '091192'
                    }, {
                        username: '18637171855',
                        password: '171855'
                    }, {
                        username: '18749422377',
                        password: '422377'
                    }, {
                        username: '17337122077',
                        password: '122077'
                    }, {
                        username: '17839908056',
                        password: '908056'
                    }
                ]
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }

        },
        created() {
            // window.addEventListener('hashchange', this.afterQRScan)
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan)
        },
        methods: {

            // 发送验证码
            sendMobileCode() {
                if (!/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.loginForm.username)) {
                    this.$message.error('请输入正确手机号');
                    return;
                }
                this.btnMobileDisabled = true;

                this.sendMobileTime(60);

                // 请求获取手机验证码
                sendMobileCodeApi({
                    mobile: this.loginForm.username
                }).then(response => {

                    this.$message.success(response.data.msg)
                })
            },

            //发送手机验证码倒计时
            sendMobileTime(countdown) {
                if (countdown === 0) {
                    this.mobileSendText = "免费获取手机验证码";
                    this.btnMobileDisabled = false;
                    return;
                } else {
                    this.mobileSendText = "重新发送" + countdown + "s";
                    countdown--;
                }
                var _this = this;
                setTimeout(function () {
                    _this.sendMobileTime(countdown)
                }, 1000)
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        // let flag = false
                        // if (loginForm.username == )
                        // this.userList.forEach((obj) => {
                        //     if (this.loginForm.username === obj.username && this.loginForm.password === obj.password) {
                        // console.log("this.loginForm:", this.loginForm);
                        // console.log("obj:", obj);
                        // 效验验证码

                        userLoginApi(this.loginForm).then(response => {
                            console.log(":response", response);


                            // 登录成功存储服务端返回的token 到 本地缓存中
                            // localStorage.setItem("jwt", JSON.stringify(response.data.data))
                            setTokenKey('jwt', JSON.stringify(response.data.data))

                            this.loginIndex()
                            this.loading = false


                        })


                        this.loading = false

                        // .catch(() => {
                        // this.$message.error("你输入的用户名和密码不正确");
                        // this.loading = false
                        // })
                        // validMobileCodeApi(this.loginForm).then(response => {
                        //     console.log(":response", response);
                        //     this.loginIndex()
                        //     return
                        // }).catch(()=>{
                        // this.$message.error("你输入的用户名和密码不正确");
                        // this.loading = false
                        // })

                        // this.loginIndex()
                        // }
                        // })

                        // if (!flag) {

                        // }

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            // 登录
            loginIndex() {

                console.log("login:");


                // console.log("this.loginForm:", this.loginForm);

                localStorage.setItem('username', this.loginForm.username)

                console.log("1:", 1);

                // this.$router.push({path: this.redirect || '/'})
                // this.$store.dispatch('LoginByUsername', {
                //     username: 'admin',
                //     password: 'admin'
                // }).then(() => {
                //     this.loading = false
                // console.log("11111:", 11111);
                // this.$router.push({path: this.redirect || '/'})
                // }).catch(() => {
                //     this.loading = false
                // })
                this.$store.commit('SET_TOKEN', 'admin')
                setToken('admin')

                this.$router.push({path: this.redirect || '/'})

            },
            afterQRScan() {
                // const hash = window.location.hash.slice(1)
                // const hashObj = getQueryObject(hash)
                // const originUrl = window.location.origin
                // history.replaceState({}, '', originUrl)
                // const codeMap = {
                //   wechat: 'code',
                //   tencent: 'code'
                // }
                // const codeName = hashObj[codeMap[this.auth_type]]
                // if (!codeName) {
                //   alert('第三方登录失败')
                // } else {
                //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
                //     this.$router.push({ path: '/' })
                //   })
                // }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #eee;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
            &::first-line {
                color: $light_gray;
            }
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        .btn {
            margin-bottom: 10px;
        }
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 520px;
            max-width: 100%;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
            .set-language {
                color: #fff;
                position: absolute;
                top: 5px;
                right: 0px;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>
