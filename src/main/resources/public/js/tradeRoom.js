let userEmail = new URLSearchParams(window.location.search).get("email");


document.body.addEventListener("click", function(e) {
    let targetId = e.target.id;
    if (targetId == "deposit" || targetId == "deposit-2" || targetId == "deposit-3" || targetId == "deposit-4") {
        location.href = `dashboard.html?email=${userEmail}&status=fund`
    }
})