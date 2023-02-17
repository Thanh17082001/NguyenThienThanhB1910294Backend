const app= require('./app');
const config= require("./app/config");
const MongoDB= require("./app/utils/mongodb.util");

async function startSever(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connect successfully ");
        
        const Port=config.app.port;
        app.listen(Port, () => {
            console.log(`listen with port ${Port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the database", error);
        process.exit();
    }
}

startSever();
