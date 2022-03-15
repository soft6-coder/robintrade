let user;
let toUser;
let isOnline = true;
let isLiveChat = true;
let account;


let distinctMessageRoot = document.getElementById("distinct-message-root");
let chatBox = document.getElementById("chat-box");
let adminStatus = document.getElementById("status");
let lastSeen = document.getElementById("last-seen");
getUser();
connect();

chatBox.addEventListener("focusin", function(e) {
	typing(true);
});
chatBox.addEventListener("focusout", function(e) {
	typing(false);
});
chatBox.addEventListener("keyup", function(e) {
	if (e.key === "Enter") {
		prepareForSending(toUser);
		e.target.blur();
	}
});
document.body.addEventListener("click", function(e) {
	let target = e.target;
	if (target.classList.contains("user")) {
		let fromUser =
			target.parentElement.parentElement.previousElementSibling
				.previousElementSibling.value;
		toUser = fromUser;
		getMessage(fromUser);
	} else if (target.id == "send-message") {
		prepareForSending(toUser);
	} else if (target.id == "status") {
		console.log(isOnline);
		if (isOnline) {
			setAdminStatus(false);
		} else {
			setAdminStatus(true);
		}
	} else if (target.id == "view-user") {
		getAllUsers();
		changeOption(target);
		isLiveChat = false;
	} else if (target.id == "view-chat") {
		getDistinctMessages(user, false);
		changeOption(target);
		isLiveChat = true;
	} else if (target.id == "info") {
		getUserDetails();
	} else if (target.id == "close-modal") {
		document.getElementById("info-modal").style.display = "none";
	}
	else if(target.id == "fund") {
		let fundEtx = document.getElementById('fund-etx');
		updateAccount(fundEtx.value);
	}
});

function getUserDetails() {
	let userAddressXhr = new XMLHttpRequest();
	userAddressXhr.open("GET", `/address/user/${toUser}`, true);
	userAddressXhr.send();

	userAddressXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			let investmentXhr = new XMLHttpRequest();
			investmentXhr.open('GET', `/account/${response.user.account.accountId}/investment`, true);
			investmentXhr.send();

			investmentXhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let investmentResponse = JSON.parse(this.response);
					let investment = {
						interestBalance: (0).toFixed(1), interestPaid: (0).toFixed(1), interestAccrued: (0).toFixed(1), loanBalance: (0).toFixed(1), interestPreference: "Bitcoin"
					}
					if (!investmentResponse == null) {

					}
					document.getElementById('user-info-root').innerHTML = bindUserInfo(response, investment);
					document.getElementById('info-modal').style.display = 'block';
					account = response.user.account;
				}
			}


		}
	}
}

function updateAccount(balance) {
	document.getElementById('user-info-root').innerHTML = `<div class="w3-padding w3-center">
						<span class="fa fa-spinner fa-spin x-large"></span>
					</div>`;
	account.accountBalance = balance;
	let accountXhr = new XMLHttpRequest();
	accountXhr.open("PUT", "/account", true);
	accountXhr.setRequestHeader("Content-type", "application/json")
	accountXhr.send(JSON.stringify(account));
	accountXhr.onreadystatechange = function() {
		document.getElementById('info-modal').style.display = 'none';
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			getUserDetails();
		}
	}
}

function sendMessage(message) {
	let payLoad = {
		toUser: {
			email: message.email,
		},
		message: message.content,
		date: moment(),
	};

	let sendMessageXhr = new XMLHttpRequest();
	sendMessageXhr.open("POST", `/send-message`, true);
	sendMessageXhr.setRequestHeader("Content-type", "application/json");
	sendMessageXhr.send(JSON.stringify(payLoad));

	sendMessageXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			setAdminStatus(true);
			if (isLiveChat) {
				getDistinctMessages(user, false);
			}
			let div = document.createElement("div");
			div.innerHTML = bindMessage1(payLoad);
			document
				.getElementById("message-root")
				.insertBefore(
					div,
					document.getElementById("message-root").firstElementChild
				);
		}
	};
}

function getUser() {
	let adminXhr = new XMLHttpRequest();
	adminXhr.open("GET", "/admin", true);
	adminXhr.send();
	adminXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			user = this.response;
			getDistinctMessages(user, false);
			setAdminStatus(true);
		}
	};
}

