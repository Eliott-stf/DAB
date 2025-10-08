// on va se cree une constante pour la clé du LocalStorage
const STORAGE_KEY = "dab_account"

//on crée des comptes par defaut
let accounts = [
    { id: 1, name: "Dupont", pin: "1234", balance: 500, history: [] },
    { id: 2, name: "Durand", pin: "0000", balance: 1500, history: [] },
];

//chargement des données depuis le local storage
try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
        accounts = JSON.parse(raw) // permet de transformer la chaine de caractère en tableau/objet 
    }
} catch (e) {
    console.log("Erreur de parsing des données stockées", e);
}

//fonction pour enregistrer en local storage

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))

}

// REFERENCE DU DOM
//on récupère ici les elements HTML auxquels on veut acceder depuis le js
const accountSelect = document.getElementById("accountSelect");
const openLogin = document.getElementById("openLogin");
const session = document.getElementById("session");
const userName = document.getElementById("userName");
const userBalance = document.getElementById("userBalance");
const elHistory = document.getElementById("history");
const btnBalance = document.getElementById("btnBalance");
const btnWithdraw = document.getElementById("btnWithdraw");
const btnDeposit = document.getElementById("btnDeposit");
const btnLogout = document.getElementById("btnLogout");

//variable qui contient le compte actuellement connecté 

let current = null;

//FONCTION UI
//methode qui permet de remplir la liste select
function populate() {
    accountSelect.innerHTML = ''; //permet de vider la liste
    accounts.forEach(a => {
        const opt = document.createElement("option") // <option>
        opt.value = a.id //<option value="1">
        opt.textContent = `${a.name} (${a.balance}$)` //<option value="1">Dupont (500$)</option>
        //une fois que la balise a été construite, il faut l'inserer dans son parent
        accountSelect.append(opt)
    })
}

populate();

//>Evenements: actions utilisateur

//Connexion : on demande le pin via prompt()
openLogin.addEventListener("click", () => {
    const id = accountSelect.value; // on recupere l'id de l'utilisateur
    const acc = accounts.find(x => x.id == id);
    if (!acc) return alert("Compte introuvable")

    //on cree le pronmt pour saisir le pin 
    const pin = prompt(`Entrez le PIN pour ${acc.name}\n
        (Exercice: ${acc.pin})`)

    //on verifie si le pin est ok 
    if (pin === acc.pin) {
        current = acc; //on garde la reference du compte connecté
        enterSession()

    } else {
        alert("PIN incorrect");
    }
})

//enterSession : effichage de l'interface utilisateur connecté
function enterSession() {
    session.classList.remove("hidden"); //on supprime la classe hidden
    userName.textContent = current.name;
    userBalance.textContent = current.balance.toFixed(2) + "$"
    renderHistory();
}

//methode pour voir le solde
btnBalance.addEventListener("click", () => {
    if (!current) return alert("Aucun compte connecté")

    alert(`Solde: ${current.balance.toFixed(2)}$`)
})

//methode pour retirer de l'argent

btnWithdraw.addEventListener("click", () => {
    if (!current) return alert("Aucun compte connecté")
    const s = prompt("Montant à retirer (ex:50) : ")
    const v = Number(s); //convertir les resultats du prompt en integer
    //validation : present, postif, fond suffisant
    if (!v || v <= 0) return alert("Montant invalide");
    if (v > current.balance) return alert("Solde insuffisant");

    //on met a jour le solde et l'historique
    current.balance -= v;
    current.history = current.history || []
    current.history.unshift({ t: 'retrait', amount: -v, when: new Date().toISOString() }); //permet d'insérer dans le tableau history en 1er place (unshift)
    save();

    //on met a jour l'affichage
    userBalance.textContent = current.balance.toFixed(2) + "$";
    renderHistory()
    alert("Retrait effectué avec succès");
})

//methode pour deposer de l'argent
btnDeposit.addEventListener("click", () => {
    if (!current) return alert("Aucun compte connecté")
    const s = prompt("Montant à déposer (ex:50) : ")
    const v = Number(s); //convertir les resultats du prompt en integer
    //validation 
    if (!v || v <= 0) return alert("Montant invalide");

    //on met a jour le solde et l'historique
    current.balance += v;
    current.history.unshift({ t: 'dépot', amount: +v, when: new Date().toISOString() });
    //on met a jour le local storage
    save();

    //on met a jour l'affichage
    userBalance.textContent = current.balance.toFixed(2) + "$";
    renderHistory()
    alert("Dépot effectué avec succès");
})

//PARTIE AFFICHIAGE HISTORIQUE 
//methode pour afficher l'historique des transactions
function renderHistory() {
    elHistory.innerHTM = ""; //on vide l'element <ul>
    const list = (current && current.history) ? current.history : []; // If Else en ternaire
    if (list.length === 0) {
        elHistory.innerHTML = "<li>Aucune opération effectuée</li>"
        return
    }
    //si j'ai des elements dans mon tableau history on parcours les 10 premiers elements
    list.slice(0, 10).map(tx => {
        //on doit crer un element li
        const li = document.createElement("li"); //<li></li>
        li.textContent = `${tx.t} : ${tx.amount}$ -(${new Date(tx.when).toLocaleString()})`
        //il faut injecter les li dans son parent 
        elHistory.append(li);
    })
}


//methode déconnexion
btnLogout.addEventListener("click", () => {
    current = null; //on vide les données de l'utilisateur connecté 
    session.classList.add("hidden"); //on remet la classe hidden
})