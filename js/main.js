var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	};
window.addEventListener('load', init, false);
//window.addEventListener('rerender', rerender, false);


var dataObject;//,

var balls=[],lines=[],
	sea,sky,airplane;
var myWindow;
var graph;
var config={
	type:"cube",
	color:"red"
};
function loadData(){
	var loader = new THREE.FileLoader();

//load a text file and output the result to the console
loader.load(
	// resource URL
	'data/miserables.json',

	// onLoad callback
	function ( data ) {
		
		// output the text to the console
	//	console.log( data )
		dataObject=JSON.parse(data);
		
		createGraph(dataObject,config);
		/*nodes = dataObject.nodes;
		links = dataObject.links;
		console.log(nodes[1].id);*/
		//console.log(links);
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);



}

function createGraph(data,config){

	graph=new ThreeForceGraph()
		.graphData(data);
/*	graph = new THREE.Object3D();

	var nodes=data.nodes;
	var links=data.links;
	
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
*/
	
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
	loadData();
	createPlane();
	createSea();
	createSky();
	//myWindow.camera.lookAt(graph.position);
   // myWindow.camera.position.z = Math.cbrt(N) * 100;
    // Add camera controls
    const tbControls = new TrackballControls(myWindow.camera, myWindow.renderer.domElement);
    // Kick-off renderer
    (
		function animate() { // IIFE
      	graph.tickFrame();
      // Frame cycle
      	tbControls.update();
      myWindow.renderer.render(myWindow.scene, myWindow.camera);
      requestAnimationFrame(animate);
    })();
	//createGraph(dataObject);
	//createLines();
	//thêm listener
	window.addEventListener('resize', handleWindowResize, false);
	document.addEventListener('mousemove', handleMouseMove, false);

	document.addEventListener( 'mousedown', mouseDown, false );
	document.addEventListener( 'mousedown', mouseUp, false );

	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
	loop();
}
	var mousePos={x:0, y:0};
	var isMouseDown=false;
    function handleMouseMove(event){
        console.log("handleMouseMove event");
	var tx = -1 + (event.clientX / myWindow.WIDTH)*2;
	var ty = 1 - (event.clientY / myWindow.HEIGHT)*2;
	//move graph 
	if(isMouseDown){
		graph.position.x += (tx-mousePos.x);
		graph.position.y += (ty-mousePos.y);
	}
	mousePos = {x:tx, y:ty};
	}
	
function mouseDown(){
	isMouseDown=true;
	console.log("mouse down action")

	//get mouse position
	var tx = -1 + (event.clientX / myWindow.WIDTH)*2;

	// với trục dọc, chúng ta cần phải đảo ngược công thức
	// vì trục tung 2D đi theo hướng ngược lại trục tung 3D

	var ty = 1 - (event.clientY / myWindow.HEIGHT)*2;
	mousePos = {x:tx, y:ty};

}
function mouseUp(){
//	isMouseDown=false;
	console.log("mouse Up action")
	myWindow.camera.position.x--;
}
function onDocumentMouseWheel(event){
	//myWindow.camera.position.z+=10;
	console.log("mouse wheel action");
	var fovMAX = 600;
    var fovMIN = 1;

    myWindow.camera.fov -= event.wheelDeltaY * 0.05;
    myWindow.camera.fov = Math.max( Math.min( myWindow.camera.fov, fovMAX ), fovMIN );
   // myWindow.camera.projectionMatrix = new THREE.Matrix4().makePerspective(myWindow.camera.fov, window.innerWidth / window.innerHeight, myWindow.camera.near, myWindow.camera.far);
	myWindow.camera.updateProjectionMatrix();

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
	//graph.rotation.y +=0.01;
	myWindow.renderer.render(myWindow.scene, myWindow.camera);
	requestAnimationFrame(loop);
}

function rerender(){
	console.log("rerender graph")
	var type= document.getElementById("graph_type");
	config['type'] = type.options[type.selectedIndex].value;
	var color=document.getElementById("graph_color");
	config['color'] = color.options[color.selectedIndex].value;
	console.log(config['type'] + " " + config['color'])
	createGraph(dataObject,config);
}