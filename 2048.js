"use strict";



(function () {
	var gameover = false;
	var x;
	var score = 0;
	x = new Array(4);
	for(var i = 0; i < 4; i++) {
		x[i] = new Array(4);
	}

	function setup() {
		gameover = false;
		score = 0;
		x = [];
		for(var i = 0; i < 4; i++) {
			x[i] = [];
			for(var k = 0; k < 4; k++) {
				x[i][k] = 0;
			}
		}
		/*
		x[0] = new Array(8, 0, 0, 0);
		x[1] = new Array(4, 0, 0, 0);
		x[2] = new Array(2, 0, 0, 0);
		x[3] = new Array(2, 0, 0, 0);
		*/
		add();
		render();
	}
	
	function add() {
		var count = 0;
		var randy = Math.floor(Math.random() * 15.99);
		while(x[Math.floor(randy / 4)][randy % 4] != 0 && count < 16) {
			randy = Math.floor(Math.random() * 15.99);
			count++;
		}
		if(count < 16) { // if count exceeds 16 its cause the grid is full
			var i = Math.floor(randy / 4);
			var j = randy % 4;
			x[i][j] = 2;
		}
	}
	
	function up() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(x[i][j] != 0 && i != 0) {
					var k = i; /*must change this...*/
					while(k >= 0 && (x[k][j] == 0 || x[k][j] == x[i][j])) k--;
					if(x[k+1][j] == 0) {
						x[k+1][j] = x[i][j];
						x[i][j] = 0;
						console.log('2 moves to 0');
					} else if(x[k+1][j] == x[i][j] && i != k+1) { 
						x[k+1][j] = x[k+1][j] + x[i][j];
						score = score + x[k+1][j];
						x[k+1][j] = x[k+1][j] + 0.5; // To prevent cascading addition
						x[i][j] = 0;
					}
				}
			}
		}
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				x[i][j] = Math.floor(x[i][j]);
			}
		}
	}
	
	function down() {
		for(var i = 3; i >= 0; i--) {
			for(var j = 0; j < 4; j++) {
				if(x[i][j] != 0 && i != 3) {
					var k = i; /*must change this...*/
					while(k < 4 && (x[k][j] == 0 || x[k][j] == x[i][j])) k++;
					if(x[k-1][j] == 0) {
						x[k-1][j] = x[i][j];
						x[i][j] = 0;
						console.log('2 moves to 0');
					} else if(x[k-1][j] == x[i][j] && i != k-1) { 
						x[k-1][j] = x[k-1][j] + x[i][j];
						score = score + x[k-1][j];
						x[k-1][j] = x[k-1][j] + 0.5; // To prevent cascading addition
						x[i][j] = 0;
					}
				}
			}
		}
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				x[i][j] = Math.floor(x[i][j]);
			}
		}
	}
	
	function left() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(x[i][j] != 0 && j != 0) {
					var k = j; /*must change this...*/
					while(k >= 0 && (x[i][k] == 0 || x[i][k] == x[i][j])) k--;
					if(x[i][k+1] == 0) {
						x[i][k+1] = x[i][j];
						x[i][j] = 0;
						console.log('2 moves to 0');
					} else if(x[i][k+1] == x[i][j] && j != k+1) { 
						x[i][k+1] = x[i][k+1] + x[i][j];
						score = score + x[i][k+1];
						x[i][k+1] = x[i][k+1] + 0.5; // To prevent cascading addition
						x[i][j] = 0;
						console.log(i + ', ' + j + ' moves into ' + k + ', ' + j);
					}
				}
			}
		}
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				x[i][j] = Math.floor(x[i][j]);
			}
		}
	}
	
	function right() {
		for(var i = 0; i < 4; i++) {
			for(var j = 3; j >= 0; j--) {
				if(x[i][j] != 0 && j != 3) {
					var k = j; /*must change this...*/
					while(k < 4 && (x[i][k] == 0 || x[i][k] == x[i][j])) k++;
					if(x[i][k-1] == 0) {
						x[i][k-1] = x[i][j];
						x[i][j] = 0;
						console.log('2 moves to 0');
					} else if(x[i][k-1] == x[i][j] && j != k-1) { 
						x[i][k-1] = x[i][k-1] + x[i][j];
						score = score + x[i][k-1];
						x[i][k-1] = x[i][k-1] + 0.5; // To prevent cascading addition
						x[i][j] = 0;
						console.log(i + ', ' + j + ' moves into ' + k + ', ' + j);
					}
				}
			}
		}
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				x[i][j] = Math.floor(x[i][j]);
			}
		}
	}

	function render() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(x[i][j] != 0) {
					document.getElementById('c' + (i * 4 + j)).innerHTML = x[i][j];
					document.getElementById('c' + (i * 4 + j)).className = 'tile' + x[i][j];
				}
				else {
					document.getElementById('c' + (i * 4 + j)).innerHTML = '';
					document.getElementById('c' + (i * 4 + j)).className = 'tile' + x[i][j];
				}
			}
		}
		document.getElementById('score').innerHTML = score;
	}

	function testfunc() {
		document.getElementById('shufflebutton').addEventListener('click', function() {
			setup();
		});
	}
	
	// Checks if two numbers are still next to eachother
	// Checks if any zeros left
	function check() {
		var stillPlaying = false;
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(x[i][j] == 0) stillPlaying = true;
				if(x[i - 1] != undefined) if(x[i - 1][j] == x[i][j]) stillPlaying = true;
				if(x[i + 1] != undefined) if(x[i + 1][j] == x[i][j]) stillPlaying = true;
				if(x[i][j - 1] != undefined) if(x[i][j - 1] == x[i][j]) stillPlaying = true;
				if(x[i][j + 1] != undefined) if(x[i][j + 1] == x[i][j]) stillPlaying = true;
			}
		}
		if(!stillPlaying) {
			gameover = true;
			alert('GAME OVER! Score: ' + score);
		}
	}
	
	function move(e) {
		e = e || window.event;
		
		if(!gameover) {
			if(e.keyCode == '38') {
				up();
				add();
				render();
				check();
			}
			
			else if(e.keyCode == '40') {
				down();
				add();
				render();
				check();
			}
			
			else if(e.keyCode == '37') {
				left();
				add();
				render();
				check();
			}
			
			else if(e.keyCode == '39'){
				right();
				add();
				render();
				check();
			}
		}
	}
	
	document.onkeydown = move;
	
	window.onload = onloadpage;
	
	function onloadpage() {
		setup();
		testfunc();
	}

}) ();