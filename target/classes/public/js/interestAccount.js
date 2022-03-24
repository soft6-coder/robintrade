getCryptoUpdate();

let currencyAmountTxt = document.getElementById("currency-amount");
let timeTxt = document.getElementById("weeks");
let interestPerDayTxt = document.getElementById("interest-per-day");
let totalEarningsTxt = document.getElementById("total-earnings");
let totalInterestTxt = document.getElementById("total-interest");
let timeTxt2 = document.getElementById("weeks-2");
let currencyTxt = document.getElementById("currency");
let image = document.getElementById("image");

let currencyAmount = 500;
let cryptoAmount;
let days = 2;
let percent1 = 10;
let percent2 = 20;
let hours = 24;
let cryptoValues = [];
let cryptoChangeCount = 0;
let currenctCurrencyCount = 0;

let interestPerDay = ((currencyAmount * percent1) / (days * hours)).toFixed(3);

let totalEarnings = currencyAmount * percent1;
let totalInterest = currencyAmount * percent1 - currencyAmount;

currencyAmountTxt.innerText = currencyAmount;
timeTxt.innerText = days;
timeTxt2.innerText = days;
totalEarningsTxt.innerText = totalEarnings;
totalInterestTxt.innerText = totalInterest;
interestPerDayTxt.innerText = interestPerDay;

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;
  if (targetId == "currency-amount-up") {
    increaseCurrencyAmount();
  } else if (targetId == "currency-amount-down") {
    decreaseCurrencyAmount();
  } else if (targetId == "weeks-up") {
    increaseWeek();
  } else if (targetId == "weeks-down") {
    decreaseWeek();
  } else if (targetId == "currency-up") {
    addCurrency();
  } else if (targetId == "currency-down") {
    reduceCurrency();
  }
});

function increaseCurrencyAmount() {
  if (currenctCurrencyCount != 8) {
    currenctCurrencyCount++;
    let percent = 2;
    if (days == 2) {
      percent = percent1;
    } else {
      percent = percent2;
    }
    currencyAmount = currencyAmount * 2;
    if (cryptoChangeCount == 0) {
      totalEarnings = currencyAmount * percent;
      totalInterest = currencyAmount * percent - currencyAmount;
      interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(3);
      currencyAmountTxt.innerText = numberWithCommas(currencyAmount);
      totalEarningsTxt.innerText = numberWithCommas(totalEarnings);
      totalInterestTxt.innerText = numberWithCommas(totalInterest);
      interestPerDayTxt.innerText = numberWithCommas(interestPerDay);
    } else {
      totalEarnings = currencyAmount * percent;
      totalInterest = currencyAmount * percent - currencyAmount;
      interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(7);
      currencyAmountTxt.innerText = currencyAmount.toFixed(7);
      totalEarningsTxt.innerText = totalEarnings.toFixed(7);
      totalInterestTxt.innerText = totalInterest.toFixed(7);
      interestPerDayTxt.innerText = interestPerDay;
    }
  }
}

function decreaseCurrencyAmount() {
  if (currenctCurrencyCount != 0) {
    currenctCurrencyCount--;
    let percent = 2;
    if (days == 2) {
      percent = percent1;
    } else {
      percent = percent2;
    }
    if (cryptoChangeCount == 0) {
      currencyAmount = currencyAmount / 2;
      totalEarnings = currencyAmount * percent;
      totalInterest = currencyAmount * percent - currencyAmount;
      interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(3);

      currencyAmountTxt.innerText = numberWithCommas(currencyAmount);
      totalEarningsTxt.innerText = numberWithCommas(totalEarnings);
      totalInterestTxt.innerText = numberWithCommas(totalInterest);
      interestPerDayTxt.innerText = numberWithCommas(interestPerDay);
    } else {
      currencyAmount = currencyAmount / 2;
      totalEarnings = currencyAmount * percent;
      totalInterest = currencyAmount * percent - currencyAmount;
      interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(3);

      currencyAmountTxt.innerText = currencyAmount.toFixed(7);
      totalEarningsTxt.innerText = totalEarnings.toFixed(7);
      totalInterestTxt.innerText = totalInterest.toFixed(7);
      interestPerDayTxt.innerText = interestPerDay;
    }
  }
}

