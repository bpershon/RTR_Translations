//Brad Pershon
//CSE 5542 Shen
//Lab 3

var gl;
var shaderProgram;
var draw_type=2; 

var vMatrix = mat4.create(); // view matrix
var mMatrix = mat4.create();  // model matrix
var mvMatrix = mat4.create();  // modelview matrix
var pMatrix = mat4.create();  //projection matrix 
var Z_angle = 0.0;
var Y_angle = 0.0;

var squareVertexPositionBuffer;
var squareVertexColorBuffer;
var squareVertexIndexBuffer;

var cylinderBotVertexPositionBuffer;
var cylinderTopVertexPositionBuffer;
var cylinderSideVertexPositionBuffer;

var cylinderBaseBotVertexPositionBuffer;
var cylinderBaseTopVertexPositionBuffer;
var cylinderBaseSideVertexPositionBuffer;
var cylinderNoseVertextColorBuffer;

var sphereVertexPositionBuffer;
var sphereVertexIndexBuffer;
var sphereVertexColorBuffer;
var sphereVertextEyeColorBuffer;

var circleVertexColorBuffer;
var treeTopVertexColorBuffer;
var cBot_vertices = [];
var cTop_vertices = [];
var cSide_vertices = [];
var sphere_verticies = [];
var sphere_Cverticies = [];
var sphere_index = [];

var tree1Matrix, tree2Matrix, tree3Matrix, tree4Matrix, tree5Matrix, tree6Matrix;
var snowman1Matrix, snowman2Matrix, snowman3matrix, snowmanEye1Matrix, snowmanEye2Matrix, snowmanNoseMatrix;
var snowmanButton1Matrix, snowmanButton1Matrix, snowmanButton1Matrix;

var lastMouseX = 0, lastMouseY = 0;
var coi_x = 0, coi_y = 0, coi_z = 0;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

function webGLStart() {
    var canvas = document.getElementById("code03-canvas");
    initGL(canvas);
    initShaders();

	gl.enable(gl.DEPTH_TEST);
	
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");	

    initBuffers(); 

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    console.log('Launch!');
    document.addEventListener('mousedown', onDocumentMouseDown,false); 
	
	tree1Matrix = mat4.create(); 
	mat4.identity(tree1Matrix);
	tree1Matrix = mat4.translate(tree1Matrix, [-1.6, 0, 1.6]);
	
	tree2Matrix = mat4.create(); 
	mat4.identity(tree2Matrix);
	tree2Matrix = mat4.translate(tree2Matrix, [-1.6, 0, 0]);
	
	tree3Matrix = mat4.create(); 
	mat4.identity(tree3Matrix);
	tree3Matrix = mat4.translate(tree3Matrix, [-1.6, 0, -1.6]);
	
	tree4Matrix = mat4.create(); 
	mat4.identity(tree4Matrix);
	tree4Matrix = mat4.translate(tree4Matrix, [1.6, 0, 1.6]);
	
	tree5Matrix = mat4.create(); 
	mat4.identity(tree5Matrix);
	tree5Matrix = mat4.translate(tree5Matrix, [1.6, 0, 0]);
	
	tree6Matrix = mat4.create(); 
	mat4.identity(tree6Matrix);
	tree6Matrix = mat4.translate(tree6Matrix, [1.6, 0, -1.6]);
	
	snowman1Matrix = mat4.create();
	mat4.identity(snowman1Matrix);
	snowman1Matrix = mat4.translate(snowman1Matrix, [0, 0.3, 0]);
	
	snowman2Matrix = mat4.create();
	mat4.identity(snowman2Matrix);
	snowman2Matrix = mat4.multiply(snowman2Matrix, snowman1Matrix);
	snowman2Matrix = mat4.scale(snowman2Matrix, [0.8, 0.8, 0.8]);
	snowman2Matrix = mat4.translate(snowman2Matrix, [0, 0.4, 0]);
	
	snowman3Matrix = mat4.create();
	mat4.identity(snowman3Matrix);
	snowman3Matrix = mat4.multiply(snowman3Matrix, snowman2Matrix);
	snowman3Matrix = mat4.scale(snowman3Matrix, [0.8, 0.8, 0.8]);
	snowman3Matrix = mat4.translate(snowman3Matrix, [0, 0.4, 0]);
	
	snowmanEye1Matrix = mat4.create();
	mat4.identity(snowmanEye1Matrix);
	snowmanEye1Matrix = mat4.multiply(snowmanEye1Matrix, snowman3Matrix);
	snowmanEye1Matrix = mat4.scale(snowmanEye1Matrix, [0.32, 0.32, 0.32]);
	snowmanEye1Matrix = mat4.translate(snowmanEye1Matrix, [-0.3, 0.3, 0.7]);
	
	snowmanEye2Matrix = mat4.create();
	mat4.identity(snowmanEye2Matrix);
	snowmanEye2Matrix = mat4.multiply(snowmanEye2Matrix, snowman3Matrix);
	snowmanEye2Matrix = mat4.scale(snowmanEye2Matrix, [0.32, 0.32, 0.32]);
	snowmanEye2Matrix = mat4.translate(snowmanEye2Matrix, [0.3, 0.3, 0.7]);
    
	snowmanNoseMatrix = mat4.create();
	mat4.identity(snowmanNoseMatrix);
	snowmanNoseMatrix = mat4.multiply(snowmanNoseMatrix, snowman3Matrix);
	snowmanNoseMatrix = mat4.rotate(snowmanNoseMatrix, degToRad(90), [1, 0, 0]);
	snowmanNoseMatrix = mat4.scale(snowmanNoseMatrix, [0.5, 0.5, 0.5]);
	snowmanNoseMatrix = mat4.translate(snowmanNoseMatrix, [0, 0.1, -.001]);
	
	snowmanButton1Matrix = mat4.create();
	mat4.identity(snowmanButton1Matrix);
	snowmanButton1Matrix = mat4.multiply(snowmanButton1Matrix, snowman3Matrix);
	snowmanButton1Matrix = mat4.scale(snowmanButton1Matrix, [0.17, 0.17, 0.17]);
	snowmanButton1Matrix = mat4.translate(snowmanButton1Matrix, [0, -1.2, 2]);
	
	snowmanButton2Matrix = mat4.create();
	mat4.identity(snowmanButton2Matrix);
	snowmanButton2Matrix = mat4.multiply(snowmanButton2Matrix, snowmanButton1Matrix);
	snowmanButton2Matrix = mat4.translate(snowmanButton2Matrix, [0, -1, 0.2]);
	
	snowmanButton3Matrix = mat4.create();
	mat4.identity(snowmanButton3Matrix);
	snowmanButton3Matrix = mat4.multiply(snowmanButton3Matrix, snowmanButton1Matrix);
	snowmanButton3Matrix = mat4.translate(snowmanButton3Matrix, [0, -2, 0]);
	
	
	drawScene();
}
	
