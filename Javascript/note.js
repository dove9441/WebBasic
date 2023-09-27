var var1=document.getElementById("goorm"); //id 속성값 가지는 요소 가져오기
console.log(var1);
var1.getAttribute("href"); //속성값 가져오기 한 후 var1에 저장까지 한다
var1.setAttribute("href","https://www.youtube.com/"); //var1에 있는 연결된 속성값을 변경한다
var var2=document.getElementsByName("userid"); //input 태그의 name 속성값을 이용해서 찾는다  input 태그에서 많이 사용한다
console.log(var2);
var var3=document.getElementsByTagName("input"); //태그명을 이용해서 찾는다
console.log(var3);



function printInputValue(){
var inputValue=document.getElementsByTagName("input")[0].value; //0은 첫 번째 input 태그가 나온 요소를 의미한다. 
	//[0]은 여러 input 중 첫 번째 input만
	alert(inputValue);
}

{ //템플릿 리터럴 
let name="David";
	console.log(`이름은 ${name} 입니다`);
	console.log(`${100+846}`);
let bool=true;
	console.log(`${bool ? "참" : "거짓" }`);
}

//화살표 함수
//(매개변수)=>{함수 본문, return값} (매개변수 1개면 소괄호 생략 가능(없으면 () 이렇게만), 함수 본문 1줄이면(또는 리턴만 있으면) 
//중괄호+return 키워드 생략 가능단 중괄호 생략 시 반드시 return 생략.
{
	const add=(num1,num2)=>{return num1+num2}; //마치 add가 함수 이름처럼 사용된다.
	//0보다 크면 출력, 아니면 -1 출력
	const overzero=num1=> {num1>0 ? num1 : -1};
	setTimeout( ()=>{console.log("hello world!")}, 3000 ); //3초 뒤에 안에 있는 함수(console.log) 실행
}
{
	const arr=[1,2,3,4];
	console.log(typeof arr); //배열은 배열 타입이 아닌 오브젝트(객체) 타입이다
	console.log(arr.length); //length는 길이 반환. 뒤애 () 안 붙는다. 
	let arr2=[];
	arr2[2]=3; //2번 자리에는 3이지만 나머지는 empty라는 요소로 채워진다. undefined가 아니다.
	arr.push(5,6); //이러면 arr에 5,6이 추가된 상태로 배열의 총 길이를 반환한다. 배열 원본이 바뀐다. (마지막 인덱스에 추가)
	const arrplused=arr.concat(5,6); //이러면 추가된 새로운 배열이 반환되어 받는 변수가 따로 필요하다.
	
	arr.pop(); //push와 짝이다. 자신을 반환하며 맨 끝 인덱스 요소를 삭제한다. vector나 스택이라고 생각하자.
	
	//배열 요소 순회하기
	const namearr=["사과","오렌지","딸기","배","수박"];
	for(let i=0;i<namearr.length;i++){
		console.log(`${namearr[i]}`);
	}
	//두 번째 방법 [배열 이름.forEach(함수){};] (배열 요소가 함수의 매개변수로 들어간다.) ( E가 대문자임에 주의하자)
	namearr.forEach(function(name){
		console.log(`${name}`);
	})
	
	//더 간단히 쓰면
	namearr.forEach( (name)=>console.log(`${name}`) );
	
	//세 번쨰 방법. 프레임워크 등 웹서비스에서 거의 이걸 쓴다. [배열 이름.map(함수{})] 문법은 forEach와 같다.
	const numarr=[1,2,3,4,5,6,7];
	const doublearr=numarr.map( (num)=>num*2 );   
	//!!! map 함수를 쓰면 새로운 변수에 map 안의 함수를 실행시킨 결과값을 리턴해서 새로운 배열을 만들 수 있다.
	
	//배열 필터링
	const filtered=numarr.filter( x=> x>4 ); // 매개변수로 함수를 받는다. 조건문이 아니다!!
	
	const postlist=[{"date":"yesterday","id":131},{"date":"tomorrow","id":196}]; //키값은 따옴표가 있든 없든 상관없지만 띄어쓰기가 포함될 경우 따옴표가 필수이다.
	const yesterdaylist=postlist.filter( post => post.date==="yesterday" ); //post에 딕셔너리가 담기고 date라는 키에 해당하는 값을 검색한다.	
}



