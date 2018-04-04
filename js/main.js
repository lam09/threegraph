var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	};
window.addEventListener('load', init, false);
var dataObject,nodes=[],links=[];
var balls=[],lines=[],
	sea,sky,airplane;
var myWindow;
var graph;

function loadData(){
	dataObject = JSON.parse("data/miserables.json");
	for(i=0;i<dataObject.nodes.length;i++)
		nodes.push(dataObject.nodes[i]);
	for(i=0;i<dataObject.links;i++)
		links.push(dataObject.links[i]);
}

function createGraph(){
	graph = new THREE.Object3D();

	for(i=0;i<nodes.length;i++)
	{
		var x = Math.random() * (380 - 100) + 1  //Math.random() * (max - min) + min
		var y = Math.random() * (380 - 100) + 1
		var z = Math.random() * (310 - 101) + 1
		var position=new THREE.Vector3(x, y, z);
		console.log("Generated Position is "+position.x + " "+position.y)
		var ball= new Ball(position,{color:Colors.red},nodes[i]);
		balls.push(ball);
		ball.sphere.position=new THREE.Vector3(x, y, z);
		graph.add(ball.sphere);
	}



	for(i=0;i<100;i++)
	{
		var x = Math.random() * (380 - 100) + 1  //Math.random() * (max - min) + min
		var y = Math.random() * (380 - 100) + 1
		var z = Math.random() * (310 - 101) + 1
		var position=new THREE.Vector3(x, y, z);
		console.log("Generated Position is "+position.x + " "+position.y)
		var ball= new Ball(position,{color:Colors.red},name);
		balls.push(ball);
		ball.sphere.position=new THREE.Vector3(x, y, z);
		graph.add(ball.sphere);
//		myWindow.scene.add(ball.sphere);
	}

// creating lines
	var material = new THREE.LineBasicMaterial({
		color: 0x0000ff
	});
	for(i=0;i<100;i++)
	{
		for(j=0;j<100;j++)
		{
			if(i!=j){
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
				new THREE.Vector3( balls[i].sphere.position.x,balls[i].sphere.position.y,balls[i].sphere.position.z ),
				new THREE.Vector3( balls[j].sphere.position.x,balls[j].sphere.position.y,balls[j].sphere.position.z),
				);
	
			var line = new THREE.Line( geometry, material );
			graph.add(line);
			}
		}
	}

	myWindow.scene.add(graph);
}

// Khởi tạo và thêm vào scene
function createSea(){
sea = new Sea();

// đặt vị trí phía dưới scene
sea.mesh.position.y = -600;

// thêm lưới này vào scene
//myWindow.scene.add(sea.mesh);
}

// Bây giờ ta khởi tạo bầu trời và đẩy tâm của nó
// về phía dưới màn hình một chút

function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -600;
//	myWindow.scene.add(sky.mesh);
}

function createPlane(){
	airplane = new AirPlane();
	airplane.myWindow=myWindow;
	airplane.mesh.scale.set(.25,.25,.25);
	airplane.mesh.position.y = 100;
//	myWindow.scene.add(airplane.mesh);
}

function init(event){
	console.log("init event");
	myWindow=new MyWindow();
	myWindow.createScene();
	myWindow.createLights();
	createPlane();
	createSea();
	createSky();
	createGraph();
	//createLines();
	//thêm listener
	window.addEventListener('resize', handleWindowResize, false);
	document.addEventListener('mousemove', airplane.handleMouseMove, false);

	loop();
}

function handleWindowResize() {
	// cập nhật lại kích thước của renderer và camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	myWindow.renderer.setSize(WIDTH, HEIGHT);
	myWindow.camera.aspect = WIDTH / HEIGHT;
	myWindow.camera.updateProjectionMatrix();
}

function loop(){
	sea.mesh.rotation.z += .05;
//	sky.mesh.rotation.z += .01;
	// cập nhật máy bay trong mỗi khung hình
//	airplane.updatePlane();
	for(i=0;i<balls.length;i++){
		balls[i].update();
	}
	graph.rotation.y +=0.01;
	myWindow.renderer.render(myWindow.scene, myWindow.camera);
	requestAnimationFrame(loop);
}