function initBuffers() {
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    var vertices = [
        2,  0.1,  -2,
	    -2,  0.1,  -2, 
	    -2, -0.1,  -2,
 	    2, -0.1,  -2,
        2,  0.1,  2,
	    -2,  0.1,  2, 
        -2, -0.1,  2,
	    2, -0.1,  2,	        
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 8;

	var indices = [0,1,2, 0,2,3, 0,3,7, 0, 7,4, 6,2,3,6,3,7,5,1,2, 5,2,6,5,1,0,5,0,4,5,6,7,5,7,4];
	squareVertexIndexBuffer = gl.createBuffer();	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
    squareVertexIndexBuffer.itemsize = 1;
    squareVertexIndexBuffer.numItems = 36;  

    squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    var colors = [
        0.63, 0.63, 0.63, 1.0,
        0.63, 0.63, 0.63, 1.0,
        0.4, 0.2, 0, 1.0,
        0.4, 0.2, 0, 1.0,
        0.63, 0.63, 0.63, 1.0,
        0.63, 0.63, 0.63, 1.0,
        0.4, 0.2, 0, 1.0,
        0.4, 0.2, 0, 1.0,  
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = 8;
	
	/*
		TREE TOP
	*/
	
	//Cylinder (tree top)
	createCylinder(360, 0.2, 0.00001, 0.6, 0.4);

	//Cylinder Bot buffer (tree top)
	cylinderBotVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBotVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cBot_vertices), gl.STATIC_DRAW);
	cylinderBotVertexPositionBuffer.itemSize = 3;
	cylinderBotVertexPositionBuffer.numItems = cBot_vertices.length / 3;
	
	//Cylinder Top buffer (tree top)
	cylinderTopVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cTop_vertices), gl.STATIC_DRAW);
	cylinderTopVertexPositionBuffer.itemSize = 3;
	cylinderTopVertexPositionBuffer.numItems = cTop_vertices.length / 3;
	
	//Cylinder Side buffer (tree top)
	cylinderSideVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSideVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cSide_vertices), gl.STATIC_DRAW);
	cylinderSideVertexPositionBuffer.itemSize = 3;
	cylinderSideVertexPositionBuffer.numItems = cSide_vertices.length / 3;

	/*
		TREE BASE
	*/
	cBot_vertices = [];
	cTop_vertices = [];
	cSide_vertices = [];
	//Cylinder (tree base)
	createCylinder(360, 0.07, 0.07, 0.3, 0.11); //degree, b_radius, t_radius, height, y_pos

	//Cylinder Bot buffer (tree base)
	cylinderBaseBotVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseBotVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cBot_vertices), gl.STATIC_DRAW);
	cylinderBaseBotVertexPositionBuffer.itemSize = 3;
	cylinderBaseBotVertexPositionBuffer.numItems = cBot_vertices.length / 3;
	
	//Cylinder Top buffer (tree base)
	cylinderBaseTopVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseTopVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cTop_vertices), gl.STATIC_DRAW);
	cylinderBaseTopVertexPositionBuffer.itemSize = 3;
	cylinderBaseTopVertexPositionBuffer.numItems = cTop_vertices.length / 3;
	
	//Cylinder Side buffer (tree base)
	cylinderBaseSideVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseSideVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cSide_vertices), gl.STATIC_DRAW);
	cylinderBaseSideVertexPositionBuffer.itemSize = 3;
	cylinderBaseSideVertexPositionBuffer.numItems = cSide_vertices.length / 3;	
	
	//Bind Cylinder color buffer (tree base)
	circleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
	var cir_colors = createCircleColor(cylinderBotVertexPositionBuffer.numItems, 0.8, 0.4, 0.0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cir_colors), gl.STATIC_DRAW);
	circleVertexColorBuffer.itemSize = 4;
	circleVertexColorBuffer.numItems = cir_colors.length / 4;
	
	//Bind Cylinder color buffer (tree top)
	treeTopVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, treeTopVertexColorBuffer);
	var cir_colors = createCircleColor(cylinderBotVertexPositionBuffer.numItems, 0, 0.3, 0.0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cir_colors), gl.STATIC_DRAW);
	treeTopVertexColorBuffer.itemSize = 4;
	treeTopVertexColorBuffer.numItems = cir_colors.length / 4;
	
	/*
		SPHERE
	*/
	//latBands, longBands, radius, R, G, B
	createSphere(30, 30, 0.3, 1, 1, 1);
	
	//Bind sphere position buffer
	sphereVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_verticies), gl.STATIC_DRAW);
	sphereVertexPositionBuffer.itemSize = 3;
	sphereVertexPositionBuffer.numItems = sphere_verticies.length / 3;
	
	//Bind sphere index buffer
	sphereVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere_index), gl.STREAM_DRAW);
	sphereVertexIndexBuffer.itemSize = 1;
	sphereVertexIndexBuffer.numItems = sphere_index.length;
	
	//Bind sphere color buffer
	sphereVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_Cverticies), gl.STATIC_DRAW);
	sphereVertexColorBuffer.itemSize = 4;
	sphereVertexColorBuffer.numItems = sphere_Cverticies.length / 4;

	//Bind sphere color for eyes
	sphereVertextEyeColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertextEyeColorBuffer);
	var eye_colors = createCircleColor(sphereVertexPositionBuffer.numItems, 0, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(eye_colors), gl.STATIC_DRAW);
	sphereVertextEyeColorBuffer.itemSize = 4;
	sphereVertextEyeColorBuffer.numItems = sphere_Cverticies.length / 4;
	
	//Bind snowman nose color
	cir_colors = [];
	cylinderNoseVertextColorBuffer= gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderNoseVertextColorBuffer);
	var cir_colors = createCircleColor(cylinderBotVertexPositionBuffer.numItems, 1, 0.5, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cir_colors), gl.STATIC_DRAW);
	cylinderNoseVertextColorBuffer.itemSize = 4;
	cylinderNoseVertextColorBuffer.numItems = cir_colors.length / 4;
}
	
