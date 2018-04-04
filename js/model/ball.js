 Ball = function(position,color,node){
     //console.log("Position is "+position.x + " "+position.y)
	var geometry = new THREE.SphereGeometry( 5, 64, 64 );
    //var material = new THREE.MeshBasicMaterial( color );
    var material =  new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});
    this.sphere = new THREE.Mesh( geometry, material );
    this.sphere.position.set(position.x,position.y,position.z)
    this.node=node;

    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;

//    this.sphere.position=position;
    //console.log("Sphere postition " + this.sphere.position.x + " " + this.sphere.position.y + " "+this.sphere.position.z + " ")   
    this.update = function(){
//        this.sphere.position.x--;
        this.sphere.rotation.z += 1;
        //console.log("ball update");
    }
}

