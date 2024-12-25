const page = document.querySelector('#page');
const searchLink = document.querySelector('#search');
const signInLink = document.querySelector('#sign-in-link');
const signOutLink = document.querySelector('#sign-out-link');
const newTopicLink = document.querySelector('#new-topic-link');

let signinWrapper, topicsRow;

let postTitles;

let loggedUser = {};
let on_page = 'signin';
let ready = true;
let rendered = false;

class makeElement{
    constructor(_element, _classList, _option, _innerText, _required=false){
        switch(_element){
 
            case 'img':
                const img = document.createElement('img');
                if(_classList)  {img.classList.add(_classList)}
                if(_option)     {img.src = _option}
                return img;
            case 'div':
            case 'h3':
            case 'h4':
            case 'label':
            case 'input':
            case 'small':
            case 'a':
            case 'button':
            case 'p':
            case 'span':
                const el = document.createElement(_element);
                if(_classList)  {el.classList.add(_classList)}
                if(_option)     {el.id = _option}
                if(_innerText)  {el.innerText = _innerText}
                return el;
        }
    }
}

const showCurrentPage = () => {
    if (ready){
        switch (on_page) {
            case 'signin':
                signinPage();
                break;
            case 'all':
                allPage();
                break;
        }
    }
}

const checkForOpacity = () => {
        if (window.getComputedStyle(signinWrapper).opacity == '0'){
            signinWrapper.classList.add('hide-link');
            ready = true;
        } else {
            signinWrapper.classList.remove('hide-link');
        }
}

const sendRequest = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `/topics/single`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send( JSON.stringify({uuid: postGroup.lastChild.innerText}) );
    xhr.onload = () => {
        const response1 = xhr.status == 200 ? JSON.parse(xhr.responseText) : 'error';
        subRow1Age.innerText = response1.age;
        subRow1Title.innerText = response1.title;
        subRow1Posting.innerText = response1.posting;
        subRow1Username.innerText = '- '+response1.username;
        const topicRowBox = document.querySelector('.row-1');
        const topicBox = document.querySelector('.single-wrapper');
        const topicBox_computedStyle = window.getComputedStyle(topicBox);
        const topicRowBox_computedStyle = window.getComputedStyle(topicRowBox);
        //console.log(topicRowBox_computedStyle.height);
        topicBox.style.height = topicRowBox_computedStyle.height;
        console.log(topicBox.style.height);
        console.log(topicBox_computedStyle.height);
    }
}


setInterval(() => {
    showCurrentPage();
    checkForOpacity();
}, 200);

