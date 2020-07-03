/*jshint esversion: 6 */

interface EventObject {
  event: string,
  killer?: KillerType,
  victim?: VictimType,
  date?: DateType,
  time?: TimeType,
  player?: PlayerType,
  team?: string,
  score?: string,
  playersNumber?: string,
  triggerType?: string,
  cvarName?: string,
  cvarValue?: string,
  kickInvoker?: string,
}

interface KillerType {
  name: string,
  id: string,
  steamid: string,
  side: string,
  weapon: string
}

interface VictimType {
  name: string,
  id: string,
  steamid: string,
  side: string
}

interface PlayerType {
  name: string,
  id: string,
  steamid: string,
  side?: string,
  message?: string,
  targetSide?: string,
  address?: string,
  team?: string
}

interface TimeType {
  ss: string,
  mm: string,
  hh: string,
}
interface DateType {
  dd: string,
  mm: string,
  yy: string,
}

const killAction = (line: String) : EventObject | null => {
  // log L 12/01/2019 - 18:22:48: "Rock<21><BOT><TERRORIST>" killed "Gunner<12><BOT><CT>" with "glock18"
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><([A-Z]+)>" killed "(.+)<(\d+)><(.+)><([A-Z]+)>" with "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "kill",
    killer: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10],
      weapon: items[15].toString().replace(/\0[\s\S]*$/g,'')
    },
    victim: {
      name: items[11],
      id: items[12],
      steamid: items[13],
      side: items[14]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const say = (line: String) : EventObject | null  => {
  //log L 12/07/2019 - 22:19:32: "GB Hoster Player<1><STEAM_ID_LAN><SPECTATOR>" say "yaaa"
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><([A-Z]+)>" say "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "say",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10],
      message: items[11]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const say_team = (line: String) : EventObject | null => {
  //log L 12/07/2019 - 22:19:34: "GB Hoster Player<1><STEAM_ID_LAN><SPECTATOR>" say_team "aaaa"
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><([A-Z]+)>" say_team "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "say_team",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10],
      message: items[11]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const join = (line: String) : EventObject | null => {
  //log L 12/08/2019 - 13:48:05: "GB Hoster Player<41><STEAM_ID_LAN><CT>" joined team "TERRORIST"
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><(.*)>" joined team "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "join",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10],
      targetSide: items[11]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const disconnected = (line: String) : EventObject | null => {
  //log L 12/08/2019 - 14:27:18: "Zach<113><BOT><TERRORIST>" disconnected
  //log L 12/16/2019 - 22:00:27: "Quintin<-1><><TERRORIST>" disconnected
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(.*)><(.*)><(.*)>" disconnected/i
  );

  if(!items) return null;

  return {
    event: "leave",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const enter = (line: String) : EventObject | null => {
  //log L 12/08/2019 - 14:27:18: "Zach<113><BOT><TERRORIST>" disconnected
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><>" entered the game/i
  );

  if(!items) return null;

  return {
    event: "enter",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const map_end = (line: String) : EventObject | null => {
  //L 12/15/2019 - 20:23:48: Team "CT" scored "1" with "10" players
  //L 12/15/2019 - 20:23:48: Team "TERRORIST" scored "0" with "11" players
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Team "([A-Z]+)" scored "(.+)" with "(.+)" players/i
  );

  if(!items) return null;

  return {
    event: "end_score",
    team: items[7],
    score: items[8],
    playersNumber: items[9],
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};
const triggerChoose = (line: String) => {
  //log L 12/15/2019 - 22:56:20: Team "CT" triggered "CTs_Win" (CT "2") (T "0") -> team
  let items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Team "([A-Z]+)" triggered "(.+)" \(CT "(.+)"\) \(T "(.+)"\)/i
  );
  if (items != null) {
    return roundEnd(items);
  }

  //log L 12/15/2019 - 23:07:07: "Gunner<358><BOT><TERRORIST>" triggered "Dropped_The_Bomb" -> player
  items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><(.+)>" triggered "(.+)"/i
  );
  if (items != null) {
    return playerAction(items);
  }

  //log L 12/15/2019 - 23:06:36: World triggered "Round_Start" -> server
  items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): World triggered "(.+)"/i
  );
  if (items != null) {
    return serverAction(items);
  }
};

const roundEnd = (items: Array<string>) => {
  return {
    event: "round_end",
    team: items[7],
    eventName: items[8],
    score: {
      CT: items[9],
      TT: items[10]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const playerAction = (items: Array<string>) => {
  return {
    event: "player_action",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      side: items[10],
      eventName: items[11]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const serverAction = (items: Array<string>) => {
  return {
    event: "server_action",
    eventName: items[7],
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const connect = (line: String) : EventObject | null => {
  //log L 12/16/2019 - 21:12:09: "GB Hoster Player<109><STEAM_ID_LAN><>" connected, address "loopback"
  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><>" connected, address "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "connect",
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      address: items[10]
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const mapChoose = (line: string) => {
  //log L 12/16/2019 - 21:40:42: Loading map "cs_backalley"
  let items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Loading map "(.+)"/i
  );

  if (items != null) {
    return mapChange(items);
  }

  //log L 12/16/2019 - 21:47:37: Started map "de_airstrip" (CRC "479146630")
  items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Started map "(.+)" \(CRC "(.+)"\)/i
  );

  if (items != null) {
    return mapStarted(items);
  }
};

const mapChange = (items: Array<string>) => {
  return {
    event: "map_change",
    mapName: items[7],
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const mapStarted = (items: Array<string>) : Object  => {
  return {
    event: "map_start",
    mapName: items[7],
    CRC: items[8],
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const suicide = (line: String) : EventObject | null => {

  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): "(.+)<(\d+)><(.+)><(.+)>" committed suicide with "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "suicide",
    triggerType: items[11],
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
      team: items[10],
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};


const shutdown = (line: String) : EventObject | null  => {

  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Server shutdown/
  );

  if(!items) return null;

  return {
    event: "shutdown",
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

const _closed = (line: String) : EventObject | null =>{

  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Log file closed/
  );

  if(!items) return null;

  return {
    event: "log_off",
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};



const cvar = (line: String) : EventObject | null  => {
    //log L 12/16/2019 - 22:20:09: Server cvar "mp_friendlyfire" = "0"
    const items = line.match(
      /Server cvar "(.+)" = "(.*)"/i
    );

    if(!items) return null;
  
    return {
      event: "_cvar",
      cvarName: items[1],
      cvarValue: items[2],
      
    };
};


const kick = (line: String) : EventObject | null => {

  // log L 07/01/2020 - 22:18:59: Kick: "Bot1g<4><STEAM_ID_LAN><>" was kicked by "kalle"

  const items = line.match(
    /log L ([0-9]{2})\/([0-9]{2})\/([0-9]{4}) - ([01]?\d|2[0-3]):([0-5]\d):([0-5]\d): Kick: "(.+)<(\d+)><(.+)><>" was kicked by "(.+)"/i
  );

  if(!items) return null;

  return {
    event: "kick",
    kickInvoker: items[10],
    player: {
      name: items[7],
      id: items[8],
      steamid: items[9],
    },
    time: {
      ss: items[6],
      mm: items[5],
      hh: items[4]
    },
    date: {
      dd: items[2],
      mm: items[1],
      yy: items[3]
    }
  };
};

module.exports = {
  killed: killAction,
  say,
  say_team,
  joined: join,
  disconnected,
  entered: enter,
  scored: map_end,
  triggered: triggerChoose,
  "connected,": connect,
  map: mapChoose,
  suicide,
  shutdown,
  closed: _closed,
  cvar,
  kicked: kick,
};
