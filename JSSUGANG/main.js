
var cridApp=new function(){
	//수강 데이터를 담을 json형식의 배열 만들기(배열은 대괄호)
	this.myClass=[
		{ID:'20317', className: '데이터분석', category:'전공필수',credit:3},
		{ID:'10112', className: '컴퓨터공학개론', category:'전공선택',credit:3},
		{ID:'10341', className: '정치의이해', category:'교양필수',credit:3},
	];
	//선택할 수 있는 항목들 미리 정의
	this.category=['전공필수','전공선택','교양필수','교양선택'];
	
	//table header (th)에 담길 데이터를 확장성을 위해 배열에 담기
	this.colTh = [];
	
	//테이블 만들어주는 메서드
	this.createTable = () => {
		//테이블을 만들고 데이터 채우기
		
		
		//col에 th에 해당하는 데이터(myClass의 key값을 넣어주는 코드)
		//빈 배열에 myClass 객체의 key값을 넣어야 함
		for(let i=0; i<this.myClass.length;i++){
			//각 객체들 속 key값 순회
			for(let key in this.myClass[i]){ //for in 은 기본적으로 객체의 키값에 접근한다
				//key를 colth배열에 담기 (colTh에 이미 있는 것은 넣으면 안되므로 if사용)
				//indexOf : 문자열 속의 문자열 검색. 처음으로 나타나는 인덱스 반환. 없으면 -1 반환.
				if(this.colTh.indexOf(key) == -1){
					this.colTh.push(key);
				}
			}
		}
		var table = document.createElement('table');
		table.setAttribute('id','classTable'); //table 요소에 classTable이라는 id 추가 (속성명 = 값)
		
		//tr: 새로운 행 추가
		var tr = table.insertRow(-1);  //파라미터에다 -1 넣으면 마지막 행에다가 행을 추가함.
		
		//th 작성
		for(let i=0; i<this.colTh.length;i++){
			var th=document.createElement('th');
			th.innerHTML=this.colTh[i];
			tr.appendChild(th);
		}
		
		
		//td 작성
		for(let i=0;i<this.myClass.length;i++){
			tr=table.insertRow(-1);
			// Th 순회하며 맞는 데이터 가져오기
			for(let j=0;j<this.colTh.length;j++){
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = this.myClass[i][this.colTh[j]]; 
				//myClass[i]는 이런 객체이다.
				//{ID:'20317', className: '데이터분석', category:'전공필수',credit:3},
				//colTh는 id, classname, category가 들어가 있다.
				//여기서 슬라이싱으로 또 col[j]라는 이름을 가진 것의 값(value)를 가져온다. 
				
			}
			//버튼 만들기
			//수정 버튼 만들기
			this.td = document.createElement('td'); //td는 열이다.
			//정의하는 것. 객체의 멤버는 var등으로 선언 x
			//오른쪽에 있는 버튼을 테이블 속에 넣는 것이다.
			tr.appendChild(this.td);
			var btnUpdate = document.createElement('input');
			
			btnUpdate.setAttribute('type','button');
			btnUpdate.setAttribute('value', 'Update');
			btnUpdate.setAttribute('id','Edit'+i);
			btnUpdate.setAttribute('style','background-color:#44CCEB');
			btnUpdate.setAttribute('onclick','cridApp.Update(this)')
			this.td.appendChild(btnUpdate);
			
			//저장 버튼 만들기
			tr.appendChild(this.td);
			var btnSave = document.createElement('input');
			
			btnSave.setAttribute('type','button');
			btnSave.setAttribute('value', 'Save');
			btnSave.setAttribute('id','Save'+i);
			btnSave.setAttribute('style','display:none;');
			btnSave.setAttribute('onclick','cridApp.Save(this)')
			this.td.appendChild(btnSave);
			
			//삭제 버튼 만들기
			tr.appendChild(this.td);
			var btnDelete = document.createElement('input');
			
			btnDelete.setAttribute('type','button');
			btnDelete.setAttribute('value', 'Delete');
			btnDelete.setAttribute('id','Delete'+i);
			btnDelete.setAttribute('style','background-color:#ED5650');
			btnDelete.setAttribute('onclick','cridApp.Delete(this)')
			this.td.appendChild(btnDelete);
		}	
		
		//추가 행 만들기
		
		tr=table.insertRow(-1);
		for(let i=0;i<this.colTh.length;i++){
			var newCell=tr.insertCell(-1);
			if(i==2){
				var select=document.createElement('select');
				//기본값은 아무것도 없게
				select.innerHTML = '<option value="" selected></option>';
				for(let k=0;k<this.category.length;k++){
					select.innerHTML = select.innerHTML + `<option value=${this.category[k]}>${this.category[k]}</option>`
				}
			newCell.appendChild(select); //newCell은 기본적으로 행 만들고 select 안에 select 태그와 안의 html 요소 가짐
			}else{
				var textInput=document.createElement('input');
				textInput.setAttribute('type','text');
				textInput.setAttribute('value','');
				newCell.appendChild(textInput);
			}
			
		
		}
		//추가 버튼 만들기
		this.td=document.createElement('td');
		tr.appendChild(this.td);
		var btnCreate=document.createElement('input');
		btnCreate.setAttribute('type','button');
		btnCreate.setAttribute('value', 'Create');
		btnCreate.setAttribute('id','Create');
		btnCreate.setAttribute('style','background-color:#207DDE');
		btnCreate.setAttribute('onclick','cridApp.Create(this)');
		this.td.appendChild(btnCreate);
		
		var div=document.getElementById('container');
		div.innerHTML='CRUD (Create, Retrieve, Update, Delete)';
		div.appendChild(table);
	}
	//삭제 메서드
	this.Delete = (clicked) => {
		//.parentNode는 부모 요소를 가져온다. clicked의 요소는 input 태그이고, 그 부모는 td이다. 행을 한 번에 지우기 위해 tr 데이터가 필요하므로 parentNode를 두 번 써준다.
		let targetIndex = clicked.parentNode.parentNode.rowIndex; //rowindex는 테이블 내부에서 사용되며, 테이블 행번호를 가져온다. 
		//삭제 방법: myClass의 내부 객체 자체를 지워버리면 됨.
		this.myClass.splice((targetIndex-1),1); //splic(인덱스 또는 값 (array[i] 이용), (지울 개수), (추가할 내용), (추가할 내용) ... )
		this.createTable();
	}
	
	this.Create = (clicked) => {
		let targetIndex = clicked.parentNode.parentNode.rowIndex;
		let tableData = document.getElementById('classTable').rows[targetIndex]; //.rows[인덱스] 는 테이블 요소의 해당 인덱스 row에 있는 요소가 반환
		var newObj={};
		var finish = true;
		for(let i=0;i<this.colTh.length;i++){
			var td=tableData.getElementsByTagName('td')[i]; //Elements임에 주의
			if(true){
				//childNodes[0]이라는 것이 하위 노드의 첫 번째 요소를 말하는 것이다. 어차피 td 안에 input 태그 하나밖에 없어서 별 의미는 없다.
				var newVal = td.childNodes[0].value; //인덱스를 명시해줘야 하나보다.
				//새로운 객체 데이터 생성
				if(newVal!=""){
					newObj[this.colTh[i]] = newVal;
				}else{
					newObj = '';
					alert("모든 항목을 입력하세요");
					finish=false;
					break;
				}
			}
			
		}
		if(finish){
			this.myClass.push(newObj);
			this.createTable();
		}
	}
	
	this.Update = (clicked) =>{
		let targetIndex=clicked.parentNode.parentNode.rowIndex;
		let tableData = document.getElementById('classTable').rows[targetIndex];
		
		//기존에 입력한 데이터들을 가지고 오기
		for(let i=0;i<this.colTh.length;i++){
			//기존에 입력한 데이터들을 담은 새로운 input/select를 띄워주기
			if(i == 2){
				var td = tableData.getElementsByTagName('td')[i];
				var select = document.createElement('select');
				//기본 option을 띄워주기
				select.innerHTML = `<option value = "${td.innerText}">${td.innerText}</option>`;
				 
				//새로운 입력값
				for(let j=0 ; j<this.category.length; j++){
					//셀렉트 option 선택지를 다시 한 번 써주는 것이다.
					select.innerHTML = select.innerHTML + `<option value ="${this.category[j]}">${this.category[j]}</option>`;
				}
				td.innerText="";
				td.appendChild(select); 	
			}else{
				var td = tableData.getElementsByTagName('td')[i];
				var input = document.createElement('input');
				input.setAttribute('type','text');
				input.setAttribute('value',td.innerText);
				td.innerText ="";
				td.appendChild(input);
			}
		}
		var btnSave = document.getElementById('Save' + (targetIndex-1));
		btnSave.setAttribute('style', 'display:block; background-color: #2DBF64;');
		clicked.setAttribute('style' ,'display: none;');
	}
	
	//Save 메서드
	this.Save = (clicked)=>{
		let targetIndex = clicked.parentNode.parentNode.rowIndex;
		let tableData = document.getElementById('classTable').rows[targetIndex];
		
		// 새롭게 입력된 값으로 myClass 갱신
		for(let i =0;i<this.colTh.length;i++){
			var td = tableData.getElementsByTagName('td')[i];
			this.myClass[targetIndex-1][this.colTh[i]]=td.childNodes[0].value;
			//td의 첫 번째 하위 요소 (어차피 input 하나밖에 없지만)의 값
		}
	
		var btnUpdate = document.getElementById('Edit'+(targetIndex-1));
		btnUpdate.setAttribute('style','display: block; background-color:#44CCEB;');
		clicked.setAttribute('style','display:none;')
		this.createTable();
	}
	
	
	

}
cridApp.createTable();