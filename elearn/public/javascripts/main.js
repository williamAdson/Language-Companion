const body = document.querySelector('body');

// platform sidebar logic
const sidebarContainer = document.querySelector('.navigation');
const sidebar = document.getElementById('sidebar');
const openBtn = document.querySelector('.open-btn');

// platform authentication logic
const signUpFormBtn = document.querySelector('.register-form-btn');
const signInFormBtn = document.querySelector('.login-form-btn');
const signUpContainer = document.querySelector('.register-form');
const signInContainer = document.querySelector('.login-form');
const textInputContent = document.querySelectorAll('input');

// platform sidebar logic functions
function openSidebar(){
    sidebarContainer.onclick = function(e){
        sidebar.style.display = "block";
        openBtn.style.display = "none";
    }
}
function closeSidebar(){
    sidebarContainer.onclick = function(e){
        sidebar.style.display = "none";
        openBtn.style.display = "block";
    }
}

// platform authentication logic functions
function openSignUpForm(){
    signUpFormBtn.onclick = function(e){
        signInFormBtn.classList.remove('green-btn');
        signUpFormBtn.classList.add('green-btn');
        signUpContainer.style.display = 'flex';
        signInContainer.style.display = 'none';
    }
}
function openSignInForm(){
    signInFormBtn.onclick = function(e){
        signUpFormBtn.classList.remove('green-btn');
        signInFormBtn.classList.add('green-btn');
        signUpContainer.style.display = 'none';
        signInContainer.style.display = 'flex';
    }
}
function floatValidInput(){
    console.log(textInputContent);
    textInputContent.forEach(input => {
        input.onchange = function(e){
            if(input.value == ""){
                console.log('empty input');
                let nextSibling = input.nextElementSibling;
                nextSibling.style.fontSize = '1em';
                nextSibling.style.transform = 'none';
                nextSibling.style.color = '#BAF378';
            }else{
                console.log(input.value)
                console.log(input.nextElementSibling)
                let nextSibling = input.nextElementSibling;
                nextSibling.style.fontSize = '.75em';
                nextSibling.style.transform = 'translateY(-1.8em)';
                nextSibling.style.color = '#534E4E';
            }
        }
    });
}

// platform sidebar logic function calls
openSidebar();
closeSidebar();

// platform authentication logic function calls
openSignInForm();
openSignUpForm();
floatValidInput();