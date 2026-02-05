// ========================
// OPEN / CLOSE SIGNUP MODAL
// ========================
document.getElementById("open-signup").onclick = () => {
    document.getElementById("signupModal").style.display = "block";
};

document.getElementById("signup-cancel").onclick = () => {
    document.getElementById("signupModal").style.display = "none";
};

// ========================
// SIGNUP LOGIC
// ========================
document.getElementById("signup-btn").onclick = () => {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username === "" || password === "") {
        alert("Fill all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    document.getElementById("signupModal").style.display = "none";
};

// ========================
// OPEN / CLOSE SIGNIN MODAL
// ========================
document.getElementById("open-signin").onclick = () => {
    document.getElementById("signinModal").style.display = "block";
};

document.getElementById("signin-cancel").onclick = () => {
    document.getElementById("signinModal").style.display = "none";
};

// ========================
// SIGNIN LOGIC
// ========================
document.getElementById("signin-btn").onclick = () => {
    let username = document.getElementById("signin-username").value;
    let password = document.getElementById("signin-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(u => u.username === username && u.password === password);

    if (!found) {
        alert("Invalid login!");
        return;
    }

    document.getElementById("signinModal").style.display = "none";
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("user-name").innerText = username;

    loadXMLUsers();
};

// ========================
// POSTING SYSTEM
// ========================
document.getElementById("post-btn").onclick = () => {
    let text = document.getElementById("post-text").value;
    if (text === "") return;

    let feed = document.getElementById("feed");

    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
        <p>${text}</p>
        <input class="comment-box" placeholder="Add a comment">
        <button class="comment-btn">Comment</button>
        <div class="comments"></div>
    `;

    feed.prepend(div);

    div.querySelector(".comment-btn").onclick = () => {
        let commentText = div.querySelector(".comment-box").value;
        if (commentText === "") return;

        let c = document.createElement("p");
        c.textContent = "💬 " + commentText;

        div.querySelector(".comments").appendChild(c);
    };
};

// ========================
// LOAD XML + XSL
// ========================
function loadXMLUsers() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "users.xml", true);
    xhttp.onload = function () {
        let xml = this.responseXML;

        let xslRequest = new XMLHttpRequest();
        xslRequest.open("GET", "users.xsl", true);

        xslRequest.onload = function () {

            let xsl = this.responseXML;

            let processor = new XSLTProcessor();
            processor.importStylesheet(xsl);

            let result = processor.transformToFragment(xml, document);

            document.getElementById("xml-users").innerHTML = "";
            document.getElementById("xml-users").appendChild(result);
        };
        xslRequest.send();
    };
    xhttp.send();
}