{
	//객체 Distructuring (구조분해할당)
	const song={author:"David", date:"2022-08-04", title:"rain", lyrics:"Hello world!"};
	const {author, date, title, lyrics}=song; //const로 author, date, title, lyrics라는 변수를 선언하여 song에서 맞는 키의 값을 할당하는 것과 같다.
	console.log(author, date, title, lyrics);
	
	const {author:name, date:nalzza, title: jemok, lyrics: body}=song; //author의 키값을 name이라는 변수를 const로 선언하여 할당한다.
	
	
	//api 활용한 예제
	let kakaoRespond={
    "aid": "A5678901234567890123",
    "tid": "T1234567890123456789",
    "cid": "TC0ONETIME",
    "partner_order_id": "partner_order_id",
    "partner_user_id": "partner_user_id",
    "payment_method_type": "MONEY",
    "item_name": "초코파이",
    "quantity": 1,
    "amount": {
        "total": 2200,
        "tax_free": 0,
        "vat": 200,
        "point": 0,
        "discount": 0,
        "green_deposit": 0
    },
    "created_at": "2016-11-15T21:18:22",
    "approved_at": "2016-11-15T21:20:47"
}
	//구매 품목, 가격, 구매 날짜를 담기
	const {item_name:item, created_at:purchase_date, amount :{total : cost} }=kakaoRespond; //amount 안에 있는 total에 있는 값을 cost에 넣으려면 저렇게 해야 한다.
	console.log(`구매한 품목 : ${item}, 구매 가격 : ${cost}원, 구매 날짜 : ${purchase_date}`);
}

{	
	//전개 구문 (spread 문법) : ...을 사용한 구문이다. 객체(배열 포함), 문자열 등에서 자체 값만 가져오려고 할 때 사용
	const fruits = ["apple","banana","pineapple"];
	console.log(fruits)	//['apple', 'banana', 'pineapple']
	console.log(...fruits) //apple banana pineapple
	
	
	const person = {
		name : "hong",
		age : 20,
		home : "seoul"
	}
	
	console.log(person) //{name: 'hong', age: 20, home: 'seoul'}
	console.log(...person);
	//VM360:1 Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function
	//at <anonymous>:1:9 오류남
	console.log(person['name']); //hong
	console.log(...person['name']); //h o n g (문자열 ...해도 이렇게 한 글자씩 나옴)
	
	
	
	
	//spread 문법(전개 문법). 객체나 배열의 요소나 함수를 호출하는 용도로 사용한다.
	//rest 문법(나머지 매개변수) : 객체나 배열의 값을 받아오는 변수나 함수의 매개변수로 사용한다. ...이라는 문법은 spread와 같다.
	const student={
		name:"김구름",
		id:21101234,
		college:"seoultech"
	};
	
	const univStudent={
		...student,     	//student에 있는 모든 요소를 받는다.
		major:"컴퓨터공학과"  //새로 요소를 추가한다.
	};
	
	//rest 문법 사용 예제
	const numbers=[1,2,3,4,5,6,7,89,1,45,29,3852,209];
	function sum(...n){  //n이라는 이름으로 배열이나 객체의 그 자체 모두를 가져온다.
		let result=0;
		for(let i=0;i<n.length;i++){
			result+=n[i];
		}
		return result;
	}
	
	console.log(sum(...numbers)); //함수 매개변수로 numbers라는 배열 요소 전부를 배열 자체로 넘겨준다.
	
	
	const margedStudent={
		...student,
		...univStudent
	};
	const {id, ...rest}=margedStudent;
	console.log(rest); //id를 제외한 모든 요소가 rest라는 변수에 저장된다.
}


