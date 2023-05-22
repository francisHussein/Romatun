function preFormat(url) {
    let formattedUrl = window.decodeURI(url);
    // Ignore hashed value in url
    formattedUrl = formattedUrl.split("#")[0];
  
    // Add trailing /
    if (url.slice(-1) !== "/") {
      formattedUrl += "/";
    }
    // Add trailing / before ?
    const t = formattedUrl.split("?") 
    if (t.length == 2) {
      // Replace & with /
      t[1] = t[1].split("&").join("/");
      // Replace ? with / if there isn't / before ?
      if (t[0].slice(-1) !== "/") {
        formattedUrl = t[0] + "/" + t[1];
      } else {
              formattedUrl = t[0] + t[1];
          }
    }
    return formattedUrl
  }
  
  function generateExp(url) {
    // format url
    const formattedUrl = preFormat(url);
    // const params = 
    let regEx = "";
    regEx = "^";
    regEx += formattedUrl
          .replace(/\{\{([a-z_]+)\}\}/g, "AISENSY")
          .replace(/[-[\]{}()*+?.,\\^$|#\s/\\]/g, '\\$&')
          .replace(/AISENSY/g , "([^\\/]+)");
    regEx += "$";
    return regEx;
    // return /^$/;
  }
  
  // console.log(generateExp("http://localhost:8000/test_webIntegrationOfBot.html/products/{{product_name}}/abd-{{product_k}}"));
  
  function extractParams (url) {
    // Only allowed param names a-z with _
    return url.match(/\{\{([a-z_]+)\}\}/g) || [];
  }
  
  function extractParamsValue (url, pattern) {
    // pre format url first
    const formattedUrl = preFormat(url);
    // match formatted url against regex
    const matched = formattedUrl.match(new RegExp(pattern));
    // except first element rest will be values matched
    // order of extracted values and extracted param will be same
    if (matched) {
      return matched.slice(1);
    } else {
      return []
    }
  }
  
  function validateUrl (url) {
    // Check for http or https in begining
    return !!url.match(/^(http|https):\/\/*/);
  }
  
  function CreateWhatsAppButtonAndWidget(options) {
      const brandImage = "data:image/png;base64,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"
      const lighteningSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0ZGQUMzMyIgZD0iTTMyLjkzOCAxNS42NTFDMzIuNzkyIDE1LjI2IDMyLjQxOCAxNSAzMiAxNUgxOS45MjVMMjYuODkgMS40NThjLjIxOS0uNDI2LjEwNi0uOTQ3LS4yNzEtMS4yNDNDMjYuNDM3LjA3MSAyNi4yMTggMCAyNiAwYy0uMjMzIDAtLjQ2Ni4wODItLjY1My4yNDNMMTggNi41ODggMy4zNDcgMTkuMjQzYy0uMzE2LjI3My0uNDMuNzE0LS4yODQgMS4xMDVTMy41ODIgMjEgNCAyMWgxMi4wNzVMOS4xMSAzNC41NDJjLS4yMTkuNDI2LS4xMDYuOTQ3LjI3MSAxLjI0My4xODIuMTQ0LjQwMS4yMTUuNjE5LjIxNS4yMzMgMCAuNDY2LS4wODIuNjUzLS4yNDNMMTggMjkuNDEybDE0LjY1My0xMi42NTVjLjMxNy0uMjczLjQzLS43MTQuMjg1LTEuMTA2eiIvPjwvc3ZnPg=="
  
      const config = {
          // dev mode is for widget preview while generating the widget on create.aisensy.com
          env: options.env || "",
          linkid: options.linkid || "",
          // Btn & Widget options
          phoneNumber: options.phoneNumber || "+919999999999",
          variant: options.variant || "WhatsAppBtnAndChatWidget",
      btnBackground: options.btnBackground || "#4dc247",
      btnCTA: options.btnCTA || "",
      mb: options.mb || "30",
      ml: options.ml || "30",
      mr: options.mr || "30",
      borderRadius: options.borderRadius || "24",
      prefilledMsg: options.prefilledMsg || "Hi",
      position: options.position || "Bottom-Right",
      brandName: options.brandName || "AiSensy",
      brandSub: options.brandSub || "online",
      brandColor: options.brandColor || "#0A5F54",
      brandImgUrl: options.brandImgUrl || brandImage,
      widgetBtnCTA: options.widgetBtnCTA || "Start chat",
      openWidgetByDefault: options.openWidgetByDefault || "true",
          openWidgetSessionWindow: options.openWidgetSessionWindow || "ALWAYS",
      onscreenMsg: options.onscreenMsg || "Hi,\nHow can I help you ?",
          onscreenImg: options.onscreenImg || "",
          widgetOnMobile: options.widgetOnMobile || "true",
          personalizedUrls: options.personalizedUrls || []
      }
  
      console.log({ config });
  
      // Retrieve onScreen message based on url
      let customMsg = "";
      let params = {};
      let matchAt = null;
      const url = window.location.href;
      const pUrls = config.personalizedUrls;
      
      // Replace page_url & page_title from default onscreen msg
      if (true) { // To scope variables
          let params = {};
          params['{{page_url}}'] = `<a href=${url} target="_blank">${url}</a>`;
          params['{{page_title}}'] = document.title;
          // Replace param in message
          Object.keys(params).forEach(function(p){
              // Escape { & } for reg exp
              
              const paramPattern = p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
              config.onscreenMsg = config.onscreenMsg.replace(new RegExp(`${paramPattern}`, 'g'), params[p]);
          });
      }
      
      for (var i = 0; i < pUrls.length; i++) {
          const item = pUrls[i];
          // Ignore empty regex
          if (!item.regEx) continue;
          const matched = preFormat(url).match(new RegExp(item.regEx));
          if (matched) {
              matchAt = i;
              break;
          }		
      }
      if (matchAt != null) {
          const item = pUrls[matchAt];
          console.log({ matchAt });
          let params = {};
          params['{{page_url}}'] = `<a href=${url} target="_blank">${url}</a>`;
          params['{{page_title}}'] = document.title;
          customMsg = item.userMsg;
  
          const paramNames = extractParams(item.url);
          const paramValues = extractParamsValue(preFormat(url), item.regEx);
  
          if (paramNames.length == paramValues.length) {
              paramNames.forEach(function(k, i){
                  let temp = paramValues[i];
                  // Format value
                  if (item.toFormat) {
                      temp = temp.replace( /[\-_]/g, " ");
                  }
                  if (item.toCapitalize && temp) {
                      temp = temp.split(" ").map(function(e){ 
                          return e[0].toUpperCase() + e.slice(1);
                      }).join(" ");
                  }
  
                  params[paramNames[i]] = temp;
              });
          }
  
          // Replace param in message
          Object.keys(params).forEach(function(p){
              // Escape { & } for reg exp
              const paramPattern = p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
              customMsg = customMsg.replace(new RegExp(`${paramPattern}`, 'g'), params[p]);
          });
          
      }
  
      // Custom styles
      const backgroundImg = `
          background-color: #e5ddd5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 260 260'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23a9a9a9' fill-opacity='0.4'%3E%3Cpath d='M24.37 16c.2.65.39 1.32.54 2H21.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06A5 5 0 0 1-17.45 28v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H-20a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1L.9 19.22a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0L2.26 23h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM-13.82 27l16.37 4.91L18.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H-13.1z'/%3E%3Cpath id='path6_fill-copy' d='M284.37 16c.2.65.39 1.32.54 2H281.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06a5 5 0 0 1-2.24-8.94v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H240a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM246.18 27l16.37 4.91L278.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H246.9z'/%3E%3Cpath d='M159.5 21.02A9 9 0 0 0 151 15h-42a9 9 0 0 0-8.5 6.02 6 6 0 0 0 .02 11.96A8.99 8.99 0 0 0 109 45h42a9 9 0 0 0 8.48-12.02 6 6 0 0 0 .02-11.96zM151 17h-42a7 7 0 0 0-6.33 4h54.66a7 7 0 0 0-6.33-4zm-9.34 26a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-7a7 7 0 1 1 0-14h42a7 7 0 1 1 0 14h-9.34zM109 27a9 9 0 0 0-7.48 4H101a4 4 0 1 1 0-8h58a4 4 0 0 1 0 8h-.52a9 9 0 0 0-7.48-4h-42z'/%3E%3Cpath d='M39 115a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm6-8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-3-29v-2h8v-6H40a4 4 0 0 0-4 4v10H22l-1.33 4-.67 2h2.19L26 130h26l3.81-40H58l-.67-2L56 84H42v-6zm-4-4v10h2V74h8v-2h-8a2 2 0 0 0-2 2zm2 12h14.56l.67 2H22.77l.67-2H40zm13.8 4H24.2l3.62 38h22.36l3.62-38z'/%3E%3Cpath d='M129 92h-6v4h-6v4h-6v14h-3l.24 2 3.76 32h36l3.76-32 .24-2h-3v-14h-6v-4h-6v-4h-8zm18 22v-12h-4v4h3v8h1zm-3 0v-6h-4v6h4zm-6 6v-16h-4v19.17c1.6-.7 2.97-1.8 4-3.17zm-6 3.8V100h-4v23.8a10.04 10.04 0 0 0 4 0zm-6-.63V104h-4v16a10.04 10.04 0 0 0 4 3.17zm-6-9.17v-6h-4v6h4zm-6 0v-8h3v-4h-4v12h1zm27-12v-4h-4v4h3v4h1v-4zm-6 0v-8h-4v4h3v4h1zm-6-4v-4h-4v8h1v-4h3zm-6 4v-4h-4v8h1v-4h3zm7 24a12 12 0 0 0 11.83-10h7.92l-3.53 30h-32.44l-3.53-30h7.92A12 12 0 0 0 130 126z'/%3E%3Cpath d='M212 86v2h-4v-2h4zm4 0h-2v2h2v-2zm-20 0v.1a5 5 0 0 0-.56 9.65l.06.25 1.12 4.48a2 2 0 0 0 1.94 1.52h.01l7.02 24.55a2 2 0 0 0 1.92 1.45h4.98a2 2 0 0 0 1.92-1.45l7.02-24.55a2 2 0 0 0 1.95-1.52L224.5 96l.06-.25a5 5 0 0 0-.56-9.65V86a14 14 0 0 0-28 0zm4 0h6v2h-9a3 3 0 1 0 0 6H223a3 3 0 1 0 0-6H220v-2h2a12 12 0 1 0-24 0h2zm-1.44 14l-1-4h24.88l-1 4h-22.88zm8.95 26l-6.86-24h18.7l-6.86 24h-4.98zM150 242a22 22 0 1 0 0-44 22 22 0 0 0 0 44zm24-22a24 24 0 1 1-48 0 24 24 0 0 1 48 0zm-28.38 17.73l2.04-.87a6 6 0 0 1 4.68 0l2.04.87a2 2 0 0 0 2.5-.82l1.14-1.9a6 6 0 0 1 3.79-2.75l2.15-.5a2 2 0 0 0 1.54-2.12l-.19-2.2a6 6 0 0 1 1.45-4.46l1.45-1.67a2 2 0 0 0 0-2.62l-1.45-1.67a6 6 0 0 1-1.45-4.46l.2-2.2a2 2 0 0 0-1.55-2.13l-2.15-.5a6 6 0 0 1-3.8-2.75l-1.13-1.9a2 2 0 0 0-2.5-.8l-2.04.86a6 6 0 0 1-4.68 0l-2.04-.87a2 2 0 0 0-2.5.82l-1.14 1.9a6 6 0 0 1-3.79 2.75l-2.15.5a2 2 0 0 0-1.54 2.12l.19 2.2a6 6 0 0 1-1.45 4.46l-1.45 1.67a2 2 0 0 0 0 2.62l1.45 1.67a6 6 0 0 1 1.45 4.46l-.2 2.2a2 2 0 0 0 1.55 2.13l2.15.5a6 6 0 0 1 3.8 2.75l1.13 1.9a2 2 0 0 0 2.5.8zm2.82.97a4 4 0 0 1 3.12 0l2.04.87a4 4 0 0 0 4.99-1.62l1.14-1.9a4 4 0 0 1 2.53-1.84l2.15-.5a4 4 0 0 0 3.09-4.24l-.2-2.2a4 4 0 0 1 .97-2.98l1.45-1.67a4 4 0 0 0 0-5.24l-1.45-1.67a4 4 0 0 1-.97-2.97l.2-2.2a4 4 0 0 0-3.09-4.25l-2.15-.5a4 4 0 0 1-2.53-1.84l-1.14-1.9a4 4 0 0 0-5-1.62l-2.03.87a4 4 0 0 1-3.12 0l-2.04-.87a4 4 0 0 0-4.99 1.62l-1.14 1.9a4 4 0 0 1-2.53 1.84l-2.15.5a4 4 0 0 0-3.09 4.24l.2 2.2a4 4 0 0 1-.97 2.98l-1.45 1.67a4 4 0 0 0 0 5.24l1.45 1.67a4 4 0 0 1 .97 2.97l-.2 2.2a4 4 0 0 0 3.09 4.25l2.15.5a4 4 0 0 1 2.53 1.84l1.14 1.9a4 4 0 0 0 5 1.62l2.03-.87zM152 207a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-11 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3-5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-8 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5-2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-5-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-24 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm16 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zm86-29a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1 246 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM275 214a29 29 0 0 0-57.97 0h57.96zM72.33 198.12c-.21-.32-.34-.7-.34-1.12v-12h-2v12a4.01 4.01 0 0 0 7.09 2.54c.57-.69.91-1.57.91-2.54v-12h-2v12a1.99 1.99 0 0 1-2 2 2 2 0 0 1-1.66-.88zM75 176c.38 0 .74-.04 1.1-.12a4 4 0 0 0 6.19 2.4A13.94 13.94 0 0 1 84 185v24a6 6 0 0 1-6 6h-3v9a5 5 0 1 1-10 0v-9h-3a6 6 0 0 1-6-6v-24a14 14 0 0 1 14-14 5 5 0 0 0 5 5zm-17 15v12a1.99 1.99 0 0 0 1.22 1.84 2 2 0 0 0 2.44-.72c.21-.32.34-.7.34-1.12v-12h2v12a3.98 3.98 0 0 1-5.35 3.77 3.98 3.98 0 0 1-.65-.3V209a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-24c.01-1.53-.23-2.88-.72-4.17-.43.1-.87.16-1.28.17a6 6 0 0 1-5.2-3 7 7 0 0 1-6.47-4.88A12 12 0 0 0 58 185v6zm9 24v9a3 3 0 1 0 6 0v-9h-6z'/%3E%3Cpath d='M-17 191a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H4zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1-14 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM15 214a29 29 0 0 0-57.97 0h57.96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`
      const cancelSvg = `
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              xmlns:xlink="http://www.w3.org/1999/xlink" 
              version="1.1" 
              id="Layer_1" 
              x="0px" 
              y="0px" 
              viewBox="0 0 492 492" 
              style="enable-background:new 0 0 492 492;" 
              xml:space="preserve"
              class="df-cancel-svg-icon"
          >
          <g>
              <g>
                  <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
              </g>
          </g>
      </svg>
      `
      const svgIcon = `<svg class="df-svg-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" class="wa-messenger-svg-whatsapp wh-svg-icon"><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fill-rule="evenodd"></path></svg>`
  
      const styleContent = `
          .df-btn {
              padding: 0 !important;
              border: none !important;
              outline: none !important;
              font-family: 'Roboto','Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              border-radius: ${config.borderRadius}px !important;
              transition: all 2s linear !important;
              position: fixed !important;
              bottom: ${config.mb}px !important;
              ${config.position == 'Bottom-Right' ? ('right:' + config.mr) : ('left:' + config.ml)}px !important;
              display: flex !important;
              flex-direction: column !important;
              z-index: 10005 !important;
              align-items: ${config.position == 'Bottom-Right' ? 'flex-end' : 'flex-start'} !important;
              line-height: 1 !important;
          }
          .df-btn * {
              font-family: 'Roboto','Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
          }
          .df-btn-text {
              border-radius: ${config.borderRadius}px !important;
              color: white !important;
              display: flex !important;
              align-items: center !important;
              justify-content: "center" !important;
              font-weight: 500 !important;
              letter-spacing: .25px !important;
              transition: all .08s linear !important;
              cursor: pointer !important;
              padding-right: ${ config.btnCTA ? '15px' : '5px'} !important;
              padding-left: ${ config.btnCTA ? '10px' : '5px'} !important;
              padding-top: 5px !important;
              padding-bottom: 5px !important;
              font-size: 16px !important;
              margin-top: 15px !important;
              background-color: ${config.btnBackground};
              box-shadow: rgb(0 0 0 / 20%) 0px 0px 0.428571rem 0px !important;
          }
          .df-btn-text-icon-only {
              padding-left: 5px !important;
              padding-right: 5px !important;
          }
          .df-svg-icon {
              height: 40px !important;
              width: 40px !important;
              fill: white !important;
          }
          .df-cancel-svg-icon {
              height: 12px !important;
              width: 12px !important;
              fill: lightgrey !important;
              cursor: pointer !important;
              margin-right: 8px !important;
              margin-bottom: 15px !important;
          }
          .df-btn-text:hover {
                  box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149) !important;
          }
          .df-btn:hover {
                  outline: none !important;
          }
          .df-btn:focus {
              outline: none !important;
          }
          .df-btn:not(.df-closed){
              border-radius: 16px !important;
          }
          .df-btn:not(.df-closed) > .df-btn-text:before {
              background-image: url('assets/close.svg') !important;
          }
          .df-btn a {
              text-decoration: none !important ;
              color: ${config.brandColor} !important;
          }
          .df-btn a:hover {
              text-decoration: none !important;
          }
          .df-btn-content {
              display: block !important;
              border: 0 !important;
              width: 350px !important;
              transition: all .25s ease !important;
              float: right !important;
              opacity: 1 !important;
              marginBottom: 25px !important;
              border-radius: 12px !important;
              position: relative !important;
              overflow-x: hidden !important;
              overflow-y: hidden !important;
              box-shadow: rgb(0 0 0 / 20%) 0px 0px 0.428571rem 0px !important;
              ${backgroundImg} 
          }
          .df-content-topbar {
              position: sticky !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              background: ${config.brandColor};
              min-height: 50px !important;
              border-radius: 12px 12px 0px 0px !important;
              box-sizing: border-box !important;
              padding: 20px 15px !important;
              display: flex !important;
              align-items: center !important;
          }
          .df-content-topbar .df-brand-img {
              height: 40px !important;
              width: 40px !important;
              border-radius: 50% !important;
              box-shadow: rgb(0 0 0 / 20%) 0px 0px 0.428571rem 0px !important;
              margin-right: 8px !important;
          }
          .df-content-topbar .df-brand-name {
              font-size: 16px !important;
              font-weight: 500 !important;
              color: white !important;
              line-height: 1 !important;
              margin-bottom: 5px !important;
          }
          .df-content-topbar .df-brand-sub {
              color: white !important;
              font-size: 12px !important;
          }
          .df-content-bottombar {
              position: sticky !important;
              bottom: 0 !important;
              left: 0 !important;
              width: 100% !important;
              background: white !important;
              min-height: 70px !important;
              border-radius: 0px 0px 12px 12px !important;
              box-sizing: border-box !important;
              padding: 20px 25px 10px 25px !important;
          }
          .df-bottombar-btn {
              width: 100% !important;
              padding: 10px 0px !important;
              border-radius: 50px !important;
              background-color: ${config.btnBackground};
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              color: white !important;
              cursor: pointer !important;
          }
          .df-bottombar-branding {
              font-size: 12px !important;
              color: grey !important;
              text-align: center !important;
              margin-top: 8px !important;
          }
          .df-bottombar-branding a {
              color: #08cf65 !important;
          }
          .df-content-window {
              width: 100% !important;
              min-height: 140px !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
          }
          .df-window-msg-cont {
              width: 75% !important;
              margin: 15px !important;
              background: white !important;
              display: inline-block !important;
              padding: 10px 15px !important;
              border-radius: 0px 8px 8px 8px !important;
              font-size: 14px !important;
              position: relative !important;
          }
          .df-window-msg-cont:before {
              content:'' !important;
              position: absolute !important;
              top: 0px !important;
              left: 0px !important;
              margin-left: -8px !important;
              width: 0 !important;
              height: 0 !important;
              border-bottom: solid 10px transparent !important;
              border-right: solid 8px white !important;
          }
          .df-window-msg-cont-brandname {
              color: #848484 !important;
              font-weight: 500 !important;
          }
          .df-onscreen-img {
              width: 100% !important;
              border-radius: 8px !important;
              min-height: 230px !important;
              max-height: 250px !important;
              background-image: url('https://2es93q3aicyy3w1qrv1vk3o2-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/WhatsApp-Image-2021-03-04-at-14.19.02-8.jpeg') !important;
              background-size: cover !important;
              margin: 8px 0px !important; 
          }
          .df-window-msg {
              color: black !important;
              margin-top: 6px !important;
              white-space: pre-wrap !important;
              min-width: 160px !important;
              max-width: 250px !important;
              font-family: Roboto !important;
              margin-bottom: 0px !important;
              word-break: break-word !important;
              line-height: 1.4 !important;
              border: none !important;
              padding: 0 !important;
              background: none !important;
          }
          .df-emoji {
              display: inline !important;
              border: none !important;
              box-shadow: none !important;
              height: 1em !important;
              width: 1em !important;
              margin: 0 .07em !important;
              vertical-align: -0.1em !important;
              background: none !important;
              padding: 0 !important;
          }
          .df-btn:not(.df-closed) > .df-btn-content {
          }
          .df-closed > .df-btn-content {
              width: 0 !important;
              height: 0 !important;
              opacity: 0 !important;
          }
          @media screen and (max-width: 720px){
              .df-btn-content {
                  height: 300px !important;
                  width: 300px !important;
              }
              .df-content-topbar {
                  min-height: 40px !important;
                  border-radius: 12px 12px 0px 0px !important;
                  box-sizing: border-box !important;
                  padding: 14px 15px !important;
                  display: flex !important;
                  align-items: center !important;
              }
              .df-content-topbar .df-brand-img {
                  height: 40px !important;
                  width: 40px !important;
                  margin-right: 5px !important;
              }
              .df-content-window {
                  width: 100% !important;
                  height: calc(100% - 70px - 90px) !important;
                  overflow-x: hidden !important;
                  overflow-y: auto !important;
              }
              .df-cancel-svg-icon {
                  margin-bottom: 5px !important;
              }
          }
      `
      let styleElem = document.getElementById("df-style");
      if(!styleElem) {
          styleElem = document.createElement("style");
          styleElem.id = "df-style";
      }
      // Inject styling
      if (!document.getElementById("df-style")) {
          document.body.appendChild(styleElem);
      }
      styleElem.innerHTML = styleContent;
  
      // dfContainer is widget ui
      let dfContainer = document.getElementById("df-btn-cont");
      if (!dfContainer) {
          dfContainer = document.createElement('div');
          dfContainer.id = "df-btn-cont"; 
      } 
      dfContainer.innerHTML = `
          <div class="df-btn df-closed" >
              <div class="df-btn-content">
                  <div class="df-content-topbar">
                      <div class="df-brand-img">
                          <img src="${config.brandImgUrl}" height="100%" width="100%" style="border-radius: 50%;" alt="img"/>
                      </div>
                      <div style="flex-grow: 1;">
                          <div class="df-brand-name">${config.brandName}</div>
                          <div class="df-brand-sub">${config.brandSub}</div>
                      </div>
                      <div onclick="dfToggle()">
                          ${cancelSvg}
                      </div>
                  </div>
                  <div class="df-content-window">
                      <div class="df-window-msg-cont">
                          <div class="df-window-msg-cont-brandname">
                              ${config.brandName}
                          </div>
                          ${
                              (config.onscreenImg || false) ?
                                  `<div class="df-onscreen-img"></div>`
                              : ""
                          }
                          <pre class="df-window-msg">${customMsg || config.onscreenMsg}</pre>
                      </div>
                  </div>
                  <div class="df-content-bottombar">
                      <div class="df-bottombar-btn" onclick="goToLink()">
                          ${config.widgetBtnCTA}
                      </div>
                      <div class="df-bottombar-branding">
                       
                          
                      </div>
                  </div>
              </div>
              <div class="df-btn-text" onclick="dfToggle()">
                  ${svgIcon} ${config.btnCTA}
              </div>
          </div>
      `
      // If container doesn't exist then append 
      if (!document.getElementById("df-btn-cont")) {
          document.body.appendChild(dfContainer);
      }
  
      console.log('before', {dfToggled: window.dfToggled});
      
      if(config.env != "dev") {
          // On load dfToggled is always false
          window.dfToggled = false;
      } else {
          // To persist open state of widget state while in dev mode
          window.dfToggled = !window.dfToggled;
      }
      console.log('after',{dfToggled: window.dfToggled});
  
      const width = window.innerWidth;
      // Used to control widget open behaviour
      const mobile = width < 700 && config.widgetOnMobile == "false"; 
  
      // Handle open & close of widget
      window.dfToggle = (dev=false) => {
          // dev argument is different from config.env, It is based on config.env & some other conditions
  
          // [DEPRECATED] This variant is not in use now 
          if (config.variant == "WhatsAppBtn") {
              // Reset text of widget button
              document.querySelector('.df-btn-text').innerHTML = svgIcon + (config.btnCTA ? " " + config.btnCTA : "");
              // Set CSS of widget button based text or no-text
              if (!config.btnCTA) {
                  document.querySelector('.df-btn-text').classList = "df-btn-text df-btn-text-icon-only";
              } else {
                  document.querySelector('.df-btn-text').classList = "df-btn-text";
              }
              // Go to whatsapp with prefilled message only in production mode
              if(!dev) {
                  goToLink();
              }
          }
  
          if (config.variant == "WhatsAppBtnAndChatWidget") {
              // If mobile is true, take user directly to whatsapp instead of opening/closing widget
              if (!mobile) {
                  // Reset text of widget button for WhatsAppBtnChatWidget variant
                  document.querySelector('.df-btn-text').innerHTML = dfToggled ? svgIcon + (config.btnCTA ? " " + config.btnCTA : "") : svgIcon;
                  // Open widget box
                  document.querySelector('.df-btn').classList = dfToggled ? 'df-btn df-closed' : 'df-btn';
                  // Set CSS of widget button based text or no-text
                  if (!dfToggled || !config.btnCTA) {
                      document.querySelector('.df-btn-text').classList = "df-btn-text df-btn-text-icon-only";
                  } else {
                      document.querySelector('.df-btn-text').classList = "df-btn-text";
                  }
                  // Create session on widget close for first time
                  const isSessionValid = checkWidgetSession();
                  if (dfToggled && !isSessionValid) {
                      createWidgetSession();
                  }
              } else {
                  // In dev mode do nothing on btn click in mobile
                  if(!dev) {
                      // Go to whatsapp with prefilled message
                      goToLink();
                  }
              }
          }
          // toggle to control closed & opened status
          dfToggled = !dfToggled
      }
      window.goToLink = () => {
          // Redirect to user to web.whatsapp in production mode
          if (config.env != "dev" && window.location.hostname != "create.aisensy.com") {
              const redirectUrl = `https://wa.aisensy.com/${config.linkid}?url=${window.location.href}&title=${document.title}`
              window.open(redirectUrl);
          }
      }
      // By default open the widget on load in dev mode - create.aisensy.com
      if(config.env == "dev") {
          dfToggle(true);
      }
  
      window.openWidgetOnLoad = () => {
          setTimeout(function(){
              // Check if widget is already opened
              if(!dfToggled) {
                  dfToggle()
              }
          }, 3000);
      }
      window.checkWidgetSession = () => {
          const existingSession = window.localStorage.getItem("AISENSY_WA_WIDGET_SESSION");
          const currentTimestamp = new Date().getTime();
          if (existingSession) {
              if (existingSession < currentTimestamp) {
                  return false
              } else {
                  return true;
              }
          } else {
              return false
          }
      }
      window.createWidgetSession = () => {
          const existingSession = window.localStorage.getItem("AISENSY_WA_WIDGET_SESSION");
          let sessionWindow = 0;
          if (config.openWidgetSessionWindow === "24_HOUR") {
              sessionWindow = 24*60*60*1000; // 24 hours
              // sessionWindow = 2*60*1000; // 2 mins for testing
          } else {
              sessionWindow = 7*24*60*60*1000; // 1 week
              // sessionWindow = 5*60*1000; // 5 mins for testing
          }
          const nextTimestamp = new Date(new Date().getTime() + sessionWindow).getTime();
          window.localStorage.setItem("AISENSY_WA_WIDGET_SESSION", nextTimestamp);
      }
      // Open Widget by default on page load in production mode
      if (config.openWidgetByDefault == "true" && !mobile && config.env != "dev") {
          // Check widgetSession
          // Create widgetSession to control widget re-open scenario in prod
          // Create session for 24_HOUR & 1_WEEK
          if (config.openWidgetSessionWindow === "ALWAYS") {
              openWidgetOnLoad();
          } else {
              const isSessionValid = checkWidgetSession();
              if (!isSessionValid) {
                  // Session is invalid, open widget
                  openWidgetOnLoad();
              }
          }
          
      }
  }
  
  
  
  