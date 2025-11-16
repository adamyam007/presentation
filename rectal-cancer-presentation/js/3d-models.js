// 3D Models for Rectal Cancer Presentation

// Initialize 3D scenes when slides are ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Reveal.js to initialize
    Reveal.on('ready', function() {
        initRectumSegments();
        initAnatomyRelations();
    });

    // Re-render when slide changes
    Reveal.on('slidechanged', function(event) {
        if (event.currentSlide.querySelector('#rectumSegments canvas')) {
            renderRectumSegments();
        }
        if (event.currentSlide.querySelector('#anatomyRelations canvas')) {
            renderAnatomyRelations();
        }
    });
});

// Global variables for scenes
let rectumScene, rectumCamera, rectumRenderer;
let anatomyScene, anatomyCamera, anatomyRenderer;

// Initialize Rectum Segments 3D Model
function initRectumSegments() {
    const container = document.getElementById('rectumSegments');
    if (!container) return;

    // Scene setup
    rectumScene = new THREE.Scene();
    rectumScene.background = new THREE.Color(0x1a1a2e);

    // Camera
    rectumCamera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    rectumCamera.position.set(8, 5, 10);
    rectumCamera.lookAt(0, 0, 0);

    // Renderer
    rectumRenderer = new THREE.WebGLRenderer({ antialias: true });
    rectumRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(rectumRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    rectumScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    rectumScene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, 10);
    rectumScene.add(pointLight);

    // Create rectum segments
    createRectumSegments();

    // Add labels
    addRectumLabels();

    // Animation
    animateRectumSegments();
}

function createRectumSegments() {
    // Lower rectum (0-5 cm) - RED
    const lowerGeometry = new THREE.CylinderGeometry(1.2, 1.5, 2, 32);
    const lowerMaterial = new THREE.MeshPhongMaterial({
        color: 0xe74c3c,
        transparent: true,
        opacity: 0.85,
        shininess: 30
    });
    const lowerRectum = new THREE.Mesh(lowerGeometry, lowerMaterial);
    lowerRectum.position.y = -3;
    rectumScene.add(lowerRectum);

    // Lower outline
    const lowerEdges = new THREE.EdgesGeometry(lowerGeometry);
    const lowerLine = new THREE.LineSegments(lowerEdges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    lowerLine.position.y = -3;
    rectumScene.add(lowerLine);

    // Mid rectum (5-10 cm) - ORANGE
    const midGeometry = new THREE.CylinderGeometry(1.5, 1.7, 2.5, 32);
    const midMaterial = new THREE.MeshPhongMaterial({
        color: 0xf39c12,
        transparent: true,
        opacity: 0.85,
        shininess: 30
    });
    const midRectum = new THREE.Mesh(midGeometry, midMaterial);
    midRectum.position.y = -0.75;
    rectumScene.add(midRectum);

    // Mid outline
    const midEdges = new THREE.EdgesGeometry(midGeometry);
    const midLine = new THREE.LineSegments(midEdges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    midLine.position.y = -0.75;
    rectumScene.add(midLine);

    // Upper rectum (10-15 cm) - GREEN
    const upperGeometry = new THREE.CylinderGeometry(1.7, 1.8, 2.5, 32);
    const upperMaterial = new THREE.MeshPhongMaterial({
        color: 0x27ae60,
        transparent: true,
        opacity: 0.85,
        shininess: 30
    });
    const upperRectum = new THREE.Mesh(upperGeometry, upperMaterial);
    upperRectum.position.y = 1.75;
    rectumScene.add(upperRectum);

    // Upper outline
    const upperEdges = new THREE.EdgesGeometry(upperGeometry);
    const upperLine = new THREE.LineSegments(upperEdges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    upperLine.position.y = 1.75;
    rectumScene.add(upperLine);

    // Mesorectal fascia (surrounding envelope) - semi-transparent
    const fasciaGeometry = new THREE.CylinderGeometry(2.2, 2.5, 7.5, 32);
    const fasciaMaterial = new THREE.MeshPhongMaterial({
        color: 0x3498db,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
    });
    const fascia = new THREE.Mesh(fasciaGeometry, fasciaMaterial);
    fascia.position.y = 0;
    rectumScene.add(fascia);

    // Fascia wireframe
    const fasciaWireframe = new THREE.WireframeGeometry(fasciaGeometry);
    const fasciaLine = new THREE.LineSegments(fasciaWireframe, new THREE.LineBasicMaterial({ color: 0x3498db, transparent: true, opacity: 0.4 }));
    fasciaLine.position.y = 0;
    rectumScene.add(fasciaLine);

    // Add anal verge marker (sphere at bottom)
    const analVergeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const analVergeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const analVerge = new THREE.Mesh(analVergeGeometry, analVergeMaterial);
    analVerge.position.y = -4.5;
    rectumScene.add(analVerge);

    // Add peritoneal reflection line
    const peritonealGeometry = new THREE.TorusGeometry(2, 0.05, 16, 100);
    const peritonealMaterial = new THREE.MeshPhongMaterial({ color: 0xf1c40f, emissive: 0xf1c40f, emissiveIntensity: 0.5 });
    const peritonealReflection = new THREE.Mesh(peritonealGeometry, peritonealMaterial);
    peritonealReflection.position.y = 0.5;
    peritonealReflection.rotation.x = Math.PI / 2;
    rectumScene.add(peritonealReflection);

    // Add coordinate axes for reference
    const axesHelper = new THREE.AxesHelper(3);
    axesHelper.position.set(4, -4, 0);
    rectumScene.add(axesHelper);
}

function addRectumLabels() {
    // Create sprite labels
    function makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};

        const fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        const fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 48;
        const borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        const backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 0, g: 0, b: 0, a: 0.8 };
        const textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 255, g: 255, b: 255, a: 1.0 };

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        const metrics = context.measureText(message);
        const textWidth = metrics.width;

        canvas.width = textWidth + borderThickness * 2;
        canvas.height = fontsize * 1.4 + borderThickness * 2;

        context.font = "Bold " + fontsize + "px " + fontface;
        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(0,0,0,0.5)";
        context.lineWidth = borderThickness;

        const x = borderThickness;
        const y = fontsize + borderThickness;

        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + "," + textColor.b + "," + textColor.a + ")";
        context.fillText(message, x, y);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(4, 2, 1);

        return sprite;
    }

    // Add labels for each segment
    const lowerLabel = makeTextSprite("Lower (0-5cm)", { fontsize: 36, backgroundColor: {r:231, g:76, b:60, a:0.9} });
    lowerLabel.position.set(4, -3, 0);
    rectumScene.add(lowerLabel);

    const midLabel = makeTextSprite("Mid (5-10cm)", { fontsize: 36, backgroundColor: {r:243, g:156, b:18, a:0.9} });
    midLabel.position.set(4, -0.75, 0);
    rectumScene.add(midLabel);

    const upperLabel = makeTextSprite("Upper (10-15cm)", { fontsize: 36, backgroundColor: {r:39, g:174, b:96, a:0.9} });
    upperLabel.position.set(4, 1.75, 0);
    rectumScene.add(upperLabel);

    const fasciaLabel = makeTextSprite("Mesorectal Fascia", { fontsize: 32, backgroundColor: {r:52, g:152, b:219, a:0.9} });
    fasciaLabel.position.set(-4, 2, 0);
    rectumScene.add(fasciaLabel);
}

