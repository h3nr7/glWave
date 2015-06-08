
let THREE = require('three');
let SimpleLines = require('pages/SimpleLines');
let simpleLinesVs = require('shaders/simpleLinesVs');
let simpleLinesFs = require('shaders/simpleLinesFs');

class example {

	constructor() {
		console.log('example begins');
		this.animate = this.animate.bind(this);
		this.sLines = new SimpleLines();
		this.init();
		this.animate();
	}

	init() {
		this.sLines.init()

		this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0, 10000 );
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();

		this.attributes = {}

		this.uniforms = {}

		shaderMaterials = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			attributes: this.attribues,
			vertexShader: simpleLinesVs,
			fragmentShader: simpleLinesFs,
			blending: THREE.AddativeBlending,
			depthTest: false,
			transparent: true
		});
	}	

	animate() {

		requestAnimationFrame(this.animate);

		this.sLines.render();

	}
}


new example();