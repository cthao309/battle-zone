$(document).ready(function(){

	/* This fade-in and fade-out the logo */
				$(".logo").fadeIn("slow",function(){
						$(this).fadeOut(1000,function(){
								$(".credit").fadeIn("slow",function(){
									$(this).fadeOut(1000,function(){
										$(".author").fadeIn("slow",function(){
											$(this).fadeOut(1000,function(){
												$(".text").fadeIn("slow");
											});
										});
									});
								});			
						});
				})

	playThemeMusic();
	startGame();
	newGame();
});

/*Reset game function*/
function newGame(){
	$(".btn2").click(function(){
		window.location.reload();
	});
};

//Declaration of variables
var c1position = 0, c2position = 0;
var player1 = false, player2 = false;
var message;
var position = 0; 

/*startGame function*/
function startGame(){


	var randomPos = Math.floor((Math.random()*350)+1);
	console.log("number generated " +randomPos);	//number generated
	var tanker1Pos = -randomPos;
	c1position = tanker1Pos;
	position = randomPos;

	// console.log("position1: \n left:" + c1position + "\ntop: -2px");
	// console.log("position2: \n top:" +pos2T + "\nleft: " +pos2L);
	var tanker2Pos = randomPos;
	c2position = tanker2Pos;
	
	$(".btn1").click(function(e){
		$(".text").hide();
		$(".tanker1").show().css({'left': tanker1Pos +'px',
															 'display':'inline-block'
														 });
		$("#cannon1").hide().css({'position': 'absolute',
															 'display':'none'
															});		
		$(".tanker2").show().css({'left': tanker2Pos + 'px',
															'display':'inline-block'
															});
		$("#cannon2").hide().css({'left':c2position + 'px',
															'display':'none'
														});

		player1 = true; player2 = false;

		playGame(player1, player2);

	});
};

/*playGame function*/
function playGame(p1, p2){
	if(p1 === true && p2 === false)
	{
		console.log("player1's turn");
		user1();
	}
	else if(p1 === false && p2 === true)
	{
		console.log("player2's turn");
		user2();
	}
	else
		return;
};


var pos1L= $(".tanker1").position().left;
var pos1T= $(".tanker1").position().top;


var pos2L= $(".tanker2").position().left;
var pos2T= $(".tanker2").position().top;

/*user1 function*/
function user1(){
	$("#fire2").hide();
	$("#player2").hide();
	$("#player1").show();
	$("#fire1").show().click(function(e){
			playHadouken();
			var height = $("#height1").val();
			var distance = $("#distance1").val();

			displayTrajectory1(distance, height);

			
			var distance1 = c2position;
			var distance2 = c2position + 100;
			var t = distance / 2;
			console.log("your distance is " +distance+ " and between: " +t+ " when it should be between "+distance1 +" and " +distance2);



			if(t >= c2position &&  t <= c2position + 100 && height >= 500 && height <= 1000)
			{					
				// console.log("Player 1 Won");
				$("#message1").finish().show();
				$("#newGame").show().click(function(){
						window.location.reload();	
				});
			}
			else
			{				
				player1 = false; player2 = true;
				playGame(player1, player2);
			}
	}); //close "#fire" click function
}; //close user1 function

/*user2 function*/
function user2(){
	$("#fire1").hide();
	$("#player1").hide();
	$("#player2").show();
	$("#fire2").show().click(function(e){
			playHadouken();
			var height = $("#height2").val();
			var distance = $("#distance2").val();

			displayTrajectory2(distance, height);

			var distance1 = Math.abs(c1position);
			var distance2 = Math.abs(c1position) + 100;
			var t = distance/2;
		
			console.log("your distance is " + t+ " and between: " +t+ " when it should be between "+distance1 +" and " +distance2);


			if(t >= distance1 &&  t <= distance2 && height >= 500 && height <= 1000)
			{					
				// console.log("Player 2 Won");
				$("#message2").show();
				$("#newGame").show().click(function(){
						window.location.reload();	
				});
			}
			else
			{					
				player1 = true; player2 = false;
				playGame(player1, player2);
			}
	}); //close "#fire" click function

}; //close user2 function


 //displayTrajectory1 function for user1*/
function displayTrajectory1(x,y){

	// console.log(x+ " " +y);
	$('#cannon1').css({left: 0, top: '-2px'});

	$( "#cannon1" ).show().animate({
   	left: "-=" +x,
	 	top: "-=" +y 
  }, 650,function(){
  	$("#cannon1").hide();
  });
};



/*displayTrajectory2 function for user2*/
function displayTrajectory2(x, y){

	// console.log(x+ " " +y);
	$('#cannon2').css({left: '-20px', top: '50px'})

	$( "#cannon2" ).show().animate({
    left: "-=" + x,
		top: "+=" + y
	  }, 650,function(){
	  	$("#cannon2").hide();
  });	
};

/*play theme music*/
function playThemeMusic(){
	$("#theme-music")[0].volume=.5;
	$("#theme-music")[0].load();
	$("#theme-music")[0].play();
}

function playHadouken(){
	$("#hadouken-sound")[0].volume=.85;
	$("#hadouken-sound")[0].load();
	$("#hadouken-sound")[0].play();
}