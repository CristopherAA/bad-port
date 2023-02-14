
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

function generarTarjetas(){

    let bin = document.querySelector('#gen-bin').value;
    let mes = document.querySelector('#gen-mes').value;
    let anyo = document.querySelector('#gen-anyo').value;
    let cvv = document.querySelector('#gen-cvv').value;
    let field = document.querySelector('#gen-resultado');
    let vacio = !cvv;

    if(bin.length != 16){
        alert('El bin no tiene una longitud válida');
        return;
    }
    field.value = '';
    for(let i=0;i<10;++i){
        if(vacio){
            cvv = getRandom(100,999);
        }
        field.value += siguienteValida(bin) + '│' + mes + '│' + anyo + '│' + cvv +'\n';
    }
    
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