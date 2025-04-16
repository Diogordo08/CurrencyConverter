const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

const baseURL = "https://economia.awesomeapi.com.br/last";
let symbol = "";
let highValue = 0;

async function getCurrency(currencyActual) {
    const URL = `${baseURL}/${symbol}`;
    currency = currencyActual;
    const resp = await fetch(URL);
    // console.log(resp);
    if(resp.status === 200){
        const obj = await resp.json();
        const key = Object.keys(obj)[0];
        highValue = obj[key].high;
        converter(symbol);
    }
}

const inputValue = document.getElementById('value-money');
const selectedCurrency = document.getElementById('currency');
const result = document.getElementById('result');
let valueConverted = 0;

function handleSubmit(event) {
    event.preventDefault();

    if(selectedCurrency.value){
        symbol = selectedCurrency.value.toUpperCase();
        getCurrency(`${symbol}BRL`);
    }
    else {
        alert('Selecione uma moeda válida!');
    }

}

function converter(value){
    valueConverted = inputValue.value / highValue;
    result.innerHTML = valueFormatted('en-US', value);
}

function valueFormatted(locale, currency) {
    const value = valueConverted.toLocaleString(`${locale}`, { style: 'currency', currency: `${currency}` });
    return `<span>🤑</span> ${value} <span>🤑</span>`;
}