function animateRectumSegments() {
    requestAnimationFrame(animateRectumSegments);

    // Slow rotation for better visualization
    if (rectumScene) {
        rectumScene.rotation.y += 0.003;
    }

    if (rectumRenderer && rectumScene && rectumCamera) {
        rectumRenderer.render(rectumScene, rectumCamera);
    }
}

function renderRectumSegments() {
    if (rectumRenderer && rectumScene && rectumCamera) {
        rectumRenderer.render(rectumScene, rectumCamera);
    }
}

// Initialize Anatomy Relations 3D Model
function initAnatomyRelations() {
    const container = document.getElementById('anatomyRelations');
    if (!container) return;

    // Scene setup
    anatomyScene = new THREE.Scene();
    anatomyScene.background = new THREE.Color(0x1a1a2e);

    // Camera
    anatomyCamera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    anatomyCamera.position.set(10, 8, 12);
    anatomyCamera.lookAt(0, 0, 0);

    // Renderer
    anatomyRenderer = new THREE.WebGLRenderer({ antialias: true });
    anatomyRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(anatomyRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    anatomyScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    anatomyScene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, 10);
    anatomyScene.add(pointLight);

    // Create anatomical structures
    createAnatomyStructures();

    // Animation
    animateAnatomyRelations();
}

