"use strict";

let dizajn_data = {
	farebnost: "#daa520",
	ciernobielost: "tmave",
	font: "16px"
}


// vysuvanie a zasuvanie prepinaca stylov:
let koleso_prepinac = document.getElementById("koleso_prepinac");
let prepinac_stylov = document.getElementById("prepinac_stylov");
let x_prepinac = document.getElementById("x_prepinac");

koleso_prepinac.addEventListener("click", vysun_prepinac);
function vysun_prepinac(event) {
	event.preventDefault();
	prepinac_stylov.style.transform = "translate(0, -50%)";
}

x_prepinac.addEventListener("click", zasun_prepinac);
function zasun_prepinac(evt) {
	evt.preventDefault();
	prepinac_stylov.style.transform = "translate(-100%, -50%)";
}



// klikanie na kvapky - faredny dizajn:
let body = document.querySelector("body");
let kvapky = document.querySelectorAll(".farby a");

	for (let kvapka of kvapky) {
		kvapka.addEventListener("click", function(evt) {
			evt.preventDefault();
			let farba = kvapka.getAttribute("href");
			body.style.setProperty("--farebny", farba);
			dizajn_data.farebnost = farba;
			uloz_data();
		})

		
	}


// prepinanie pozadia
let input_tmave = document.querySelector('input[value="tmave"]');
let input_svetle = document.querySelector('input[value="svetle"]');

input_svetle.addEventListener("click", function() {
	body.style.setProperty("--ciernobiely", "#efefef");
	body.style.setProperty("--stisena", "#6e6e6e");
	body.style.setProperty("--velmitmava", "#fff");
	body.style.setProperty("--farba_font", "#000");
	dizajn_data.ciernobielost = "svetle";
	uloz_data();
})

input_tmave.addEventListener("click", function() {
	body.style.setProperty("--ciernobiely", "#242424");
	body.style.setProperty("--stisena", "#ccc");
	body.style.setProperty("--velmitmava", "#151515");
	body.style.setProperty("--farba_font", "#fff");
	dizajn_data.ciernobielost = "tmave";
	uloz_data();
})


// zmena fontu
let prepinac_fontu = document.querySelector("#prepinac_fontu select");
prepinac_fontu.addEventListener("change", function() {
	document.querySelector("html").style.fontSize = prepinac_fontu.value;
	dizajn_data.font = prepinac_fontu.value;
	uloz_data();
})




// localStorage:
function uloz_data() {
	let textovy_objet = JSON.stringify(dizajn_data);
	localStorage.setItem("dizajn", textovy_objet);
}


// nastavujeme dizajn z localStorage:

let z_localStorage = localStorage.getItem("dizajn");
if (z_localStorage != null) {
	z_localStorage = JSON.parse(z_localStorage);

	body.style.setProperty("--farebny", z_localStorage.farebnost);

	if (z_localStorage.ciernobielost == "svetle") {
		body.style.setProperty("--ciernobiely", "#efefef");
		body.style.setProperty("--stisena", "#6e6e6e");
		body.style.setProperty("--velmitmava", "#fff");
		body.style.setProperty("--farba_font", "#000");
	}
	else {
		body.style.setProperty("--ciernobiely", "#242424");
		body.style.setProperty("--stisena", "#ccc");
		body.style.setProperty("--velmitmava", "#151515");
		body.style.setProperty("--farba_font", "#fff");
	}

	document.querySelector("html").style.fontSize = z_localStorage.font;

	document.querySelector('input[value="'+z_localStorage.ciernobielost+'"]').checked = true;
	document.querySelector('option[value="'+z_localStorage.font+'"]').selected = true;
}





// jQuery
let win = $(window);
let od_vrchu;
let header = $("header");
let nav_a = $("header nav a");
let pozicie_ele = [];

win.scroll(function(){
	od_vrchu = win.scrollTop();

	// pozadie pre header:
	if (od_vrchu > 0) {
		header.attr("id", "header_pozadie")
	}
	else { header.attr("id", "") }

	// späť na vrch:
	if (od_vrchu > 400) { $("#navrch").css({opacity: 1}) }
	else { jQuery("#navrch").css({opacity: 0}) }


	// vyznacenie sekcie v headeri:
	jQuery.each(pozicie_ele, function(index, item){
		if (od_vrchu > item.ele_odvrchu && od_vrchu < item.ele_pospodok) {
			nav_a.removeClass("aktivne");
			nav_a.eq(index).addClass("aktivne");
		}
		else if (od_vrchu < pozicie_ele[0].ele_odvrchu) {
			nav_a.removeClass("aktivne");
		}
	})
})


function pozicie_elementov() {
	pozicie_ele = [];
	nav_a.each(function(index, item) {
		let sekcia = $(item.hash);
		let ele_poz = {
			ele_odvrchu: sekcia.offset().top,
			ele_pospodok: sekcia.offset().top + sekcia.height()
		}
		pozicie_ele.push(ele_poz);
	})
}


$(".mobil_menu").on("click", function(event){
	event.preventDefault();
	$(this).toggleClass("otvorene_menu");
	$("header nav").slideToggle(600);
})
if ($(".mobil_menu").css("display") == "block") {
	$(".mobil_menu").toggleClass("otvorene_menu");
	$("header nav").slideToggle(600);
}



nav_a.click(function(evt) {
	evt.preventDefault();
	if ($(".mobil_menu").css("display") != "none") {
		$("header nav").slideUp(600);
		$(".mobil_menu").removeClass("otvorene_menu");
	}

	// animacia scrollovania:
	let id = $(this).attr("href");
	let odVrchu = $(id).offset().top;
	$("html, body").animate({scrollTop: odVrchu+3}, 1000, function() {
		window.location.hash = id;
	});
})


$("#navrch").click(function(evt) {
	evt.preventDefault();
	$("html, body").animate({scrollTop: 0}, 1000);
})



$(document).ready(function() {
	pozicie_elementov();
	kolotoc( $(".gulicky .aktivne") );

	setTimeout(function(){
		$(".slide").last().addClass("zoom");
	}, 100)
})


win.resize(function(){
	pozicie_elementov();

	// zobraz mi navigaciu:
	if ($(".mobil_menu").css("display") == "none") {
		$("header nav").css("display", "block");
	}
});



// taby:
function taby(a) {
	let id = a.attr("href");
	let p = $(id);
	a.addClass("aktivne").siblings().removeClass("aktivne");
	let vyska_rodica_p = p.outerHeight();

	p.parent().height(vyska_rodica_p);
	p.fadeIn().siblings().fadeOut();
}

$(".taby nav a").click(function(e){
	e.preventDefault();
	taby( $(this) );
})

taby($(".taby nav .aktivne"));
	


