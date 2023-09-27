$("document").ready(function(){
	//모든 DOM이 불러와졌을 때 실행
	
	//데이터 정의
	var circleNum = 0;
	
	//공의 종류 = 크기/ 색 /속도
	var circleTypes= { //width는 지름이다
		"option" : ["color", "width", "radius", "speed"],
		"small" : ["black", 5, 2.5, 3000], //3000은 지점을 이동하는 시간 (ms)이다
		"medium" : ["blue", 15, 7.5, 4000],
		"large" : ["yellow", 30, 15 , 5000]
	};
	
	//circleTypes[choice][0] == 색
	//circleTypes[choice][1] == 지름
	//circleTypes[choice][2] == 반지름
	
	//시간
	var t = 0;
	
	//게임 실행 여부
	var gameOn = false;
	
	//마우스 좌표
	var mX, mY;
	
	//---------------------------------------//
	//마우스 움직임을 감지해서 좌표에 담아주는 함수
	$("body").mousemove(function(){ //jquery 문법
		mX = event.pageX; //jquery 내장 현재 마우스 위치값 (왼쪽 위가 0,0)
		mY = event.pageY;
		
		
		
		
	});
	
	
	//타이머
	function timer(){
		if(gameOn){
			setTimeout(function(){
				//0.01s 단위로 보이게
				t = t + 0.01;
				$(".timer").html(`<h1><div class="center">${t.toFixed(2)}</div></h1>`); //jquery 문법이다.. 해당 클래스 아래에 html을 찍어줌. toFixed는 소수가 해당 자리까지만 나옴	
				timer(); //재귀
			}, 10); //10ms 지연 (0.01초)
			
		}
	};

	
	
	//시작 버튼
	$(".startbutton").click(function(){
		$(".startbutton").fadeToggle(500,function(){ //fadeToggle은 해당 요소를 사라지게 한다. fadeToggle([duration],[function(애니메이션 이후에 실행될 함수)])
			gameOn = true;
			timer();
			$("body").mouseover(function(){
/*
※ mouseenter, mouseover의 차이
				 
☞ 둘의 공통점 : 해당 영역에 마우스가 올라가는 것을 감지

☞ mouseenter : 자식 영역에 들어가면 감지하지 않는다.
☞ mouseover : 해당 영역의 자식영역까지 들어가도 감지된다.

※ mouseout, mouseleave의 차이


☞ 둘의 공통점 : 해당 영역에 마우스가 올라가 있는 상태에서 벗어난 것을 감지
☞ mouseleave : 자식 영역에 들어가 요소를 빠져나가도 감지하지 않는다.
☞ mouseout : 요소 안에 다른 요소를 빠져나가도 감지하게 된다.
*/
				//게임을 끝내는 함수
				//endGame();
			});
			//공을 만드는 함수
			createCircle();
		});
		
	});
	
	function createCircle(){
		circleNum++;
		
		//small ,medium, large 중 하나 랜덤 생성
		//1~3 정수 랜덤 생성
		var randomInt = Math.floor(3 * Math.random())+1 ; //floor는 내림, random은 0~1미만 랜덤
		
		if(randomInt == 1){
			var choice = "small";
		}else if(randomInt == 2){
			var choice = "medium"
		}else if(randomInt == 3){
			var choice = "large";
		}
		
		//공의 id값 지정
		var circleName = "circle" +circleNum;
		
		//공의 색, 지름, 반지름, 속도 담기
		var circleColor = circleTypes[choice][0];
		var circle2R = circleTypes[choice][1];
		var circleR = circleTypes[choice][2];
		var circleSpeed = circleTypes[choice][3];
		
		//공의 이동 범위 지정
		var moveableWidth = $("body").width() - circle2R;
		var moveableHeight = $("body").height() - circle2R;
		
		//공의 시작 좌표
		var circlePositionLeft = (moveableWidth * Math.random()).toFixed(); //소수점 버림
		var circlePositionTop = (moveableHeight * Math.random()).toFixed();
		
		//공 표시하기
		var newCircle = `<div class="circle" id="${circleName}"></div>`;
		$("body").append(newCircle);
		$("#"+circleName).css({
			//css 코드
			"background-color" : circleColor,
			"width" : circle2R+"px",
			"height" : circle2R+"px",
			"border-radius" : circleR+"px",
			"top" : circlePositionTop+"px",
			"left" : circlePositionLeft+"px"
		}); //id : circleName에 부여하는 css 코드를 작성
		
		//---랜덤한 공 생성, 속성 지정 완료 ---
		
		//1ms마다 마우스와의 거리 계산 닿으면 종료
		
		function timeCirclePosition(id){
			setTimeout(function(){
				var currentCirclePosition = $(id).position();
				var calRadius = parseInt($(id).css("width")*0.5);
				
				var distanceX = mX - (currentCirclePosition.left+calRadius);
				var distanceY = mY - (currentCirclePosition.top+calRadius);
				//점과 점 사이의 거리
				if((Math.sqrt(Math.pow(distanceX),2)+Math.pow(distanceY,2)) <= calRadius){
					console.log("over");
					$(id).removeClass('circle').addClass('redcircle');
					$(id).css("background-color","red");
					//endGame();
				}
			timeCirclePosition(id);
			},1);
		}
		timeCirclePosition("#"+circleName);
		
		//1초에 한 번 공 나오게
		setTimeout(function(){
			if(gameOn){
				createCircle();
			}
			
			
			
		},1000);
		
		
		
		
	}
	
	
	
	
	
	
});	