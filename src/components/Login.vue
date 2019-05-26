<template>
<div class="content-container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin">
          <div class="card-body">
            <h5 class="card-title text-center">登入</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="text" id="inputusername" v-model='user.username' class="form-control" placeholder="帳號" required >
                <label for="inputusername">帳號</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" v-model='user.password' class="form-control" placeholder="密碼" required>
                <label for="inputPassword">密碼</label>
              </div>
              <button @click="login" class="btn btn-lg btn-primary btn-block text-uppercase" type="button">Enter</button>
              <hr>
              <button @click="navigateToregister" class="btn btn-lg btn-red btn-block text-uppercase">註冊</button>
              <button @click="navigateToHome" class="btn btn-lg btn-red btn-block text-uppercase">Go to Home</button>
              <h1>asdasadasdasds</h1><h1>{{ store_value }} </h1><h1>{{ store_counter }}</h1><h1>....</h1>
            </form>
          </div>
        </div>
      </div>
    </div><br><br><br><br>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import * as types from '../store/types'
// import { type } from 'os'

export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        test: ''
      },
      store_value: this.$store.getters[types.VALUE],
      store_counter: this.$store.getters[types.DOUBLE_COUNTER]
    }
  },
  validations: {
    user: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    navigateToHome () {
      this.$router.push({
        name: 'Home'
      })
    },
    navigateToregister () {
      this.$router.push({
        name: 'Home'
      })
    },
    login () {
      if (!this.user.username || !this.user.password) {
        return
      }
      this.$store.dispatch(types.LOGIN, {
        user: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(result => {
        this.$router.push({
          name: 'Home'
        })
      }, errorMsg => {
        var msg = ''
        if (errorMsg.response) {
          msg = errorMsg.response.data
        } else {
          msg = '網路錯誤, 請稍後再試'
        }
        this.$message({
          showClose: false,
          message: msg,
          type: 'error'
        })
      })
    }
    // test2 () {
    //   fetchtest().then(data => {}).catch(errorMsg => {
    //     console.log('catch')
    //     console.log(errorMsg)
    //     this.$message({
    //       showClose: false,
    //       message: errorMsg.data,
    //       type: 'error'
    //     })
    //   }).finally(() => {
    //     console.log('Finally')
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
input {
  font-size: 25px;
  text-indent: 20px
}

.card-signin {
  border: 0;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(239, 253, 253)
}

.card-signin .card-title {
  margin-bottom: 3rem;
  font-weight: 300;
  font-size: 2rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
  font-size: 20px;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

// .form-label-group input:not(:placeholder-shown) {
//   padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
//   padding-bottom: calc(var(--input-padding-y) / 3);
// }

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #888;
}

.btn-red {
  color: white;
  background-color: #ea4335;
}

</style>