const signinPage = () => {
    if (rendered===false){
        searchLink.classList.add('hide-link');
        signInLink.classList.add('hide-link');
        signOutLink.classList.add('hide-link');
        newTopicLink.classList.add('hide-link');

        signinWrapper           = new makeElement('div', 'signin-wrapper');
        const leaf              = new makeElement('img', 'leaf', '/a_leaf.png');
        const formNameHolder    = new makeElement('div');
        const formName          = new makeElement('h3', 'text-center', 'form-name', 'Sign In');
        const emailGroup        = new makeElement('div', 'form-group');
        const emailLabel        = new makeElement('label', null, null, 'Email Address');
        const emailInput        = new makeElement('input', 'form-control', 'email', null, true);
        const emailSmall        = new makeElement('small', 'form-text', 'emailHelp', 'We\'ll never share your email with anyone else.');
        const passwordGroup     = new makeElement('div', 'form-group');
        const passwordLabel     = new makeElement('label', null, null, 'Password');
        const passwordInput     = new makeElement('input', 'form-control', 'password', null, true);
        const optionsRowDiv     = new makeElement('div', 'row')
        const optionsColDiv1    = new makeElement('div', 'col-6');
        const optionsColDiv2    = new makeElement('div', 'col-6');
        const forgotlink        = new makeElement('a', null, 'label-highlight', 'Forgot password');
        const rememberGroup     = new makeElement('div', 'form-group');
        const rememberBox       = new makeElement('input', 'form-check-input', 'remember-me');
        const rememberLabel     = new makeElement('label', 'form-check-label', 'label-highlight', 'Remember me');
        const buttonRow         = new makeElement('div', 'row');
        const buttonColDiv1     = new makeElement('div', 'col-3');
        const buttonColDiv2     = new makeElement('div', 'col-9');
        const backButton        = new makeElement('a', 'btn', 'back', 'Back');
        const loginButton       = new makeElement('button', 'btn', 'login', 'Login');
        const registerLinkDiv   = new makeElement('div', 'register-link');
        const registerLinkLabel = new makeElement('p', null, 'label-highlight', 'Don\'t have an account? ');
        const registerLink      = new makeElement('a', null, null, 'Register');

        
        emailInput.type = 'email';
        passwordInput.type = 'password';
        optionsColDiv2.classList.add('text-right');
        rememberBox.classList.add('bg-dark');
        rememberBox.type = 'checkbox';
        rememberLabel.for = 'remember-me';
        forgotlink.href = '#';
        optionsRowDiv.classList.add('bottom');
        backButton.classList.add('btn-secondary');
        loginButton.type = 'submit';
        registerLink.href = '#';


        page.append(signinWrapper);
        signinWrapper.append(leaf);
        signinWrapper.append(formNameHolder);
        signinWrapper.append(emailGroup);
        signinWrapper.append(passwordGroup);
        signinWrapper.append(optionsRowDiv);
        signinWrapper.append(buttonRow);
        signinWrapper.append(registerLinkDiv);

        formNameHolder.append(formName);

        emailGroup.append(emailLabel);
        emailGroup.append(emailInput);
        emailGroup.append(emailSmall);

        passwordGroup.append(passwordLabel);
        passwordGroup.append(passwordInput);

        optionsRowDiv.append(optionsColDiv1);
        optionsRowDiv.append(optionsColDiv2);

        optionsColDiv1.append(rememberGroup);
        rememberGroup.append(rememberBox);
        rememberGroup.append(rememberLabel);
        optionsColDiv2.append(forgotlink);

        buttonRow.append(buttonColDiv1);
        buttonRow.append(buttonColDiv2);

        buttonColDiv1.append(backButton);
        buttonColDiv2.append(loginButton);

        registerLinkDiv.append(registerLinkLabel);
        registerLinkLabel.append(registerLink);

        signinWrapper.style.opacity = '1%';
        setTimeout(()=>{
            signinWrapper.style.opacity = '100%'
        }, 500);
        setTimeout(()=>{
            emailInput.focus();
        }, 1500);

        loginButton.addEventListener('click', () => {
            //console.log('login');
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/topics/signin', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            const email = emailInput.value;
            const password = passwordInput.value;
            const data = {email, password};
            //console.log(data)
            xhr.send( JSON.stringify(data) );
            xhr.onload = () => {
                const response = xhr.status == 200 ? JSON.parse(xhr.responseText) : 'error';
                //console.log(response);
                if(response!='unvalidated'){
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', '/topics/all', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    loggedUser = {
                        loggedUsername: response.loggedUsername,
                        loggedUUID: response.loggedUuid
                    }
                    xhr.send( JSON.stringify(loggedUser) );
                    xhr.onload = () => {
                        const response1 = xhr.status == 200 ? JSON.parse(xhr.responseText) : 'error';
                        //console.log(response1);
                        postTitles = response1;
                        on_page = 'all'
                        rendered = false;
                        signinWrapper.style.opacity = '0%';
                    }
                } 
            }
        });

        backButton.addEventListener('click', () => {
            console.log('click');
        });

        registerLink.addEventListener('click', () => {
            console.log('click');
        });

        forgotlink.addEventListener('click', () => {
            console.log('click');
        });
        rendered = true;
        ready = false;
    }
}

