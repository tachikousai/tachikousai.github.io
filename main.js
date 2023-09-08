function popup_window(title_text, message_html) {

      var main_box = document.getElementById("popup_box");

      var title = document.getElementById("popup_text");
      title.innerHTML = title_text;

      var main_text = document.getElementById("popup_message");
      main_text.innerHTML = message_html;

      document.getElementById("popup_box").style.animation = "fadeIn 0.25s 1 forwards";


      window.history.pushState(null, document.title);
      window.addEventListener('popstate', () => {
            close_window();
      });
}

function close_window() {
      document.getElementById("popup_box").style.animation = "fadeOut 0.25s 1 forwards";
      window.history.pushState("", document.title);
}

$(window).on('load', function () {
      try {
            let headerHeight = $('#header').outerHeight();
            let speed = 100;
            let href = location.hash;
            console.log(href);
            let target = $(href == "#" || href == "" ? 'html' : href);
            let position = target.offset().top - headerHeight;
            console.log(target.offset().top);
            console.log(headerHeight);
            $('html, body').stop().animate({ scrollTop: position }, speed, "swing");
      } catch (e) { }
});