var nav = document.createElement("div");
nav.setAttribute("class", "nav");

var logo = document.createElement("img");
logo.setAttribute("src", "/img/A439.png");
var myaccount = document.createElement("a");
myaccount.setAttribute("class", "logo");
myaccount.setAttribute("href", "https://space.bilibili.com/3493079245916811");
myaccount.setAttribute("target", "_blank");
myaccount.appendChild(logo);
nav.appendChild(myaccount);

var ul = document.createElement("ul");
ul.setAttribute("class", "linklist");

var content = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/");
link.appendChild(document.createTextNode("主页"));
content.appendChild(link);
ul.appendChild(content);

var content = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/note");
link.appendChild(document.createTextNode("笔记"));
content.appendChild(link);
ul.appendChild(content);

var content = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/links.html");
link.appendChild(document.createTextNode("友情链接"));
content.appendChild(link);
ul.appendChild(content);

nav.appendChild(ul);

var header = document.getElementsByClassName("header")[0];
header.appendChild(nav);