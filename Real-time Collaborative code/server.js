// Import the installed packages
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
app.use(cors())

const server = http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const socketIDUserMap={}
const platformIDCodeMap={}

async function getUsersinPlatfom(platformId,io){
    const socketlist=await io.in(platformId).allSockets()
    const userlist=[]
    socketlist.forEach((each=>{
        (each in socketIDUserMap)&& userlist.push
        (socketIDUserMap[each].username)
    }))
    return userlist
}

async function updateUsersListandCodeMap(io,socket,platformId){
    socket.in(platformId).emit("member left",{username:socketIDUserMap[socket.id].username})
    //update the user list
    delete socketIDUserMap[socket.id]
    const userlist=await getUsersinPlatfom(platformId,io)
    socket.in(platformId).emit("updating client list",{userlist:userlist})
    userlist.length === 0 && delete platformIDCodeMap[platformId]
}

io.on("connection",function(socket){
    console.log('A user connected',socket.id)
    socket.on("When a user joins",async({username,platformId}) =>{
        console.log("username:",username)
        socketIDUserMap[socket.id]={username}
        socket.join(platformId)
        const userlist=await getUsersinPlatfom(platformId,io)
        //for other user
        socket.in(platformId).emit("updating client list",{userlist:userlist})
        //for this user
        io.to(socket.id).emit("updating client list",{userlist:userlist})
        //send the latest ode changes to this user when joined to existing platform
        if(platformId in platformIDCodeMap)
        {
           io.to(socket.id).emit("on language change",{languageUsed:platformIDCodeMap[platformId].languageUsed})
           io.to(socket.id).emit("on code change",{code:platformIDCodeMap[platformId].code})
        }
        //alerting other users in room that new user joined
        socket.in(platformId).emit("new member joined",{username})

    })
    //Updating the current value stored for each platform
    socket.on("update language",({platformId,languageUsed})=>{
        console.log("language:",languageUsed)
        if(platformId in platformIDCodeMap){
            platformIDCodeMap[platformId]['languageUsed']=languageUsed
        }else{
            platformIDCodeMap[platformId]={languageUsed}
        }
    })
    //for users to get the latest the changes
    socket.on("syncing the language",({platformId})=>{
        if(platformId in platformIDCodeMap){
            socket.in(platformId).emit("on language change",{languageUsed:platformIDCodeMap[platformId].languageUsed})
        }
    })
    //updating the current value stored for each platform
    socket.on("update code",({platformId,code})=>{
        console.log("code:",code)
        if(platformId in platformIDCodeMap){
            platformIDCodeMap[platformId]['code']=code;
            socket.in(platformId).emit("on code change", { code });
        }else{
            platformIDCodeMap[platformId]={code};
            socket.in(platformId).emit("on code change", { code });
        }
    });
    //for user to get the current latest the changes
    socket.on("syncing the code",function(platformId){
        if(platformId in platformIDCodeMap){
            socket.in(platformId).emit("on code change",{code:platformIDCodeMap[platformId].code});
        }
    });
    socket.on("leave platform", ({ platformId }) => {
        socket.leave(platformId)
        updateUsersListandCodeMap(io, socket, platformId)
      })
    socket.on("disconnect", () =>{
        console.log("A user disconnected")
    })
})
const PORT=process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
});
