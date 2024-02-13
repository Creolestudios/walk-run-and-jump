import GameScene from "./GameScene";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


export default class GroundScene extends GameScene {
    setup() {
        this.clock = new THREE.Clock();
        this.mixer = null;
        // const groundGeometry = new THREE.PlaneGeometry(200, 200);
        // const groundMaterial = new THREE.MeshStandardMaterial({
        //     side: THREE.DoubleSide
        // });
        // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        // ground.rotateX(Math.PI * 0.5);
        // this.scene.add(ground);

        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.load('dragon_gold.glb', (obj) => {
            this.scene.add(obj.scene)
        });

        this.gltf2Loader = new GLTFLoader();
        this.gltf2Loader.load('dragon_gold.glb', (model) => {
            let newObj = model.scene;
            newObj.scale.set(250, 250, 250);
            newObj.position.set(30, 5, 2);
            console.log(model);
            this.mixer = new THREE.AnimationMixer(newObj);
            this.clips = model.animations;
            this.scene.add(newObj);

            const clip = THREE.AnimationClip.findByName(this.clips, 'RideFlyRun');
            const action = this.mixer.clipAction(clip);
            action.play();
        });
    }

    update() {
        if(this.mixer) {
            let d = this.clock.getDelta();
            this.mixer.update(d);
        }
    }
}