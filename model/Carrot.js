class Carrot {
    constructor() {


        this.mesh = new THREE.Group();

        this.body = this._createBody();
        this.wings = this._createWings();
        this.leafs = this._createLeafs();
        this.pilot = new Pilot();

        this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);

        this.mesh.add(this.body);
        this.mesh.add(this.wings);
        this.mesh.add(this.leafs);
        this.mesh.add(this.pilot.mesh);

        this.animate();
    }

    animate() {

        TweenMax.to(this.mesh.position, 1, {
            x: -2,
            y: 4,
            repeat: Infinity,
            yoyo: true,
            ease: Sine.easeInOut
        });


        TweenMax.to(this.mesh.rotation, 1, {
            x: -1.7,
            repeat: Infinity,
            yoyo: true,
            ease: Sine.easeInOut
        });


        TweenMax.to(this.leafs.rotation, 0.1, {
            y: Math.PI,
            repeat: Infinity,
            ease: Power0.easeNone
        });

    }

    _createBody() {

        const group = new THREE.Group();

        const bodyGeom = new THREE.CylinderGeometry(5, 2, 25);
        bodyGeom.vertices[16].y += 3;
        bodyGeom.vertices[17].y -= 2;

        group.add(new THREE.Mesh(bodyGeom, BoundScene.materials.orange));

        BoundScene.shadowSupport(group);

        return group;
    }

    _createWings() {

        const group = new THREE.Group();
        const geometry = new THREE.CubeGeometry(7, 7, 0.5);

        geometry.vertices[2].y += 2;
        geometry.vertices[3].y += 2;
        geometry.vertices[2].x -= 1;
        geometry.vertices[3].x -= 1;

        const wingR = new THREE.Mesh(geometry, BoundScene.materials.brown);
        wingR.position.x = 6;
        wingR.position.y = 2;
        wingR.position.z = 1;

        const wingL = wingR.clone();
        wingL.position.x = -6;
        wingL.rotation.y = Math.PI;

        group.add(wingR);
        group.add(wingL);

        BoundScene.shadowSupport(group);

        return group;
    }

    _createLeafs() {

        const group = new THREE.Group();
        const geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);

        geometry.vertices[8].y += 0.5;

        const leafA = new THREE.Mesh(geometry, BoundScene.materials.green);
        leafA.position.y = 16;

        const leafB = leafA.clone();
        leafB.position.x = -1.75;
        leafB.position.y = 15;
        leafB.rotation.z = 0.4;

        const leafC = leafB.clone();
        leafC.position.x = leafB.position.x * -1;
        leafC.rotation.z = leafB.rotation.z * -1;

        group.add(leafA);
        group.add(leafB);
        group.add(leafC);

        BoundScene.shadowSupport(group);

        return group;
    }
}
