import GameScene from "./GameScene";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Input from "./Input";

let cubeTexture = [
    'cubemap_px.png',
    'cubemap_nx.png',
    'cubemap_py.png',
    'cubemap_ny.png',
    'cubemap_pz.png',
    'cubemap_nz.png'
];

export default class FPSScene extends GameScene {
    setupGround(size) {
        const groundTexture = new THREE.TextureLoader().load("/texture/grass2.jpg");
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        let tSize = size * 0.09;
        groundTexture.repeat.set(tSize, tSize);
        this.groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(size, size),
            new THREE.MeshStandardMaterial({
                map: groundTexture
            })
        );
        this.groundMesh.rotateX(-Math.PI * 0.5);
        this.scene.add(this.groundMesh);
    }

    setup() {
        this.ambientLight.intensity = 3.0;
        this.clock = new THREE.Clock();
        this.mixer = null;

        const environmentTexture = new THREE.CubeTextureLoader().load(cubeTexture,
            (texture) => {
                this.scene.background = texture;

                this.OrbitControls.enabled = true;
                this.OrbitControls.enableZoom = false;
                this.OrbitControls.maxPolarAngle = Math.PI * 0.49;
                this.OrbitControls.minPolarAngle = Math.PI * 0.49;

                let size = 3000;
                this.setupGround(size);

                const gltfLoader = new GLTFLoader();
                gltfLoader.load("model_all.glb", (model) => {
                    let mesh = model.scene;
                    this.player = mesh;
                    mesh.position.set(80, 5, 40);
                    this.camera.position.set(mesh.position.x, mesh.position.y + 3, mesh.position.z - 50);

                    let scale = 15;
                    mesh.scale.set(scale, scale, scale);
                    this.scene.add(mesh);

                    this.mixer = new THREE.AnimationMixer(mesh);
                    this.clips = model.animations;

                    this.animations = {
                        idle: this.mixer.clipAction(this.clips[0]),
                        jump: this.mixer.clipAction(this.clips[1]),
                        run: this.mixer.clipAction(this.clips[2]),
                        walk: this.mixer.clipAction(this.clips[3])
                    }
                    this.animations.idle.play();
                });
            },
        );

        // Log if the CubeTextureLoader is falling back to single texture
        if (!environmentTexture.isCubeTexture) {
            console.warn('CubeTextureLoader: Fallback to single texture');
        }
    }

    update() {
        if (this.mixer) {
            let d = this.clock.getDelta();
            this.mixer.update(d);
            this.OrbitControls.target = this.player.position.clone().add({x: 0, y: 40, z: 0});
            this.player.rotation.set(0, this.OrbitControls.getAzimuthalAngle() + Math.PI, 0);
        }

        if(Input.keyUp) {
            if(Input.keyUp.keyCode == 38 || Input.keyUp.keyCode == 87 || Input.keyUp.keyCode == 32 || Input.keyUp.keyCode == 82) {
                console.log(Input.keyUp);
                if(!this.animations.idle.isRunning()) {
                    this.animations.idle.play();
                    this.animations.run.stop();
                    this.animations.walk.stop();
                    this.animations.jump.stop();
                }
            }
        }

        if(Object.keys(Input.keyDown).length > 0) {
             if(Input.keyDown[87]) {
                if(!this.animations.walk.isRunning()) {
                    this.animations.idle.stop();
                    this.animations.walk.play();
                    this.animations.run.stop();
                    this.animations.jump.stop();
                }
                this.player.translateZ(0.3);
                this.camera.translateZ(-0.3);
            }

            else if(Input.keyDown[82]) {
                console.log(Input.keyUp);
                if(!this.animations.run.isRunning()) {
                    this.animations.idle.stop();
                    this.animations.run.play();
                    this.animations.jump.stop();
                    this.animations.walk.stop();
                }
                this.player.translateZ(2.0);
                this.camera.translateZ(-2.0);
            }

            else if(Input.keyDown[32]) {
                console.log(Input.keyUp);
                if(!this.animations.jump.isRunning()) {
                    this.animations.idle.stop();
                    this.animations.run.stop();
                    this.animations.jump.play();
                    this.animations.walk.stop();
                }
                this.player.translateZ(3.5);
                this.camera.translateZ(-3.5);
            }
        }
    }
}