function typing(condition) {
	let typingXhr = new XMLHttpRequest();
	typingXhr.open("GET", `/typing/${toUser}/${condition}`, true);
	typingXhr.send();

	typingXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(`User typing : ${condition}`);
		}
	};
}

function getUsersStatus() {
	let usersStatusXhr = new XMLHttpRequest();
	usersStatusXhr.open("GET", "/userstatus", true);
	usersStatusXhr.send();

	usersStatusXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			console.log(response);
			let distinctUsers = document.querySelectorAll(".user");
			response.forEach(function(userStatus) {
				distinctUsers.forEach(function(distinctUser) {
					if (
						userStatus.user.email ==
						distinctUser.parentElement.parentElement.previousElementSibling
							.previousElementSibling.value
					) {
						if (userStatus.online) {
							distinctUser.parentElement.parentElement.previousElementSibling.children[1].classList.replace(
								"w3-white",
								"green-background"
							);
						} else {
							if (
								distinctUser.parentElement.parentElement.previousElementSibling.children[1].classList.contains(
									"green-background"
								)
							) {
								distinctUser.parentElement.parentElement.previousElementSibling.children[1].classList.replace(
									"green-backround",
									"white-background"
								);
							}
						}
					}
				});
			});
		}
	};
}

function getUserStatus() {
	let userStatus = new XMLHttpRequest();
	userStatus.open("GET", `/userstatus/${toUser}`, true);
	userStatus.send();

	userStatus.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			if (response.online) {
				lastSeen.innerText = "Active";
			} else {
				let a = moment();
				let b = moment(response.date);
				let time = a.diff(b, "seconds");
				if (Math.round(time / 60) == 0) {
					lastSeen.innerText = `Last seen ${a.diff(b, "seconds")} Seconds ago`;
				} else if (Math.round(time / 3600) == 0) {
					let calc = Math.floor(a.diff(b, "seconds") / 60);
					if (calc == 1) {
						lastSeen.innerText = `Last seen ${calc} Minute  ago`;
					} else {
						lastSeen.innerText = `Last seen ${calc} Minutes  ago`;
					}
				} else {
					let calc = Math.floor(a.diff(b, "seconds") / 3600);
					if (calc == 1) {
						lastSeen.innerText = `Last seen ${calc} Hour ago`;
					} else {
						lastSeen.innerText = `Last seen ${calc} Hours ago`;
					}
				}
				//				else {
				//					let calc = Math.floor(
				//						a.diff(b, "seconds") / 86400 + 1
				//					)
				//					if (calc == 1) {
				//						lastSeen.innerText = `Last seen ${calc} Day ago`;
				//					}
				//					else {
				//						lastSeen.innerText = `Last seen ${calc} Days ago`;
				//					}
				//
				//				}
			}
		}
	};
}

function connect() {
	var stompClient = null;
	var stompClient2 = null;

	var socket = new SockJS("/future-space-live");
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		stompClient.subscribe("/user/topic/live-chat", function(message) {
			let parsedMessage = JSON.parse(message.body);
			if (parsedMessage.fromUser.email == toUser) {
				let div = document.createElement("div");
				div.innerHTML = bindMessage2(parsedMessage);
				document
					.getElementById("message-root")
					.insertBefore(
						div,
						document.getElementById("message-root").firstElementChild
					);
			}
			if (isLiveChat) {
				getDistinctMessages(user, false);
			}
		});
	});

	var socket2 = new SockJS("/future-space-live");
	stompClient2 = Stomp.over(socket2);
	stompClient2.connect({}, function(frame) {
		stompClient2.subscribe("/user/topic/typing", function(condition) {
			console.log(JSON.parse(condition.body));
			if (JSON.parse(condition.body)) {
				document.getElementById("last-seen").textContent = "Typing...";
			} else {
				document.getElementById("last-seen").textContent = "Active";
			}
		});
	});
}