{ //Class 는 constructor와 method 영역으로 나뉜다.
	class Person{
		constructor(name,age){
			this.name=name;
			this.age=age;    //this.var에서 이미 변수를 선언한 것이다. 오른쪽 age는 매개변수이다.
		}
		
		sayHello(){
			console.log(`내 이름은 ${this.name}이고, 나이는 ${this.age}야.`);
		}
	}
	
	class Student extends Person{
		constructor(name,age,college,major){
			super(name);	//상속받은 자식 객체에서 생성자를 사용하여 초기화할 때 무조건 this를 사용하기 전에 super를 이용해 부모 클래스의 생성자를 호출해야 한다. super는 한 번만 사용한다.
			this.age=age; 
			this.college=college;
			this.major=major;
		}

		sayHello(){  //함수 오버로딩이 가능하다!!
			console.log(`내 이름은 ${this.name}이고, 나이는 ${this.age}야. ${this.college}학교에 다니고, 전공은 ${this.major}이야.`);
		}
	}
	
	
	const A =new Student("홍길동",19,"서울","컴퓨터공학");
	A.sayHello();
}



{
	//예외 처리
	let bool=23;
	
	try{   //일단 실행할 코드
		//(bool!==1 ? throw new ERROR("bool이 1이 아닙니다!") : continue);
		if(bool!==1){
			//throw new Error("bool이 1이 아닙니다!"); //에러 객체 만들기
			throw ("bool이 1이 아닙니다! (문자열)") //에러 객체 자체가 문자열로
		}
		
	}
	catch(e){
		console.log(e);
		//console.log(e.name);  //에러 이름 (참조오류 등)
		//console.log(e.message); //에러 메시지 
		//console.log(e.stack);  //에러 스택(어디서 발생 등)
		
	}
	finally{  //어쨋든 실행될 코드
		console.log(`실행 완료`);
		
		
		
	}
	
}


{
//이벤트 리스너 사용


// 포커스 이벤트(focus, blur)
// 폼 이벤트(reset, submit)
// 뷰 이벤트(scroll, resize)
// 키보드 이벤트(keydown, keyup)
// 마우스 이벤트(mouseenter, mouseover, click, dbclick, mouseleave)
// 드래그 앤 드롭 이벤트 (dragstart, drag, dragleave, drop)
DOMObject.addEventListener('EventType', 'FunctionName'); //주의 : 함수 이름만 작성 소괄호는 작성하지 않음

const btn1 = document.getElementById('btn1');

btn1.addEventListener('click', () => {
	alert("클릭함");
}); 

//이벤트 리스너 삭제
DOMObject.removeEventListener('EventType', 'FunctionName');
}



{
//콜백 함수 기본

function show(name, age){
	alert(`name : ${name}, age : ${age}`);
}

function get(callback){
	let uname = prompt('inputname');
	let uage = parseInt(prompt('inputage'));
	callback(uname, uage);
}

get(show) //get에 넣은 show라는 함수가 그대로 callback을 바꿔치기한다고 생각하면 됨.
}




// DOM 객체 다루기 
{
	let queryone = document.querySelector() //쿼리셀렉터 하나만
	let queryall = document.querySelectorAll() //여러 개 가져와서 노드리스트로 저장 
	//접근할 때는 queryall[0] 같은 형식으로 접근
	
	
	// img 태그의 src 속성을 바꾸려면 (queryone이 img태그일 때)
	queryone.src = "바꿀 내용";
	
	//CSS 수정
	요소.style.속성명 = "바꿀 내용";
	
	//ClassList : 클래스 스타일을 저장한다.
	console.log(queryone.classList);
	
	//클래스 스타일 추가
	
	// 클래스 스타일을 미리 만들어놔야 한다.
	/* css 파일 또는 style 태그에,
	.style1 {
		color : red;
	}
	*/
	queryone.classList.add("style1") // 문자열로 넣어줘야 한다
	queryone.classList.contains('클래스명') //하면 해당 클래스 스타일 있는지 반환
	
	
	//클래스 스타일 토글 (다크모드 만들기)
	
	// <style>
	// 	background-color : #222;
	// 	color : #eee;
	// </style>
	const darkbtn = document.getElementById('darkbtn');
	darkbtn.onclick = () => { document.body.classList.toggle('dark');} //body에 적용하므로
	
}


