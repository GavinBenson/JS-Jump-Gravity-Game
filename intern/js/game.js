			var myGamePiece;
			var myObstacles = [];
			var myScore;
			var buttonWidth = 680;
			var buttonHeight = 480;

			function startGame() {
				myGamePiece = new component(60, 60, "blue", 10, 240);
				myGamePiece.gravity = 0.0;
				myScore = new component("30px", "Consolas", "black", 280, 40, "text");
				myGameArea.start();
			}

			var myGameArea = {
				canvas : document.createElement("canvas"),
				start : function() {
					this.canvas.width = buttonWidth;
					this.canvas.height = buttonHeight;
					this.context = this.canvas.getContext("2d");
					
					var beforeMe = document.getElementsByTagName("button")[0];
					document.body.insertBefore(this.canvas, beforeMe);
					
					//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
					this.frameNo = 0;
					this.interval = setInterval(updateGameArea, 20);
				},
				clear : function() {
					this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				}
			}

			function component(width, height, color, x, y, type) {
				this.type = type;
				this.score = 0;
				this.width = width;
				this.height = height;
				this.speedX = 0;
				this.speedY = 0;
				this.x = x;
				this.y = y;
				this.gravity = 0;
				this.gravitySpeed = 0;
				this.update = function() {
					ctx = myGameArea.context;
					if (this.type == "text") {
						ctx.font = this.width + " " + this.height;
						ctx.fillStyle = color;
						ctx.fillText(this.text, this.x, this.y);
					} else {
						ctx.fillStyle = color;
						ctx.fillRect(this.x, this.y, this.width, this.height);
					}
				}
				this.newPos = function() {
					this.gravitySpeed += this.gravity;
					this.x += this.speedX;
					this.y += this.speedY + this.gravitySpeed;
					this.hitTop();
					this.hitBottom();
				}
				this.hitBottom = function() {
					var rockbottom = myGameArea.canvas.height - this.height;
					if (this.y > rockbottom) {
						this.y = rockbottom;
						this.gravitySpeed = 0;
					}
				}
				this.hitTop = function() {
					var top = 480;
					if (this.y <= 0) {
						console.log(top);
						this.gravitySpeed = 0;
					}
					console.log(this.y);
				}
				this.crashWith = function(otherobj) {
					var myleft = this.x;
					var myright = this.x + (this.width);
					var mytop = this.y;
					var mybottom = this.y + (this.height);
					var otherleft = otherobj.x;
					var otherright = otherobj.x + (otherobj.width);
					var othertop = otherobj.y;
					var otherbottom = otherobj.y + (otherobj.height);
					var crash = true;
					if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
						crash = false;
					}
					return crash;
				}
			}

			function updateGameArea() {
				var x,
				    height,
				    gap,
				    minHeight,
				    maxHeight,
				    minGap,
				    maxGap;
				for ( i = 0; i < myObstacles.length; i += 1) {
					if (myGamePiece.crashWith(myObstacles[i])) {
						return;
					}
				}
				myGameArea.clear();
				myGameArea.frameNo += 1;
				if (myGameArea.frameNo == 1 || everyinterval(150)) {
					x = myGameArea.canvas.width;
					minHeight = 20;
					maxHeight = 200;
					height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
					minGap = 240;
					maxGap = 400;
					gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
					myObstacles.push(new component(10, height, "green", x, 0));
					myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
				}
				for ( i = 0; i < myObstacles.length; i += 1) {
					myObstacles[i].x += -1;
					myObstacles[i].update();
				}
				myScore.text = "SCORE: " + myGameArea.frameNo;
				myScore.update();
				myGamePiece.newPos();
				myGamePiece.update();
			}

			function everyinterval(n) {
				if ((myGameArea.frameNo / n) % 1 == 0) {
					return true;
				}
				return false;
			}

			function accelerate(n) {
				myGamePiece.gravity = n;
			}
			
			function updateCanvasSize() {
				/*
				 * 1. Read the width input box
				 * 2. Read the heigh input box
				 * 3. Update acnvas width
				 * 4. Update canvas height
				 * 5. If score is not set for auto move, udpate score
				 */
				buttonWidth = document.getElementById("gameWidth").value;
				buttonHeight = document.getElementById("gameHeight").value;
				console.log(buttonWidth);
				startGame();
				
			}