// galeria:
$("#galeria nav a").click(function(e){
	e.preventDefault();
	let a = $(this);
	let trieda = a.data("trieda");
	a.addClass("ativovane").siblings().removeClass("ativovane");

	$(".miesta").load("galeria.html .t_zapad");

})



// overlay galeria:
let p_overlay = $("#overlay_pre_img p");
let overlay_pre_img = $("#overlay_pre_img");
let img_overlay = $("#overlay_pre_img img");
let fotky;
let fotky_pozicia;
$(".titulka").click(function(e){
	e.preventDefault();

	fotky_pozicia = 0;

	fotky = $(this).data("fotky");
	img_overlay.attr("src", fotky[0]);

	overlay_pre_img.fadeIn(500);
	p_overlay.text("1/"+fotky.length);
})

overlay_pre_img.click(function(){
	overlay_pre_img.fadeOut(500);
})


$(".sipky").on("click", function(e){
	e.preventDefault();
	e.stopPropagation(); // nepovie rodicovi ze bolo na nu kliknute
})

$(".sipka1").on("click", function(){
	lightbox_dolava();
})
$(".sipka2").on("click", function(){
	lightbox_doprava();
})




function lightbox_doprava() {
	if (fotky_pozicia+1 < fotky.length) {
		fotky_pozicia++; // fotky_pozicia = fotky_pozicia + 1
	}
	else { fotky_pozicia = 0 }
	img_overlay.attr("src", fotky[fotky_pozicia]);
	p_overlay.text(fotky_pozicia+1+"/"+fotky.length);
}

function lightbox_dolava() {
	if (fotky_pozicia-1 >= 0) {
		fotky_pozicia--; 
	}
	else { fotky_pozicia = fotky.length-1 }
	img_overlay.attr("src", fotky[fotky_pozicia]);
	p_overlay.text(fotky_pozicia+1+"/"+fotky.length);
}

$(window).keydown(function(e){
	if (overlay_pre_img.css("display") == "block") {
		if (e.key == "Escape") {
			overlay_pre_img.fadeOut(500);
		}
		else if (e.key == "ArrowLeft") {
			lightbox_dolava();
		}
		else if (e.key == "ArrowRight") {
			lightbox_doprava();
		}
	}
})




// youtube overlay
let overlay_video = $("#overlay_video");
$(".video_play").click(function(e){
	e.preventDefault();
	overlay_video.html('<iframe width="560" height="315" src="https://www.youtube.com/embed/aWWblx8n-AY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>').fadeIn(500)
})
overlay_video.click(function(){
	overlay_video.html("");
	overlay_video.fadeOut(500);
})



// formuláre - overovanie
$("form").append($('<p class="error"></p>'));

$("form button").click(function(e){
	e.preventDefault();

	let treba_zobrazit = false;
	let chyby = "⚠ Je potrebné vypnlniť:";
	let policka = $(this).parents("form").find("[placeholder]");
	let ele_error = $(this).parents("form").find(".error");

	for (let policko of policka) {
		if (policko.value == "" ) {
			chyby += "<br>- "+policko.getAttribute("placeholder");
			treba_zobrazit = true;
		}
	}
	if (treba_zobrazit) {
		ele_error.html(chyby);
	}
	else { ele_error.html(""); }
})



// recenzie - kolotoč:
$(".gulicky a").click(function(e){
	e.preventDefault();
	kolotoc($(this));
})

let id_slide = $(".gulicky .aktivne").attr("href");
let predosli_slide = $(id_slide);

function kolotoc(gulicka) {
	// navigacia
	gulicka.addClass("aktivne").siblings().removeClass("aktivne");

	// slajdy
	let id = gulicka.attr("href");
	let slide = $(id);

	slide.parent().height( slide.height()+30 );

	let triedy = ["slide_zlava", "slide_zprava", "odchod_dolava", "odchod_doprava"];

	if (predosli_slide.nextAll(id).length > 0) {
		predosli_slide.removeClass(triedy).addClass("odchod_dolava");
		slide.removeClass(triedy).addClass("slide_zprava");
	}
	else {
		predosli_slide.removeClass(triedy).addClass("odchod_doprava");
		slide.removeClass(triedy).addClass("slide_zlava");
	}
	predosli_slide = slide;
}



let myska_x = 0;
// parallax:
function parallax(ele, rychlost_x = 1, rychlost_y = 0.7) {
	let x = myska_x * rychlost_x;

	ele = $(ele);
	let po_spodok = od_vrchu + $(window).height();
	po_spodok = Math.round(po_spodok);
	let ele_po_spodok =  Math.round(ele.offset().top + ele.height());
	let y = (po_spodok - ele_po_spodok) * rychlost_y;

	ele.css("transform", "translate("+x+"px, "+y+"px)");
}

$("#parallax").mousemove(function(evt){
	let sirka_okna = $("body").width();
	let polka = sirka_okna / 2;
	myska_x = evt.clientX - polka;
	myska_x = Math.round(myska_x / 5);
	cely_paralax();
})


win.scroll(function(){
	cely_paralax();
})


function cely_paralax() {
	parallax("#para_hora", 0.3, 0.1);
	parallax("#stromceky_druhe", 0.5, 0.3);
	parallax("#stromceky_prve", 0.6, 0.2);
	parallax("#para_dom", 0.8, undefined);
	parallax("#para_tabula", undefined, -0.2);
	parallax("#para_trava", undefined, -0.2);
	
}





// slider:
let bar=1
let slider = {
	intID: null,
	casovac: null,
	sliderSpeed: 6000,
	fadeSpeed: 1000,
	start: function() {
		this.intID = setInterval(function(){ nasledujuci_slide();}, this.sliderSpeed);
		this.casovac = setInterval(function(){         
			bar++
			  if(bar == 100){ bar=0}
			  else{$("#bar").css({width: bar+"%"})}
			}, this.sliderSpeed /100);
			
	},
	stop: function() {
		clearInterval(this.intID);
		clearInterval(this.casovac);
		this.intID = null;
		this.casovac = null
		bar = 0
		$("#bar").css({width:""})
	},
	toggle: function() {
		if (this.intID == null) { slider.start() }
		else { slider.stop() }
	}
}







slider.sliderSpeed = 5000;
slider.fadeSpeed = 800;
slider.start();




function nasledujuci_slide() {
	$(".slide").last().fadeOut(slider.fadeSpeed, function(){
		$(this).prependTo("#hlslider").show().removeClass("zoom");
		$(".slide").last().addClass("zoom");
	
	});
}

$("#hlslider").click(function(){
	slider.toggle();
	if (slider.intID == null) {
		$(".fa-circle-pause").fadeIn(500).delay(1000).fadeOut(500);
	}
	else {
		$(".fa-play").fadeIn(500).delay(1000).fadeOut(500);
	}
})


