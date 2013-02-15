jQuery.noConflict();function GSSearch(d,N,D,r,L,n){var z=null,e=null,y=null,o=null,p=null,l=null,I=null,q=null,s="",F="",K=true,w=true,v=false,A="slow",f="swing",h="resultsloaded";
function c(O){O.attr("disabled","disabled");O.attr("aria-disabled","true")}function g(O){O.removeAttr("disabled");
O.attr("aria-disabled","false")}function B(){I.on("click",i)}function i(O){D=D-r;
if(D<0){D=0}p.fadeOut(A,f,H)}function b(){q.on("click",C)}function C(O){var P=null;
if(e.val()){D=D+r}else{P=p.find(".gs-search-sticky").length;D=D+r-P}p.fadeOut(A,f,H)
}function E(){e.keypress(u)}function u(O){if(O.which==13){y.click()}}function G(){y.on("click",a)
}function a(O){c(e);c(y);c(I);c(q);F=e.val();D=0;p.fadeOut(A,f,H);p.attr("aria-hidden","true")
}function H(){o.fadeIn(A,f,j);o.attr("aria-hidden","false")}function j(){var R=null,P=null,Q=null,O=null;
if(n){P=n.attr("href");Q="&i="+D+"&s="+F.replace(/ /,"+");O=P.replace(/&i.*$/,Q);
n.attr("href",O)}if(L==={}){R={}}else{R=L}R.i=D;R.l=r;R.s=F;jQuery.post(s,R,t)}function t(P,Q,O){p.html(P);
o.fadeOut(A,f,M);o.attr("aria-hidden","true")}function M(){var O=null;p.fadeIn(A,f);
p.attr("aria-hidden","false");g(e);g(y);if(D<=0){c(I)}else{g(I)}O=p.find(".gs-search-result").length;
if(O<r){c(q)}else{g(q)}k();if((D<=0)&&(O<r)&&K){l.fadeOut("fast",f);K=false}else{if(((D>0)||(O>=r))&&!K){l.fadeIn("fast",f);
K=true}}if((O==0)&&w){e.fadeOut("fast",f);y.fadeOut("fast",f);w=false}else{if((O>0)&&!w){e.fadeIn("fast",f);
y.fadeIn("fast",f);w=true}}x();v=true}function x(){var O=jQuery.Event(h);z.trigger(O)
}function k(){keywords=null;keywords=p.find(".gs-search-keyword");if(keywords.length>0){keywords.removeAttr("href").css("cursor","pointer");
keywords.click(m)}}function m(O){var P=jQuery(this).text();e.val(P);y.click()}function J(){z=jQuery(d);
e=z.find(".gs-search-entry input");E();y=z.find(".gs-search-entry button");G();o=z.find(".gs-search-loading");
p=z.find(".gs-search-results");l=z.find(".gs-search-toolbar");I=z.find(".gs-search-toolbar-previous");
B();q=z.find(".gs-search-toolbar-next");b();s=N}J();return{load:function(){y.click()
},results_shown:function(){return v},RESULTS_LOADED_EVENT:h}};