function generate(data) {
  //Refactor this?
  let js = `
let ${data.name} = (function () {
    let count = parseInt(localStorage.getItem("_count")) || 0;
    let init_count = count;
  
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    function add(options) {
      count += 1;
  
      
      let ${data.name.replace("ify", "")}Urls = [
        
        ${data.images.map((item) => `"${item}"`).join()}
      ];
      let sizeType = "px";
      let randomHeight = Math.random() * 0.75;
      let windowHeight = 768;
      let windowWidth = 1024;
      let height = 0;
      let width = 0;
      let doc = document.documentElement;
      let transform = "translate(-50%, -50%)";
  
      
      let div = document.createElement("div");
      div.style.position = "fixed";
      div.className = "_friend";
      div.style.zIndex = 143143;
      div.style.outline = 0;
      div.onclick = add;
  
      // Get window width/height
      if (typeof window.innerHeight === "number") {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
      } else if (doc && doc.clientHeight) {
        windowWidth = doc.clientWidth;
        windowHeight = doc.clientHeight;
      } else {
        sizeType = "%";
        height = Math.round(height * 100) + sizeType;
      }
  
      let gp_url =
        "${data.grand_image_url}"
      let grand = count - init_count == ${data.grand_image_on} ? gp_url : false;
      if (grand) {
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.zIndex = 143143143;
      } else {
        
        div.style.top = Math.round(Math.random() * 100) + "%";
        div.style.left = Math.round(Math.random() * 100) + "%";
        transform += " rotate(" + Math.round(Math.random() * 10 - 5) + "deg)";
  
        if (Math.random() > 0.5) {
          transform += " scaleX(-1)";
        }
      }
  
      div.style.transform = transform;
      div.style.MozTransform = transform;
      div.style.webkitTransform = transform;
  
      let url = grand || getRandomElement(${data.name.replace("ify", "")}Urls);
  
      // Create the image element
      let img = document.createElement("img");
      img.style.opacity = 0;
      img.style.transition = "all 0.1s linear";
      img.alt = "A friend";
      img.onload = function () {
        img.style.opacity = 1;
      };
      img.setAttribute("src", url);
      img.style.maxWidth = windowWidth / 5 + "px";
  
      div.onmouseover = function () {
        let size = 1 + Math.round(Math.random() * 10) / 100;
        let angle = Math.round(Math.random() * 20 - 10);
        let result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
  
        img.style.transform = result;
        img.style.MozTransform = result;
        img.style.webkitTransform = result;
      };
  
      div.onmouseout = function () {
        let size = 0.9 + Math.round(Math.random() * 10) / 100;
        let angle = Math.round(Math.random() * 6 - 3);
        let result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
        img.style.transform = result;
        img.style.MozTransform = result;
        img.style.webkitTransform = result;
      };
  
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(div);
      div.appendChild(img);
  
      if (count - init_count == ${data.font_change_on}) ${data.name.replace(
    "ify",
    ""
  )}_css()
      update_counter();
  
      let event = new Event("boo");
      document.dispatchEvent(event);
    }
    function update_counter() {
      let p = document.getElementById("_counter");
      if (p == null) {
        p = document.createElement("p");
        p.id = "_counter";
        p.style.position = "fixed";
        p.style.bottom = "5px";
        p.style.left = "0px";
        p.style.right = "0px";
        p.style.zIndex = "1000000000";
        p.style.color = "${data.counter_color}";
        p.style.textAlign = "center";
        p.style.fontSize = "24px";
        p.style.fontFamily = "'${data.font_family}"; // will work after 5 clicks
        p.style.textTransform = "uppercase";
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(p);
      }
  
      if (count == 1) {
        p.innerHTML = "You ${data.name.slice(0, -1)}ied";
      } else {
        p.innerHTML = "You ${data.name.slice(0, -1)}ied " + count + " times!";
      }
      localStorage.setItem("_count", count);
    }
  
    function ${data.name.replace("ify", "")}_css() {
      let existing = document.getElementById("_css");
      if (existing) return;
      let css = document.createElement("style");
      css.id = "_css";
      css.innerHTML = \`@import url("${data.font}");
      body {
        font-family: ${data.font_family}!important;
        font-size: large !important;
      }\`;
      document.head.append(css);
    }
  
    return {
      add,
    };
  })();`;
  return js;
}
module.exports = generate;
