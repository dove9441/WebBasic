class book{
	constructor(title,price){
		this.title = title;
		this.price = price;
	}
}

//프로토타입에 매서드 추가
book.prototype.buy = function(){
	console.log(`${this.title}을 ${this.price}에 구매함.`);
}

const book1 = new book("모던 자바스크립트 프로그래밍의 정석", 36000);
book1.buy();


class Textbook extends book{
	constructor(major, title, price){
		super(title, price);
		this.major = major;
	}
	buyTextbook(){
	console.log(`${this.major}, ${this.title}, ${this.price}`);
}
}



const Tbook1 = new Textbook('전공이름',"제목",20000);
Tbook1.buy();
Tbook1.buyTextbook();
