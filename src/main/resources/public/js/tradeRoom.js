let userEmail = new URLSearchParams(window.location.search).get("email");
let tradingAccount;

document.body.addEventListener("click", function(e) {
	let targetId = e.target.id;
	if (targetId == "deposit" || targetId == "deposit-2" || targetId == "deposit-3" || targetId == "deposit-4") {
		location.href = `dashboard.html?email=${userEmail}&status=fund`
	}
	else if (targetId == "copy-experts-2") {
		document.getElementById("dashboard").classList.add("fade-out");
		setTimeout(function() {
			document.getElementById("copy-traders-container").classList.remove("fade-out");
			document.getElementById("copy-traders-container").style.display = "block";
			document.getElementById("dashboard").style.display = "none"
		}, 500)
		getAllTraders();
	}
	else if (e.target.classList.contains("copy")) {
		e.target.innerHTML = "Copied";
		copy(tradingAccount.tradingAccountId, e.target.parentElement.previousElementSibling.previousElementSibling.children[0].value)
	}
	else if (e.target.classList.contains("open-info")) {
		getTrader(e.target.parentElement.previousElementSibling.children[0].value)
	}
	else if (targetId == "close-trader-modal") {
		document.getElementById("trader-info").style.display = "none";
	}
	else if (targetId == "back-to-dashboard") {
		document.getElementById("copy-traders-container").classList.add("fade-out");
		setTimeout(function() {
			document.getElementById("dashboard").classList.remove("fade-out");
			document.getElementById("dashboard").style.display = "block";
		}, 500)


	}
})

function getUser() {
	let userXhr = new XMLHttpRequest();
	userXhr.open("GET", `/user/email/${userEmail}`, true);
	userXhr.send();

	userXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			console.log(response)
			tradingAccount = response.tradingAccount;
			getAccountTrader(userEmail)
		}
	}
}

function getAllTraders() {
	let tradersXhr = new XMLHttpRequest();
	tradersXhr.open("GET", "/traders", true);
	tradersXhr.send();

	tradersXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			document.getElementById('copy-traders-root').innerHTML = "";
			response.forEach(function(item) {
				document.getElementById('copy-traders-root').innerHTML += bindCopyTraders(item)
			});
		}
	};
}

function getTrader(traderId) {
	let traderXhr = new XMLHttpRequest();
	traderXhr.open("GET", `/trader/${traderId}`, true);
	traderXhr.send();

	traderXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			document.getElementById('trader-info').style.display = "block";
			document.getElementById("image-1").src = `${response.traderId}.jpeg`;
			document.getElementById("name").textContent = `${response.traderName}`;
			document.getElementById("win-rate").textContent = `${response.winRate}`;
			document.getElementById("profit-share").textContent = `${response.profitShare}`;
		}
	};
}

function getAccountTrader() {
	let userXhr = new XMLHttpRequest();
	userXhr.open("GET", `/user/email/${userEmail}`, true);
	userXhr.send();

	userXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			if (response.tradingAccount.trader == null) {
				document.getElementById("my-trader-root").innerHTML = `<p class="w3-center no-margin">You currently have no active
						Traders</p>`
			}
			else {
				document.getElementById("my-trader-root").innerHTML =
					`<div class="w3-center">
						<img src="./images/${response.tradingAccount.trader.traderId}.jpeg" style="height: 40px; width: 40px; border-radius: 40px" />
						<span class="w3-round" style="background-color: rgb(0, 50, 235); color: white; padding: 0px 8px; margin-left: 4px">${response.tradingAccount.trader.traderName}</span>
					</div>`
			}
		}
	}
}

function copy(tradeAccountId, traderId) {
	console.log(tradeAccountId, traderId)
	let copyTraderXhr = new XMLHttpRequest();
	copyTraderXhr.open("GET", `/tradeaccount/${tradeAccountId}/trader/${traderId}`, true);
	copyTraderXhr.send();

	copyTraderXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			getAccountTrader();
		}
	}
}

getUser();
blink();


function blink() {
	setInterval(function() {
		if (document.getElementById("copy-experts").style.backgroundColor == "rgb(241, 114, 3)") {
			document.getElementById("copy-experts").style.backgroundColor = "rgb(23, 27, 38)";
		}
		else {
			document.getElementById("copy-experts").style.backgroundColor = "rgb(241, 114, 3)";
		}
	}, 500)
}

function bindCopyTraders(trader) {
	return `<div class="w3-row" style="color: white; border-bottom: 0.2px solid rgb(0, 50, 235, 0.2); padding: 12px">
					<div class="w3-col s3">
					<input type="hidden" value="${trader.traderId}" />
						<img alt="" src="./images/${trader.traderId}.jpeg" style="height: 60px; width: 60px; border-radius: 60px; margin-top: 0px">
					</div>
					<div class="w3-col s6" style="padding-left: 4px">
						<p class="no-margin small open-info pointer" style="color: rgb(0, 50, 235); font-weight: 600">${trader.traderName}</p>
						<p class="no-margin small" style="font-weight: 600">${trader.winRate}% Win Rate</p>
						<p class="no-margin small" style="font-weight: 600">${trader.profitShare}% Profit Share</p>
					</div>
					<div class="w3-col s3 w3-center">
						<div class="w3-padding-small w3-round w3-center small pointer copy" style="border: 0.3px solid rgb(0, 50, 235); color:  rgb(0, 50, 235); margin-top: 16px">Copy</div>
					</div>
				</div>`
}


