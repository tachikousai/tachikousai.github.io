if (window.location.protocol == 'http:')
      window.location.protocol = "https:";

function popup_window(title_text, message_html) {

      var main_box = document.getElementById("popup_box");

      var title = document.getElementById("popup_text");
      title.innerHTML = title_text;

      var main_text = document.getElementById("popup_message");
      main_text.innerHTML = message_html;

      document.getElementById("popup_box").style.animation ="fadeIn 0.25s 1 forwards";
}

function close_window() {
      document.getElementById("popup_box").style.animation ="fadeOut 0.25s 1 forwards";
}
