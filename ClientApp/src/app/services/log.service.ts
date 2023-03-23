import {Injectable} from '@angular/core';
import {LogLevel} from "../utils/log-level.enum";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logLevel: LogLevel;
  constructor() {
    this.logLevel = environment.logLevel;
  }

  trace(msg: string, ...data: any[]){
    console.log(this.logLevel)
    if(this.logLevel <= LogLevel.Trace){
      if(data && data.length >0){
        console.log(msg, data);
      } else {
        console.log(msg);
      }
    }
  }

  debug(msg: string, ...data: any[]){
    if(this.logLevel <= LogLevel.Debug){
      if(data && data.length >0){
        console.log(msg, data);
      } else {
        console.log(msg);
      }
    }
  }

  info(msg: string, ...data: any[]){
    if(this.logLevel <= LogLevel.Info){
      if(data && data.length >0){
        console.log(msg, data);
      } else {
        console.log(msg);
      }
    }
  }

  warn(msg: string, ...data: any[]){
    if(this.logLevel <= LogLevel.Warn){
      if(data && data.length >0){
        console.warn(msg, data);
      } else {
        console.warn(msg);
      }
    }
  }

  error(msg: string, ...data: any[]){
    if(this.logLevel <= LogLevel.Error){
      if(data && data.length >0){
        console.error(msg, data);
      } else {
        console.error(msg);
      }
    }
  }
}
