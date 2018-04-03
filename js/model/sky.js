// Định nghĩa đối tượng Sky
Sky = function(){
	// Tạo container rỗng
	this.mesh = new THREE.Object3D();

	// chọn số  lượng đám mây rải rác trên bầu trời
	this.nClouds = 20;

	// Để phân phối các đám mây một cách nhất quán,
	// chúng ta phải đặt chúng theo một góc thống nhất
	var stepAngle = Math.PI*2 / this.nClouds;

	// tạo các đám mây
	for(var i=0; i<this.nClouds; i++){
		var c = new Cloud();

		// đặt góc xoay và vị trí của mỗi đám mây;
		// chúng ta sẽ dùng chút lượng giác
		var a = stepAngle*i; // đây là góc của đám mây
		var h = 750 + Math.random()*200; // đây là khoảng cách giữa trung điểm của trục và đám mây

		// Lượng giác!!! Hi vọng bạn vẫn còn nhớ chút Toán học :)
		// nếu không thì:
		// đơn giản là chuyển đổi tọa độ cực (góc, khoảng cách) sang tọa độ Descartes (x, y)
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// xoay đám mây theo vị trí của nó
		c.mesh.rotation.z = a + Math.PI/2;

		// để kết quả tốt hơn, ta đặt các đám mây
		// ở độ sâu ngẫu nhiên trong scene
		c.mesh.position.z = -400-Math.random()*400;

		// và cả độ phóng ngẫu nhiên cho mỗi đám mây
		var s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// đừng quên thêm lưới vào container
		this.mesh.add(c.mesh);
	}
}
