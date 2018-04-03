var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	};
window.addEventListener('load', init, false);

function init() {
	// cài đặt scene, camera, và renderer
	myWindow=new myWindow();
	myWindow.createScene();
	// thêm ánh sáng
	myWindow.createLights();
	// thêm các đối tượng
	createPlane();
	createSea();
	createSky();
	createBall();

	// bắt đầu vòng lặp cập nhật vị trí các đối tượng
	// và render scene trong mỗi khung hình
	loop();
}

var ball, sea,sky,airplane;
var myWindow;
function createBall(){
	ball= new Ball();
	ball.sphere.position.x=0;
	myWindow.scene.add(ball.sphere);
}
// Khởi tạo và thêm vào scene
function createSea(){
sea = new Sea();

// đặt vị trí phía dưới scene
sea.mesh.position.y = -600;

// thêm lưới này vào scene
myWindow.scene.add(sea.mesh);
}

// Bây giờ ta khởi tạo bầu trời và đẩy tâm của nó
// về phía dưới màn hình một chút

function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -600;
	myWindow.scene.add(sky.mesh);
}

function createPlane(){
	airplane = new AirPlane();
	airplane.myWindow=myWindow;
	airplane.mesh.scale.set(.25,.25,.25);
	airplane.mesh.position.y = 100;
	myWindow.scene.add(airplane.mesh);
}
function loop(){
	// Xoay cánh quạt, biển và bầu trời
	airplane.propeller.rotation.x += 0.3;
	sea.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;
	ball.sphere.position.y++;
	// render the scene
	myWindow.renderer.render(myWindow.scene, myWindow.camera);

	// gọi hàm lặp lại
	requestAnimationFrame(loop);
}

function init(event){
	myWindow=new MyWindow();
	myWindow.createScene();
	myWindow.createLights();
	createPlane();
	createSea();
	createSky();
	createBall();

	//thêm listener
	window.addEventListener('resize', myWindow.handleWindowResize, false);
	document.addEventListener('mousemove', airplane.handleMouseMove, false);

	loop();
}
/*var mousePos={x:0, y:0};

// xử lý sự kiện mousemove

function handleMouseMove(event) {

	// ở đây chúng ta đang chuyển đổi giá trị vị trí chuột nhận được
	// đến một giá trị chuẩn hoá giữa -1 và 1;
	// đây là công thức cho trục ngang:

	var tx = -1 + (event.clientX / myWindow.WIDTH)*2;

	// với trục dọc, chúng ta cần phải đảo ngược công thức
	// vì trục tung 2D đi theo hướng ngược lại trục tung 3D

	var ty = 1 - (event.clientY / myWindow.HEIGHT)*2;
	mousePos = {x:tx, y:ty};

}*/
function loop(){
	sea.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;
	ball.sphere.position.z++;
	// cập nhật máy bay trong mỗi khung hình
	airplane.updatePlane();
//	updatePlane();
	myWindow.renderer.render(myWindow.scene, myWindow.camera);
	requestAnimationFrame(loop);
}
/*
function updatePlane(){

	// di chuyển máy bay trong khoảng -100 tới 100 trên trục ngang,
	// và từ 25 đến 175 trên trục dọc,
	// tùy thuộc vào vị trí chuột trong khoảng từ -1 đến 1 trên cả hai trục;
	// để làm điều đó chúng ta sử dụng một hàm chuẩn hoá (bên dưới)

	var targetX = normalize(mousePos.x, -1, 1, -100, 100);
	var targetY = normalize(mousePos.y, -1, 1, 25, 175);

	// cập nhật vị trí máy bay
	airplane.mesh.position.y = targetY;
	airplane.mesh.position.x = targetX;
	airplane.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

*/