function increaseWeek() {
  if (timeTxt.innerText != 4) {
    days = days * 2;
    timeTxt.innerText = days;
    totalCalc();
  }
}
function decreaseWeek() {
  if (timeTxt.innerText != 2) {
    days = days / 2;
    timeTxt.innerText = days;
    totalCalc();
  }
}

function totalCalc() {
  let percent = 2;
  if (days == 2) {
    percent = percent1;
  } else {
    percent = percent2;
  }

  if (cryptoChangeCount == 0) {
    totalEarnings = currencyAmount * percent;
    totalInterest = currencyAmount * percent - currencyAmount;
    interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(3);
    totalEarningsTxt.innerText = numberWithCommas(totalEarnings);
    totalInterestTxt.innerText = numberWithCommas(totalInterest);
    interestPerDayTxt.innerText = numberWithCommas(interestPerDay);
    timeTxt2.innerHTML = days;
  } else {
    totalEarnings = currencyAmount * percent;
    totalInterest = currencyAmount * percent - currencyAmount;
    interestPerDay = ((currencyAmount * percent) / (days * hours)).toFixed(7);
    totalEarningsTxt.innerText = totalEarnings.toFixed(7);
    totalInterestTxt.innerText = totalInterest.toFixed(7);
    interestPerDayTxt.innerText = interestPerDay;
    timeTxt2.innerHTML = days;
  }
}

function getCryptoUpdate() {
  let cryptoUpdateXhr = new XMLHttpRequest();
  cryptoUpdateXhr.open(
    "GET",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false",
    true
  );
  cryptoUpdateXhr.send();

  cryptoUpdateXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      response.forEach(function (crypto) {
        let sortedCrypto = {
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.current_price,
          image: crypto.image,
        };
        cryptoValues.push(sortedCrypto);
      });
      cryptoValues.unshift({
        name: "Dollar",
        symbol: "usd",
        price: 1,
        image: "/images/dollar.png",
      });

      if (cryptoValues.length > 0) {
        currencyTxt.textContent = cryptoValues[0].symbol;
        let allImages = document.querySelectorAll(".image-currency");
        allImages.forEach(function (image) {
          image.src = "";
          image.src = cryptoValues[cryptoChangeCount].image;
        });
      }
    } else {
      cryptoValues.unshift({
        name: "Dollar",
        symbol: "usd",
        price: 1,
        image: "/images/dollar.png",
      });
    }
  };
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function addCurrency() {
  if (cryptoChangeCount != cryptoValues.length - 1) {
    cryptoChangeCount += 1;
    currenctCurrencyCount = 0;
    currencyAmount = 500 / cryptoValues[cryptoChangeCount].price;
    currencyTxt.textContent = cryptoValues[cryptoChangeCount].symbol;
    //		image.src = cryptoValues[cryptoChangeCount].image;
    if (cryptoChangeCount == 0) {
      currencyAmountTxt.innerText = currencyAmount;
    } else {
      currencyAmountTxt.innerText = currencyAmount.toFixed(7);
    }
    totalCalc();
    let allImages = document.querySelectorAll(".image-currency");
    allImages.forEach(function (image) {
      image.src = "";
      image.src = cryptoValues[cryptoChangeCount].image;
    });
  }
}
function reduceCurrency() {
  if (cryptoChangeCount != 0) {
    cryptoChangeCount -= 1;
    currenctCurrencyCount = 0;
    currencyAmount = 500 / cryptoValues[cryptoChangeCount].price;
    currencyTxt.textContent = cryptoValues[cryptoChangeCount].symbol;
    //		image.src = cryptoValues[cryptoChangeCount].image;
    if (cryptoChangeCount == 0) {
      currencyAmountTxt.innerText = currencyAmount;
    } else {
      currencyAmountTxt.innerText = currencyAmount.toFixed(7);
    }
    totalCalc();
    let allImages = document.querySelectorAll(".image-currency");
    allImages.forEach(function (image) {
      image.src = "";
      image.src = cryptoValues[cryptoChangeCount].image;
    });
  }
}
