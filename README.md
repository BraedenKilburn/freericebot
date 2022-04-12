# freericebot
Small JS bot to answer freerice.com questions I made to learn some Javascript and jQuery.
Based on [this repo](https://github.com/eholcom/FreeRice).


### How to Run
- Go to [FreeRice](https://freerice.com).
- Turn AdBlock off so they can buy the rice.
- Specify the [Multiplication Table category](https://freerice.com/categories).
- On the questions page, open the console (F12).
- Click on the "Console" tab (between "Elements" and "Sources").
- Copy and paste contents of [freericebot.js](https://raw.githubusercontent.com/nhtsai/freericebot/master/freericebot.js) into the console.
- Specify the amount of rice wanted (in grains).
    - The default amount of rice earned by the script is 30 grains.
    - To change this, enter the desired amount of rice earned as an argument in `bot.run()`.

    - Note: The bot may undercount due to the gradual increase of rice earned counter.
- Press enter and let the bot earn you some rice, every 6 to 8 seconds.
- Eat rice.

To rerun the program again, simply enter `bot.run()` in the *same* console to begin earning more rice.
- You may update the amount of rice earned as a parameter in `bot.run()`
    - For example, `bot.run(100);`