function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mat4.perspective(60, 1.0, 0.1, 100, pMatrix); 

	vMatrix = mat4.lookAt([0,2,5], [coi_x,coi_y,coi_z], [0,1,0], mvMatrix);	//Pos, COI, View up

    mat4.identity(mMatrix);	
	
    console.log('Z angle = '+ Z_angle); 
    mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
	mMatrix = mat4.rotate(mMatrix, degToRad(Y_angle), [0,1,0]);
	
    mat4.multiply(vMatrix,mMatrix, mvMatrix);  // mvMatrix = vMatrix * mMatrix and is the modelview Matrix 

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

	// draw elementary arrays - triangle indices 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 

    setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 
	
	if (draw_type ==1) gl.drawArrays(gl.LINE_LOOP, 0, squareVertexPositionBuffer.numItems);	
        else if (draw_type ==0) gl.drawArrays(gl.POINTS, 0, squareVertexPositionBuffer.numItems);
	else if (draw_type==2) gl.drawElements(gl.TRIANGLES, squareVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0); 
	
	/*
		Draw Trees
	*/
	var base = mat4.create();
	mat4.set(mvMatrix, base); 
	
	mvMatrix = mat4.multiply(mvMatrix, tree1Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, tree2Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, tree3Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, tree4Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, tree5Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, tree6Matrix);
	setMatrixUniforms();
	drawTree(1);
	
	/*
		Draw Snowman
	*/
	//base
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowman1Matrix);
	setMatrixUniforms();
	drawSphere(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowman2Matrix);
	setMatrixUniforms(1);
	drawSphere(1);
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowman3Matrix);
	setMatrixUniforms();
	drawSphere(1);
	
	//eyes
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanEye1Matrix);
	setMatrixUniforms();
	drawSphere(2);	
	
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanEye2Matrix);
	setMatrixUniforms();
	drawSphere(2);	
	
	//buttons
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanButton1Matrix);
	setMatrixUniforms();
	drawSphere(2);

	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanButton2Matrix);
	setMatrixUniforms();
	drawSphere(2);

	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanButton3Matrix);
	setMatrixUniforms();
	drawSphere(2);	
	
	//nose
	mat4.set(base, mvMatrix);
	mvMatrix = mat4.multiply(mvMatrix, snowmanNoseMatrix);
	setMatrixUniforms();
	drawTree(0);
}

