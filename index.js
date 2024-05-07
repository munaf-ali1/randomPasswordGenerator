const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay  = document.querySelector("[data-lengthNumber]");
const passwordDisplay  = document.querySelector("[data-passwordDisplay]");
const dataCopy = document.querySelector("[data-copy]");
const copyMsg  =  document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const strengthContainer = document.querySelector(".strength-container");
const dataIndicator  =  document.querySelector("[data-indicator]");
const generatePassword = document.querySelector(".generatepassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbol= '`,~,!,@,#,$,%,^,&,*,(,},{,[,.,?,/,>,<';
    
    

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider ();






function handleSlider (){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%"
}
function setIndicator(color) {
    dataIndicator.Style.backgroundColor = color;

}

function getRndInteger(min,max) {
   return Math.floor(Math.random()*(max-min)) + min;
}
function generateRandomNumber (){
    return getRndInteger(0,9);
}
function generateLowerCase (){
    return String.fromCharCode(getRndInteger(97,123)); 
}
function generateUpperCase (){
    return String.fromCharCode(getRndInteger(65,91)); 
}

function generateSymbols (){
    const randNum = getRndInteger(0,symbol.length);
    return symbol.charAt(randNum);

}

function calcStrength (){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(LowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    } else if((hasLower || hasUpper)&&(hasNum || hasSym)&& passwordLength>=6){
        setIndicator("#ff0");

    } else{
        setIndicator("#f00");
    }
}    
    async function copyContent (){
        try {
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText = "copied";

        }
        catch(e){
            copyMsg.innerText = "something went wrong";
        }
        copyMsg.classList.add("active");

        setTimeout(() => {
            copyMsg.className.remove("active");
            
        }, 2000);

    }

    function shufflePassword(array){
        for(let i=array.length - 1;i>0;i--){
            const j= Math.floor(Math.random() * (i+1));
            const temp =Array[i];
            array[i]= array[j];
            array[j]==temp; 
        }
        let str = "";
        array.forEach((el) => (str += el));
        return str;

    }


    function handleCheckBox(){
        checkCount = 0;
        allCheckBox.forEach((checkbox) => {
            if(checkbox.checked)
                checkCount++;

        });
        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
        }



    }



    allCheckBox.forEach ((checkbox) => {
        checkbox.addEventListener('change',handleCheckBox())
    });



    inputSlider.addEventListener('input',(e) => {
        passwordLength = e.target.value;
        handleSlider();
    });
    dataCopy.addEventListener(click, () => {
        if(passwordDisplay.value){
            copyContent();
        }
    });

    generatePassword.addEventListener('click',() =>{
        if(checkCount ==0) 
         return;

        if(passwordLength< checkCount){
            passwordLength = checkCount;
            handleSlider();
        }

        password = "";

        let funcArr = [];
        if(uppercaseCheck.checked){
            funcArr.push(generateUpperCase);
        }
        if(numberCheck.checked){
            funcArr.push(generateRandomNumber);
        }
        if(LowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }
        if(symbolCheck.checked){
            funcArr.push(generateSymbols);
        }

        //compolsory addition
        for(let i=0;i<funcArr.length;i++){
            password += funcArr[i]();
        }

        //remaining addition

        for(let i=0;i<(passwordLength-funcArr.length);i++){
            let randIndex = getRndInteger(0,funcArr.length);
            password += funcArr[randIndex]();

        }

        //shuffle password
        password = shufflePassword(Array.from(password));

        passwordDisplay.value = password;
        calcStrength();


    });