//웹 요소 접근하기
{
	const elem = document.getElementById('element');
	//텍스트 필드 접근
	elem.value; 
	
	// 폼 요소 접근 (name 이용)
	elem.form_name.input_name;
	
	// 폼 배열 이용
	let allforms = document.forms //모든 form 가져옴
	let thatElements = allforms[0].elements; //해당 form의 모든 요소를 가져옴
	thatElements[5]; //5번째 요소 접근
	
	
	
	
	//선택 목록 접근
	elem.options[index];
	elem.selectedIndex; //하면 현재 선택된 항목의 인덱스를 가져옴
	
	//라디오 버튼, 체크박스 접근
	
	// *라디오 버튼
	form_name.input_name.value; //로 확인. 라디오와 체크박스는 같은 name값을 가지기 때문에
	
	// *체크박스 접근
	form_name.input_name.value; //로 접근.
	
	//둘 다의 경우에, 체크된 값을 가져오려면
	document.querySelector("input[name='input_name']:checked"); //로 가져올 수 있음.	
}

//이벤트
{
//문서 로딩 이벤트
	abort // 문서 로딩 중단
	error //문서 로딩 에러
	load //문서 로딩 완료
	resize // 창 크기 변경
	scroll //스크롤
	unload //문서 나가기
	
//마우스 이벤트
	click
	dblclick //더블클릭 dbl임에 주의
	mousedown //요소에서 마우스 버튼 클릭
	mouseup // 요소 위에 올려놓은 마우스 버튼에서 손을 뗌
	mousemove //요소에서 마우스 버튼 움직임
	mouseover //마우스 포인터를 요소 위로 옮김
	mouseout //포인터가 요소를 벗어남
	
//키보드 이벤트
	keydown //키를 누르는 동안
	keypress //키를 눌렀을 때
	keyup //키를 뗄 때

	
//폼 이벤트
	blur //포커스 잃음
	change //input, select, textarea 상태 변경
	focus // 포커스 on 
	reset //폼 리셋
	submit //제출

	
//이벤트 객체 사용 예시 매개변수로 e(이름 상관없지만 e로 함) 받아옴
	body = document.body;
	body.addEventListener("keydown", (e)=>{
		console.log(`${e.code} | ${e.key}`); 
	});
	
//이벤트 객체 프로퍼티

//공통
	type //이벤트 이름 반환
	
//키보드 객체에서만 사용
	code //KeyA, Digit6 등으로 반환
	key //A, 6 등으로 반환

//좌표
	clientX, clientY //스크롤을 무시하고 보이는 브라우저 화면 좌측 상단을 0으로 기준 이벤트 위치 
	pageX, pageY // 전체 문서를 기준으로 좌측 상단을 0으로 기준한 이벤트 위치
	offsetX, offsetY //'이벤트 대상 요소'의 좌측 상단을 0으로 기준한 위치
	screenX, screenY //자신의 '모니터' 화면 좌측 상단을 0으로 기준
	
//나머지
	altkey //이벤트 발생 시 alt누르고 있는지 여부 불리언 반환
	ctrlKey //발생 시 ctrl 누르고 있는지 불리언
	button //마우스 키값 반환
	charCode, which //keypress에서 키값 유니코드로 반환
	
// 마우스 우클릭 방지 (키보드 이벤트는 다른 키 입력 이벤트에서 따로 설정할 것)
	window.addEventListener("contextmenu", (e)=>{
		e.preventDefault();
	});
	
}

//자식 노드 접근
{
	// <div id="container">
	// 	<h1>텍스트텍스트</h1>
	// 	<img src="images/pic-1.jpg" alt="">
	// </div> 이렇게 있으면,
		
	let container = document.getElementById('container');
	
	container.childNodes //공백, 줄바꿈 등 비요소 노드 포함. 배열로 접근
	container.children // 요소 노드만 포함. 배열 접근
	// (h1,img만 나옴) img 접근 시 children[1] 사용
	
		
	
}