function getMessage(fromUser) {
	document.getElementById(
		"message-root"
	).innerHTML = `<div id="message-spinner" class="fa fa-spinner fa-spin xx-large green-text opacity-1"
							style="position: absolute; left: 450px; top: 200px"></div>`;
	let fromUserXhr = new XMLHttpRequest();
	fromUserXhr.open("GET", `/userstatus/${fromUser}`, true);
	fromUserXhr.send();

	fromUserXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			document.getElementById("full-name").textContent = response.user.fullName;
			if (response.online) {
				document.getElementById("last-seen").textContent = "Active";
			}
		}
	};

	let messageXhr = new XMLHttpRequest();
	messageXhr.open("GET", `/admin/message/${fromUser}`, true);
	messageXhr.send();

	messageXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("user-profile").style.visibility = "visible";
			document.getElementById("chat-box-container").style.visibility =
				"visible";
			let response = JSON.parse(this.response);
			document.getElementById("message-root").innerHTML = "";
			if (response.length > 0) {
				response.forEach(function(message) {
					if (message.fromUser.email == user) {
						document.getElementById("message-root").innerHTML +=
							bindMessage1(message);
					} else {
						document.getElementById("message-root").innerHTML +=
							bindMessage2(message);
					}
				});
			}
			getUserStatus();
		}
	};
}

function getDistinctMessages(user, first) {
	distinctMessageRoot.innerHTML = `<div id="distinct-message-spinner" class="fa fa-spinner fa-spin xx-large green-text opacity-1"
							style="position: absolute; left: 220px; top: 200px"></div>`;
	let distinctMessageXhr = new XMLHttpRequest();
	distinctMessageXhr.open("GET", `/message/${user}/distinct`, true);
	distinctMessageXhr.send();

	distinctMessageXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			distinctMessageRoot.innerHTML = "";
			response.forEach(function(message) {
				let a = moment();
				let b = moment(message.date);

				if (a.diff(b, "days") == 0) {
					message.date = moment(message.date).format("h:mm a");
				} else if (a.diff(b, "days") == 1) {
					message.date = "Yesterday";
				} else {
					message.date = moment(message.date).format("DD/MM/yyyy");
				}
				if (message.fromUser.email == user) {
					message.fromUser = message.toUser;
				}
				distinctMessageRoot.innerHTML += bindUserStatus(
					message.fromUser.email,
					message.fromUser.fullName,
					message.message,
					message.date
				);
			});
			getUsersStatus();
		}
	};
}

function setAdminStatus(status) {
	let setStatusXhr = new XMLHttpRequest();
	setStatusXhr.open(
		"GET",
		`/userstatus/${user}/status/${status}/date/${moment()}`
	);
	setStatusXhr.send();

	setStatusXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			if (response.online) {
				setStatus(true);
			} else {
				setStatus(false);
			}
		}
	};
}

function disconnect() {
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	console.log("Disconnected");
}

function prepareForSending(toUser) {
	let message = chatBox.value;
	if (message != "") {
		let liveChatMessage = {
			email: toUser,
			content: message,
		};
		chatBox.value = "";
		sendMessage(liveChatMessage);
	}
}

function setStatus(status) {
	if (status == true) {
		adminStatus.classList.replace("grey-text-2", "green-text");
		adminStatus.nextElementSibling.textContent = "Online";
		isOnline = true;
	} else {
		adminStatus.classList.replace("green-text", "grey-text-2");
		adminStatus.nextElementSibling.textContent = "Offline";
		isOnline = false;
	}
}

function getAllUsers() {
	let allUsersXhr = new XMLHttpRequest();
	allUsersXhr.open("GET", "/admin/address", true);
	allUsersXhr.send();
	document.getElementById(
		"distinct-message-root"
	).innerHTML = `<div id="distinct-message-spinner" class="fa fa-spinner fa-spin xx-large green-text opacity-1"
							style="position: absolute; left: 220px; top: 200px"></div>`;

	allUsersXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("distinct-message-root").innerHTML = "";
			document.getElementById("message-root").innerHTML = "";
			let response = JSON.parse(this.response);
			response.forEach(function(address) {
				if (address.user.referral != null) {
					document.getElementById("distinct-message-root").innerHTML +=
						bindUserStatus(
							address.user.email,
							address.user.fullName,
							address.country.countryName,
							`Referred by ${address.user.referral.fullName}`
						);
				} else {
					document.getElementById("distinct-message-root").innerHTML +=
						bindUserStatus(
							address.user.email,
							address.user.fullName,
							address.country.countryName,
							`Referred by nobody`
						);
				}
			});
			getUsersStatus();
		}
	};
}

