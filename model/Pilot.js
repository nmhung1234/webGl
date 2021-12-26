
class Pilot {

    constructor() {

        this.mesh = new THREE.Group();

        this.pilot = this._createPilot();

        this.mesh.rotation.x = 1.5;
        this.mesh.position.set(0, 7, 5);

        this.mesh.add(this.pilot);

        this.animate();
    }

    animate() {

        TweenMax.to(this.earPivotL.rotation, 0.1, {
            x: Math.sin(-Math.PI / 3),
            repeat: Infinity,
            yoyo: true
        });


        TweenMax.to(this.earPivotR.rotation, 0.1, {
            x: -Math.PI / 2.25,
            repeat: Infinity,
            yoyo: true
        });


        TweenMax.to(this.eye.scale, 0.5, {
            y: 0.1,
            repeat: Infinity,
            yoyo: true,
            delay: 5,
            repeatDelay: 3
        });


        TweenMax.to(this.eyeb.scale, 0.5, {
            y: 0.1,
            repeat: Infinity,
            yoyo: true,
            delay: 5,
            repeatDelay: 3
        });

    }

    _createPilot() {

        const group = new THREE.Group();

        const bodyGeo = new THREE.CubeGeometry(5, 5, 5);
        bodyGeo.vertices[3].y += 0.5;
        bodyGeo.vertices[6].y += 0.5;

        const body = new THREE.Mesh(bodyGeo, BoundScene.materials.rabbit);
        body.position.y = 1;
        body.position.z = 4;

        const seatGeo = new THREE.CubeGeometry(6, 1, 6);
        const seat = new THREE.Mesh(seatGeo, BoundScene.materials.brown);
        seat.position.set(0, -2.5, 0);
        seat.rotation.set(.25, 0, 0);
        body.add(seat);

        this.earPivotL = new THREE.Object3D();
        this.earPivotL.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2.5, 0));
        this.earPivotL.rotation.x = -Math.PI / 2.25;

        this.earPivotR = this.earPivotL.clone();
        this.earPivotR.rotation.x = -Math.PI / 3;

        const earGeo = new THREE.CubeGeometry(2, 6, 0.5);
        earGeo.vertices[2].x -= 0.5;
        earGeo.vertices[3].x -= 0.5;
        earGeo.vertices[6].x += 0.5;
        earGeo.vertices[7].x += 0.5;

        const ear = new THREE.Mesh(earGeo, BoundScene.materials.rabbit);
        ear.position.x = -1.5;
        ear.position.y = 2.5;

        const earInside = new THREE.Mesh(earGeo, BoundScene.materials.pink);
        earInside.scale.set(.5, .7, .5);
        earInside.position.set(0, 0, .25);
        ear.add(earInside);

        this.earPivotL.add(ear);
        body.add(this.earPivotL);

        const ear2 = ear.clone();
        ear2.position.x = ear.position.x * -1;
        this.earPivotR.add(ear2);
        body.add(this.earPivotR);

        const eyeGeo = new THREE.CubeGeometry(0.5, 1, 0.5);
        const eye = new THREE.Mesh(eyeGeo, BoundScene.materials.gray);
        eye.position.set(1, 0.5, 2.5);
        body.add(eye);
        this.eye = eye;

        const eyeb = eye.clone();
        eyeb.position.x = eye.position.x * -1;
        this.eyeb = eyeb;
        body.add(eyeb);

        const noseGeo = new THREE.CubeGeometry(0.5, 0.5, 0.5);
        noseGeo.vertices[2].x = 0;
        noseGeo.vertices[3].x = 0;
        noseGeo.vertices[6].x = 0;
        noseGeo.vertices[7].x = 0;
        const nose = new THREE.Mesh(noseGeo, BoundScene.materials.pink);
        nose.position.set(0, -.5, 2.5);
        body.add(nose);

        const mouthGeo = new THREE.CubeGeometry(.25, 0.25, 0.5);
        const mouth = new THREE.Mesh(mouthGeo, BoundScene.materials.gray);
        mouth.position.set(0, -1.5, 2.5);
        body.add(mouth);

        group.add(body);

        BoundScene.shadowSupport(group);

        return group;
    }
}
