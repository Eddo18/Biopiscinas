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


let loginForm = document.getElementById("send-message");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $('#send-message').fadeOut(500);
  $('#submit-message').fadeIn(500);
  var settings = {
    "url": "https://us-central1-encouraging-mix-111109.cloudfunctions.net/contact_email/send-message",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "name": document.getElementById("form-name").value,
      "lastname": document.getElementById("form-lastname).value,
      "email": document.getElementById("form-email").value,
      "asunto": document.getElementById("form-asunto").value,
      "message": "Mensaje desde la página: " + document.getElementById("form-message").value,
      "token_hash": "20443c7b-6063-4607-9479-c69fd83790fd"
    }),
  };
  $.ajax(settings).done(function(response) {
    console.log(response);
    $('.loading-area').fadeOut(1000);
    $('#submit-message').fadeOut(500);
    $('#send-success').fadeIn(1000);
    $('#form-name').val("");
    $('#form-lastname').val("");
    $('#form-email').val("");
    $('#form-asunto').val("");
    $('#form-message').val("");
  });
});
