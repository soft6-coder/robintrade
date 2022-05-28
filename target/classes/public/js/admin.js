let user;
let toUser;
let isOnline = true;
let isLiveChat = true;
let account;
let investmentValue;

let distinctMessageRoot = document.getElementById("distinct-message-root");
let chatBox = document.getElementById("chat-box");
let adminStatus = document.getElementById("status");
let lastSeen = document.getElementById("last-seen");
getUser();

let days;

document.body.addEventListener("click", function (e) {
  let target = e.target;
  if (target.classList.contains("user")) {
    let fromUser =
      target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.value;
    toUser = fromUser;
    getUserDetails();
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
    changeOption(target);
    isLiveChat = true;
  } else if (target.id == "info") {
    
  } else if (target.id == "close-modal") {
    document.getElementById("info-modal").style.display = "none";
  } else if (target.id == "close-fund-modal") {
    document.getElementById("fund-modal").style.display = "none";
  } else if (target.id == "fund") {
    let fundModal = document.getElementById("fund-modal");
    fundModal.style.display = "block";
    // let fundEtx = document.getElementById("fund-etx");
    // updateAccount(fundEtx.value);
  } else if (target.id == "invest") {
    startInvestment();
  }
});

function startInvestment() {
 let investment = {
      account: { accountId: account.accountId },
      investedAmount: investedAmountEtx.value,
      days: daysEtx.value,
      isActive: true,
      currency: { crypto: "Bitcoin" },
      percentage: percentEtx.value,
      startDate: moment(),
      endDate: moment(moment()).add(daysEtx.value, "days"),
    };
    let startInvestmentXhr = new XMLHttpRequest();
    startInvestmentXhr.open("POST", "/investment", true);
    startInvestmentXhr.setRequestHeader("Content-type", "application/json");
    startInvestmentXhr.send(JSON.stringify(investment));

    startInvestmentXhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
}

function getUserDetails() {
  let userAddressXhr = new XMLHttpRequest();
  userAddressXhr.open("GET", `/address/user/${toUser}`, true);
  userAddressXhr.send();

  userAddressXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      let investmentXhr = new XMLHttpRequest();
      investmentXhr.open(
        "GET",
        `/account/${response.user.account.accountId}/investment`,
        true
      );
      investmentXhr.send();

      investmentXhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let investmentResponse = JSON.parse(this.response);
		  console.log(investmentResponse)
          if (investmentResponse != null) {
            investmentValue = investmentResponse.investment;
          }
          let investment = {
            interestBalance: (0).toFixed(1),
            interestPaid: (0).toFixed(1),
            interestAccrued: (0).toFixed(1),
            loanBalance: (0).toFixed(1),
            interestPreference: "Bitcoin",
          };
          if (investmentResponse != null) {
          }
          document.getElementById("user-info-root").innerHTML = bindUserInfo(
            response,
            investment
          );
          document.getElementById("info-modal").style.display = "block";
          account = response.user.account;
        }
      };
    }
  };
}

function updateAccount(balance) {
  document.getElementById(
    "user-info-root"
  ).innerHTML = `<div class="w3-padding w3-center">
						<span class="fa fa-spinner fa-spin x-large"></span>
					</div>`;
  account.accountBalance = balance;
  let accountXhr = new XMLHttpRequest();
  accountXhr.open("PUT", "/account", true);
  accountXhr.setRequestHeader("Content-type", "application/json");
  accountXhr.send(JSON.stringify(account));
  accountXhr.onreadystatechange = function () {
    document.getElementById("info-modal").style.display = "none";
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      getUserDetails();
    }
  };
}

function getUser() {
  let adminXhr = new XMLHttpRequest();
  adminXhr.open("GET", "/admin", true);
  adminXhr.send();
  adminXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      user = this.response;
    }
  };
}


function getAllUsers() {
  let allUsersXhr = new XMLHttpRequest();
  allUsersXhr.open("GET", "/admin/address", true);
  allUsersXhr.send();
  document.getElementById(
    "distinct-message-root"
  ).innerHTML = `<div id="distinct-message-spinner" class="fa fa-spinner fa-spin xx-large green-text opacity-1"
							style="position: absolute; left: 220px; top: 200px"></div>`;

  allUsersXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("distinct-message-root").innerHTML = "";
      document.getElementById("message-root").innerHTML = "";
      let response = JSON.parse(this.response);
      console.log(response);
      response.forEach(function (address) {
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
    }
  };
}

function bindUserInfo(info, investment) {
  return `
	   <div class="w3-row">
              <div class="w3-col s6 w3-border-right">
                <div class="w3-padding-large">
                  <p class="large blue-text-dash w3-center">Info</p>
                  <div class="w3-row-padding">
                   
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.fullName}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.password}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.email}
                      </p>
                    </div>
                   
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.mobileNumber}
                      </p>
                    </div>
                   
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.ssn}
                      </p>
                    </div>
                   
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralId}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralEmail}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.country.countryName}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.state.stateName}
                      </p>
                    </div>
                    
                    <div class="w3-col s12">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.city}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div class="w3-col s6">
                <div class="w3-padding-large">
                  <p class="large blue-text-dash w3-center">Account</p>
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
                    <div class="w3-col s12">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Interest Balance
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span>${info.user.account.accountBalance}</span>
                      </p>
                    </div>
                    <div class="w3-col s12">
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
                    <div class="w3-col s12">
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
                    <div class="w3-col s12">
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
                  <div style="display: flex; justify-content: center; margin-top: 32px;">
                    <div
                      id="fund"
                      class="w3-button w3-border w3-round w3-hover-none"
                    >
                      FUND
                    </div>
                  </div>             
                </div>
              </div>
            </div>`;
}

function changeOption(currentOption) {
  document.getElementById("user-profile").style.visibility = "hidden";
  document.getElementById("chat-box-container").style.visibility = "hidden";
  document.getElementById("message-root").innerHTML = "";
  let allOptions = document.querySelectorAll(".option");
  allOptions.forEach(function (option) {
    option.classList.replace("blue-text", "grey-text-2");
    option.nextElementSibling.classList.replace("blue-text", "grey-text");
  });
  currentOption.classList.replace("grey-text-2", "blue-text");
  currentOption.nextElementSibling.classList.replace("grey-text", "blue-text");
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

