import React, { Component } from "react";
import * as BABYLON from "babylonjs";

var scene;
/**
 * Example temnplate of using Babylon JS with React
 */
class BabylonScene extends Component {
  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {
    // start ENGINE
    this.engine = new BABYLON.Engine(this.canvas, true);

    //Create Scene
    scene = new BABYLON.Scene(this.engine);

    //--Light---
    this.addLight();

    //--Camera---
    this.addCamera();

    //--Meshes---
    this.addModels();

    //--Ground---
    // this.addGround();

    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    //Animation
    // scene.registerBeforeRender(() => {
    //   boxMesh.rotation.y += 0.01;
    //   boxMesh.rotation.x += 0.01;
    // });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = event => {
    this.engine.resize();
  };

  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
    light.intensity = 0.27;
  };

  /**
   * Add Camera
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI,
      Math.PI / 3,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    // camera.setPosition(new BABYLON.Vector3(5, 5, 5));
  };

  /**
   * Create Stage and Skybox
   */
  addGround = () => {
    //Add SkyBox
    var photoSphere = BABYLON.Mesh.CreateSphere("skyBox", 16.0, 50.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("smat", scene);
    skyboxMaterial.diffuseTexture = new BABYLON.Texture(
      "assets/skybox.jpeg",
      scene,
      1,
      0
    );
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.emissiveTexture.uOffset = -Math.PI / 2; // left-right
    skyboxMaterial.emissiveTexture.uOffset = 0.1; // up-down
    skyboxMaterial.backFaceCulling = false;
    photoSphere.material = skyboxMaterial;
  };

  /**
   * Add Models
   */
  addModels = () => {
    var faceUV = [];
    faceUV[0] =	new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[1] =	new BABYLON.Vector4(1, 0, 0.32, 1);
    faceUV[2] = new BABYLON.Vector4(0, 0, 0.25, 1);
    var faceColors = [];
    faceColors[1] = new BABYLON.Color4(1, 1, 1, 1);
    faceColors[2] = new BABYLON.Color4(1, 1, 1, 0.6);
    var lipColors = [];
    lipColors[1] = new BABYLON.Color4(1, 1, 1, 1);
    lipColors[2] = new BABYLON.Color4(1, 1, 1, 0.6);
    lipColors[3] = new BABYLON.Color4(1, 1, 1, 0.6);

    var cup = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 1.5, diameterBottom: 1.2, height: 2.4, tessellation: 24, faceUV: faceUV, faceColors: faceColors}, scene);
    cup.hasVertexAlpha = true;
    cup.position.y = 1;

    var lip = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 1.54, diameterBottom: 1.54, height: 0.4, tessellation: 24, faceColors: lipColors}, scene);
    lip.hasVertexAlpha = true;
    lip.position.y = 2.1;


    var styroMaterial = new BABYLON.StandardMaterial("styrofoam", scene);
    styroMaterial.emissiveTexture = new BABYLON.Texture(
      "http://localhost:3000/styrofoam.jpg",
      scene
    );
    
    cup.material = styroMaterial;
    lip.material = styroMaterial;
  };

  render() {
    return (
      <canvas
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={canvas => {
          this.canvas = canvas;
        }}
      />
    );
  }
}
export default BabylonScene;