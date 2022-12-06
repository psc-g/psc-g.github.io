---
title: "PongDay"
date: 2022-12-05T08:06:25+06:00
hero: /posts/misc/pongday/banner.gif
description: "PongDay"
menu:
  sidebar:
    name: PongDay
    identifier: pongday
    parent: misc
    weight: 10
---

I learned on the radio that last November 29th marked the 50th anniversary of the classic arcade game Pong. This game is particularly meaningful for those of us that do RL research, as it is one of the games that is part of the [Arcade Learning Environment](https://jair.org/index.php/jair/article/view/10819), one of the most popular benchmarks. Pong is probably the easiest game of the whole suite, so we often use it as a test to make sure our agents are learning. Learning curves below are for agents trained with the [Dopamine](https://github.com/google/dopamine) framework.

Original Pong console | Learning curves when training Pong with various Dopamine agents
:--------------------:|:-------------------------------------------------------------------------------------:
{{< img src="/posts/misc/pongday/pongConsole.jpeg" width="70%" title="Pong Console" align="center" >}} | {{< img src="/posts/misc/pongday/scores.png" width="70%" title="Atari scores" align="center" >}}

<br>

There have been a number of RL success stories in the past few years, and one of the most recent ones is OpenAI's [ChatGPT](https://chat.openai.com/chat), which is, in my opinion, the most impressive and potentially useful interactive language model to date. Of course, as with any large language model, there are many issues with it that as a community we will need to navigate.

A key component of ChatGPT was RL, which was used to better ``align'' GPT-3 (well, apparently it's a new version called GPT-3.5) using RLHF (RL from Human Feedback). As far as we know, the techniques used are those detailed in the [InstructGPT paper](https://arxiv.org/abs/2203.02155).

## Final game

I decided to use ChatGPT to write a browser version of Pong as quickly as possible. _It took me just 20 minutes_, and most of the time was spent adding sound and minor tweaks! I'm truly impressed. Here's the final game, and you can read about my process below. You control the left paddle by moving your mouse.

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/0.7.1/Tone.min.js"></script>
<script src="/posts/misc/pongday/final.js"></script>

<div align="center" id="finalPong">
<code>
  <button id="soundButton" onclick="triggerSound()">Sound Off</button><br>
</code>
</div>

## The process

I'll show the process I took to make the game above. It's a little annoying to get p5.js to draw multiple canvases on the same page, so I won't have interactive canvases below, just videos of the resulting games. If you want to try these out yourself you can use something like [glitch](https://glitch.com/) (in fact, glitch is what I used to test this out!).

### Initial game
I started with a simple prompt:

> **> Write a p5.js program that replicates the classic Atari game Pong**
>> _Here is a simple p5.js program that replicates the classic Atari game Pong:_
>> 
>> ```
>> // Create the canvas
>> function setup() {
>>   createCanvas(400, 400);
>> }
>> 
>> // Draw the game objects
>> function draw() {
>>   background(0);
>>   fill(255);
>> 
>>   // Draw the paddles
>>   rect(10, mouseY - 50, 10, 100);
>>   rect(width - 20, height / 2 - 50, 10, 100);
>> 
>>   // Draw the ball
>>   ellipse(width / 2, height / 2, 10, 10);
>> }
>> ```
>> This program creates a canvas and then uses the draw() function to continuously update the game objects on the screen. The paddles are drawn as rectangles that follow the position of the mouse cursor (for the left paddle) and the center of the screen (for the right paddle). The ball is drawn as a small circle in the center of the screen.
>> 
>> To make the game more interactive, you could add movement to the ball, detect when the ball hits the paddles or the edges of the screen, and keep score. You could also add controls to allow the player to move the right paddle up and down.

That generated a "game" where you could move the left paddle, but the ball and right paddle remained fixed:

{{< img src="/posts/misc/pongday/first.gif" title="First attempt" align="center" >}}

### Adding interactivity

It is already hinting at what you could do to make it more interactive, so I just went ahead and asked it to do this:

> **> ok, but make it playable**
>> Here is a more complete version of the Pong game in p5.js that is more interactive and playable:
>> ```
>> // Constants for game objects
>> const PADDLE_WIDTH = 10;
>> const PADDLE_HEIGHT = 100;
>> const BALL_SIZE = 10;
>> 
>> // Game state variables
>> let leftPaddleY = 200;
>> let rightPaddleY = 200;
>> let ballX = 200;
>> let ballY = 200;
>> let ballSpeedX = 5;
>> let ballSpeedY = 5;
>> let leftScore = 0;
>> let rightScore = 0;
>> 
>> // Create the canvas
>> function setup() {
>>   createCanvas(400, 400);
>> }
>> 
>> // Draw the game objects
>> function draw() {
>>   background(0);
>>   fill(255);
>> 
>>   // Draw the paddles
>>   rect(10, leftPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>>   rect(width - 20, rightPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>> 
>>   // Draw the ball
>>   ellipse(ballX, ballY, BALL_SIZE, BALL_SIZE);
>> 
>>   // Move the paddles with the mouse
>>   leftPaddleY = mouseY;
>> 
>>   // Move the ball
>>   ballX += ballSpeedX;
>>   ballY += ballSpeedY;
>> 
>>   // Check if the ball hits the left paddle
>>   if (ballX - BALL_SIZE / 2 < PADDLE_WIDTH &&
>>       ballY > leftPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < leftPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the right paddle
>>   if (ballX + BALL_SIZE / 2 > width - PADDLE_WIDTH &&
>>       ballY > rightPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < rightPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the top or bottom edge
>>   if (ballY - BALL_SIZE / 2 < 0 || ballY + BALL_SIZE / 2 > height) {
>>     ballSpeedY = -ballSpeedY;
>>   }
>> 
>>   // Check if the ball hits the left or right edge
>>   if (ballX < 0) {
>>     rightScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   } else if (ballX > width) {
>>     leftScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   }
>> 
>>   // Draw the score
>>   textSize(32);
>>   text(leftScore, width / 4, height / 8);
>>   text(rightScore, 3 * width / 4, height / 8);
>> }
>> 
>> // Move the right paddle with the up and down arrow keys
>> function keyPressed() {
>>   if (keyCode === UP_ARROW) {
>>     rightPaddleY -= 10;
>>   } else if (keyCode === DOWN_ARROW) {
>>     rightPaddleY += 10;
>>   }
>> }
>> ```
>> This program uses several

Although there's some dangling text at the end, the code produced is actually a
self-playable game, where you can control the left paddle with the mouse, and
the right paddle with the arrow keys. Quite neat!

{{< img src="/posts/misc/pongday/second.gif" title="Second attempt" align="center" >}}

### Speed up right paddle

It's kind of hard to play with the right paddle as it moves so slowly, so I
asked ChatGPT to fix this:

> **> can you make the right paddle move faster?**
>> To make the right paddle move faster in the Pong game, you can increase the amount by which the rightPaddleY variable changes in the keyPressed() function. For example, you could change the line rightPaddleY -= 10; to rightPaddleY -= 20; to double the speed of the right paddle. You can adjust the value to achieve the desired speed.
>> 
>> Here is the updated keyPressed() function with the increased paddle speed:
>> ```
>> // Move the right paddle with the up and down arrow keys
>> function keyPressed() {
>>   if (keyCode === UP_ARROW) {
>>     rightPaddleY -= 20; // Increase the speed by changing 10 to 20
>>   } else if (keyCode === DOWN_ARROW) {
>>     rightPaddleY += 20; // Increase the speed by changing 10 to 20
>>   }
>> }
>> ```
>> You can adjust the value of the speed increase to your liking. You could also add a variable to control the speed and then adjust the speed by changing the value of that variable.

Nice suggestions, and I really like that it just indicates the function that needs to be changed (instead of reprinting the whole code). The resulting game is much more playable with the right paddle:

{{< img src="/posts/misc/pongday/third.gif" title="Third attempt" align="center" >}}

### Automated right paddle

Self-play Pong is not that fun, I'd rather have the right-side play automatically:

> **> can you make the right paddle play automatically?**
>> To make the right paddle play automatically in the Pong game, you can use the ballY variable to control the movement of the right paddle. You can set the rightPaddleY variable to the ballY position to make the right paddle follow the ball.
>> 
>> Here is an updated version of the draw() function that makes the right paddle play automatically:
>> ```
>> // Draw the game objects
>> function draw() {
>>   background(0);
>>   fill(255);
>> 
>>   // Draw the paddles
>>   rect(10, leftPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>>   rect(width - 20, rightPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>> 
>>   // Draw the ball
>>   ellipse(ballX, ballY, BALL_SIZE, BALL_SIZE);
>> 
>>   // Move the paddles with the mouse
>>   leftPaddleY = mouseY;
>> 
>>   // Make the right paddle follow the ball
>>   rightPaddleY = ballY;
>> 
>>   // Move the ball
>>   ballX += ballSpeedX;
>>   ballY += ballSpeedY;
>> 
>>   // Check if the ball hits the left paddle
>>   if (ballX - BALL_SIZE / 2 < PADDLE_WIDTH &&
>>       ballY > leftPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < leftPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the right paddle
>>   if (ballX + BALL_SIZE / 2 > width - PADDLE_WIDTH &&
>>       ballY > rightPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < rightPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the top or bottom edge
>>   if (ballY - BALL_SIZE / 2 < 0 || ballY + BALL_SIZE / 2 > height) {
>>     ballSpeedY = -ballSpeedY;
>>   }
>> 
>>   // Check if the ball hits the left or right edge
>>   if (ballX < 0) {
>>     rightScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   } else if (ballX > width) {
>>     leftScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   }
>> 
>>   // Draw the score
>>   textSize(32);
>>   text(leftScore, width / 4, height / 8);
>>   text(rightScore, 3 * width / 4, height / 8);
>> }
>> ```
>> In this updated version, the rightPaddleY variable is set to the ballY position in the draw() function, so the right paddle will automatically follow the ball. This means that the player will only need to control the left paddle with the mouse, and the right paddle will move automatically.

{{< img src="/posts/misc/pongday/fourth.gif" title="Fourth attempt" align="center" >}}

### Changing the background

I wanted a different coloured background:

> **> can you make the background brown?**
>> To change the background color of the Pong game to brown, you can use the background() function in the draw() function to set the color of the background to a brown color. The background() function takes a single argument that specifies the color of the background.
>>
>> Here is an updated version of the draw() function that sets the background color to brown:
>> ```
>> // Draw the game objects
>> function draw() {
>>   background(165, 42, 42); // Set the background color to brown
>> 
>>   fill(255);
>> 
>>   // Draw the paddles
>>   rect(10, leftPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>>   rect(width - 20, rightPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
>> 
>>   // Draw the ball
>>   ellipse(ballX, ballY, BALL_SIZE, BALL_SIZE);
>> 
>>   // Make the right paddle follow the ball
>>   rightPaddleY = ballY;
>> 
>>   // Move the ball
>>   ballX += ballSpeedX;
>>   ballY += ballSpeedY;
>> 
>>   // Check if the ball hits the left paddle
>>   if (ballX - BALL_SIZE / 2 < PADDLE_WIDTH &&
>>       ballY > leftPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < leftPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the right paddle
>>   if (ballX + BALL_SIZE / 2 > width - PADDLE_WIDTH &&
>>       ballY > rightPaddleY - PADDLE_HEIGHT / 2 &&
>>       ballY < rightPaddleY + PADDLE_HEIGHT / 2) {
>>     ballSpeedX = -ballSpeedX;
>>   }
>> 
>>   // Check if the ball hits the top or bottom edge
>>   if (ballY - BALL_SIZE / 2 < 0 || ballY + BALL_SIZE / 2 > height) {
>>     ballSpeedY = -ballSpeedY;
>>   }
>> 
>>   // Check if the ball hits the left or right edge
>>   if (ballX < 0) {
>>     rightScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   } else if (ballX > width) {
>>     leftScore++;
>>     ballX = width / 2;
>>     ballY = height / 2;
>>   }
>> 
>>   // Draw the score
>>   textSize(32);
>>   text(leftScore, width / 4, height / 8);
>>   text(rightScore, 3 * width / 4, height / 8);
>> }
>> ```
>> In this updated version, the background() function is called with the color value 165, 42, 42, which corresponds to a brown color. This will set the background color of the game to brown.
>> 
>> Note that the background() function expects the color to be specified in RGB (red, green, blue) format, with each value ranging from 0 to 255. The color value 165, 42, 42 has high values for red and low values for green and blue, which creates a brown color.

Although it explained what to do quite nicely, it ended up dropping the line that makes the left paddle follow the mouse:

{{< img src="/posts/misc/pongday/fifth.gif" title="Fifth attempt" align="center" >}}

I ended up just copying the `background(165, 42, 42);` line to the code I had before.

## Finishing touches

I wanted to add sound and make the right paddle a bit more interesting, but at this point ChatGPT stopped responding:

> **> make the right paddle make mistakes sometimes**
>> `An error occurred. If this issue persists please contact us through our help center at help.openai.com.`

So from here on out I added things manually. Up to this point I had spent less than 5 minutes, and the rest of the 20 minutes were spent adding sounds with Tone.js, a button to toggle sound, and adding some randomness to the right paddle to make play a bit more interesting.

Overall, I was left quite impressed with the whole process. These AI tools can be quite powerful and can really enhance one's workflow _if used properly_. As always, with great power comes great responsibility, so I hope we continue to evaluate these tools with a healthy dose of skepticism.
