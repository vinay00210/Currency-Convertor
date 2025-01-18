
//to stores both select tag in currencies variable.
let currencies = document.querySelectorAll(".currencies select");

/* to get both select tag and add options into select tag by using coutrylist object stored in another js file named as codes.js.*/
for (let selects of currencies) {
    // console.log(selects)
    for (let country_currency in countryList) {
        // console.log(country);
        let newoption = document.createElement("option");
        newoption.innerText = country_currency;
        newoption.value = country_currency;
        selects.append(newoption);

        // to make USD to INR as default selected option:
        if (selects.id == "options1" && newoption.value == "USD") {
            newoption.selected = true;
        } else if (selects.id == "options2" && newoption.value == "INR") {
            newoption.selected = true;
        }
    }

    selects.addEventListener("change", (evt) => {
        flagchange(evt.target); // taken evt as event argument to target the event on selector tag..
    });
}

/* creating function to change the flag with changing of currencies: */
let flagchange = (element) => {
    // console.log(element.value);
    let currency = element.value;
    let country_code = countryList[currency]; // used coutrylist object to get country code value:
    // console.log(country_code);
    let newsrc = `https://flagsapi.com/${country_code}/flat/64.png`; //flag generator link..
    let flag = element.parentElement.querySelector("img"); // stores img tag in flag variable..
    flag.src = newsrc; // changes img link every time according to option selected..
}


let amount = document.querySelector("#amount"); //stores amount enetred by user in amount variable..
let btn = document.querySelector("#btn button"); // for process button..

//Free Currency converter API link without endpoint
let API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

//storing currencies the user wants to exchange in variables both from and to currency:
let currency1 = document.querySelector(".from select");
let currency2 = document.querySelector(".to select");

// storing message value by which user can see exchange value:
let exchange_value = document.querySelector("#msg p");


// adding eventlistener on button:
btn.addEventListener("click", (event) => {
    event.preventDefault();
    calc_exchange();
})



// creating function to calculate the exchange value:
let calc_exchange = async () => {
    let amount_value = amount.value;
    // console.log(amount_value);
    if (amount_value == "" || amount_value < 1) {
        amount_value = 1;
        amount.value = 1;
    }
    // console.log(currency1.value, currency2.value);


    const URL = `${API_URL}/${currency1.value.toLowerCase()}.json`; // adding endpoints in API link..
    // console.log(URL);

    //fetching API..
    let response = await fetch(URL); // await will wait for the response from API

    let response_data = await response.json(); //converting the data got by API in json file. 
    // console.log(response_data);

    // getting rate for the selected currency from response Got by API:
    let rate = response_data[currency1.value.toLowerCase()][currency2.value.toLowerCase()];
    // console.log(rate);

    // calculating exhange value for selected currencies:
    let exchange = amount_value * rate;
    // console.log(exchange);

    // putting the exchanged value inside the message box:
    exchange_value.innerText = `${amount_value} ${currency1.value} = ${exchange} ${currency2.value}`;
}


// making a default meaage to show when page loads:
window.addEventListener("load", () => {
    calc_exchange();
})