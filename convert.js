let input = document.querySelectorAll(".input1")

let button = document.getElementById("btn")

let val = document.getElementById("num1")

let incorrect = document.getElementById("wrong");

fetch("https://api.frankfurter.app/currencies")
.then((msg)=>{
    if(!msg.ok){
        alert("error code : 404")
    }
    return msg.json();
})
.then(rec=>displayDrop(rec))

function displayDrop(res){
    let val = Object.entries(res);
    for(let i=0;i<val.length;i++){
        let opt = `<option value="${val[i][0]}">${val[i][0]}</option>`;
        input[0].innerHTML = input[0].innerHTML + opt;
        input[1].innerHTML = input[1].innerHTML + opt;
    }
}

button.addEventListener('click',()=>{
    let val1 = input[0].value;
    let val2 = input[1].value;
    let num = val.value;
    if(val1===val2){
        wrong.innerHTML = `Entered values should not be same`;
    }
    if(num==''){
        wrong.innerHTML = `Input value should not be empty`;
    }
    if(isNaN(num)){
        wrong.innerHTML = `Input should be only numbers`
    }
    else{
        convert(val1,val2,num);
    }
})

function convert(from, to, amount) {
    fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        document.getElementById("num2").value = convertedAmount;
      });
    }