function bindUserInfo(info, investment) {
	return `
	   <div class="w3-row">
              <div class="w3-col s6 w3-border-right">
                <div class="w3-padding-large">
                  <p class="x-large blue-text-dash">Info</p>
                  <div class="w3-row-padding">
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Name:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.fullName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Password:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.password}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Email:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.email}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Mobile number:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.mobileNumber}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        SSN:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.ssn}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Referral ID:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralId}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Referred by:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralEmail}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Country:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.country.countryName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        State:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.state.stateName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        City:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.city.cityName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="big blue-text-dash w3-margin-top">
                      Date Registered: <span class="w3-text-black">${info.user.date}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="w3-col s6">
                <div class="w3-padding-large">
                  <p class="x-large blue-text-dash">Account</p>
                  <p
                    class="w3-center large blue-text-dash"
                    style="font-weight: 500"
                  >
                    Total Dollar Value of Crypto
                  </p>
                  <p class="w3-center large blue-text-dash">
                    $<span>${info.user.account.accountBalance}</span>
                  </p>
                  <div class="w3-row-padding w3-center">
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Interest Balance
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span>${investment.interestBalance}</span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Total Interest Paid
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span>${investment.interestPaid}</span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Accrued Interest
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span>${investment.interestAccrued}</span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Loan Balance:
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span>${investment.loanBalance}</span>
                      </p>
                    </div>
                  </div>
                  <div class="w3-margin">
                    <input
                      class="w3-input w3-border"
                      type="number"
                      name=""
                      id="fund-etx"
                    />
                  </div>
                  <div style="display: flex; justify-content: center">
                    <div
                      id="fund"
                      class="w3-button w3-border w3-round w3-hover-none"
                    >
                      FUND
                    </div>
                  </div>
                  <div class="w3-margin-top">
                    <p class="big blue-text-dash">
                      Interest Preference: <span class="w3-text-black">${investment.interestPreference}</span>
                    </p>
                    <p class="big blue-text-dash">
                      Account Type: <span class="w3-text-black">${info.accountType.accountType}</span>
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>`
}

function changeOption(currentOption) {
	document.getElementById("user-profile").style.visibility = "hidden";
	document.getElementById("chat-box-container").style.visibility = "hidden";
	document.getElementById("message-root").innerHTML = "";
	let allOptions = document.querySelectorAll(".option");
	allOptions.forEach(function(option) {
		option.classList.replace("blue-text", "grey-text-2");
		option.nextElementSibling.classList.replace("blue-text", "grey-text");
	});
	currentOption.classList.replace("grey-text-2", "blue-text");
	currentOption.nextElementSibling.classList.replace("grey-text", "blue-text");
}

function bindMessage1(message) {
	return `<div class="w3-margin w3-animate-right" style="padding-left: 700px">
                  <div class="w3-padding-large card w3-round" style="width: 200px">
                    <p class="no-margin w3-center">${message.message}</p>
                  </div>
                </div>`;
}

function bindMessage2(message) {
	return `<div class="w3-row w3-margin w3-animate-left" style="position: relative">
                  <div class="w3-col s1 w3-padding">
                    <img
                      src="./images/user.png"
                      alt=""
                      style="
                        width: 3%;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 0px;
						left: 4px;
                      "
                    />
                  </div>
                  <div class="w3-col s11">
                    <div
                      class="w3-padding-large w3-black w3-round"
                      style="width: 300px"
                    >
                      <p class="no-margin w3-center">${message.message}</p>
                    </div>
                  </div>
                </div>`;
}

function bindUserStatus(email, fullName, message, date) {
	return `
	<div class="w3-white w3-animate-opacity">
		<div
    class="w3-row w3-padding-large pointer"
    
  >
	<input type="hidden" value=${email} />
    <div class="w3-col s2" style="position: relative">
      <img
        src="./images/user.png"
        alt=""
        style="width: 50%; border-radius: 50%; margin-top: 2px"
      />
	<div id="status-indicator" class="w3-white" style="position: absolute; left: 32px; bottom: 2px; border-radius: 50%; height: 6px; width: 6px; outline: 2px solid white;"></div>
    </div>
    <div class="w3-col s6">
		<div class="w3-left">
			<p class="no-margin user">${fullName}</p>
      		<p class="no-margin small">
        	${message}
      		</p>
		</div>
    </div>
    <div class="w3-col s4">
      <p class="no-margin small w3-right">
        ${date}
      </p>
    </div>
  </div>
<hr style="margin: 0px 0px 0px 100px">
	</div>`;
}
