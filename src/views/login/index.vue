<template>
<v-app>
    <div class="login-container">
        <div class="panel">
            <div class="left">
                <div class="header">
                    <div class="logo">
                        <logo :color="`#4ea397`"></logo>
                    </div>
                    <div class="log-title">
                        <div class="main-title">FortiAnalyzer</div>
                        <i class="sub-title">3000F</i>
                     </div>
                </div>
                <div class="bg-logo">
                    <div class="bg-logo-container">
                        <logo :color="`#71887c`"></logo>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="form-container teal-lighten1" v-if="!logined">
                    <v-form v-model="valid" lazy-validation >
                        <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="Username"
                            required
                            class="my-field input-group--focused"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :type="'password'"
                            label="Enter your password"
                            class="my-field input-group--focused"
                            ></v-text-field>
                        <v-btn :disabled="!valid" @click="login" class="login-btn" small round>Login</v-btn>
                    </v-form>
                </div>
                <div class="form-container slideInUp" v-if="isSimplePassword">
                    <div class="hint">This account is using the default password. It is strongly recommended that you change you password</div>
                    <v-form v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="npassword"
                            :type="'password'"
                            label="New Password"
                            required
                            class="my-field input-group--focused"
                        ></v-text-field>
                        <v-text-field
                            v-model="cpassword"
                            :type="'password'"
                            label="Confirm Password"
                            class="my-field input-group--focused"
                            ></v-text-field>
                        <div class="btn-group">
                            <v-btn  @click="submit" class="login-btn" small round>Submit</v-btn>
                            <v-btn @click="skip" class="login-btn" small round>Later</v-btn>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
    <select-adom :show-adom="showAdom" @adomselect="adomSelect"></select-adom>
 </v-app>
</template>

<script>
import Logo from '@/components/Logo'
import SelectAdom from '@/components/SelectAdom'
export default {
    name: 'login',
    components: {Logo, SelectAdom},
    data: () => ({
      isSimplePassword: false,
      showAdom: false,
      valid: false,
      logined: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      npassword: '',
      cpassword:''
    }),
    methods:{
      login () {
        //this.$validator.validateAll()
            if(!this.password){
                this.isSimplePassword = true

            }
            else{
                this.skip()
            }
            this.logined = true
      },
      skip(){
        //this.$router.push({ path: '/' })
        this.showAdom = true
      },
      submit(){
        //this.$router.push({ path: '/' })
        this.showAdom = true
      },
      adomSelect(args){
          this.showAdom = false;
          this.$router.push({ path: '/' })
          console.log('adom selected', args.adom);
      },
      handleLogin(){
          this.$store.dispatch('Login', {username: this.name, password: this.password}).then(() => {
            this.$router.push({ path: '/' })
          }).catch(() => {
          })

      }
      

    }
}
</script>

<style lang="less" scoped>
@log-color: #4ea397;
@login-bg-color: #edfaf3;
.my-field{
    color: @log-color;
    .input-group__input{
        font-size: 0.8em;
    }
    .input-group--text-field input{
        font-size: 12px;
    }
}
.flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-container{
    height: 100%;
    background-color: @login-bg-color;
    .flex-center;
    .panel{
        width: 40%;
        height: 60%;
        border-radius: 20px;
        box-shadow: 0 3px 5px -1px rgba(41,189,88,.2), 0 6px 10px 0 rgba(41,189,88,.14), 0 1px 18px 0 rgba(41,189,88,.12);
        .left, .right{
          width: 50%;
          height: 100%;
        }
        .left {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background-color: darken(#edfaf3, 20%);
            overflow: hidden;
        }
        .header{
            height: 30%;
            .flex-center;
            .log-title{
                color: white;
                margin-left: 20px;
                .main-title{
                    font-size: 2.0em;
                }
                .sub-title{
                    font-size: 1.2em;
                }
            }
        }
        
        .logo {
            width: 20%;
            height: 30%;
        }
        .bg-logo{
            width: 100%;
            height: 70%;
            overflow: hidden;
            position: relative;
        }
        .bg-logo-container{
            width: 90%;
            height: 50%;
            opacity: 0.4;
            position: absolute;
            left: -15%;
            bottom: -15%;
        }
        .right{
            .flex-center;
            .form-container{
                width: 70%;
                height: 80%;
                color: @log-color;
                .login-btn{
                    &.btn--disabled{
                        opacity: 0.3;
                    }
                    background-color: @log-color;
                    color: white;
                }
                .hint{
                    margin-bottom: 10px;
                }

            }
            .btn-group{
                .flex-center;
            }
        }
    }
    
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInUp {
  animation-name: slideInUp;
  animation-duration: 500ms;
}

</style>







/*
 * Created Date: Friday, June 22nd 2018, 10:54:22 am
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */
