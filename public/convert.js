
console.log("Working");

var userInput = document.getElementById("userInput");
var submit = document.getElementById("submitBtn");
var body = document.getElementById("body");
var h1 = document.getElementById("display");
var convertFrom = document.getElementById("convertFrom");
var convertTo = document.getElementById("convertTo");


// body.addEventListener("keypress",function(){
//     console.log(this.charCode);
// });


submit.addEventListener("click",function(){
   
    controller(convertFrom.value);
   
});


function controller(conversion){
    var binaryRes, decimalRes, octalRes, hexRes;
    
    if(conversion === "Binary"){
    
       binaryRes = userInput.value;
       decimalRes = binaryToDecimal(userInput.value);
       hexRes = binaryToHex(userInput.value);
       octalRes = binaryToOctal(userInput.value);
       
       
    } else if(conversion === "Decimal"){
        
        decimalRes = userInput.value;
        binaryRes = decimalToBinary(Number(userInput.value));
        octalRes = decimalToOctal(Number(userInput.value));
        hexRes = decimalToHex(Number(userInput.value));
        
    } else if(conversion === "Hexidecimal"){
        
        hexRes = userInput.value;
        decimalRes = hexToDecimal(userInput.value);
        binaryRes = hexToBinary(userInput.value);
        octalRes = hexToOctal(userInput.value);
        
    } else if(conversion == "Octal"){
        octalRes = userInput.value;
        decimalRes = octalToDecimal(userInput.value);
        binaryRes = octalToBinary(userInput.value);
        hexRes = octalToHex(userInput.value);
        
    }
    
    
    
    displayResult(binaryRes, decimalRes, octalRes, hexRes);
}

function displayResult(binary, decimal, octal, hex){
    let conversionUnit =convertTo.value;
    
    if(conversionUnit === "Hexidecimal"){
        h1.textContent = hex;
    }else if(conversionUnit === "Decimal"){
        h1.textContent = decimal;
    }else if(conversionUnit === "Octal"){
        h1.textContent = octal;
    }else if(conversionUnit == "Binary"){
        h1.textContent = binary;
    }else{
        h1.textContent = "Error";
    }
    
}


// Takes binary and converts to it decimal
function binaryToDecimal(binaryNum){
   let binaryArr = splitAndReverse(binaryNum);
    let decimal = 0;
    for(let i =0; i<binaryArr.length;i++){
          let bit = Number(binaryArr[i]);
          decimal += Math.pow(2,i)*bit;
    }
    return decimal;
}

//Takes binary and converts to hex
function binaryToHex(binaryNum){
    let binaryuserInput = splitAndReverse(binaryNum)
    let hex = "";
    let decimal = 0;
    for(let i = 0; i< binaryuserInput.length; i++){
        for(let j = 0; i<binaryuserInput.length && j<4; j++){
            let binaryNum =  Number(binaryuserInput[i]);
            decimal += (Math.pow(2,j)*binaryNum);
            i++;
        }
        if(decimal>9){
            hex += decimaltoHexIndex(decimal);
        }else{
            hex+= decimal;
        }
        decimal =0 ;
        i--;
    }
    
    return reverse(hex);
}

// Takes binary and converts it to Octal
function binaryToOctal(binaryNum){
    let binaryuserInput = splitAndReverse(binaryNum);
    let decimal = 0;
    let octo = "";
    for(let i = 0; i< binaryuserInput.length; i++){
        for(let j = 0; i<binaryuserInput.length && j<3; j++){
            let binaryNum =  Number(binaryuserInput[i]);
            decimal += (Math.pow(2,j)*binaryNum);
            i++;
        }
        octo+= decimal;
        decimal =0 ;
        i--;
    }
    
    return reverse(octo);
}


//Convert Decimal to binary
function decimalToBinary(decimaluserInput){
    let binary = "";
    console.log("This is decimal userInput " + decimaluserInput);
    while(decimaluserInput>0){
        
        decimaluserInput /= 2;
        let remainder = decimaluserInput%1;
        if(remainder>0 | decimaluserInput == .5){
            binary += 1;
            decimaluserInput -= 0.5;
        }
        else{
            binary+=0;
        }
    }
    return reverse(binary);
}

//Convert Decimal to Octal
function decimalToOctal(decimaluserInput){
    var binaryNum = decimalToBinary(decimaluserInput);
    return binaryToOctal(binaryNum);
}

//Convert Decimal to Hex
function decimalToHex(decimaluserInput){
    var binaryNum = decimalToBinary(decimaluserInput);
    return binaryToHex(binaryNum);
}


//Converts Hex to Decimal
function hexToDecimal(hexuserInput){
    
    let decimal = 0;
    let count = 0;
    let hexRegex = /[A-f|a-f]/
    let hexArr = splitAndReverse(hexuserInput);
    
    hexArr.forEach(function(char){
        if(char.match(hexRegex)){
            console.log("match");
            hexArr[count] = hexToDecimalIndex(char);
        }
        count++;
         });
         
        
    
    
   
    for(let i =0; i<hexArr.length;i++){
          let num = Number(hexArr[i]);
          decimal += Math.pow(16,i)*num;
    }
    return decimal;
    
    
}

//Converts Hex to Binary
function hexToBinary(hexuserInput){
    let decimal = hexToDecimal(hexuserInput);
    let binary = decimalToBinary(decimal);
    let missingZeros = 4 - binary.length%4;
    if(missingZeros == 1){
        binary = "0"+binary;
    } else if(missingZeros == 2){
        binary = "00"+binary
    } else if(missingZeros == 3){
        binary = "000" + binary;
    }
    return binary;
}

//Converts Hex to Octal
function hexToOctal(hexuserInput){
    let decimal = hexToDecimal(hexuserInput);
    let binary = decimalToBinary(decimal);
    
    return binaryToOctal(binary);
}


//Converts Octal to Decimal
function octalToDecimal(octaluserInput){
   let octalArr = splitAndReverse(octaluserInput);
    let decimal = 0;
    for(let i =0; i<octalArr.length;i++){
          let bit = Number(octalArr[i]);
          decimal += Math.pow(8,i)*bit;
    }
    return decimal;
}

//Converts Octal to Binary
function octalToBinary(octaluserInput){
    let decimal = octalToDecimal(octaluserInput);
    return decimalToBinary(decimal);
}


//Converts Octal to Hex
function octalToHex(octaluserInput){
    let binary = octalToBinary(octaluserInput);
    return binaryToHex(binary);
}


//Splits userInput into array and puts it in reverse
function splitAndReverse(number){
    return number.split("").reverse();
}


// Index for hexidecimal numbers
var decimaltoHexIndex = function(num){
    switch(num){
    case 10:
        return "A";
    case 11:
        return "B";
    case 12:
        return "C";
    case 13:
        return "D";
    case 14:
        return "E";
    case 15:
        return "F";
    }
};

var hexToDecimalIndex = function(char){
    
    switch(char.toUpperCase()){
        case "A":
            return 10;
        case "B":
            return 11;
        case "C":
            return 12;
        case "D":
            return 14;
        case "E":
            return 14;
        case "F":
            return 15;
    }
}

function reverse(num){
    return num.split("").reverse().join("");
}