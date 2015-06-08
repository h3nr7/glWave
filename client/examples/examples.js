
let THREE = require('three');

class example {

	constructor() {
		console.log('example begins');
		this.animate = this.animate.bind(this);
		this.counter = 0;

		this.init();
		this.animate();
	}

	init() {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
		this.camera.position.z = 300;

		this.scene = new THREE.Scene();

		let geom = new THREE.SphereGeometry(50, 16, 16);
		let material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
		this.mesh = new THREE.Mesh( geom, material );

		this.scene.add(this.mesh);
		this.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('test') });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	animate() {

		requestAnimationFrame(this.animate);

		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.02;

		this.renderer.render( this.scene, this.camera );
	}
}


new example();