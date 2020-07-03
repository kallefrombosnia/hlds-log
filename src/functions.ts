/*jshint esversion: 6 */

const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const EventEmitter = require("events");
const regexInput = require("./types/regex");
const helper = require("./helpers/helper");

interface CvarObject {
  cvarName: string,
  cvarValue: string
}

class HLDS_Log extends EventEmitter {

  constructor(port: Number, raw: Boolean = false, cvarEmitWaitTime: Number = 10000) {
    super();
    this.raw = raw;
    this.port = port;
    this.cvarEmitWaitTime = cvarEmitWaitTime;
    this.cvarList = [];
  }

  start() {
    this.onError();
    this.messageParser();
    this.listenSocket();
    this.bindPort(this.port);

    this.once("_cvar", (info: String) => {
      setTimeout(() =>{
        this.emit('cvarsDone', {cvars: this.cvarList});
      }, this.cvarEmitWaitTime);
    });

    this.on("_cvar", (info: CvarObject) => {
      this.setCvars(info.cvarName, info.cvarValue);
    });
  }

  onError() {
    server.on("error", (err: Event) => {
      this.emit('error', err);
      server.close();
    });
  }

  messageParser() {
    server.on("message", (msg: Buffer, info: Object) => {
      const message = (msg as Buffer).toString("ascii").replace(/[\n\t\r]/g, "");
      // fire 'hlds_connect' on first message
      this.emit("hlds_connect", info);

      if(this.raw) this.emit('raw', msg.toString("ascii"));
      this.regexSearch(message.split(" "), message);
    });
  }

  listenSocket() {
    server.on("listening", () => {
      const address = server.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });
  }

  regexSearch(array: Array<string>, line: string) { 
    try{
      regexInput.forEach((parameter: string) => {
        if (array.includes(parameter)) {
          const type = helper[parameter.replace(/\0.*$/g, "")](line);
          this.emit(type.event, type);
        }
      });
    } catch (error) {
      console.error('Error spotted: ' + error);
      this.emit('error', error);
    }
  }

  setCvars(cvarName: string, cvarValue: string) {
    return this.cvarList.push([cvarName, cvarValue]);
  }

  bindPort(port: number) {
    server.bind(port);
  }
}

export default HLDS_Log;

