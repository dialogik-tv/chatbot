const tmi = require('tmi.js');
require("dotenv").config();

const commands = {
    "allergiker": "ItsBoshyTime Hinweis für Allergiker: Dieses Produkt kann Spuren von Satire und Sarkasmus enthalten ItsBoshyTime",
    "bttv": "dialogik-TV BetterTTV Emotes findest du auf https://betterttv.com/users/6017e505df6a0665f275a2bf HACKS HACKERJAMS PrintedCircuitBoard HACKER",
    "discord": "Im dialogikTV-Discord versammeln sich dialog2Code Entwickler, PrintedCircuitBoard Bastler und andere Neugierige https://dialogik.tv/discord",
    "github": "Du kannst in vielen der hier gezeigten Programmierprojekte herumstöbern, Bugs finden, Issues melden oder sogar Pull Requests einreichen dialog2Code SeemsGood https://github.com/dialogik-tv",
    "indivelopment": "Ich develope dir dein ganz individuelles PowerUpL Overlay PowerUpR, welches du z.B. als Browserquelle bei OBS einbinden kannst. So ganz mit Integration in Twitch-Chat/Twitch-API CoolStoryBob Beispiel: das Weather-Overlay für @Freakydna (https://github.com/dialogik-tv/twitchchat-weather-obs-overlay)",
    "lurchbot": "Der Lurchbot toadDance lurcht in verschiedenen deutschsprachigen Twitchkanälen (v.a. Science & Technology) und horcht, ob über \"dialogikTV\" geredet wird TheIlluminati Fundstellen landen direkt im !discord (Kanal #twitch-chat-listener), Quellcode ist auf github https://github.com/dialogik-tv/lurchbot",
    // "relevanz": "Der Relevanz-Wert auf dialogik.tv/tools beschreibt die Relevanz des jeweiligen Tools für die Inhaltserzeugung https://twitter.com/dialogikTV/status/1324084071845269506",
    "social": "Du findest uns auf !twitter, es gibt einen eigenen !youtube Kanal und einen !discord. Ausserdem findest du technische Artefakte hier gezeigter Programmiersessions auf !github. Folge uns und vernetze dich!",
    // "sub": " erhalten exklusiven dialog2Code github-Zugriff auf ausgewählte Projekte.",
    "twitter": "Streamankündigungen, News zur Webseite dialogik.tv sowie aktuelle Neuigkeiten rund um Streaming/Inhaltserzeugung findest du auf https://twitter.com/dialogikTV",
    "tool grasp": "Die Webapplikation grasp soll helfen, keine wichtigen Nachrichten in einem Twitch Chat zu verpassen https://github.com/dialogik-tv/grasp/blob/master/README.md#grasp-the-grasp-out-of-your-twitch-chat",
    "tools": "In unserer sagenhaften, wohlgeformten und ausserordentlich hilfreichen Sammlung von Tools, Apps und Scripten für Streamer und Inhaltserzeuger findest du alles, was dein Technikherz höher schlagen lässt https://dialogik.tv/tools",
    "wled": "Mit !color [HEX] oder [R,G,B] kannst du die Farbe des WLEDs einstellen. Mit !fx wechselst du den Effect. Mehr Infos auf https://github.com/dialogik-tv/twitch-chat-wled",
    "wsk": "Unter https://dialogik.tv/tools findest du unsere Tools-Datenbank für Content Creatoren, filterbar nach der dialogikTV Content Creation Wertschöpfungskette (WSK) – diese wird hier kurz erklärt https://www.twitch.tv/videos/791753769",
    "youtube": "Auf unserem YouTube-Kanal findest du Mitschnitte unserer Livestreams sowie weitere informative und lehrreiche Videos rund um das Streaming/Inhaltserzeugung sowie zum Webdevelopment https://dialogik.tv/youtube",
};

const options = {
    options: {
        debug: false
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: process.env.CHANNEL,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [process.env.CHANNEL]
};

const client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port) {
    console.log("[Connection] " + address + ":" + port);
    client.join(process.env.CHANNEL).then((data) => {
        console.log(`I have successfully joined ${process.env.CHANNEL}`);

        client.on('chat', function(channel, user, message, self) {
            if(message.startsWith("!")) {
                if(message === '!commands') {
                    const commandList = '!' + Object.keys(commands).join(" !");
                    const commandText = `Ick bin der MercyWing1 geierfogel MercyWing2 und reagiere auf folgende Kommandos: ${commandList} ( ItsBoshyTime Hinweis: BetterTTV Emotes sollten aktiviert sein!)`;
                    client.say(process.env.CHANNEL, commandText);
                }
                else {
                    message = message.substring(1);
                    if(commands.hasOwnProperty(message)) {
                        client.say(process.env.CHANNEL, commands[message]);
                    }
                }
            }
        });

    }).catch((err) => {
        console.log(`Error joining channel ${process.env.CHANNEL}`);
        console.log(err);
    });
});
