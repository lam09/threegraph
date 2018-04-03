MyWindow =  function(){
    var scene,
	camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;
    this.createScene=function createScene() {
        // Lấy ra width và height của màn hình,
        // dùng để cài đặt tỉ lệ khung hình (aspect ratio) cho camera
        // và size của renderer.
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
    
        // Tạo scene
        this.scene = new THREE.Scene();
    
        // Thêm hiệu ứng sương mù vào scene, cùng màu với
        // màu nền đã style trước đó
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    
        // Tạo camera
        aspectRatio = this.WIDTH / this.HEIGHT;
        fieldOfView = 60;
        nearPlane = 1;
        farPlane = 10000;
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
    
        // Đặt vị trí cho camera
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = 100;
    
        // Tạo renderer
        this.renderer = new THREE.WebGLRenderer({
            // Cho phép trong suốt để hiển thị màu nền
            // đã định nghĩa trong CSS
            alpha: true,
    
            // Bật khử răng cưa; hiệu năng sẽ giảm
            // nhưng sẽ ổn thôi vì project này ít đối tượng
            antialias: true
        });
    
        // Xác định kích cỡ của renderer; trong trường hợp này,
        // là full toàn màn hình
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
        // Cho phép render bóng đổ
        this.renderer.shadowMap.enabled = true;
    
        // Thêm DOM của renderer vào
        // container ta đã tạo trong HTML
        this.container = document.getElementById('world');
        this.container.appendChild(this.renderer.domElement);
    
        renderer=this.renderer;
        // Nếu người dùng resize trình duyệt
        // cần cập nhật lại camera và size của renderer
        //window.addEventListener('resize', handleWindowResize, false);
    }
   // var windowWidth,windowHeight;
    this.handleWindowResize=function () {
        // cập nhật lại kích thước của renderer và camera
        //console.log("handleWindowResize event");
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        console.log("handleWindowResize event "+HEIGHT + " '" + WIDTH);

       /* this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();*/
        updateRenderer();
    }
    function updateRenderer(){
        this.renderer.setSize(WIDTH, HEIGHT);
        this.camera.aspect = WIDTH / HEIGHT;
        this.camera.updateProjectionMatrix();
    }
    var hemisphereLight, shadowLight;
    
    this.createLights=function createLights() {
        // Nguồn sáng bán cầu là loại có màu tô chuyển (gradient)
        // tham số đầu tiên là màu trời, thứ 2 là màu đất,
        // thứ 3 là cường độ ánh sáng
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9)
    
        // Nguồn sáng có hướng tỏa ra từ 1 vị trí nhất định
        // Nó giống như mặt trời, nghĩa là các tia được tạo ra song song với nhau.
        shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    
        // Đặt vị trí cho nguồn sáng
        shadowLight.position.set(150, 350, 350);
    
        // Cho phép phủ bóng
        shadowLight.castShadow = true;
    
        // cài đặt vùng nhìn thấy của bóng đổ
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;
    
        // cài đặt độ phân giải của bóng đổ; càng cao càng đẹp,
        // nhưng cũng càng nặng nề hơn
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;
    
        // thêm vào scene để kích hoạt
        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
    }
    
}