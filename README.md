# HLDS logger :bomb:

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

HLDS log is nodejs package for advanced usage of remote HLDS server logging.

HLDS log provides you:
  - safe text parsing from remote host
  - usage of server native events like bomb plants, defuse etc
  - event based system

Example of server event invoked by client chat:
``` log L 05/31/2020 - 11:08:13: "kalle<1><STEAM_ID_LAN><CT>" say "hello"```

```js
 { event: 'say',
  player:
   { name: 'kalle',
    id: '1',
    steamid: 'STEAM_ID_LAN',
    side: 'CT',
    message: 'hello' },
  time: { ss: '13', mm: '08', hh: '11' },
  date: { dd: '31', mm: '05', yy: '2020' } } 
```
### Installation
HLDS log requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
$ npm install hlds-log
```

And thats it.


## Supported events
|     Event     |      Supported     |                                                              Note                                                              |
|:-------------:|:------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
|  hlds_connect | :white_check_mark: |                      Event fires on first log message from remote server, can be used with `Event.once()`                      |
|      raw      | :white_check_mark: | Prints raw server message (default false)                                                                                      |
|      kill     | :white_check_mark: | Event with information about killer and victim                                                                                 |
|      say      | :white_check_mark: | Chat event with sender message and information                                                                                 |
|    say_team   | :white_check_mark: | Team chat event with =\|=                                                                                                      |
|     enter     | :white_check_mark: | Player connected to server                                                                                                     |
|    connect    | :white_check_mark: | Player is fully connected to the server                                                                                        |
|      join     | :white_check_mark: | Player is switching team sides                                                                                                 |
|     leave     | :white_check_mark: | Player left the server                                                                                                         |
|   round_end   | :white_check_mark: | Indicates that round is over with specific reason ex. mission fail time, bomb explode, hostages rescued, other team is dead... |
|   end_score   | :white_check_mark: | Last message before level is changed, contains team scores.                                                                    |
| server_action | :white_check_mark: | Actions triggered by server which affects every player  ex. bomb explode, bomb defused etc                                     |
| player_action | :white_check_mark: | Action by player ex bomb pickup, drop, start defusing, stop defusing etc                                                       |
| map_change    | :white_check_mark: | Info who changed map and which map is next                                                                                     |
| map_start     | :white_check_mark: | Info when map is fully loaded                                                                                                  |
| cvar          |         :x:        | Map cvars // TODO      


### Development

Want to contribute? Great!

### Known bugs

### Todos

 - Write tests
 - Write more examples
 - Finish TODO's

License
----
MIT

