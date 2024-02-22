// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"
import $ from "jquery";
let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken }
})

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket



const album = {
    open: (img) => {
        const div = window.document.getElementById('album_zoom');
        const target = window.document.getElementById('album_target');
        target.src = img;
        if (div.classList.contains('hidden')) {
            div.classList.remove('hidden');
        } else {
            div.classList.add('hidden');
        }
    },
    videoOpen: (target) => {
        const div = window.document.getElementById(target);
        if (div.classList.contains('hidden')) {
            div.classList.remove('hidden');
        } else {
            div.classList.add('hidden');
        }
    },
    openmenu: (target) => { // Hola
        console.log(target);
        const div = window.document.getElementById(target);
        if (div.classList.contains('hidden')) {
            div.classList.remove('hidden');
        } else {
            div.classList.add('hidden');
        }
    }
};


window.album = album;


let loginForm = document.getElementById("contacto");
$('#send-success').fadeOut(1); 
$('#loading-enviado').fadeOut(1);
console.log('estaaaaa', loginForm);
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var settings = {
        "url": "https://us-central1-encouraging-mix-111109.cloudfunctions.net/contact_email/send-message",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": document.getElementById("nombre").value,
            "lastname": document.getElementById("apellidos").value,
            "email": document.getElementById("correo").value,
            "asunto": document.getElementById("asunto").value,
            "mensaje": document.getElementById("mensaje").value,
            "message": "Mensaje desde la página: Desde CONCOMSIS " + document.getElementById("mensaje").value +
                "\n Nombre: " + document.getElementById("nombre").value +
                "\n Apellidos: " + document.getElementById("apellidos").value +
                "\n Correo: " + document.getElementById("correo").value +
                "\n Asunto: " + document.getElementById("asunto").value +
                "\n Mensaje: " + document.getElementById("mensaje").value,
            "token_hash": "a1929158-c7d9-4c04-85de-c3163bbaaeae"
        }),
    };
    $('#contacto').fadeOut(800);
    $('#loading-enviado').fadeIn(800);
    $.ajax(settings).done(function(response) {
        console.log(response);
        $('#loading-enviado').fadeOut(500);
        $('.loading-area').fadeOut(1000);
        $('#send-success').fadeIn(1000);
        $('#nombre').val("");
        $('#apellidos').val("");
        $('#correo').val("");
        $('#asunto').val("");
        $('#mensaje').val("");
    });
});