function createAnatomyStructures() {
    // Rectum (central structure)
    const rectumGeometry = new THREE.CylinderGeometry(1, 1.2, 6, 32);
    const rectumMaterial = new THREE.MeshPhongMaterial({
        color: 0xe74c3c,
        transparent: true,
        opacity: 0.85
    });
    const rectum = new THREE.Mesh(rectumGeometry, rectumMaterial);
    rectum.position.set(0, 0, 0);
    anatomyScene.add(rectum);

    // Sacrum (posterior) - curved plate
    const sacrumGeometry = new THREE.BoxGeometry(4, 6, 0.5);
    const sacrumMaterial = new THREE.MeshPhongMaterial({ color: 0xbdc3c7 });
    const sacrum = new THREE.Mesh(sacrumGeometry, sacrumMaterial);
    sacrum.position.set(0, 0, -2.5);
    anatomyScene.add(sacrum);

    // Presacral fascia
    const presacralGeometry = new THREE.BoxGeometry(4, 6, 0.1);
    const presacralMaterial = new THREE.MeshPhongMaterial({
        color: 0x3498db,
        transparent: true,
        opacity: 0.5
    });
    const presacralFascia = new THREE.Mesh(presacralGeometry, presacralMaterial);
    presacralFascia.position.set(0, 0, -1.8);
    anatomyScene.add(presacralFascia);

    // Prostate/Bladder (anterior, superior) - for male anatomy
    const prostateGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const prostateMaterial = new THREE.MeshPhongMaterial({
        color: 0x9b59b6,
        transparent: true,
        opacity: 0.7
    });
    const prostate = new THREE.Mesh(prostateGeometry, prostateMaterial);
    prostate.position.set(0, 1.5, 2);
    prostate.scale.set(1, 0.8, 1.2);
    anatomyScene.add(prostate);

    // Seminal vesicles (small spheres above prostate)
    const svGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const svMaterial = new THREE.MeshPhongMaterial({ color: 0x8e44ad });
    const sv1 = new THREE.Mesh(svGeometry, svMaterial);
    sv1.position.set(-0.5, 2.2, 1.5);
    anatomyScene.add(sv1);
    const sv2 = new THREE.Mesh(svGeometry, svMaterial);
    sv2.position.set(0.5, 2.2, 1.5);
    anatomyScene.add(sv2);

    // Pelvic sidewalls (lateral)
    const sidewallGeometry = new THREE.BoxGeometry(0.3, 6, 5);
    const sidewallMaterial = new THREE.MeshPhongMaterial({
        color: 0x95a5a6,
        transparent: true,
        opacity: 0.6
    });
    const leftWall = new THREE.Mesh(sidewallGeometry, sidewallMaterial);
    leftWall.position.set(-3, 0, 0);
    anatomyScene.add(leftWall);

    const rightWall = new THREE.Mesh(sidewallGeometry, sidewallMaterial);
    rightWall.position.set(3, 0, 0);
    anatomyScene.add(rightWall);

    // Mesorectal envelope (surrounding rectum)
    const mesoGeometry = new THREE.CylinderGeometry(1.8, 2.0, 6, 32);
    const mesoMaterial = new THREE.MeshPhongMaterial({
        color: 0xf39c12,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const mesorectum = new THREE.Mesh(mesoGeometry, mesoMaterial);
    mesorectum.position.set(0, 0, 0);
    anatomyScene.add(mesorectum);

    // Wireframe for mesorectum
    const mesoWireframe = new THREE.WireframeGeometry(mesoGeometry);
    const mesoLine = new THREE.LineSegments(mesoWireframe, new THREE.LineBasicMaterial({ color: 0xf39c12, transparent: true, opacity: 0.5 }));
    mesoLine.position.set(0, 0, 0);
    anatomyScene.add(mesoLine);

    // Peritoneal reflection (upper boundary)
    const peritonealGeometry = new THREE.TorusGeometry(1.5, 0.08, 16, 100);
    const peritonealMaterial = new THREE.MeshPhongMaterial({
        color: 0xf1c40f,
        emissive: 0xf1c40f,
        emissiveIntensity: 0.5
    });
    const peritoneal = new THREE.Mesh(peritonealGeometry, peritonealMaterial);
    peritoneal.position.y = 1.5;
    peritoneal.rotation.x = Math.PI / 2;
    anatomyScene.add(peritoneal);

    // Vascular structures (simplified)
    // Superior rectal artery
    const arteryGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
    const arteryMaterial = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
    const superiorArtery = new THREE.Mesh(arteryGeometry, arteryMaterial);
    superiorArtery.position.set(-1.2, 1, 0);
    superiorArtery.rotation.z = Math.PI / 6;
    anatomyScene.add(superiorArtery);

    // Add grid for reference
    const gridHelper = new THREE.GridHelper(12, 12, 0x444444, 0x222222);
    gridHelper.position.y = -4;
    anatomyScene.add(gridHelper);

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(4);
    axesHelper.position.set(5, -3, 5);
    anatomyScene.add(axesHelper);
}

function animateAnatomyRelations() {
    requestAnimationFrame(animateAnatomyRelations);

    // Slow rotation
    if (anatomyScene) {
        anatomyScene.rotation.y += 0.002;
    }

    if (anatomyRenderer && anatomyScene && anatomyCamera) {
        anatomyRenderer.render(anatomyScene, anatomyCamera);
    }
}

function renderAnatomyRelations() {
    if (anatomyRenderer && anatomyScene && anatomyCamera) {
        anatomyRenderer.render(anatomyScene, anatomyCamera);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (rectumCamera && rectumRenderer) {
        const container = document.getElementById('rectumSegments');
        if (container) {
            rectumCamera.aspect = container.clientWidth / container.clientHeight;
            rectumCamera.updateProjectionMatrix();
            rectumRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    }

    if (anatomyCamera && anatomyRenderer) {
        const container = document.getElementById('anatomyRelations');
        if (container) {
            anatomyCamera.aspect = container.clientWidth / container.clientHeight;
            anatomyCamera.updateProjectionMatrix();
            anatomyRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    }
});
