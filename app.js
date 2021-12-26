const BoundScene = {};

BoundScene.W = 500;
BoundScene.H = 500;

BoundScene.randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

BoundScene.materials = {
    orange: new THREE.MeshPhongMaterial({ color: 0xB7513C, flatShading: true }),
    green: new THREE.MeshPhongMaterial({ color: 0x379351, flatShading: true }),
    brown: new THREE.MeshPhongMaterial({ color: 0x5C2C22, flatShading: true }),
    pink: new THREE.MeshPhongMaterial({ color: 0xB1325E, flatShading: true }),
    gray: new THREE.MeshPhongMaterial({ color: 0x666666, flatShading: true }),
    clouds: new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
    rabbit: new THREE.MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true })
};


BoundScene.shadowSupport = group => {

    group.traverse(object => {

        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });
};


console.log('🥕🐰✈️☁️');


BoundScene.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
BoundScene.camera = new THREE.PerspectiveCamera(45, BoundScene.W / BoundScene.H, 1, 1000);
BoundScene.scene = new THREE.Scene();
BoundScene.scene.fog = new THREE.Fog(0xd5f8f8, 100, 300);

// setup renderer
BoundScene.renderer.setPixelRatio(window.devicePixelRatio);
BoundScene.renderer.setClearColor(0xc5f5f5, .7);
BoundScene.renderer.setSize(BoundScene.W, BoundScene.H);
BoundScene.renderer.shadowMap.enabled = true;
document.body.appendChild(BoundScene.renderer.domElement);

// setup camera
BoundScene.camera.position.set(40, 20, 100);
BoundScene.scene.add(BoundScene.camera);

// controls
BoundScene.controls = new THREE.OrbitControls(BoundScene.camera, BoundScene.renderer.domElement);
BoundScene.controls.minDistance = 50;
BoundScene.controls.maxDistance = 250;

function setupLights() {

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(30, 20, 0);
    directional.castShadow = true;

    BoundScene.scene.add(new THREE.AmbientLight(0xc5f5f5, 1));
    BoundScene.scene.add(directional);
};

function createFloor() {

    const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshBasicMaterial({ color: 0xe0dacd }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -100;

    BoundScene.scene.add(floor);
}

function addElements() {

    BoundScene.scene.add(new Carrot().mesh);
    BoundScene.scene.add(new Cloud({ y: -5, z: 20 }).mesh);
    BoundScene.scene.add(new Cloud({ y: 0, z: 10, delay: 1 }).mesh);
    BoundScene.scene.add(new Cloud({ y: 15, z: -10, delay: .5 }).mesh);
    BoundScene.scene.add(new Cloud({ y: -15, z: 10, delay: 2 }).mesh);
}
setupLights();
createFloor();
addElements();

BoundScene.resizeHandler = () => {

    BoundScene.W = window.innerWidth;
    BoundScene.H = window.innerHeight;

    BoundScene.renderer.setSize(BoundScene.W, BoundScene.H);
    BoundScene.camera.aspect = BoundScene.W / BoundScene.H;
    BoundScene.camera.updateProjectionMatrix();
};
window.addEventListener('resize', BoundScene.resizeHandler, false);
BoundScene.resizeHandler();

BoundScene.render = () => BoundScene.renderer.render(BoundScene.scene, BoundScene.camera);
TweenLite.ticker.addEventListener("tick", BoundScene.render);