$(".sipka").click(function(e){
	e.stopPropagation();
	e.preventDefault();
	slider.stop();
	if ($(this).is($(".sipka").first())) {
		$(".slide").first().hide().appendTo("#hlslider").fadeIn(slider.fadeSpeed, function(){
			$(".slide").last().prev().removeClass("zoom");
			$(".slide").last().addClass("zoom");
		})
	}
	else {
		nasledujuci_slide();
	}
	slider.start();
})



// pismenkova animacia:
$(".slide h2").each(function() {
	let h2 = $(this);
	let pole_znakov = h2.text().split("");
	h2.empty();

	$.each(pole_znakov, function(index, pismenko) {
		if (pismenko == " ") {
			h2.append("<span class='medzera'> </span>");
		}
		else {
			h2.append("<span>"+pismenko+"</span>");
		}
	})
})

$(".slide h2").each(function() {
	let h2 = $(this);
	let sirka_h2 = h2.width();
	let spany = h2.find("span");
	let oneskorenie = 0.7;

	spany.each(function(){
		$(this).css({transition: oneskorenie+"s all", transform: "translateX("+sirka_h2+"px) rotate(90deg)"});
		oneskorenie = oneskorenie + 0.05;
	})
})









/*



http://127.0.0.1:8000/
https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
- python nainstalovat

	console.log(e.key);
	console.log(e.keyCode);
	console.log(e.which);

.data("triedenie")
.attr("data-triedenie")

getAttribute("data-triedenie")

https://api.jquery.com/category/traversing/ 

$(".tab_texty").children()
$(".tab_texty").children("span")
$(".tab_texty").children().first()
$(".tab_texty").children(":first-child").siblings()
$(".tab_texty").parents()
$(".tab_texty").parent()
$(".tab_texty").children().first().next()
$(".taby").find("p")



document.addEventListener("DOMContentLoaded", function(event) {  
    document.getElementById("bez_masa").style.border = "10px solid black"; 
});

$(".mobil_menu").click(function(){
	
})

$("header").addClass("hlavicka")
$("header").removeClass("hlavicka")
$("header").toggleClass("hlavicka")

Math.round()
Math.ceil()
Math.floor()

$("h1").text()
$("h1").text("Truristika v Česku")
$("h1").html("<em>Truristika v Česku</em>")

$("#chodniky_vlavo").show()
$("#chodniky_vlavo").hide(1500)
$("#chodniky_vlavo").toggle(2500)

$("#chodniky_vlavo").fadeOut(2500)
$("#chodniky_vlavo").fadeIn()
$("#chodniky_vlavo").fadeToggle(2000)



JSON.stringify(dizajn_data) - zmenit na text
JSON.parse(textovy_objekt) - zmenit z textu na dany datovy typ
localStorage.setItem() - odosli do localStorage
localStorage.getItem() - vyber data z localStorage

https://www.w3schools.com/jsref/prop_win_localstorage.asp


https://www.w3schools.com/jsref/prop_element_classlist.asp 
https://www.w3schools.com/jsref/met_element_setattribute.asp 
https://www.w3schools.com/jsref/jsref_from.asp
https://www.w3schools.com/jsref/met_document_queryselectorall.asp 
 */




