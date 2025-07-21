// index.js

const poolData = {
    UserPoolId: 'us-east-1_tKaNJikTO',
    ClientId: '7lhfv84qm3fhls4d68fn87qsrn'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "email",
            Value: email
        })
    ];

    userPool.signUp(email, password, attributeList, null, function (err, result) {
        if (err) {
            alert("Registration failed: " + err.message || JSON.stringify(err));
            return;
        }
        alert("Registration successful! Please check your email to confirm.");
        console.log("User name is " + result.user.getUsername());
    });
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
    });

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            alert("Login successful!");
            console.log("Access Token: " + result.getAccessToken().getJwtToken());
        },
        onFailure: function (err) {
            alert("Login failed: " + err.message || JSON.stringify(err));
        }
    });
}

function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab-panel");
    const buttons = document.querySelectorAll(".tab-button");
    tabs.forEach(tab => tab.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add("active");
}