function drawSphere(option){
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	if(option == 1){
		gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,sphereVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	}else{
		gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertextEyeColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,sphereVertextEyeColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
	gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}



function drawTree(isTree){
	
	var colorBuffer;
	/*
		Tree Top
	*/
	if(isTree){
		colorBuffer = treeTopVertexColorBuffer;
	}else{
		colorBuffer = cylinderNoseVertextColorBuffer;
	}
	//Draw Cylinder Bot
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBotVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderBotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,colorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderBotVertexPositionBuffer.numItems);
	
	//Draw Cylinder Top
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderTopVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,colorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderTopVertexPositionBuffer.numItems);
	
	//Draw Cylinder Side
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSideVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderSideVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,colorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderSideVertexPositionBuffer.numItems);
	
	/*
		TREE Base
	*/
	if(isTree){
		//Draw Cylinder Bot
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseBotVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderBaseBotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,circleVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderBaseBotVertexPositionBuffer.numItems);
	
		//Draw Cylinder Top
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseTopVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderBaseTopVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,circleVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderBaseTopVertexPositionBuffer.numItems);
	
		//Draw Cylinder Side
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBaseSideVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderBaseSideVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,circleVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderBaseSideVertexPositionBuffer.numItems);
	}
}

/*
	Control functions
*/
function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    lastMouseX = mouseX;
    lastMouseY = mouseY; 

}

function onDocumentMouseMove( event ) {
    var mouseX = event.clientX;
    var mouseY = event.ClientY; 

    var diffX = mouseX - lastMouseX;
    var diffY = mouseY - lastMouseY;

    Z_angle = Z_angle + diffX/5;

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    drawScene();
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

/*
	Utility functions
*/
function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);	
}

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function moveCOIX(value) {
	coi_x += value;
    drawScene(); 
} 

function moveCOIY(value) {
	coi_y += value;
    drawScene(); 
} 

function rotateByY(value) {
	Y_angle += value;
    drawScene();
} 


function redraw() {
    Z_angle = 0; 
	Y_angle = 0;
	coi_x = 0;
	coi_y = 0; 
	coi_z = 0;
    drawScene();
}
    

function geometry(type) {
    draw_type = type;
    drawScene();
} 

function createCylinder(degree, b_radius, t_radius, height, y_pos){
	var y = y_pos;
    for (var i=0.0; i<=degree; i+=1) {
      var j = degToRad(i);
	  var x = Math.cos(j);
	  var z = Math.sin(j);
	  cBot_vertices.push(b_radius * x, y, b_radius * z);
	  cBot_vertices.push(0, y, 0);
	  cTop_vertices.push(t_radius * x, y + height, t_radius * z);
	  cTop_vertices.push(0, y + height, 0);
	  cSide_vertices.push(b_radius * x, y, b_radius * z);
	  cSide_vertices.push(t_radius * x, y + height, t_radius * z);
    }
}

function createCircleColor(numItems, r, g, b){
	var colorVert = [];
	for (var i = 0; i < numItems; i+=1){
		colorVert = colorVert.concat([r, g, b, 1.0,]);
	}
	return colorVert;
}

function createSphere(latBands, longBands, radius, R, G, B){
	for(var i = 0; i <= latBands; i++){
		var theta = i * Math.PI / latBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		
		for(var j = 0; j <= longBands; j++){
			var phi = j * 2 * Math.PI / longBands; //Might be latBands
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);
			
			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			
			sphere_verticies.push(radius * x, radius * y, radius * z);
			sphere_Cverticies.push(R, G, B, 1.0);
		}
	
	}
	
	for(var i = 0; i < latBands; i++){
		for(var j = 0; j < longBands; j++){
		var aPoint = (i *(longBands + 1)) + j;
		var bPoint = aPoint + longBands + 1;
		sphere_index.push(aPoint, bPoint, aPoint + 1);
		sphere_index.push(bPoint, bPoint + 1, aPoint + 1);
		}
	}
}