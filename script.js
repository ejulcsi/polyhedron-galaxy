if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera,
    scene,
    light,
    mesh,
    renderer,
    mouseX = 0,
    mouseY = 0,
    meshes = [];

init();

function init() {
    camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 4000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.add(camera);

    light = new THREE.AmbientLight( 0xf4f4f4 );
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000012);

    document.body.appendChild(renderer.domElement);

    makeMeshes();

    document.addEventListener('mousemove', onMouseMove, false);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    updateMeshes();
    renderer.render(scene, camera);
}

function makeMeshes() {
    var material,
        icosa,
        dodeca,
        octa,
        geometry,
        shapes,
        zpos;


    icosa = new THREE.IcosahedronGeometry(5, 0);
    dodeca = new THREE.DodecahedronGeometry(5, 0);
    octa = new THREE.OctahedronGeometry(5, 0);

    shapes = [icosa, dodeca, octa];


    for (zpos = -1000; zpos < 1000; zpos += 20) {
        material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, wireframe: true, wireframeLinewidth: 2});
        geometry = shapes[Math.floor(Math.random()*shapes.length)];
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1000 - 500;
        mesh.position.y = Math.random() * 1000 - 500;
        mesh.position.z = zpos;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 10;

        scene.add(mesh);
        meshes.push(mesh);
    }
}

function updateMeshes() {
    var i;

    for (i = 0; i < meshes.length; i++) {
        mesh = meshes[i];
        mesh.position.z += mouseY * 0.1;
        mesh.rotation.x = Date.now() * 0.0005;
        mesh.rotation.y = Date.now() * 0.00025;

        if (mesh.position.z > 1000) {
            mesh.position.z -= 2000;
        }
    }
}

function onMouseMove( event ) {
    // store the mouseX and mouseY position
    mouseX = event.clientX;
    mouseY = event.clientY;
}

