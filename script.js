const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const buttons = document.querySelector(".btn1");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for(code in countryList){
        const options = document.createElement("option");
        options.innerText = code;
        options.value = code;
        
        if( code === "USD" && select.name === "from"){
            options.selected = "selected";
        }else if( code === "INR" && select.name === "to"){
            options.selected = "selected";
        }
        select.append(options);
    }
    select.addEventListener("change" , (event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
  let currCode = element.value;
  let conCode = countryList[currCode];
  const srcLink = `https://flagsapi.com/${conCode}/flat/64.png`
  const img = element.parentElement.querySelector("img");
  img.src = srcLink;
}

buttons.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
       amtValue = 1;
       amount.value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtValue * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})