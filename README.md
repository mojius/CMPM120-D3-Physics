A simple physics-based platformer with a silly minigame in the middle. By Ben Daly.


[See the Google Slides here.](https://docs.google.com/presentation/d/1berKv61c_eiWXJdXgQ6atRZDz7-mQfoV_u4fOaqsti0/edit#slide=id)


Process requirements:
	-**Your GitHub repository must show a history of incremental commits with useful commit messages, tracing back to an empty repository at the start.**
		-I have at least two commits, one with the game finished and one adding the readme.
	-**Where to play your game (a link to your deployed game)**
		-You can play it [here.](https://mojius.github.io/CMPM120-D3-Physics)

	-**How your design satisfies the experience requirements below**
		-**The game uses both continuous and discrete inputs from the player. **
			-It has discrete inputs, like pressing a certain key that I will not name to progress (you'll know if you play it). Continuous-type inputs are collected in the platforming levels.
		-**The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).**
			-In two levels, the player's goal can only be achieved by platforming the character to the goal.
			-In one level, the physics engine is also used to move key objects OUT of position via contact so you can see the background.
		-**3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).**
			-Count the levels in the game, there's three of them. Two platforming and one special one.
		-**Other scenes are used to separate and contextualize the gameplay scenes**
			-Basically. I have 3 clear screens. They don't say much, but still.
		
		
		
		
	-**How all of your data assets (if you have any) were created**
		-All art was made by me in GIMP (with Paint.NET for help sometimes).
		-The transition screens were slap-dashed together in Google Slides.
		