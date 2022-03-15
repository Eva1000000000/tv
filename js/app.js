'use strict'




const activeMovies = document.querySelector('.movies');
const activeTv = document.querySelector('.tv');


const buttonMovies = document.querySelector('.tabs__movies')
buttonMovies.addEventListener('click',active);
const buttonTv = document.querySelector('.tabs__tv')
buttonTv.addEventListener('click',active);

function active(){
    buttonMovies.classList.toggle('active');
    activeMovies.classList.toggle('active');
    buttonTv.classList.toggle('active');
    activeTv.classList.toggle('active');
   
}



const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let cleanInput = document.querySelectorAll('input[type="text"],[type="password"]')
 
let unLock = true;

const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e){
           const popupName = popupLink.getAttribute('href').replace('#', '');
           const curentPopup = document.getElementById(popupName);
           if(cleanInput.length > 0){
            for (let index=0; index < cleanInput.length; index++){
                cleanInput[index].value = '';}}
           popupOpen(curentPopup);
           e.preventDefault();
        });
        
    }
}
//объекты которые закрывают(крестик)
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unLock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive,false);

        } else {          
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup-content')){ 
                popupClose(e.target.closest('.popup') );
            }
        });
    }
}

function popupClose(popupActive, doUnLock = true) {
    if (unLock) {
        popupActive.classList.remove('open');
        if(cleanInput.length > 0){
            for (let index=0; index < cleanInput.length; index++){
                cleanInput[index].value = '';}}
        if (doUnLock) {
            bodyUnLock();
        }
    }
}

// убираем паддинг справа который образуется от scroll`a
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.app').offsetWidth + 'px';
    if(lockPadding.length > 0){
        for (let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unLock = false;
    setTimeout(function (){
        unLock = true;
    },timeout);
}

function bodyUnLock() {
    setTimeout(function (){
        if(lockPadding.length > 0){
            for (let index=0; index < lockPadding.length; index++){
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unLock = false;
    setTimeout(function (){
        unLock = true;
    },timeout);
}

document.addEventListener('keydown',function(e){
    if (e.which === 27) {
        const popupActive = document. querySelector('.popup.open');
        popupClose(popupActive);
    }
});