let svg_logo = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1108.000000 472.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,472.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"> <path d="M5487 4373 c-58 -85 -175 -219 -258 -297 -271 -255 -745 -536 -904 -536 -56 0 -101 40 -229 204 -55 69 -103 126 -107 126 -19 0 -193 -127 -276 -202 -51 -46 -189 -183 -309 -305 -123 -127 -224 -223 -234 -223 -10 0 -46 32 -80 70 -82 92 -91 92 -186 -5 -62 -62 -84 -77 -129 -91 -63 -18 -125 -10 -198 27 -78 39 -108 78 -127 165 -13 58 -25 74 -55 74 -27 0 -72 -47 -177 -187 -103 -135 -172 -208 -293 -310 -105 -88 -364 -266 -475 -326 -84 -46 -175 -63 -223 -43 -39 16 -55 35 -38 46 9 5 8 10 -3 20 -9 7 -13 17 -10 22 3 5 -2 16 -12 24 -18 14 -17 15 11 9 l30 -6 -34 35 c-26 27 -31 36 -18 36 22 0 22 0 -15 73 l-31 62 -13 -30 c-7 -16 -13 -37 -14 -45 0 -8 -14 -39 -30 -69 -35 -63 -34 -61 -15 -61 14 0 14 -4 0 -31 -9 -17 -14 -37 -11 -46 10 -25 -12 -53 -43 -53 -30 0 -50 18 -101 94 -25 38 -30 50 -19 57 11 6 9 12 -6 30 l-20 21 44 -7 c51 -8 52 -10 -26 86 -29 36 -53 69 -53 71 0 3 10 8 22 11 22 6 22 6 -7 37 l-29 30 40 1 39 0 -25 17 c-38 26 -110 93 -110 103 0 5 12 4 26 -1 40 -16 42 -12 7 16 -43 33 -28 53 37 47 39 -3 43 -2 25 9 -11 7 -35 28 -54 46 -28 27 -32 35 -20 43 11 7 10 11 -8 24 -49 34 -71 75 -41 75 7 0 5 6 -4 18 -29 32 -47 79 -56 143 -7 44 -10 53 -11 29 0 -19 -10 -52 -21 -73 -11 -20 -17 -37 -13 -37 5 0 -12 -19 -37 -41 l-45 -40 38 3 c20 2 37 0 37 -4 0 -4 -27 -29 -60 -55 -33 -25 -58 -48 -56 -50 2 -2 21 3 41 11 45 19 45 19 45 2 0 -26 -42 -67 -99 -96 -92 -48 -94 -52 -23 -46 34 3 62 4 62 1 0 -2 -12 -11 -27 -19 l-28 -15 25 -1 25 -1 -27 -15 c-35 -18 -36 -26 -3 -18 42 11 28 -3 -50 -47 -75 -43 -95 -64 -52 -54 84 19 120 25 125 21 2 -3 -22 -17 -53 -31 -32 -14 -56 -27 -54 -30 3 -2 36 5 73 16 37 11 70 19 72 16 3 -2 -19 -15 -48 -27 -53 -23 -53 -23 -25 -32 24 -9 38 -28 20 -28 -5 -1 -37 -28 -73 -61 -63 -58 -64 -60 -34 -57 22 3 35 -1 42 -13 9 -14 6 -19 -19 -29 -31 -13 -39 -30 -13 -30 10 0 0 -17 -30 -52 -25 -29 -46 -56 -46 -59 0 -4 20 -12 45 -19 25 -7 45 -15 45 -18 0 -3 -14 -21 -32 -39 -34 -35 -31 -38 20 -24 17 5 32 7 32 4 0 -2 -27 -35 -60 -72 -33 -37 -60 -71 -60 -74 0 -4 10 -7 21 -7 19 0 15 -7 -26 -55 -41 -49 -44 -54 -20 -45 43 16 48 12 26 -24 -26 -41 -26 -47 -3 -39 9 4 -7 -21 -36 -55 -30 -34 -52 -62 -50 -62 3 0 26 7 52 16 26 9 49 14 51 12 3 -2 -9 -20 -25 -39 -38 -45 -37 -53 5 -46 19 3 35 2 35 -2 0 -5 -32 -45 -70 -90 -73 -84 -73 -101 -2 -65 29 14 36 14 87 -2 30 -10 55 -21 55 -26 0 -4 -12 -14 -27 -22 l-28 -15 38 -1 c21 0 66 13 104 30 36 17 67 29 69 28 1 -2 4 -19 6 -38 4 -41 -7 -46 -114 -56 -76 -6 -88 -19 -29 -29 42 -7 103 6 136 28 11 8 33 22 49 32 l28 19 -7 -51 c-5 -40 -3 -53 10 -67 23 -22 39 -16 43 18 4 34 14 31 44 -14 20 -29 30 -36 65 -38 34 -3 47 2 77 29 20 17 38 30 39 28 25 -44 24 -44 78 -42 33 2 71 12 99 27 153 80 211 108 216 103 3 -2 -22 -26 -55 -52 -34 -27 -61 -52 -61 -56 0 -4 118 -7 263 -6 228 2 267 0 299 -15 76 -34 42 -66 -154 -143 -81 -32 -146 -60 -144 -63 13 -13 648 67 1133 143 445 69 743 106 790 99 23 -3 48 -13 55 -21 10 -13 4 -23 -36 -60 l-47 -46 33 6 c91 17 185 28 298 36 100 6 132 5 160 -6 l35 -15 -48 -24 c-115 -59 -851 -217 -1507 -323 l-55 -9 50 -1 c68 -1 595 35 780 54 528 55 1056 169 1395 302 230 91 385 180 500 288 64 60 73 65 114 65 58 0 91 -13 136 -54 52 -47 91 -59 400 -122 151 -30 279 -59 283 -64 5 -4 -27 -27 -71 -49 -119 -62 -126 -69 -66 -64 43 4 70 -3 204 -55 197 -76 306 -107 515 -147 17 -3 147 -9 290 -14 178 -7 326 -18 470 -37 201 -27 229 -28 645 -28 407 -1 438 0 488 18 28 11 52 23 52 27 0 4 -33 15 -72 24 -87 21 -95 25 -76 36 38 21 488 61 488 43 0 -4 -12 -21 -27 -37 l-28 -30 39 7 c22 4 73 21 114 37 41 16 78 29 83 27 5 -2 -25 -41 -66 -87 -41 -46 -75 -86 -75 -89 0 -2 39 -2 86 2 l87 7 -41 -48 c-22 -26 -88 -104 -146 -173 -67 -78 -102 -126 -93 -128 8 -2 49 11 91 28 42 16 82 30 89 30 26 1 226 -66 224 -74 -2 -6 -31 -25 -66 -44 -34 -19 -61 -35 -59 -37 2 -1 50 4 107 11 77 11 116 21 150 41 166 96 171 96 171 -2 0 -41 -4 -75 -9 -75 -12 0 -1084 -166 -1176 -182 l-70 -13 195 -9 c128 -6 283 -5 451 2 233 9 265 9 350 -8 52 -9 148 -23 214 -29 66 -7 176 -24 245 -38 142 -29 186 -27 307 12 93 30 132 31 204 7 48 -17 62 -17 134 -6 136 20 213 56 362 168 56 41 131 92 167 112 56 30 66 39 60 57 -6 18 -3 19 25 14 44 -9 39 -1 -18 28 -79 40 -84 65 -8 39 25 -8 56 -14 69 -12 19 3 13 10 -45 51 -37 27 -65 52 -62 58 4 5 28 9 56 9 27 0 49 5 49 10 0 6 -33 10 -80 10 -72 0 -80 2 -80 19 0 16 6 18 48 14 l47 -4 -27 23 c-16 13 -28 29 -28 35 0 7 -13 20 -30 30 -42 24 -38 33 16 33 46 0 84 13 84 29 0 5 -17 31 -38 58 -57 72 -58 75 -25 68 27 -7 27 -6 -12 29 -40 36 -40 36 -11 30 37 -9 28 9 -14 26 -29 12 -41 30 -19 30 5 0 7 5 4 10 -3 6 1 10 9 10 28 0 17 17 -39 59 -30 23 -55 46 -55 51 0 6 16 10 35 10 19 0 35 3 35 6 0 4 -14 31 -31 61 -17 30 -29 57 -26 59 3 3 19 -2 37 -11 42 -22 47 -14 15 24 -21 24 -23 31 -11 31 22 0 21 4 -19 76 -41 73 -42 77 -12 69 19 -6 17 -2 -12 29 -36 37 -37 55 -3 37 27 -15 30 -14 34 7 2 9 -13 43 -34 75 -40 59 -42 71 -6 37 12 -11 32 -20 45 -20 23 0 23 1 8 30 -22 43 -19 53 13 33 l27 -17 -20 23 -20 24 25 -8 c52 -16 54 -16 26 7 -72 56 -110 95 -123 125 -17 42 -17 51 4 55 14 3 11 11 -20 44 -20 23 -34 44 -31 47 3 3 22 -1 42 -9 37 -14 37 -14 -17 36 -49 44 -52 50 -31 50 23 0 23 1 -10 35 -48 50 -34 55 53 20 35 -15 15 13 -43 58 -33 26 -60 54 -60 62 0 20 35 19 67 -2 15 -10 24 -13 21 -8 -3 6 -27 40 -52 77 -24 37 -55 100 -67 140 -27 86 -39 104 -39 60 0 -38 -23 -98 -48 -125 -16 -19 -16 -19 6 -13 32 11 27 -3 -20 -53 -24 -24 -35 -41 -25 -38 24 9 21 -5 -7 -32 l-23 -22 -107 26 c-59 14 -116 25 -126 25 -19 0 -175 173 -211 235 -24 40 -17 55 27 55 40 0 35 16 -23 67 l-58 52 88 -1 c107 -1 127 12 60 37 -26 10 -66 31 -88 46 -49 33 -171 156 -163 164 3 3 33 -3 67 -14 33 -10 61 -16 61 -12 0 3 -32 29 -70 56 -65 47 -86 69 -57 61 6 -3 28 -7 47 -10 l35 -6 -33 21 c-18 12 -31 23 -29 25 2 2 28 0 57 -6 64 -12 117 -13 124 -2 3 5 -22 26 -56 48 -33 21 -76 59 -95 84 l-34 45 30 14 30 14 -57 37 c-58 37 -83 65 -97 109 -7 22 -5 23 29 19 20 -2 36 -3 36 -1 0 2 -18 21 -39 42 -76 76 -91 115 -106 272 -13 132 -25 190 -25 123 -1 -69 -30 -188 -54 -225 -23 -34 -24 -39 -9 -39 12 0 -15 -31 -72 -85 l-90 -84 80 6 80 6 -35 -38 c-19 -20 -78 -69 -130 -108 -52 -38 -99 -74 -105 -79 -8 -8 124 37 199 68 21 8 21 9 -16 -62 -37 -71 -78 -109 -143 -133 -46 -17 -201 -110 -193 -116 2 -1 53 2 113 7 61 5 117 7 125 5 8 -2 -14 -18 -50 -35 l-65 -30 50 -4 50 -3 -67 -39 c-37 -22 -66 -41 -64 -43 2 -2 38 7 80 21 42 13 76 21 76 17 0 -11 -166 -101 -187 -101 -11 0 -23 4 -28 9 -6 5 -93 53 -195 106 -102 54 -283 156 -402 227 -120 70 -224 128 -233 128 -12 0 -15 -13 -15 -57 -1 -32 -7 -71 -14 -88 l-13 -30 -31 48 c-26 42 -75 155 -123 290 -9 26 -32 52 -74 84 -108 84 -288 235 -403 340 -108 99 -114 103 -157 103 -82 0 -193 -86 -285 -221 -84 -123 -165 -201 -371 -356 l-174 -131 -75 -7 c-43 -4 -120 -22 -181 -43 -58 -19 -113 -33 -121 -29 -9 3 -54 61 -100 129 -133 195 -227 318 -242 318 -8 0 -18 -5 -21 -11 -5 -7 -13 -4 -26 7 -24 21 -175 247 -229 342 -36 64 -44 72 -71 72 -24 0 -35 -9 -62 -47z m2001 -67 c34 -18 65 -51 87 -95 17 -34 17 -55 -1 -148 -5 -28 0 -39 41 -88 40 -46 47 -60 42 -84 -5 -26 1 -37 56 -93 34 -35 77 -90 95 -123 36 -66 36 -58 0 79 -13 50 -31 90 -49 111 -18 20 -26 39 -23 51 4 15 -8 33 -45 67 -28 26 -51 52 -51 57 0 5 12 10 27 12 16 2 32 12 38 25 11 21 15 19 116 -63 57 -46 121 -98 141 -115 60 -48 86 -90 128 -204 21 -60 54 -131 73 -159 57 -84 67 -111 77 -218 6 -56 13 -105 17 -108 5 -4 27 -12 51 -19 49 -14 59 -27 111 -149 22 -50 54 -113 73 -141 36 -54 248 -284 255 -277 2 2 -34 80 -80 172 -47 93 -92 194 -100 224 -54 187 -74 241 -147 384 -44 87 -78 161 -76 164 6 5 714 -374 735 -394 8 -7 13 -15 10 -17 -2 -2 -28 -20 -57 -41 -29 -21 -51 -40 -49 -42 2 -2 41 3 86 11 87 17 158 17 152 0 -2 -5 -45 -28 -97 -49 -51 -22 -92 -41 -91 -43 2 -1 45 7 97 19 128 28 160 32 160 20 0 -5 -34 -22 -75 -38 -79 -30 -81 -44 -7 -44 27 0 42 -4 42 -13 0 -7 -56 -68 -125 -137 -69 -69 -125 -129 -125 -133 0 -8 39 -4 99 10 20 5 22 3 16 -16 -5 -18 -2 -21 20 -21 39 0 23 -16 -58 -57 l-72 -37 42 -6 c57 -8 60 -14 19 -40 -20 -12 -36 -26 -36 -32 0 -6 -25 -39 -55 -73 -30 -35 -55 -65 -55 -68 0 -3 25 -15 56 -28 71 -30 55 -36 -98 -40 -112 -3 -117 -2 -157 24 -23 15 -39 32 -35 38 6 11 -13 39 -28 39 -5 0 -8 -21 -7 -47 3 -43 1 -48 -21 -54 -43 -12 -46 -10 -45 28 0 20 -5 38 -12 40 -15 5 -36 -62 -29 -93 4 -13 3 -24 -1 -24 -11 0 -53 42 -53 53 0 13 -30 47 -42 47 -4 0 -8 -18 -8 -39 0 -22 -5 -43 -11 -47 -8 -4 -7 -9 2 -15 10 -6 8 -9 -9 -9 -14 0 -26 9 -34 25 -17 37 -32 31 -25 -10 l6 -35 -49 0 c-47 0 -49 1 -48 29 1 15 -3 34 -8 42 -11 19 -22 -20 -23 -87 -1 -28 -4 -53 -7 -57 -12 -12 -35 7 -61 51 l-27 46 -13 -44 c-7 -25 -21 -51 -30 -57 -10 -8 -12 -13 -4 -13 7 0 9 -4 6 -10 -3 -5 -20 -10 -36 -10 -19 0 -28 4 -24 11 4 6 0 16 -10 23 -9 6 -19 31 -22 54 -3 23 -9 42 -12 42 -4 0 -13 -27 -19 -60 -8 -38 -19 -63 -31 -69 -16 -9 -388 -18 -395 -10 -2 2 -18 30 -36 62 -17 31 -34 57 -37 57 -2 0 -3 -13 -2 -28 2 -16 -6 -43 -19 -64 -20 -32 -31 -38 -106 -59 -47 -13 -82 -27 -80 -31 3 -4 38 -8 77 -8 97 0 113 -12 67 -50 -48 -42 -90 -47 -164 -22 -33 12 -87 29 -119 37 -44 13 -56 20 -48 29 11 14 -15 96 -30 96 -17 0 -31 -41 -19 -55 16 -19 4 -35 -24 -35 -32 0 -76 37 -76 64 0 12 -15 37 -35 56 l-34 33 6 -37 c4 -26 1 -41 -11 -55 -17 -18 -21 -17 -126 35 -108 54 -150 89 -150 126 0 28 28 89 53 117 53 57 177 110 307 130 131 21 131 21 153 58 17 29 40 45 125 84 l104 49 -63 45 c-151 106 -205 140 -258 161 -31 13 -54 27 -52 31 3 4 59 51 126 105 l120 96 123 -28 c67 -15 125 -30 129 -34 3 -3 -1 -14 -10 -24 -23 -25 -21 -74 3 -104 26 -34 132 -88 260 -133 58 -20 116 -48 130 -61 13 -13 19 -24 12 -24 -7 0 -12 -14 -12 -33 0 -18 -5 -38 -11 -44 -24 -24 -1 -63 49 -84 26 -11 73 -33 105 -49 31 -17 60 -30 62 -30 11 0 -17 42 -60 90 -45 51 -65 94 -49 110 5 5 38 10 74 12 l65 3 -150 95 c-82 52 -180 123 -217 156 -52 48 -80 65 -127 79 -33 10 -58 22 -55 27 3 4 27 8 55 8 27 0 49 4 49 9 0 5 -64 37 -142 72 -95 43 -156 77 -185 104 -46 42 -173 238 -173 267 0 9 27 38 60 63 33 25 60 53 60 60 0 17 -45 41 -157 86 -43 17 -79 32 -81 34 -14 13 315 527 369 578 32 30 66 34 107 13z m-1909 -234 c20 -21 83 -105 140 -188 148 -211 163 -228 262 -294 107 -73 139 -119 139 -201 -1 -107 -56 -174 -233 -284 -95 -59 -114 -75 -64 -56 14 6 79 21 145 35 65 14 150 37 189 51 73 26 113 32 113 16 0 -5 29 -30 64 -55 35 -25 80 -67 99 -93 76 -103 141 -141 339 -197 110 -31 298 -103 316 -120 7 -8 9 -8 -98 -51 -116 -47 -245 -110 -438 -216 -154 -85 -180 -94 -387 -129 -71 -12 -141 -29 -155 -37 -40 -25 -240 -176 -237 -180 2 -2 88 23 190 56 103 32 188 56 190 54 3 -2 -6 -29 -19 -61 -28 -69 -29 -94 -5 -147 21 -46 66 -88 128 -118 24 -12 43 -24 43 -27 0 -6 -199 -41 -310 -54 -26 -3 -81 2 -130 12 -77 15 -85 19 -88 42 -2 14 -11 33 -19 42 -8 9 -12 22 -8 28 4 6 -1 20 -11 31 -18 20 -18 21 -1 30 10 6 14 15 10 22 -4 7 -9 39 -10 72 -3 79 -13 130 -22 119 -4 -5 -16 -47 -25 -94 -18 -87 -35 -136 -63 -179 l-15 -24 -23 44 c-19 38 -20 47 -9 64 17 24 17 57 0 110 l-12 40 -28 -90 c-15 -49 -29 -91 -31 -93 -8 -9 -35 13 -31 25 4 8 -3 27 -15 41 -13 16 -16 28 -9 30 8 3 8 8 -1 18 -9 11 -9 14 0 14 9 0 9 5 0 21 -6 12 -9 30 -6 40 3 10 1 22 -4 25 -6 4 -6 11 1 19 7 8 7 15 1 19 -5 3 -7 15 -4 26 5 20 -11 50 -27 50 -12 0 -74 -113 -72 -132 0 -10 -5 -18 -11 -18 -8 0 -8 -3 1 -9 10 -6 5 -14 -20 -29 -31 -21 -32 -22 -9 -22 25 0 25 0 -8 -34 -18 -19 -31 -39 -27 -44 3 -5 -36 -16 -92 -24 -117 -19 -121 -16 -152 81 -33 103 -31 99 -41 72 -6 -14 -7 -31 -4 -39 3 -9 -6 -32 -20 -54 -20 -29 -22 -38 -10 -38 20 0 19 -20 -5 -50 l-19 -25 -25 24 c-21 19 -26 35 -28 85 l-3 61 -22 -42 c-13 -23 -20 -48 -18 -55 3 -8 -8 -34 -26 -57 -34 -48 -43 -45 -54 21 -8 45 -25 51 -25 8 0 -41 -26 -100 -44 -100 -8 0 -21 19 -29 43 l-15 42 -7 -33 c-5 -23 -13 -32 -24 -30 -9 2 -16 10 -17 18 0 8 -6 28 -12 43 -7 16 -12 36 -13 45 0 9 -11 -18 -24 -61 -12 -43 -26 -81 -30 -85 -8 -8 -25 19 -19 30 3 5 -2 11 -11 14 -9 4 -14 13 -11 20 3 7 1 16 -5 20 -7 4 -6 10 1 19 12 14 3 65 -10 65 -5 0 -14 -24 -20 -52 -12 -60 -59 -159 -77 -165 -13 -5 -63 40 -63 56 0 5 9 13 20 16 20 6 20 7 -4 26 -20 16 -27 32 -32 79 -4 33 -10 60 -14 60 -8 0 -23 -44 -25 -70 0 -8 -6 -26 -14 -40 -8 -13 -15 -44 -16 -68 -1 -24 -9 -50 -18 -59 -14 -14 -18 -14 -43 6 -22 17 -23 21 -9 21 17 0 16 2 -3 23 -12 13 -19 26 -16 30 4 4 1 13 -5 21 -7 8 -14 46 -16 83 -2 63 -19 123 -35 123 -4 0 -12 -33 -19 -72 -7 -40 -14 -81 -16 -90 -2 -10 1 -21 6 -24 16 -9 10 -40 -12 -60 -19 -17 -19 -19 -3 -31 16 -11 16 -16 3 -39 -7 -15 -19 -28 -25 -31 -18 -7 -86 38 -80 53 13 35 18 84 7 84 -6 0 -11 8 -12 18 0 9 -6 35 -13 57 l-12 40 -29 -55 c-15 -30 -30 -66 -31 -80 -8 -66 -14 -84 -34 -104 -11 -13 -18 -29 -15 -38 11 -28 -29 -48 -115 -58 -46 -5 -87 -7 -91 -4 -16 9 -10 33 11 44 27 15 16 33 -36 58 -51 25 -53 45 -6 50 18 2 32 7 32 11 0 5 -25 28 -55 51 -58 45 -67 60 -36 60 58 0 68 33 16 51 -19 7 -35 17 -35 22 0 13 22 51 34 60 7 5 5 11 -7 18 -12 7 -17 20 -15 38 3 30 -37 91 -50 75 -22 -25 -62 -83 -62 -89 0 -3 5 -3 10 0 6 3 15 3 20 0 6 -4 -2 -22 -20 -45 -35 -45 -36 -50 -10 -50 31 0 24 -32 -16 -71 l-35 -34 35 -5 36 -5 -57 -64 -57 -63 34 7 35 8 -26 -34 c-39 -50 -46 -47 -54 21 -4 33 -11 63 -16 66 -12 7 -29 -39 -29 -78 0 -30 -23 -68 -41 -68 -4 0 -9 24 -11 53 -3 50 -8 50 -24 -2 -3 -10 -7 -11 -19 -1 -10 8 -13 24 -9 53 3 24 0 55 -6 72 l-12 30 -15 -35 c-9 -19 -18 -52 -20 -72 -6 -39 -44 -85 -62 -73 -6 3 -11 17 -11 29 0 13 -6 39 -14 57 l-14 33 -11 -42 c-7 -23 -15 -42 -20 -42 -4 0 -16 15 -26 33 -13 26 -15 38 -7 52 8 15 5 33 -10 75 -12 30 -23 57 -25 60 -7 8 -23 -24 -42 -88 -19 -62 -19 -92 0 -92 23 0 5 -19 -31 -34 -48 -19 -74 -20 -102 -5 l-21 12 23 12 23 12 -36 25 c-37 25 -39 38 -5 38 17 0 27 20 11 20 -5 0 -15 4 -23 10 -12 7 -12 12 4 29 17 19 18 23 2 61 -9 22 -19 65 -22 95 l-7 55 -23 -68 c-14 -38 -22 -78 -19 -93 4 -17 -1 -34 -16 -53 -18 -23 -20 -30 -8 -37 12 -8 11 -11 -4 -20 -11 -6 -16 -17 -12 -28 6 -20 -36 -48 -65 -43 -10 2 -21 -8 -29 -24 -15 -34 -27 -23 -51 48 l-18 53 -11 -28 c-6 -16 -11 -44 -11 -63 0 -19 -3 -34 -7 -34 -5 1 -26 16 -47 34 -36 31 -39 38 -42 93 -2 33 -8 70 -13 84 -9 23 -10 22 -11 -11 0 -19 -11 -60 -24 -90 -17 -39 -22 -60 -15 -77 5 -13 5 -23 0 -23 -16 0 -29 24 -38 70 l-9 45 -19 -35 c-10 -19 -20 -30 -22 -23 -2 7 1 21 7 33 9 17 7 26 -14 51 -23 27 -32 50 -50 132 -4 15 -10 27 -15 27 -12 0 -31 -72 -31 -118 0 -22 -4 -44 -10 -47 -14 -8 -13 -52 1 -57 14 -5 -6 -48 -21 -48 -22 0 -43 51 -37 90 6 43 -34 246 -46 234 -4 -4 -7 -34 -7 -66 0 -32 -6 -74 -14 -92 -7 -18 -19 -65 -26 -105 -8 -51 -17 -74 -30 -81 -26 -14 -29 -13 -23 9 3 13 -2 23 -17 31 -20 11 -21 13 -5 30 16 17 16 21 1 41 -12 18 -13 26 -3 37 8 11 9 16 1 19 -6 2 -20 10 -30 18 -17 13 -18 14 -1 15 18 0 22 11 9 24 -4 4 -7 25 -8 45 0 23 -9 49 -21 64 l-21 27 -27 -43 c-15 -23 -36 -52 -47 -64 -13 -14 -17 -26 -12 -35 5 -7 7 -20 6 -30 -2 -9 2 -19 8 -23 21 -13 10 -45 -21 -61 -25 -12 -30 -20 -24 -37 17 -54 16 -63 -7 -84 -20 -19 -39 -23 -141 -29 -103 -6 -117 -5 -117 9 0 9 -9 19 -20 22 -33 10 -23 25 13 18 l32 -6 -27 22 c-34 27 -35 38 -5 44 13 3 6 5 -18 6 -37 2 -38 3 -18 14 19 11 20 14 7 31 -18 25 -18 36 1 36 19 0 19 19 2 45 -7 11 -14 31 -15 44 0 13 -6 27 -12 31 -6 4 -8 14 -4 23 4 12 -2 24 -20 38 -31 24 -34 43 -6 34 20 -6 20 -6 -2 31 -21 36 -21 36 -1 30 18 -6 20 -3 15 21 -3 16 -11 37 -19 49 -7 11 -10 24 -7 27 4 4 1 13 -6 22 -10 12 -10 15 4 15 20 0 20 9 -1 39 -16 24 -16 24 6 18 19 -5 22 -2 18 14 -3 12 0 19 9 19 20 0 17 8 -13 36 l-28 25 65 -5 c36 -4 97 -9 135 -12 l71 -7 64 51 c124 97 255 188 409 284 86 53 168 105 182 117 15 11 52 63 84 116 32 52 60 95 64 95 3 -1 31 -35 61 -77 30 -42 109 -132 174 -201 82 -84 116 -126 107 -131 -6 -4 -69 -13 -139 -20 -91 -8 -133 -17 -148 -29 -12 -9 -48 -39 -80 -65 -80 -66 -236 -140 -369 -176 -60 -16 -123 -35 -140 -41 -61 -23 -259 -155 -345 -230 -34 -29 -32 -29 60 14 52 24 156 73 230 109 96 46 171 74 260 97 169 43 289 102 360 175 74 75 126 91 246 75 107 -14 252 -61 308 -99 23 -16 109 -104 191 -195 131 -147 165 -180 165 -161 0 3 -27 48 -60 101 -103 163 -215 305 -312 397 -191 182 -224 216 -257 271 -19 31 -32 59 -29 61 3 3 29 1 58 -5 70 -13 176 -13 203 1 12 6 59 47 104 92 l82 80 67 -59 c38 -32 103 -93 146 -134 l78 -75 30 -183 31 -183 131 -217 c72 -119 160 -265 196 -325 36 -59 67 -105 69 -103 10 9 -41 144 -92 246 -28 58 -80 149 -113 202 -87 137 -140 244 -152 307 -12 64 -14 331 -2 331 9 0 76 -77 132 -150 133 -176 214 -254 365 -355 98 -65 375 -217 375 -205 0 16 -165 155 -266 225 -54 38 -142 112 -194 164 -52 51 -126 114 -163 138 -49 32 -73 55 -84 81 -59 136 -78 167 -148 236 l-73 73 80 94 c44 52 82 96 85 99 2 3 17 -10 32 -29 l28 -34 72 122 c41 70 94 144 124 174 50 50 153 115 164 104 2 -3 9 -74 14 -159 5 -84 12 -172 15 -196 7 -56 45 -126 130 -242 92 -125 171 -254 243 -398 71 -142 113 -261 152 -434 42 -186 48 -188 49 -21 0 129 -2 149 -26 210 -35 94 -41 181 -18 263 30 108 30 177 0 233 -14 26 -23 47 -19 47 3 0 64 -41 136 -92 123 -86 138 -94 256 -130 69 -21 132 -38 139 -38 7 0 -13 31 -44 70 l-58 69 -59 0 c-77 -1 -90 9 -198 152 -47 63 -111 137 -143 164 -32 28 -76 67 -99 88 l-42 37 26 24 c15 12 74 58 132 100 94 68 113 78 169 87 99 15 159 50 217 124 63 80 74 87 235 156 l131 55 65 80 c147 179 182 197 249 126z m891 -501 c20 -38 11 -85 -25 -136 -19 -27 -37 -62 -40 -77 -4 -15 -10 -28 -14 -28 -12 0 -134 181 -126 188 8 9 166 71 182 71 7 1 17 -8 23 -18z m340 -157 c98 -24 113 -34 128 -82 8 -23 35 -65 60 -93 l46 -52 -64 -58 c-37 -34 -103 -78 -153 -104 -145 -74 -199 -61 -286 69 -28 41 -51 78 -51 81 0 4 34 44 76 88 84 91 98 116 89 164 l-6 32 48 -15 c26 -8 77 -22 113 -30z m2564 -329 c4 -11 -3 -19 -21 -26 -36 -13 -43 -2 -13 21 30 24 27 23 34 5z m685 -416 c41 -8 55 -8 61 0 5 9 32 6 104 -13 54 -13 100 -27 104 -30 3 -4 -2 -20 -11 -35 -23 -39 -22 -41 15 -34 l33 6 -19 -29 c-10 -16 -13 -23 -5 -16 33 31 26 7 -14 -45 -63 -84 -65 -87 -28 -69 35 19 38 15 15 -19 -9 -14 -14 -35 -10 -48 3 -15 -4 -37 -24 -67 -17 -25 -30 -53 -30 -62 0 -10 -3 -18 -7 -18 -5 0 -68 87 -141 192 -99 142 -130 193 -120 200 7 4 37 16 66 25 62 20 70 35 10 22 -38 -9 -44 -7 -70 17 -34 33 -36 48 -5 40 12 -3 46 -10 76 -17z m-9140 -219 c22 -11 48 -31 59 -45 11 -14 26 -25 33 -25 9 -1 5 -8 -8 -19 -27 -22 -29 -31 -8 -31 9 0 12 -6 9 -15 -9 -23 -25 -18 -69 19 -33 28 -37 36 -27 49 10 12 8 20 -13 45 -40 47 -35 52 24 22z m29 -215 c23 -16 42 -34 42 -38 0 -5 -10 -18 -22 -29 -18 -15 -19 -18 -5 -14 21 7 22 -4 3 -29 -14 -19 -15 -19 -35 -1 -26 24 -26 33 -1 41 20 6 19 9 -15 56 -51 71 -48 73 33 14z m9177 -36 c87 -50 105 -65 110 -90 8 -37 28 -46 69 -31 28 10 26 6 -21 -37 -29 -26 -53 -51 -53 -56 0 -4 14 -5 30 -1 l31 6 -18 -31 c-33 -57 -36 -56 -132 22 -50 41 -90 76 -90 79 -1 3 16 12 36 20 l36 15 -54 65 c-86 103 -84 100 -64 100 9 0 63 -27 120 -61z m-1105 -26 c0 -5 -16 -21 -36 -36 -19 -16 -33 -31 -31 -33 2 -2 45 7 96 20 50 14 91 22 91 18 0 -4 -24 -33 -53 -64 l-53 -57 -110 30 c-60 16 -128 34 -151 40 -49 13 -55 26 -17 35 185 47 264 60 264 47z m-8072 -172 c7 -21 -15 -11 -44 21 l-29 32 35 -22 c19 -11 36 -26 38 -31z m7107 -6 l97 -35 376 -10 c207 -6 389 -8 404 -5 37 9 35 -4 -7 -45 -19 -19 -35 -38 -35 -42 0 -4 21 -8 46 -8 25 0 44 -4 42 -10 -1 -5 -42 -52 -90 -104 -49 -52 -88 -97 -88 -100 0 -3 24 4 53 15 95 39 93 40 47 -45 -44 -80 -42 -87 17 -66 25 10 24 7 -17 -34 l-45 -45 -90 9 c-126 14 -696 30 -714 20 -11 -6 -7 -12 18 -24 64 -33 63 -96 -1 -96 -41 0 -116 39 -97 51 8 5 23 9 34 10 14 0 9 6 -17 18 -50 23 -60 35 -23 27 l30 -6 -38 35 c-21 20 -35 40 -32 45 3 5 1 11 -5 15 -6 4 -8 10 -5 14 2 5 -7 43 -20 86 -19 58 -22 81 -14 86 9 5 7 21 -9 61 -11 29 -20 60 -20 69 1 18 -53 109 -64 109 -4 0 -16 -13 -28 -30 -12 -16 -17 -30 -11 -30 19 0 12 -17 -11 -28 -20 -9 -21 -11 -4 -11 17 -1 18 -3 4 -18 -17 -20 -32 -54 -30 -66 1 -4 -9 -12 -22 -18 l-24 -11 20 -33 c18 -31 18 -36 3 -70 -18 -44 -18 -48 -6 -40 19 11 7 -41 -16 -68 -13 -16 -23 -33 -23 -39 0 -6 -7 -20 -17 -30 -15 -17 -15 -18 13 -18 l29 0 -29 -25 c-33 -28 -54 -31 -81 -11 -18 13 -18 14 1 20 24 7 29 42 6 51 -14 5 -14 7 -2 15 12 7 9 15 -15 40 -23 24 -27 33 -16 39 10 7 9 11 -5 22 -11 8 -19 25 -19 39 0 14 -10 37 -23 51 -27 30 -27 30 47 54 50 16 53 19 36 31 -11 8 -34 20 -52 26 -18 7 -33 15 -33 18 0 8 159 106 195 121 76 31 185 58 231 58 35 1 83 -10 149 -34z m2075 -171 c65 -37 80 -50 80 -70 0 -21 3 -24 25 -18 14 3 25 4 25 1 0 -3 -25 -29 -55 -58 -30 -29 -53 -54 -51 -56 2 -2 20 3 40 11 20 8 36 13 36 10 0 -3 -14 -26 -31 -51 l-32 -45 -38 43 c-21 24 -38 47 -39 51 0 4 18 12 40 18 22 6 40 14 40 18 0 4 -20 31 -43 60 -45 55 -93 132 -82 132 3 0 42 -21 85 -46z m-9279 -63 l23 -19 -34 -21 c-43 -26 -41 -26 -74 0 -44 35 -32 53 40 58 12 0 32 -7 45 -18z m6265 -15 l281 0 -4 -45 c-1 -25 -5 -61 -8 -78 -3 -21 0 -33 7 -33 6 0 1 -11 -12 -24 -12 -14 -20 -32 -17 -40 4 -9 1 -18 -5 -22 -7 -5 -2 -11 13 -17 22 -9 22 -10 4 -15 -10 -2 -89 1 -175 7 -85 7 -276 16 -425 21 -148 6 -295 14 -325 20 -76 13 -190 49 -190 59 0 9 48 21 86 21 21 0 23 4 18 25 -6 25 -6 25 69 25 41 0 95 3 121 6 l46 7 0 49 0 50 118 -9 c64 -4 243 -8 398 -7z m2844 -848 c22 -13 40 -26 40 -30 0 -4 -13 -23 -30 -41 -54 -61 -125 -55 -188 17 -17 20 -32 41 -32 45 0 9 90 27 143 30 15 0 46 -9 67 -21z m110 -76 c0 -17 -25 -32 -54 -32 l-31 1 35 19 c39 21 50 24 50 12z"></path> </g> </svg>';

$("#logo").html(svg_logo);



