// PROG 2700 - CLIENT SIDE PROGRAMMING
// TECH CHECK #4 - DOM and SASS

// REQUIREMENT 1 - SLIDER
// Hookup the provided slider on the HTML page so that when it is changed, the GRAVITY 
// value in the application changes accordingly. You will know that the slider is working
// as the particle fountain will start to behave accordingly. Refer to the docs at 
// https://www.w3schools.com/howto/howto_js_rangeslider.asp for more information.

// REQUIREMENT 2 - DISPLAY PERCENTAGE
// Display the slider value as a percentage value on the page in the provided percentage
// SPAN tag. For example, when the slider is all the way to the left the display should
// show 0%. When the slider is all the way to the right, the display should show 100%.

// REQUIREMENT 3 - SASS COLOR VARIABLES
// Create a SASS partial file called _colors.scss. In it you will define variables for the
// currently defined colors in main.scss. You will then import the SASS partial into 
// main.scss and replace the existing colors with the newly defined variables.

// REQUIREMENT 4 - CREATE A MIXIN
// Create a mixin which will contain the four common elements found between the .slider::-webkit-range-thumb
// and .slider::-moz-range-thumb CSS selectors. The mixin should output these four values.
// The mixin should also define four parameters that will allow the four values to be set when
// calling the mixin. Replace the common elements with a call to your new mixin.

// MARKING
// 10/10 - Tech check is correct and is completed within the allotted in-class time.
//  8/10 - Tech check is correct and is completed within a 12-hour grace period beginning immediately following the end of in-class time.
//  6/10 - Tech check is correct and is completed and submitted after the 12-hour grace period has elapsed.
//  0/10 - Tech check is not submitted or not all requirements are met.


(function(){
    var DAMPING = 0.999999;
    var GRAVITY = 0.9;
    
    function Particle(x, y, color) {
      this.x = this.oldX = x;
      this.y = this.oldY = y;
      this.color = color;
    }
    Particle.prototype.integrate = function() {
      var velocity = this.getVelocity();
      this.oldX = this.x;
      this.oldY = this.y;
      this.x += velocity.x * DAMPING;
      this.y += velocity.y * DAMPING;
    };
    Particle.prototype.getVelocity = function() {
      return {
        x: this.x - this.oldX,
        y: this.y - this.oldY
      };
    };
    Particle.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
    };
    Particle.prototype.bounce = function() {
      if (this.y > height) {
        var velocity = this.getVelocity();
        this.oldY = height;
        this.y = this.oldY - velocity.y * 0.3;
      }
    };
    Particle.prototype.draw = function() {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.oldX, this.oldY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    };
    var display = document.getElementById('display');
    var ctx = display.getContext('2d');
    var drops = [];
    var width = display.width = window.innerWidth;
    var height = display.height = window.innerHeight-200;
    ctx.globalCompositeOperation = 'overlay';
    requestAnimationFrame(frame);
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function frame() {
      requestAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
      for (var j = 0; j < 5; j++) {
        if (drops.length < 5000) {
          var drop = new Particle(width * 0.5, height, getRandomColor());
          drop.move(Math.random() * 4 - 2, Math.random() * -2 - 15);
          drops.push(drop);
        }
      }
      for (var i = 0; i < drops.length; i++) {
        drops[i].move(0, GRAVITY);
        drops[i].integrate();
        drops[i].bounce();
        drops[i].draw();
      }
    }

    //PLACE YOUR CODE BELOW THIS LINE TO ADD THE REQUIRED FUNCTIONALITY

    var slider = document.getElementById("gravity_slider");
    var output = document.getElementById("percentage");
    output.innerHTML = Math.round(slider.value * 100);

    slider.oninput = function() {
      GRAVITY = Number(this.value);
      output.innerHTML = Math.round(this.value * 100);
    }

})()