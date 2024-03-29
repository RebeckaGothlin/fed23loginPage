let userList = document.querySelector("#userList");
let userForm = document.querySelector('#userForm');

// INNIT
if (localStorage.getItem("user")) {
    // ÄR INLOGGAD
    printLogoutBtn();
} else {
    // ÄR INTE INLOGGAD
    printLoginForm();
}

function printUsers() {
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
        console.log("data", data);

        data.map(user => {
            let li = document.createElement('li');
            li.innerText = user.name;

            userList.appendChild(li);
        })
    })
}

printUsers();

function printLoginForm() {
    // Töm tidigare innehållet först, så man inte får dubletter
    userForm.innerHTML = '';

    let inputEmail = document.createElement('input');
    inputEmail.placeholder = 'Epost';

    let inputPassword = document.createElement('input');
    inputPassword.placeholder = 'Lösenord';
    inputPassword.type = 'password';

    let loginBtn = document.createElement('button');
    loginBtn.innerText = 'Logga in';

    loginBtn.addEventListener('click', () => {
        let sendUser = {email: inputEmail.value, password: inputPassword.value}

        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log("post user", data);

            if (data.user) {
                localStorage.setItem("user", data.user)
                printLogoutBtn();
            } else {
                alert("Fel inlogg");
            }
        })
    })

    userForm.append(inputEmail, inputPassword, loginBtn);

}

function printLogoutBtn() {
    userForm.innerHTML = '';

    let logoutBtn = document.createElement('button');
    logoutBtn.innerText = 'Logga ut';

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        printLoginForm();
    })

    userForm.appendChild(logoutBtn);
}