import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {TransformControls} from "three/examples/jsm/controls/TransformControls"
import dat from 'dat.gui'
import Input from "./Input"

export default class GameScene {
    constructor({canvas}) {
        this.canvas = canvas;
        this.init();
        this.render();
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 20, 50);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.resize();
        this.setUpEvents();
        this.setupLight();
        this.setupControl();
        this.setUpGui();
        this.setup();
        Input.init();
    }

    render() {
        this.OrbitControls.update();
        this.renderer.render(this.scene, this.camera);
        this.update();
        Input.clear();

        requestAnimationFrame( () => {
            this.render();
        });
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setUpEvents() {
        window.addEventListener('resize', ()=> {
            this.resize();
        })
    }

    setupControl() {
        this.OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    setupLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xffffff, 5000.0);
        this.pointLight.position.set(20, 80, 30);
        this.scene.add(this.pointLight);


        // this.ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
        // this.scene.add(this.ambientLight2);


        // this.pointLight2 = new THREE.PointLight(0xffffff, 900.0);
        // this.pointLight2.position.set(30, 20, 2);


        // this.scene.add(this.pointLight2);

        // this.pointTransformControl = new TransformControls(this.camera, this.renderer.domElement);
        // this.pointTransformControl.addEventListener("dragging-changed", ()=> {
        //     this.OrbitControls.enabled = !this.OrbitControls.enabled;
        // })

        // this.pointTransformControl.attach(this.pointLight);
        // this.scene.add(this.pointTransformControl);
    }

    setUpGui() {
        this.gui = new dat.GUI();

        // let ambientFolder = this.gui.addFolder("Ambient Light");
        // ambientFolder.add(this.ambientLight, "intensity", 0, 1)

        // let pointFolder = this.gui.addFolder("Point Light");
        // pointFolder.add(this.pointLight, "intensity", 0, 1000);

        // pointFolder.add(this.pointTransformControl, "visible").onChange((e) => {
        //     this.pointTransformControl.enabled = e; 
        // });
    }

}