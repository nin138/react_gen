import {ChildProcess, spawn} from "child_process";
import {ENCODING} from "../files/FileManager";


export const execCommand = (
    command: string,
    options: Array<string> = [],
    path: string,
    onStdout: (str: string) => void,
    onStderr: (str: string) => void): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cp = spawn(command, options, { cwd: path });
    cp.stdout.setEncoding(ENCODING);
    cp.stderr.setEncoding(ENCODING);
    cp.stdout.on("data", onStdout);
    cp.stderr.on("data", onStderr);
    cp.on("error", (e) => { reject(e); });
    cp.on("close", () => { resolve("ok"); });
  });
};



class ServerManager {
  private server: ChildProcess | undefined;
  isServerRunning = (): boolean => (this.server !== undefined);
  disconnect = () => {
    if(this.server) {
      console.log(this.server);
      this.server.kill();
      this.server = undefined;
    }
  };
  connect = (path: string) => {
    const server = spawn("npm", ["run", "server"], { cwd: path });
    server.stdout.setEncoding(ENCODING);
    server.stderr.setEncoding(ENCODING);
    server.stdout.on("data", (str) => console.log("server::stdout::" + str));
    server.stderr.on("data", (str) => console.log("server::stderr::" + str));
    server.on("error", (e) => { throw(e); });
    server.on("close", () => { this.server = undefined; } );
    this.server = server;
  };
}

export const serverManager = new ServerManager();