const allPage = () => {
    if (rendered===false){
        searchLink.classList.remove('hide-link');
        signInLink.classList.add('hide-link');
        signOutLink.classList.remove('hide-link');
        newTopicLink.classList.remove('hide-link');

        
        topicsRow                                   = new makeElement('div', 'row');
            const topicsCol1                        = new makeElement('div', 'col-3', 'column-full');
                const allpageWrapper                = new makeElement('div', 'all-wrapper');
                    const postRow                   = new makeElement('div', 'row');
                        const postCol1              = new makeElement('div', 'col');
            const topicsCol2                        = new makeElement('div', 'col-6', 'column-full');
                const subRow1                       = new makeElement('div', 'row-1');
                    const subRow1Wrapper            = new makeElement('div', 'single-wrapper');
                        const splitRowA             = new makeElement('div', null, 'selectable');
                            const subRow1Age        = new makeElement('div', null, 'selectable');
                        const splitRowB             = new makeElement('div', 'split-row-B', 'selectable')
                            const subRow1Title      = new makeElement('h4',  'text-center', 'selectable');
                            const subRow1Posting    = new makeElement('div', 'text-justify', 'selectable');
                        const splitRowC             = new makeElement('div', null, 'selectable')
                            const subRow1Username   = new makeElement('div', null, 'selectable');
                const subRow2                       = new makeElement('div', 'row-3');
                    const subRow2Control            = new makeElement('div', 'single-control-wrapper');
                const subRow3                       = new makeElement('div', 'row-3');
                    const subRow3Categories         = new makeElement('div', 'category-wrapper');
                const subRow4                       = new makeElement('div', 'row-3');
                const subRow4Control                = new makeElement('div', 'category-control-wrapper');
            const topicsCol3                        = new makeElement('div', 'col-3', 'column-full');
                const allpageWrapper2               = new makeElement('div', 'all-wrapper');

        topicsRow.classList.add('lock-row');
            topicsCol1.classList.add('p-0');
                allpageWrapper.classList.add('wrappers');
            topicsCol2.classList.add('p-0');
                subRow1Wrapper.classList.add('wrappers');
                    subRow1Age.classList.add('card-header');
                    subRow1Title.classList.add('card-title', 'mt-2');
                    subRow1Posting.classList.add('text-justify');
                    subRow1Username.classList.add('card-footer', 'mt-2', 'my-text-muted', 'text-right');
                    subRow3Categories.classList.add('wrappers');
            topicsCol3.classList.add('p-0');
                allpageWrapper2.classList.add('wrappers');

        page.append(topicsRow);
            topicsRow.append(topicsCol1);
                topicsCol1.append(allpageWrapper);
                    allpageWrapper.append(postRow);
                        postRow.append(postCol1);
            topicsRow.append(topicsCol2);
                topicsCol2.append(subRow1);
                    subRow1.append(subRow1Wrapper);
                        subRow1Wrapper.append(splitRowA);
                            splitRowA.append(subRow1Age);
                        subRow1Wrapper.append(splitRowB);
                            splitRowB.append(subRow1Title);
                            splitRowB.append(subRow1Posting);
                        subRow1Wrapper.append(splitRowC);
                            splitRowC.append(subRow1Username);
                topicsCol2.append(subRow2);
                    subRow2.append(subRow2Control);
                topicsCol2.append(subRow3);
                    subRow3.append(subRow3Categories);
                topicsCol2.append(subRow4);
                    subRow4.append(subRow4Control);
            topicsRow.append(topicsCol3);
                topicsCol3.append(allpageWrapper2);
 
        let increment = 0;    
        for (let i=0; i<=2; i++){
            for (let post of postTitles){
                const postGroup        = new makeElement('div', 'form-group', 'topic-group');
                const posttitle        = new makeElement('span', null, 'selectable');
                const postUUID         = new makeElement('div', 'hide-link', null, post.uuid);

                posttitle.style = "display: flex; justify-content: space-between; align-items: center;"
                posttitle.innerHTML = `${post.title} <span style="margin-left: auto; font-weight: normal;"><b>${post.username}</b></div>`;
                posttitle.classList.add('mx-2');
                
                postCol1.append(postGroup);
                postGroup.append(posttitle);
                postGroup.append(postUUID);

                if (increment===0){
                    postGroup.classList.add('selected');
                    console.log(postGroup.lastChild.innerText);
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', `/topics/single`);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send( JSON.stringify({uuid: postGroup.lastChild.innerText}) );
                    xhr.onload = () => {
                        const response1 = xhr.status == 200 ? JSON.parse(xhr.responseText) : 'error';
                        subRow1Age.innerText = response1.age;
                        subRow1Title.innerText = response1.title;
                        subRow1Posting.innerText = response1.posting;
                        subRow1Username.innerText = '- '+response1.username;
                    }
                }

                postGroup.addEventListener('click', () => {
                    const postGroups = document.querySelectorAll('#topic-group');
                    for (let pG of postGroups){
                        pG.classList.remove('selected');
                    }
                    postGroup.classList.add('selected');
                    console.log(postGroup.lastChild.innerText);
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', `/topics/single`);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send( JSON.stringify({uuid: postGroup.lastChild.innerText}) );
                    xhr.onload = () => {
                        const response1 = xhr.status == 200 ? JSON.parse(xhr.responseText) : 'error';
                        subRow1Age.innerText = response1.age;
                        subRow1Title.innerText = response1.title;
                        subRow1Posting.innerText = response1.posting;
                        subRow1Username.innerText = '- '+response1.username;
                        // const topicRowBox = document.querySelector('.row-1');
                        // const topicBox = document.querySelector('.single-wrapper');
                        // const topicBox_computedStyle = window.getComputedStyle(topicBox);
                        // const topicRowBox_computedStyle = window.getComputedStyle(topicRowBox);
                        //console.log(topicRowBox_computedStyle.height);
                        // topicBox.style.height = topicRowBox_computedStyle.height;
                        // console.log(topicBox.style.height);
                        // console.log(topicBox_computedStyle.height);
                    }
                });
                increment++;
            }
        }

        allpageWrapper.style.opacity = '0%';
        setTimeout(()=>{
            allpageWrapper.style.opacity = '100%'
        }, 500);
        setTimeout(()=>{
            //emailInput.focus();
        }, 1500);

        rendered = true;
    }
}
