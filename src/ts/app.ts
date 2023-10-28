import Widget from "./Widget";
const url = "https://polling-back.netlify.app/messages/unread";
const container = document.getElementById("polling-container");
const widget = new Widget(container, url);

widget.init();

window.addEventListener('beforeunload', () => {
    widget.destroy();
  });
