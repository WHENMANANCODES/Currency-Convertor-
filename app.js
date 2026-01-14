const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const btn = document.querySelector("form button");

const dropdowns = document.querySelectorAll(".dropdown select");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".To select");

const msgbox = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element) =>{
      console.log(element);
      let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromcurr.value);
    console.log(tocurr.value);

    const URL = `${base_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamount = amtVal*rate;

    msgbox.innerText = `${amtVal} ${fromcurr.value.toLowerCase()} = ${finalamount} ${tocurr.value.toLowerCase()}`;
}); 



