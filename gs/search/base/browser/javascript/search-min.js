jQuery.noConflict();function GSSearch(e,P,E,s,N,o){var z=null,f=null,y=null,p=null,q=null,m=null,J=null,r=null,M=null,c=null,t="",G="",L=true,w=false,A="slow",g="swing",i="resultsloaded";
function d(Q){Q.attr("disabled","disabled");Q.attr("aria-disabled","true")}function h(Q){Q.removeAttr("disabled");
Q.attr("aria-disabled","false")}function C(){J.on("click",j)}function j(Q){E=E-s;
if(E<0){E=0}B()}function b(){r.on("click",D)}function D(Q){var R=null;if(f.val()){E=E+s
}else{R=q.find(".gs-search-sticky").length;E=E+s-R}B()}function F(){f.keypress(v)
}function v(Q){if(Q.which==13){y.click()}}function H(){y.on("click",a)}function a(Q){d(f);
d(y);d(J);d(r);G=f.val();E=0;if(q.is(":visible")){q.attr("aria-hidden","true");q.fadeOut(A,g,I)
}else{if(M.is(":visible")){M.attr("aria-hidden","true");M.fadeOut(A,g,I)}else{I()
}}}function B(){var Q=0;Q=q.height();p.height(Q+"px");q.fadeOut(A,g,I);q.attr("aria-hidden","true")
}function I(){p.fadeIn(A,g,k);p.attr("aria-hidden","false")}function k(){var T=null,R=null,S=null,Q=null;
if(o){R=o.attr("href");S="&i="+E+"&s="+G.replace(/ /,"+");Q=R.replace(/&i.*$/,S);
o.attr("href",Q)}if(N==={}){T={}}else{T=N}T.i=E;T.l=s;T.s=G;jQuery.post(t,T,u)}function u(R,S,Q){q.html(R);
p.fadeOut(A,g,O);p.attr("aria-hidden","true")}function O(){var Q=null;q.fadeIn(A,g);
q.attr("aria-hidden","false");p.height("auto");h(f);h(y);if(E<=0){d(J)}else{h(J)}Q=q.find(".gs-search-result").length;
if(Q<s){d(r)}else{h(r)}l();if((E<=0)&&(Q<s)&&L){m.fadeOut("fast",g);L=false}else{if(((E>0)||(Q>=s))&&!L){m.fadeIn("fast",g);
L=true}}if(Q==0){if(f.val()===""){c.fadeIn("fast",g);f.fadeOut("fast",g);y.fadeOut("fast",g)
}else{M.fadeIn("fast",g)}if(q.is(":visible")){q.hide()}}x();w=true}function x(){var Q=null;
Q=jQuery.Event(i);z.trigger(Q)}function l(){keywords=null;keywords=q.find(".gs-search-keyword");
if(keywords.length>0){keywords.removeAttr("href").css("cursor","pointer");keywords.click(n)
}}function n(Q){var R=jQuery(this).text();f.val(R);y.click()}function K(){z=jQuery(e);
f=z.find(".gs-search-entry input");F();y=z.find(".gs-search-entry button");H();p=z.find(".gs-search-loading");
q=z.find(".gs-search-results");m=z.find(".gs-search-toolbar");J=z.find(".gs-search-toolbar-previous");
C();r=z.find(".gs-search-toolbar-next");b();c=z.find(".gs-search-empty");c.hide();
M=z.find(".gs-search-failed");M.hide();t=P}K();return{load:function(){y.click()},results_shown:function(){return w
},RESULTS_LOADED_EVENT:i}};