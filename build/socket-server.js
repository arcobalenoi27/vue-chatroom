var _ = require('lodash');
var moment = require('moment');

exports.messageServer = (io) => {
    io.sockets.on('connection', function (socket) {
        console.info('A user connected.');
        io.emit('userList', global.userList);

        socket.on('login', function (user) {
            /*
                socket id : When every socket connect to the server, server will create a id for this socket, this id won't be duplicate, it will be an unique value, we can realize it as the GUID or UUID that we often use it when mutating some data.
                 每一個socket連線之後,伺服器端都會為他創建一個id,這一個id是一個伺服器端永遠不會重複的id,這個id可以理解成我們在操作資料的時候的guid,uuid
            */
            user.id = socket.id;
            global.userList.push(user);
            console.log(global.userList);
            // send message to all client, including original message sender.
            io.emit('userList', global.userList);
            // send the client information to the user who just logined.
            socket.emit('userInfo', user);
            // send to all clients except the original sender.
            socket.broadcast.emit('loginInfo', user.name);
        });


        socket.on('disconnect', function() {
            console.log('some disconnect...');
            console.log(socket.id);
            let index = -1;

            index = _.findIndex(global.userList, function(user) {
                return user.id === socket.id
            });

            var userLogout =  global.userList.splice(index, 1);
            console.log(global.userList);
            io.emit('logout', userLogout);
            if (index !== -1) {
                io.emit('updateUser', global.userList);
            }
        });

        socket.on('toAll', function (postMsg) {
            /*
                format: {
                    name: '',
                    accountId: '',
                    avatar: '',
                    avatarPos: '',
                    attachImgUrl: '',
                    youtube: '',
                    postMsg: ''
                }
            */

            if (postMsg.type === 'img') {
                global.imgList.push(postMsg.attachImgUrl);
                postMsg.data = postMsg.attachImgUrl;
                postMsg.attachImgUrl = undefined;
            }
            if (postMsg.type === 'youtube') {
                global.youtubeList.push(postMsg.youtube);
                postMsg.data = postMsg.youtube;
                postMsg.youtube = undefined;
            }
            postMsg.time = moment();
            io.emit('imgHistory', global.imgList);
            io.emit('youtubeHistory', global.youtubeList);
            io.emit('toPublic', postMsg);
        });

        socket.on('toOne', function(msgObj) {
            //var toSocket = _.findWhere(socketList, {id:msgObj. to});
            //io.sockets.sockets 找到所有連接到伺服器的使用者的集合
            var toSocket = _.find(io.sockets.sockets, {id: msgObj.destination_id});
            toSocket.emit('toOne', msgObj)
        });

    });
}