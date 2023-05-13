let kelimelik;
let maksTahmin;
let yanlisHarfler = [];
let dogruHarfler = [];

const typingInput = document.querySelector(".yaziInput");
const sifirla = document.querySelector(".sifirla");
const girisler = document.querySelector(".girisler");
const kalanHak = document.querySelector(".kalanHak span");
const yanlisHarf = document.querySelector(".yanlisHarf span");
const ipucuTag = document.querySelector(".ipucu span");

function oyunOlustur(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !yanlisHarfler.includes(` ${key}`) && !dogruHarfler.includes(key)) {
        if(kelimelik.includes(key)) {
            for (let i = 0; i < kelimelik.length; i++) {
                if(kelimelik[i] == key) {
                    dogruHarfler += key;
                    girisler.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maksTahmin--;
            yanlisHarfler.push(` ${key}`);
        }
        kalanHak.innerText = maksTahmin;
        yanlisHarf.innerText = yanlisHarfler;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(dogruHarfler.length === kelimelik.length) {
            alert(`Tebrikler! Kelimeyi buldun ${kelimelik.toUpperCase()}`);
            return kelimeGetir();
        } else if(maksTahmin < 1) {
            alert("Oyun Bitti! Tahmin hakkÄ±n kalmadÄ±");
            for(let i = 0; i < kelimelik.length; i++) {
                girisler.querySelectorAll("input")[i].value = kelimelik[i];
            }
        }
    }, 100);
}

function kelimeGetir() {
    let rasgele = kelimeListesi[Math.floor(Math.random() * kelimeListesi.length)];
    kelimelik = rasgele.kelime;
    maksTahmin = kelimelik.length >= 5 ? 8 : 6;
    dogruHarfler = []; yanlisHarfler = [];
    ipucuTag.innerText = rasgele.ipucu;
    kalanHak.innerText = maksTahmin;
    yanlisHarf.innerText = yanlisHarfler;

    let html = "";
    for (let i = 0; i < kelimelik.length; i++) {
        html += `<input type="text" disabled>`;
        girisler.innerHTML = html;
    }
}

girisler.addEventListener("click", () => typingInput.focus());
sifirla.addEventListener("click", kelimeGetir);
document.addEventListener("keydown", () => typingInput.focus());
typingInput.addEventListener("input", oyunOlustur);

kelimeGetir();