const app = Vue.createApp({
    data() {
        return{
            fname: '',
            lname: '',
            bday_month: '',
            bday_day: '',
            bday_year: '',
            username: '',
            email: '',
            password: '',
            conf_password: '',
            security_question: '',
            security_answer: '',
            gender: '',
            location: '',
            bio: '',

            showPwdError: false,
            showConfPwdError: false,
            showAnswerBox: false,
        }
    },

    methods: {
        checkPassword: function(e){
            this.conf_password = "";
            if (!this.validPassword(this.password)){
                this.showPwdError = true;
                this.password = "";
            }else{
                this.showPwdError = false;
            }
        },

        checkConfirmPassword: function(e){
            if(this.password !== this.conf_password){
                this.showConfPwdError = true;
                this.conf_password = "";
            }else{
                this.showConfPwdError = false;
            }
        },

        selectedQuestion: function(e){
            if(this.security_question){
                this.showAnswerBox = true;
            }
        },

        validPassword: function(password){
            var includeChars = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/;
            return includeChars.test(password)
        }


    }
})

app.mount('#app')