# Auto CookieClicker v0.1

This is a simple CookieClicker auto clicker. It will successfully get you through early game ascension without intervention (e.g. 3 ascensions in and 5 heavenly chips in 36hrs when starting from scratch). The current buy-strategy is not optimized.

## Install
- Open CC
- Open browser debugger console (F12)
- Run: auto.off() if you already have the script running (this ensures that all JS intervals are shut down)
- Paste in the code
- Run: auto.on()

## Usage
Once installed:
- auto.on()/off() - turn on/off all auto functions
- auto.start<feature>(), auto.stop<feature>() - use to start/stop individual automations
- Check out the console log to see what will be bought next and why

## Features
- Auto buy buildings and upgrades based on 'best' benefit to CPS that will be purchasable in the next 10 minutes
- Continually clicks cookie (1 click per 500ms)
- Faster cookie clicks when hovering over cookie (Not super fast)
- Auto clicks shimmers

## Future Features
- Convert to CC mod and switch from JS intervals to mod-hooks
- Add Cursor and Grandma meta buy strat (current doesn't know about upgrade unlock thresholds)
- Add strats for other things like lumps harvest/upgrade, ascension, etc. 
- Auto CookieClicker stats/controls
- Better early game (from 0) buy strat (for ascension)
- Add cost-benfit calculator for non-building upgrade (%CPS upgrades). Note: current version has a separate upgrade buyer loop that just buys upgrades when it can afford it. This 'works' but steals buys from the main building/upgrade buyer. 
- Buy strat selection + more strategies
