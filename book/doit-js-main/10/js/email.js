const userEmail = document.getElementById('userEmail');
const btn = document.getElementsByTagName('button');
const result = document.getElementById('result');

btn[0].addEventListener('click', () => {
	if (userEmail.value != ""){
		let username = userEmail.value.split("@")[0];
		let domain = userEmail.value.split("@")[1];
		let trun = username.slice(0,3);
		result.insertAdjacentHTML('beforeend', `${trun}...@${domain}`);
	}
});

