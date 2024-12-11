var nav = document.createElement("div");
nav.setAttribute("class", "nav");

var logo = document.createElement("img");
logo.setAttribute("src", "https://A439-OwO.github.io/img/logo.png");
logo.setAttribute("alt", "logo");

var ul = document.createElement("ul");

var li1 = document.createElement("li");
var a1 = document.createElement("a");
a1.setAttribute("href", "#");
a1.appendChild(document.createTextNode("Home"));
li1.appendChild(a1);

ul.appendChild(li1);
nav.appendChild(ul);

var header = document.getElementsByClassName("header")[0];
header.appendChild(nav);