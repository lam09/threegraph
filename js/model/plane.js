 var AirPlane = function() {
    
    this.mesh = new THREE.Object3D();
    
    // Tạo cabin
    var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
    var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
    
    // Tạo động cơ
    var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
    var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
    
    // Tạo đuôi
    var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
    var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35,25,0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
    
    // Tạo cánh
    var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
    var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
    
    // phần quạt
    var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
    var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
    
    // cánh quạt
    var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
    var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
    
    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);

    
    
    document.addEventListener('mousemove', this.handleMouseMove, false);
    var mousePos={x:0, y:0};
    this.handleMouseMove=function(event){
        console.log("handleMouseMove event");

    // ở đây chúng ta đang chuyển đổi giá trị vị trí chuột nhận được
	// đến một giá trị chuẩn hoá giữa -1 và 1;
	// đây là công thức cho trục ngang:

	var tx = -1 + (event.clientX / myWindow.WIDTH)*2;

	// với trục dọc, chúng ta cần phải đảo ngược công thức
	// vì trục tung 2D đi theo hướng ngược lại trục tung 3D

	var ty = 1 - (event.clientY / myWindow.HEIGHT)*2;
	mousePos = {x:tx, y:ty};
    }
    this.updatePlane=function(){
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

    };
    
    function normalize(v,vmin,vmax,tmin, tmax){

        var nv = Math.max(Math.min(v,vmax), vmin);
        var dv = vmax-vmin;
        var pc = (nv-vmin)/dv;
        var dt = tmax-tmin;
        var tv = tmin + (pc*dt);
        return tv;
    
    }