<template>
  <canvas id="webgl-canvas" />
</template>

<script>
import * as THREE from "three";
import { gsap } from "gsap";

let scene;
let camera;

let renderer;

let width = 0;
let height = 0;

let cubeGeometry;
let cube;

export default {
  mounted() {
    createBox();
  },
  methods: {
    morphBox: function() {
      console.log("WGL: Box");
      gotoTop();
    },
    morphSphere: function() {
      console.log("WGL: Sphere");
      gotoSphere();
    },
    morphTwist: function() {
      console.log("WGL: Twist");
      gotoTwist();
    }
  }
}

const createBox = () => {
  console.log("createBox");
  const canvas = document.getElementById('webgl-canvas');

  width = window.innerWidth;
  height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, width / height, 1, 10000 );
  camera.position.set(0, 0, width / 2);

  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 1.0);

  cubeGeometry = new THREE.BoxBufferGeometry(300, 300, 300, 10, 10, 10);

  const grow_cubeGeometry = new THREE.BoxBufferGeometry(600, 300, 300, 10, 10, 10);

  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xa0a0a0,
    wireframe: true,
    morphTargets: true
  });

  const pos = cubeGeometry.attributes.position;
  const grow_pos = grow_cubeGeometry.attributes.position;

  cubeGeometry.morphAttributes.position = [];

  cubeGeometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(pos, 3);
  cubeGeometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(pos, 3);

  let spherePositions = [];
  let v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i).setLength((150 * Math.sqrt(3) + 150) * 0.5);
    spherePositions.push(v3.x, v3.y, v3.z);
  }

  const twistPositions = [];
  const direction = new THREE.Vector3( 1, 0, 0 );
  const vertex = new THREE.Vector3();

  for (let i = 0; i < grow_pos.count; i++) {
    const x = grow_pos.getX( i );
    const y = grow_pos.getY( i );
    const z = grow_pos.getZ( i );
    vertex.set(x, y, z);
    vertex.applyAxisAngle(direction, Math.PI * x / 2.1).toArray(twistPositions, twistPositions.length);
  }

  cubeGeometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(spherePositions, 3);

  cubeGeometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(twistPositions, 3);

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, 0, 0);
  scene.add(cube);

  cube.geometry.attributes.position.needsUpdate = true;

  window.addEventListener("resize", () => handleResize());

  tick();
};

const tick = () => {
  cube.rotation.y = cube.rotation.y - 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

const handleResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.position.set(0, 0, width / 2);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function gotoTwist() {
  let timelineBox = gsap.timeline({
    paused: false
  });
  timelineBox
    .to(cube.morphTargetInfluences, { "0":0, duration: 1, ease: "slow(0.7, 0.7, false)" })
    .to(cube.morphTargetInfluences, { "1":1, duration: 1, ease: "slow(0.7, 0.7, false)" },"-=1");
}

function gotoSphere() {
  let timelineBox = gsap.timeline({
    paused: false
  });
  timelineBox
    .to(cube.morphTargetInfluences, { "0":1, duration: 1, ease: "slow(0.7, 0.7, false)" })
    .to(cube.morphTargetInfluences, { "1":0, duration: 1, ease: "slow(0.7, 0.7, false)" },"-=1");
}

function gotoTop() {
  let timelineBox2 = gsap.timeline({
    paused: false
  });
  timelineBox2
    .to(cube.morphTargetInfluences, { "0":0, duration: 1, ease: "slow(0.7, 0.7, false)" })
    .to(cube.morphTargetInfluences, { "1":0, duration: 1, ease: "slow(0.7, 0.7, false)" },"-=1");
}

</script>