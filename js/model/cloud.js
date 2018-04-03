Cloud = function(){
	// Tạo một container rỗng để chứa các phần của đám mây
	this.mesh = new THREE.Object3D();

	// tạo khối lập phương;
	// khối này sẽ được nhân ra để tạo ra các đám mây
	var geom = new THREE.BoxGeometry(20,20,20);

	// tạo chất liệu; chất liệu màu trắng là đủ
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.white,
	});

	// nhân hình khối lên một số ngẫu nhiên lần
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){

		// tạo lưới từ hình khối
		var m = new THREE.Mesh(geom, mat);

		// đặt vị trí và góc quay của mỗi khối ngẫu nhiên
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

		// đặt kích thước của khối ngẫu nhiên
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);

		// cho phép mỗi khối phủ và nhận bóng đổ
		m.castShadow = true;
		m.receiveShadow = true;

		// thêm khối vào container
		this.mesh.add(m);
	}
}