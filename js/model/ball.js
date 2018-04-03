 Ball = function(){
	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.sphere = new THREE.Mesh( geometry, material );
    console.log("Sphere postition " + this.sphere.position.x + " " + this.sphere.position.y + " "+this.sphere.position.z + " ")   
}

