// Định nghĩa đối tượng Sea
Sea = function(){

    // tạo khối hình trụ
    // các tham số:
    // bán kính mặt trên, bán kính mặt đáy, chiều cao, số lượng phân khúc trên bán kính, số lượng phân khúc theo chiều dọc
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);
    
    
    
    // xoay trên trục X
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    
    // tạo chất liệu
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:.6,
        shading:THREE.FlatShading,
    });
    
    // Để tạo một đối tượng trong Three.js, ta phải tạo ra một lưới (mesh)
    // là sự kết hợp của một hình khối và chất liệu
    this.mesh = new THREE.Mesh(geom, mat);
    
    // Cho phép bóng đổ trên biển
    this.mesh.receiveShadow = true;
    
    }