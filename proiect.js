const titluSite = document.querySelector('.site-title');

titluSite.style.color = '#2b8aef'; 
titluSite.style.textTransform = 'uppercase'; 


function personalizeazaCarduri() {

    const listaCarduri = document.querySelectorAll('.attraction-card');

    for (let i = 0; i < listaCarduri.length; i++) {
        let card = listaCarduri[i]; 
        card.style.border = "3px solid #7b61ff";
        card.style.borderRadius = "20px";
        card.style.boxShadow = "0 10px 30px rgba(123, 97, 255, 0.3)";
    }
}


let praterAdaugat = false; 
function adaugaAtractieNoua() {
    
    if (praterAdaugat===true) {
        alert("Atractia Prater Park a fost deja adaugata!"); 
        return;}

    const cardNou = document.createElement("div");

    cardNou.className = "attraction-card";
    cardNou.id = "card-extra";

    cardNou.innerHTML = `
        <h3 class="attraction-title">Prater Park</h3>
        <figure class="attraction-media">
              <img src="Prater-Wien-m.jpg" alt="Prater Park — photo" />
              <figcaption>Prater Park is a famous amusement park in Vienna, known for its large Ferris wheel and various attractions.</figcaption>
            </figure>
        <button onclick="stergeAtractia()" style="background: red; color: white; border-radius: 10px; cursor: pointer; padding: 8px; width: 100px;">
            Delete this attraction
        </button>
    `;

    const container = document.querySelector(".attractions-grid");
    container.appendChild(cardNou);
    
//Modific proprietatea
    const butonAdd = document.getElementById("btn-adauga");
    if (butonAdd) {
        butonAdd.disabled = true;           
        butonAdd.innerText = "Adăugat";     
        butonAdd.style.cursor = "not-allowed";
    }

    praterAdaugat = true; 
}


function stergeAtractia() {

    const elementDeSters = document.getElementById("card-extra");

    elementDeSters.classList.add("dispare");

    setTimeout(function() {
    elementDeSters.remove();
    praterAdaugat = false;

    const butonAdd = document.getElementById("btn-adauga");
        if (butonAdd) {
            butonAdd.disabled = false;   
            butonAdd.innerText = "Adăugă Prater Park";
            butonAdd.style.cursor = "pointer";
         }
    }, 500);
} 


const logoViena = document.querySelector('.site-title');

logoViena.addEventListener('mouseenter', function() {
    logoViena.style.color = '#7b61ff'; 
    logoViena.style.letterSpacing = '5px'; 
    logoViena.style.cursor = 'pointer';
});

logoViena.addEventListener('mouseleave', function() {
    logoViena.style.color = ''; 
    logoViena.style.letterSpacing = '0.6px'; 
});


window.addEventListener('keydown', function(event) {
   
    if (event.key === 'a' && !(event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) //sa nu fim pe input
        adaugaAtractieNoua(); 
    
    if (event.key === 's' && !(event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
        stergeAtractia();
    }
});


const formular = document.getElementById('formular-sugestii');
formular.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne trimiterea formularului

    const numeUtilizator = document.getElementById('nume-utilizator').value;
    const numeAtractie = document.getElementById('nume-atractie').value;
        const regexNume = /^[A-Z][a-zA-Z\s]*$/;

        if (!regexNume.test(numeAtractie)) {
            alert("Numele atracției trebuie sa inceapa cu litera mare si sa contina doar litere!");
            return;
        }   

        if (!regexNume.test(numeUtilizator)) {
            alert("Numele tău trebuie sa inceapa cu litera mare si sa contina doar litere!");
            return;
        }

    const nrInregistrare = Math.floor(Math.random() * 9000) + 1000;

    const numeAnterior = localStorage.getItem('numeUtilizator');
    if (formular.checkValidity && numeAnterior == numeUtilizator) {
        alert(`Ne bucuram ca ai revenit, ${numeUtilizator}! Sugestia ta a fost trimisa. \nÎnregistrarea #${nrInregistrare} a fost primită`);}

    else if (formular.checkValidity()) {
        alert(`Sugestia ta a fost trimisa cu succes! Mulțumim! \nÎnregistrarea #${nrInregistrare} a fost primită`);
        formular.reset(); 
    }
     localStorage.setItem('numeUtilizator', numeUtilizator);
});


let secunde = 0;
const contorElement = document.createElement("p");
contorElement.style.padding = "10px";
document.querySelector("footer").appendChild(contorElement); 

setInterval(function() {
    secunde++;
    contorElement.innerText = "Ești pe această pagină de: " + secunde + " secunde.";
}, 1000); 


function schimbaAspectulPaginii() {
    const pagina = document.body;

    const stiluriCurente = window.getComputedStyle(pagina);
    const culoareInainte = stiluriCurente.backgroundColor;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const culoareNoua = `rgb(${r}, ${g}, ${b})`;
    pagina.style.backgroundColor = culoareNoua;

    pagina.style.transition = "background-color 1.5s ease";
}
setInterval(schimbaAspectulPaginii, 3000);


//stopPropagation
const footer = document.querySelector('footer');

footer.addEventListener('click', function() {
    alert("Viena este un oraș superb! Mulțumim că ne vizitezi.");
});

contorElement.addEventListener('click', function(event) {
    event.stopPropagation();
});


function loginAJAX() {
    const userIntrodus = document.getElementById('login-user').value;
    const parolaIntrodusa = document.getElementById('login-pass').value;

    fetch('utilizatori.json')
        .then(response => response.json())
        .then(data => {
            const utilizatorGasit = data.utilizatori.find(u => u.user === userIntrodus && u.parola === parolaIntrodusa);

            if (utilizatorGasit) {
                
                sessionStorage.setItem('utilizatorLogat', userIntrodus);
                afiseazaInterfataLogat(userIntrodus);
                alert("Login reușit!");
            } else {
                alert("Utilizator sau parolă incorectă!");
            }
        })
        .catch(error => {
            alert("Eroare la încărcarea fișierului JSON! Verifică dacă rulezi pe un server local.");
        });
}

function afiseazaInterfataLogat(user) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('user-profile').style.display = 'block';
    document.getElementById('nume-logat').innerText = user;
}

function logout() {
    sessionStorage.removeItem('utilizatorLogat');
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('user-profile').style.display = 'none';
    alert("Te-ai delogat cu succes.");
}

document.addEventListener('DOMContentLoaded', function() {
    const userSalvat = sessionStorage.getItem('utilizatorLogat');
    if (userSalvat) {
        afiseazaInterfataLogat(userSalvat);
    }
});






