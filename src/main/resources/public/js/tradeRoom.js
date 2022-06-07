let userEmail = new URLSearchParams(window.location.search).get("email");

let expertTraders = [];
for (i = 0; i < 8; i++) {
	let expertTrader = {
		name: "Robin Trader",
		type: "Human",
		winRates: "95",
		profitShares: "20"
	}
	expertTraders.push(expertTrader)

}
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
	}
	else if (e.target.classList.contains("copy")) {
		console.log("Copy");
	}
	else if (e.target.classList.contains("open-info")) {
		document.getElementById("trader-info").style.display = "block";
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


expertTraders.forEach(function(trader) {
	document.getElementById('copy-traders-root').innerHTML += bindCopyTrader(trader)
}) 


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

function bindCopyTrader(trader) {
	return `<div class="w3-row" style="color: white; border-bottom: 0.2px solid rgb(0, 50, 235, 0.2); padding: 12px">
					<div class="w3-col s2">
						<img alt="" src="./images/paulius.png" style="height: 40px; width: 40px; border-radius: 40px; margin-top: 12px">
					</div>
					<div class="w3-col s7" style="padding-left: 4px">
						<p class="no-margin small open-info pointer" style="color: rgb(0, 50, 235); font-weight: 600">${trader.name}</p>
						<p class="no-margin small" style="font-weight: 600">${trader.winRates}% Win Rate</p>
						<p class="no-margin small" style="font-weight: 600">${trader.profitShares}% Profit Share</p>
					</div>
					<div class="w3-col s3 w3-center">
						<div class="w3-padding-small w3-round w3-center small pointer copy" style="border: 0.3px solid rgb(0, 50, 235); color:  rgb(0, 50, 235); margin-top: 16px">Copy</div>
					</div>
				</div>`
}


