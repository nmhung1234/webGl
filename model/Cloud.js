class Cloud {
    constructor(config) {

        this.mesh = new THREE.Group();

        const cloud = this._createCould();

        this.mesh.position.x = 200;
        this.mesh.position.y = config.y || Math.random();
        this.mesh.position.z = config.z || 0;

        this.mesh.add(cloud);

        this.animate(config);
    }

    animate(config) {

        TweenMax.to(this.mesh.position, 3.5, {
            x: -200,
            repeat: Infinity,
            delay: config.delay || 0,
            onRepeat: () => {

                this.mesh.position.y = BoundScene.randomIntFromInterval(-10, 20);
            }
        });

    }

    _createCould() {

        const group = new THREE.Group();

        const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
        const cloud = new THREE.Mesh(cloudGeo, BoundScene.materials.clouds);
        cloud.scale.set(1, 0.8, 1);

        const cloud2 = cloud.clone();
        cloud2.scale.set(.55, .35, 1);
        cloud2.position.set(5, -1.5, 2);

        const cloud3 = cloud.clone();
        cloud3.scale.set(.75, .5, 1);
        cloud3.position.set(-5.5, -2, -1);

        group.add(cloud);
        group.add(cloud2);
        group.add(cloud3);

        BoundScene.shadowSupport(group);

        return group;
    }
}
