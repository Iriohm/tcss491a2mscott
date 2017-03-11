# tcss491a2mscott
Technically assignments two and three together.

The project is intended to demonstrate emergent behavior using various colors of balls. Clicking 
a square on the right-hand side will spawn a ball of that color somewhere in the demonstration 
area. Additionally, clicking SAVE will save the state to the external database, while LOAD will 
retrieve the state from that database. Clicking the red X will clear the demonstration area.

All colors of balls will bounce off the walls of the demonstration area, or in the middle if they 
get pushed outside. Beyond that, however, each color of ball has a different sort of behavior 
associated with it. The behaviors are as follows:

	WHITE - White balls will bounce around at a set speed in a set direction. If they encounter 
	another ball, they'll bounce away from that ball.
	
	RED - Red balls move slower than other balls, and will actively seek out the nearest non-red 
	ball. Red balls will consume other balls if they get close enough. If pushed together, they'll 
	even consume each-other!
	
	GREEN - Green balls are similar to white balls in that they bounce off others. When a green ball 
	bounces, however, it will also get a short boost in speed.
	
	BLUE - Blue balls have inertia, and will not move unless another ball knocks into them. After 
	bouncing a short ways, they will return to a stand-still.
	
	YELLOW - Yellow balls bounce like white balls, but upon collision with other balls will split 
	into four smaller, faster yellow balls. Yellow balls can only split once, to avoid drops in 
	framerate.
	
	CYAN - Cyan balls bounce like white balls, but also mirror other cyan balls. If one cyan ball 
	hits another ball, all the cyan balls in the demonstration area will change to match its speed 
	and direction.
	
	RAINBOW - The mythical RAINBOW ball, which must always be referred to in all-caps. RAINBOW balls 
	will randomize their position and direction every time they collide with another ball. Additionally, 
	RAINBOW balls will change the color of other non-RAINBOW balls they come in contact with, thereby 
	changing their behavior as well.