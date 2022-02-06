let form = document.forms.myForm;
let getID = id => document.getElementById(id);
let getS = selector => document.querySelector(selector);

function signIn() {
    getS('.main-container').style.display = 'none';
    getS('.sign-container').style.display = 'block';
}

function signUp() {
    getS('.sign-container').style.display = 'none';
    getS('.main-container').style.display = 'block';
}

let nameRegExp = /^[a-zA-Z]{2,20}$/;

function validNames() {
    let testName = nameRegExp.test(getID('firstName').value);
    if (testName) {
        getID('firstName').style.border = '2px solid green';
    }
    else {
        getID('firstName').style.border = '2px solid red';
    }
}

function validSurname() {
    let testSurname = nameRegExp.test(getID('lastName').value);
    if (testSurname) {
        getID('lastName').style.border = '2px solid green';
    }
    else {
        getID('lastName').style.border = '2px solid red';
    }
}

let exist = true;

function mailExist() {
    if (localStorage.length > 0) {
        for (let i=0; i<JSON.parse(localStorage.getItem('allUsers')).length; i++) {
            if (getID('email').value === JSON.parse(localStorage.getItem('allUsers'))[i].email) {
                getID('email').style.border = '2px solid red';
                getS('.exist').style.display = 'block';
                exist = false;
                return 
            }
            else {
                getID('email').style.border = '2px solid green';
                getS('.exist').style.display = 'none';
                exist = true;
            }
        }
    }
}

let mailRegExp = /^[a-zA-Z0-9.-]*@[a-zA-Z]*\.[a-zA-Z]*$/;

function validEmail() {
    let testEmail = mailRegExp.test(getID('email').value);
    if (localStorage.length <= 0) {
        if (testEmail) {
            getID('email').style.border = '2px solid green';
        }
        else {
            getID('email').style.border = '2px solid red';
        } 
    }
    else {
        if (testEmail) {
            getID('email').style.border = '2px solid green';
            mailExist();
        }
        else {
            getID('email').style.border = '2px solid red';
        } 
    }   
}

function validMail2() {
    let testEmail = mailRegExp.test(getID('mail2').value);
    if (testEmail) {
        getID('mail2').style.border = '1px solid lightgray';
    }
    else {
        getID('mail2').style.border = '2px solid red';
    }
}

let passRegExp = /^\w{8,15}$/;

function validPass() {
    let passEmail = passRegExp.test(getID('password').value);
    if (passEmail) {
        getID('password').style.border = '2px solid green';
    }
    else {
        getID('password').style.border = '2px solid red';
    }
}

function validPass2() {
    let passEmail = passRegExp.test(getID('pass2').value);
    if (passEmail) {
        getID('pass2').style.border = '1px solid lightgray';
    }
    else {
        getID('pass2').style.border = '2px solid red';
    }
}

let allUsers = [];

let newUser = {
    name: '',
    surname: '',
    email: '',
    password: ''
};

function submitBtn() {
    validNames();
    validSurname();
    validEmail();
    validPass();
    if (exist && nameRegExp.test(getID('firstName').value) && nameRegExp.test(getID('lastName').value) && mailRegExp.test(getID('email').value) && passRegExp.test(getID('password').value)) {
        newUser.name = getID('firstName').value;
        newUser.surname = getID('lastName').value;
        newUser.email = getID('email').value;
        newUser.password = getID('password').value;
        if(localStorage.length > 0 && localStorage.getItem('allUsers')){
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        getID('firstName').value = '';
        getID('firstName').style.border = '1px solid lightgray';
        getID('lastName').value = '';
        getID('lastName').style.border = '1px solid lightgray';
        getID('email').value = '';
        getID('email').style.border = '1px solid lightgray';
        getID('password').value = '';
        getID('password').style.border = '1px solid lightgray';
    }
}


function accSign() {
    validMail2();
    validPass2();
    if (localStorage.length <= 0) {
        validMail2();
        validPass2();
        getS('.empty').style.display = 'block';
    }
    else {
        if (mailRegExp.test(getID('mail2').value) && passRegExp.test(getID('pass2').value)) {
            getS('.empty').style.display = 'none';
            validMail2();
            validPass2();
            for (let i=0; i<JSON.parse(localStorage.getItem('allUsers')).length; i++) {
                if (getID('mail2').value !== JSON.parse(localStorage.getItem('allUsers'))[i].email && getID('pass2').value !== JSON.parse(localStorage.getItem('allUsers'))[i].password) {
                    getID('mail2').style.border = '1px solid lightgray';
                    getID('pass2').style.border = '1px solid lightgray';
                    getS('.incorrect').style.display = 'block';
                    return 
                }
                else {
                    getS('.incorrect').style.display = 'none';
                    getS('.account-name').innerHTML = JSON.parse(localStorage.getItem('allUsers'))[i].name;
                    getS('.account-mail').innerHTML = JSON.parse(localStorage.getItem('allUsers'))[i].email;
                    getS('.main-container').style.display = 'none';
                    getS('.sign-container').style.display = 'none';
                    getS('.account').style.display = 'flex';
                }
            }
        }
    }
}

function accSignIn() {
    getS('.account').style.display = 'none';
    getS('.sign-container').style.display = 'none';
    getS('.main-container').style.display = 'block';
    getS('.incorrect').style.display = 'none';
    getID('mail2').value = '';
    getID('pass2').value = '';
    getS('.account-name').innerHTML = '';
    getS('.account-mail').innerHTML = '';
}
