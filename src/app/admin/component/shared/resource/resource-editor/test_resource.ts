export const TestLayout = { "language":"sp", "layout":{ "children":[{ "children": [{ "attrs": { "nav": "home" }, "flex": "25", "name": "Logo", "style": { "borderRight": "1.5px solid #6d622d" }, "views": ["service", "input", "thank"] }, { "children": [{ "flex": "66", "name": "Brand", "style": { "fontSize": "3vw", "paddingTop": "20px" }, "views": ["service", "input", "thank"] }, { "flex": "20", "name": "Store", "style": { "fontSize": "2vw", "marginTop": "-2.6vw" }, "views": ["service", "input", "thank"] }], "flex": "52", "layout": "column", "name": "Info", "views": ["service", "input", "thank"] }, { "flex": "8", "name": "Language Title", "style": { "fontSize": "2vw" }, "views": ["service", "input", "thank"] }, { "children": [{ "flex": "50", "name": "Select Spanish", "style": { "margin": "auto", "width": "70%" } }, { "flex": "50", "name": "Select English", "style": { "margin": "auto", "width": "70%" } }], "flex": "15", "layout": "row", "name": "Select Language", "views": ["service", "input", "thank"] }], "flex": "15", "layout": "row", "layout_gap": "20px", "name": "Header" }, { "background": "Body Background", "children": [{ "flex": "50", "name": "Welcome", "style": { "height": "100%" }, "views": ["init"] }, { "flex": "20", "name": "Store_body", "style": { "color": "#000", "fontSize": "3vw", "fontWeight": "bold", "height": "100%" }, "views": ["init"] }, { "flex": "3", "name": "Text Insert", "style": { "color": "#000", "fontSize": "2vh", "height": "100%" }, "views": ["init"] }, { "attrs": { "nav": "input" }, "flex": "20", "name": "InsertDNI", "style": { "height": "100%" }, "views": ["init"] }, { "children": [{ "flex": "10", "name": "Holder" }, { "flex": "18", "name": "Input DNI", "style": { "textAlign": "center" } }, { "flex": "18", "name": "Input Phone", "style": { "textAlign": "center" } }, { "flex": "60", "name": "Keyboard" }], "layout": "column", "name": "Customer Input", "views": ["input"] }, { "flex": "8", "name": "Hi Customer", "style": { "color": "#108b98", "fontSize": "4vh", "fontWeight": "600", "marginLeft": "5vw" }, "views": ["service"] }, { "flex": "7", "name": "Choose Service", "style": { "fontSize": "3vh" }, "views": ["service"] }, { "flex": "85", "layout_gap": "40px", "name": "Service List", "views": ["service"] }, { "name": "Thank", "style": { "height": "90vh", "margin": "auto", "width": "90vh" }, "views": ["thank"] }], "flex": "82", "layout": "column", "name": "Body" }, { "flex": "3", "layout": "row", "name": "Footer", "style": { "fontSize": "2vh" } }], "layout":"column", "name":"Kiosk", "style":{ "backgroundImage":"url('./brand/bitel/v1/kiosk/img/background.png')", "backgroundSize":"cover" },"templates":[{ "children": [{ "flex": "70", "name": "Service Icon", "style": { "height": "11vh", "margin": "auto", "marginTop": "2vh", "width": "11vh" } }, { "flex": "30", "name": "Service Name", "style": { "color": "#fff", "fontSize": "3vh", "marginTop": "-1vh" } }], "layout": "column", "name": "Service Cell", "style": { "backgroundColor": "#108b98", "border": "10px solid #e6c11b", "borderRadius": "3vh" } }] },"navigations":[{ "name": "init" }, { "name": "input" }, { "name": "service", "next": "thank" }, { "auto": 1500, "name": "thank" }], "resources":{ "Brand":{ "data":{ "align":"left", "i18n":{ "en":"VIETTEL PERU SAC English", "sp":"VIETTEL PERU SAC" } },"style":{ "fontWeight":"bold" },"type":"text" },"Brand_body":{ "data":{ "align":"center", "i18n":{ "en":"VIETTEL PERU SAC English", "sp":"VIETTEL PERU SAC" } },"style":{ "fontWeight":"bold" },"type":"text" },"Choose Service":{ "data":{ "i18n":{ "default":"Please choose your desired service", "sp":"Elija el servicio deseado" } },"style":{ "color":"#444", "fontSize":"2vw" },"type":"text" },"Footer":{ "data":" Copyright (C) 2017.Miraway ", "style":{ "margin":"2px" },"type":"text" },"Hi Customer":{ "data":{ "i18n":{ "default":"HELLO CUSTOMER", "en":"HELLO CUSTOMER" } },"style":{ "color":"#444", "fontSize":"2vw" },"type":"text" },"Input DNI":{ "data":{ "name":"code", "placeholder":{ "i18n":{ "default":"Nhập số DNI", "sp":"INSERT YOUR DNI" } } },"style":{ "border":"10px solid #e6c11b", "borderRadius":"100vw", "fontSize":"2vw", "fontWeight":"600", "height":"10vh", "textIndent":"5vh", "width":"46vw" },"type":"input" },"Input Phone":{ "data":{ "name":"phone_number", "placeholder":{ "i18n":{ "default":"Nhập số Điện thoại", "sp":"INSERT YOUR PHONE NUMBER" } } },"style":{ "border":"10px solid #e6c11b", "borderRadius":"100vw", "fontSize":"2vw", "fontWeight":"600", "height":"10vh", "textIndent":"5vh", "width":"46vw" },"type":"input" },"InsertDNI":{ "data":"./brand/bitel/v1/kiosk/img/insert.png", "style":{ "cursor":"pointer" },"type":"image" },"Keyboard":{ "data":{ },"type":"numeric-keyboard" },"Language Title":{ "data":{ "align":"right", "i18n":{ "default":"Language" } },"type":"text" },"Logo":{ "data":"./brand/bitel/v1/kiosk/logo/logo_bitel.png", "type":"image" },"Select English":{ "data":{ "image":"./brand/bitel/v1/kiosk/i18n/icon_lang_eng.png", "language":"en" },"type":"select-language" },"Select Spanish":{ "data":{ "image":"./brand/bitel/v1/kiosk/i18n/icon_lang_sp.png", "language":"sp" },"type":"select-language" },"Service List":{ "data":{ "any":"icon_default", "dir":"./brand/bitel/v1/kiosk/icon/", "ext":"png" },"style":{ "height":"95%", "margin":"auto", "width":"90vw" },"type":"service-list" },"Store":{ "data":{ },"type":"store-name" },"Store_body":{ "data":{ },"style":{ "textAlign":"center" },"type":"store-name" },"Text Insert":{ "data":{ "align":"center", "i18n":{ "default":"Please, insert your DNI/Your phone number or your Identity card to be served", "en":"Por favor, inserte su DNI / su número de teléfono o su tarjeta de identidad para ser servido" } },"style":{ "fontSize":"120%" },"type":"text" },"Text Wellcome":{ "data":{ "align":"center", "i18n":{ "default":"" } },"style":{ "fontSize":"100%" },"type":"text" },"Thank":{ "data":"./brand/bitel/v1/kiosk/img/success-kiosk.png", "type":"image" },"Welcome":{ "data":"./brand/bitel/v1/kiosk/logo/Logo-welcome-bitel.png", "type":"image" } } }