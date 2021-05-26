
  // creation de la table
  
  function generateTable(table, data) {
    for (let element of data) {
        let user = {
            username: element.username,
            email: element.email,
            password: element.password,
            role: element.role,
            modifier: "modifier",
            supprimer: "supprimer",
        }
      let row = table.insertRow();
      for (key in user) {
        let cell = row.insertCell();
        if (key == "modifier" || key == "supprimer") 
        {
            btn = document.createElement("BUTTON");
            btn.innerHTML = key;
            btn.classList.add('btn');
            btn.classList.add(`${key == "modifier" ? "btn-outline-info" : "btn-outline-danger"}`);
            btn.classList.add(`${key == "modifier" ? "modifier": "supprimer"}`);
            if (key == "modifier") {
                btn.onclick = function() {
                    document.querySelector("#modal1").classList.add("is-visible");
                    document.querySelector("#update").setAttribute('action', `/users/${element.id}`)
                }}
            else if (key == "supprimer") {
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/${element.id}`, {
                        method: 'DELETE',
                    }).then(location.reload())
                }
            }
            cell.appendChild(btn);
        } else {
            let text = document.createTextNode(user[key]);
            cell.appendChild(text);
        }
      }
    }
  }
  
let table = document.querySelector("table");

fetch('http://localhost:3000/users/all')
    .then(res => res.json())
    .then(data => generateTable(table, data));


let btnClose = document.getElementById("close");
btnClose.addEventListener("click", function() {
    const modal = document.querySelector("#modal1");
    modal.classList.remove("is-visible");
})
