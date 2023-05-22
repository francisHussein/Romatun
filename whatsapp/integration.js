try {
    const widgetId = document
      .getElementById("aisensy-wa-widget")
      .getAttribute("widget-id");
    if (!widgetId || widgetId == null) {
      throw new Error("Widget is invalid");
    }
    console.log("Loading script");
    const s = document.createElement("script");
    s.src = "../whatsapp/widget.js";
    // s.src = "http://localhost:8000/widget-plugin-dev.js";
    s.type = "text/javascript";
    s.async = true;
    s.id = "df-script";
    // console.log(s);
  
    // Load Poppins font;
    const url =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap";
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  
    // Fetch widget details
    var aisensyLink = null;
    var aisensyWidgetOptions = null;
  
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://wa.aisensy.com/widget-details/" + widgetId, true);
    // xhr.open("GET", "http://localhost:5000/widget-details/" + widgetId, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function () {
      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.link) {
          aisensyLink = data.link;
        }
        if (aisensyLink != null) {
          var btn = aisensyLink.whatsappBtnSettings;
          aisensyWidgetOptions = {
            "linkid": aisensyLink.linkId,
            "phoneNumber": aisensyLink.phoneNumber,
            "variant": btn.variant,
            "btnBackground": btn.btnBackground,
            "btnCTA": btn.btnCTA,
            "mb": btn.mb,
            "ml": btn.ml,
            "mr": btn.mr,
            "borderRadius": btn.borderRadius,
            "prefilledMsg": aisensyLink.prefilledMsg,
            "position": btn.position,
            "brandName": btn.brandName,
            "brandSub": btn.brandSub,
            "brandColor": btn.brandColor,
            "brandImgUrl": btn.brandImgUrl,
            "widgetBtnCTA": btn.widgetBtnCTA,
            "openWidgetByDefault": btn.openWidgetByDefault,
            "openWidgetSessionWindow": btn.openWidgetSessionWindow,
            "onscreenMsg": btn.onscreenMsg,
            "onscreenImg": "",
            "widgetOnMobile": btn.widgetOnMobile,
            "personalizedUrls": btn.personalizedUrls,
          };
        } else {
          // Req successful but empty data is returned
          throw new Error("Invalid widget details");
        }
  
        s.onload = function () {
          console.log("Loaded script");
          console.log({ aisensyWidgetOptions });
  
          if (aisensyWidgetOptions != null) {
            console.log({ aisensyWidgetOptions });
            window.CreateWhatsAppButtonAndWidget(aisensyWidgetOptions);
          }
  
          // Register event listener for url change
          history.pushState = ((f) =>
            function pushState() {
              var ret = f.apply(this, arguments);
              window.dispatchEvent(new Event("pushstate"));
              window.dispatchEvent(new Event("locationchange"));
              return ret;
            })(history.pushState);
  
          history.replaceState = ((f) =>
            function replaceState() {
              var ret = f.apply(this, arguments);
              window.dispatchEvent(new Event("replacestate"));
              window.dispatchEvent(new Event("locationchange"));
              return ret;
            })(history.replaceState);
  
          window.addEventListener("popstate", () => {
            window.dispatchEvent(new Event("locationchange"));
          });
  
          // Listen for url change
          window.addEventListener("locationchange", () => {
            console.log("Location changed");
            if (aisensyWidgetOptions != null) {
              window.CreateWhatsAppButtonAndWidget({ ...aisensyWidgetOptions });
            }
          });
        };
        document.body.appendChild(s);
      } else {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    };
  } catch (err) {
    console.log(err);
  }