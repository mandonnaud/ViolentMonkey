// ==UserScript==
// @name        Action rapide - gerermescomptes.com
// @namespace   Violentmonkey Scripts
// @match       https://www.gerermescomptes.com/
// @grant       none
// @version     1.0
// @author      Samuel Mandonnaud
// @description 31/07/2023 12:52:19
// ==/UserScript==
var samListe=[
  ['Vancance',15,105],
  ['Boutique+',13,1513515]
];
setInterval(() => {
  var samTr=document.querySelectorAll('#account-operations-table tbody tr:not(.samHack)');
  samTr.forEach((tr) => {
    tr.classList.add('samHack');
    var td=tr.querySelectorAll('td')[4];
    samListe.forEach((btData) => {
      var aSam=document.createElement('A');
      aSam.innerHTML=btData[0];
      aSam.href='javascript:void(0)';
      td.appendChild(aSam);
      aSam.onclick=() => {
        var checked=tr.querySelector('.table-operations-checking-checked');
        if (!checked) {
          tr.querySelector('.table-operations-checking-container').click();
        }
        tr.querySelector('.table-operations-edition').click();
        var test=setInterval(() => {
          var bouton=document.getElementById('om_e_categorize');
          if (bouton) {
            clearInterval(test);
            console.log('Bouton trouver');
            bouton.click();
            var test2=setInterval(() => {
              var select=document.getElementById('popup_category');
              if (select) {
                clearInterval(test2);
                console.log('Select trouver');
                select.value=btData[1];
                $(select).change();
                var select2=document.querySelector('select[name="sub_category"]');
                var test3=setInterval(() => {
                  if (select2.options.length>1) {
                    clearInterval(test3);
                    console.log('Select2 chargé');
                    select2.value=btData[2];
                    document.querySelector('button[name="Valider"]').click();
                  }
                })
              }
            });
          }
        },30);
      };
    });
  });
},1000);
