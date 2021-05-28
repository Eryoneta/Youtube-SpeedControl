	var paineis;
	(function(){
		const painel=
"			<div class='SpeedPainel' style='																	"+
"				transform:translateZ(0);																		"+
"				color:white;																					"+
"				text-align:center;																				"+
"				left:0px;																						"+
"				width:100%;																						"+
"				visibility:hidden;																				"+
"			'>																									"+
"				<div style='																					"+
"					margin-top:12%;																				"+
"					width:100px;																				"+
"					height:50px;																				"+
"					background-color:rgba(0,0,0,0.5);															"+
"					border-radius:5px;																			"+
"					z-index:2147483647;																			"+
"					display:inline-block;																		"+
"				'>																								"+
"					<p class='SpeedView' style='																"+
"						font-family:Roboto,Arial,sans-serif;													"+
"						font-size:24px;																			"+
"						text-shadow:0px 1px 0px black,0px -1px 0px black,-1px 0px 0px black,1px 0px 0px black;	"+
"						line-height:50px;																		"+
"					'></p>																						"+
"				</div>																							"+
"			</div>																								";
		let videos=document.getElementsByTagName("VIDEO");
		for(let v=0;v<videos.length;v++){
			const speedPainel=document.createElement("div");
			speedPainel.innerHTML+=painel.replace(/\t/g,"");	//INNERHTML ATUALIZA TUDO, PARANDO O VIDEO
			videos[v].parentNode.appendChild(speedPainel);		//MAS O APPEND NÃO ATUALIZA TUDO!
		}
		paineis=document.getElementsByClassName("SpeedPainel");
		const speeds=[
			0.0625,	0.125,	0.25,	0.5,	0.75,
													1,
														1.25,	1.5,	1.75,	2,	4,	8,	16
		];
		window.addEventListener("keydown",function(e){
			const tecla=e.keyCode;
			const comma=188,point=190,R=82;
			const shift=e.shiftKey;
			for(let v=0;v<paineis.length;v++){
				const video=paineis[v].parentNode.previousSibling;
				var speed;
				for(let s=0;s<speeds.length;s++)if(video.playbackRate===speeds[s]){
					speed=s;
					break;
				}
				if(shift)switch(tecla){
					case comma:		//DIMINUI VELOCIDADE
						stopEvento(e);
						speed=Math.max(speed-1,0);
						video.playbackRate=speeds[speed];
						show(v,video.playbackRate+"x");
					break;
					case point:		//AUMENTA VELOCIDADE
						stopEvento(e);
						speed=Math.min(speed+1,speeds.length-1);
						video.playbackRate=speeds[speed];
						show(v,video.playbackRate+"x");
					break;
				}
				switch(tecla){
					case R:			//LOOP
						video.loop=!video.loop;
						show(v,video.loop?"&#x21BA":"&#x25BA");
					break;
				}
			}
		},true);
	})();
	var visivel;
	function show(id,texto){
		if(visivel)clearTimeout(visivel);
		paineis[id].style.visibility="visible";
		document.getElementsByClassName("SpeedView")[id].innerHTML=texto;
		visivel=setTimeout(function(){
			paineis[id].style.visibility="hidden";
		},1000);
	}
	function stopEvento(evento){//IMPEDE DEFAULT_EVENTOS
		evento.preventDefault();
		evento.stopImmediatePropagation();
		evento.stopPropagation();
	}