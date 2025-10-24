import {Server as Httpserver} from "node:http"
import { TokenEnum } from "../../utils/security/token";
import { Server,Socket } from "socket.io";
import { decodedtoken } from "../../utils/security/token";
import { IAuthSocket } from "./gateway.dto";
import { Chatgateway } from "../chat/chat.gateway";


export const intialize =(httpserver:Httpserver)=>{
   
    
    const io = new Server(httpserver, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    
 
    
    
    
    const connectionsockets=new Map<string,string[]>();
    //middleware socket 
    io.use(async(socket: IAuthSocket, next) => {
      try {
        const {user,decoded}= await
         decodedtoken({authorization:socket.handshake.auth.authorization ,
          tokentype:TokenEnum.ACCESS});
          const usertabs=connectionsockets.get(user._id.toString())||[]
          usertabs.push(socket.id);
    
          connectionsockets.set(user.id.toString(),usertabs);
          socket.credentials={user,decoded}
          next();
      } catch (error:any) {
        next(error);
      }
    })
    

    //disconnection function
    function disconnection (socket:IAuthSocket){
      socket.on("disconnect",()=>{
       const userId=socket.credentials?.user._id?.toString()as string;
       let remainingtabs = connectionsockets.get(userId)?.filter((tab)=>{
        return tab !==socket.id;
       })||[];
       if (remainingtabs.length){
        connectionsockets.set(userId,remainingtabs)
       }else{
        connectionsockets.delete(userId)
       }
       console.log(connectionsockets.get(userId));
       console.log(connectionsockets)
      })

    }


    //chatgateway
    const chatgateway=new Chatgateway();
    //connection 
    io.on("connection", (socket: IAuthSocket) => {
      console.log(connectionsockets);
      
      chatgateway.register(socket)



      disconnection(socket);
     //socket.to(connectionsockets[connectionsockets.length=2]as string)
    // .emit("product",{productId:"63e5c1d1b5d9c5d9c5d9c5d9",productname:"laptop"});
    });
    
    /*io.of("/admin").on("connection", (socket: Socket) => {
      console.log("admin channel", socket.id);
    
      socket.on("disconnect", () => {
        console.log(`logout from::: ${socket.id} `);
      });
    });*/
    
 
    
}