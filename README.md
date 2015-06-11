Udacity Front-End Web Developer Nanodegree: Project 3 - Frogger Game
====================================================================

To run the frogger game, download files from github and open index.html
in your favorite modern web browser.

Player sprite is chosen randomly each time the player resets. When a player
collides with an enemy, the player resets. Additionally, whenever the
player successfully reaches the goal row (at the top, with gems), the
player resets. Gems in the top row are for visual effect only, and have
no associated in-game functionality.

Collision detection is extremely simplistic: each enemy and the player
are assigned to a containing tile based on their (x, y) coordinates; if 
an enemy and player share a common tile, the player is reset. Enemies
do not collide with each other.