import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    Vector3,
    Mesh,
} from "@babylonjs/core";

import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'

class App {
    constructor() {
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "mainCanvas";
        document.body.appendChild(canvas);

        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        const PI_OVER_2 = Math.PI / 2;
        let distance = 2;
        const camera: ArcRotateCamera = new ArcRotateCamera(
            "Camera",
            PI_OVER_2,
            PI_OVER_2,
            distance,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);

        const light: HemisphericLight = new HemisphericLight(
            "hLight",
            new Vector3(1, 1, 0),
            scene
        );
        const sphere: Mesh = MeshBuilder.CreateSphere(
            "sphere",
            { diameter: 1 },
            scene
        );

        window.addEventListener("keydown", (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide()
                } else {
                    scene.debugLayer.show()
                }
            }
        })

        engine.runRenderLoop(() => {
            scene.render()
        })
    }
}

new App()
