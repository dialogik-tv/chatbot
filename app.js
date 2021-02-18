const tmi = require('tmi.js');
require("dotenv").config();

const commands = {
    "wsk": "Unter https://dialogik.tv/tools findest du unsere Tools-Datenbank für Content Creatoren, filterbar nach der dialogikTV Content Creation Wertschöpfungskette (WSK) – diese wird hier kurz erklärt https://www.twitch.tv/videos/791753769",
    "relevanz": "Der Relevanz-Wert beschreibt die Relevanz des jeweiligen Tools für die Inhaltserzeugung https://twitter.com/dialogikTV/status/1324084071845269506",
    "discord": "Im dialogikTV-Discord findest du Hilfe zu allen Themen rund um das Streaming/Inhaltserzeugen sowie zum Webdevelopment https://dialogik.tv/discord",
    "youtube": "Auf unserem YouTube-Kanal findest du Mitschnitte unserer Livestreams sowie weitere informative und lehrreiche Videos rund um das Streaming/Inhaltserzeugung sowie zum Webdevelopment https://dialogik.tv/youtube",
    "social": "Ihr findet uns auf !twitter, wir haben einen eigenen !youtube Kanal und führen einen !discord. Ausserdem findest du technische Artefakte unserer Programmiersessions auf !github. Folgt uns und vernetzt euch!",
    "twitter": "Streamankündigungen, News zu unserer Webseite sowie aktuelle Neuigkeiten rund um Streaming/Inhaltserzeugung findet ihr auf unserem Twitterkanal https://twitter.com/dialogikTV",
    "github": "Als Developer kannst du einen Blick in unseren Quellcode auf github werfen, Bugs finden, Issues melden, Pull Requests einreichen oder einfach nur im Code stöbern https://github.com/dialogik-tv",
    "tools": "In unserer sagenhaften, wohlgeformten und ausserordentlich hilfreichen Sammlung von Tools, Apps und Scripten für Streamer und Inhaltserzeuger findest du alles, was dein Technikherz höher schlagen lässt https://dialogik.tv/tools",
    "allergiker": "Hinweis für Allergiker: Dieses Produkt kann Spuren von Satire und Sarkasmus enthalten.",
    "lurchbot": "Unser Lurchbot lurcht in verschiedenen deutschsprachigen Twitchkanälen (v.a. Science & Technology) und horcht, ob über \"dialogikTV\" geredet wird. Fundstellen werden direkt im dialogikTV-Discord gemeldet. Ansehen kann man sich das ganze im Discord https://dialogik.tv/discord im Kanal #twitch-chat-listener, den Quellcode hierzu findet ihr auf github https://github.com/dialogik-tv/lurchbot",
    "indivelopment": "Ich develope dir dein ganz individuelles Overlay, welches du z.B. als Browserquelle bei OBS einbinden kannst. Mit Integration in den Twitch-Chat bzw. die Twitch-API. Ein Beispiel für so ein Indivelopment ist das Weather Overlay für @Freakydna (https://github.com/dialogik-tv/twitchchat-weather-obs-overlay)"
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
                if(message === '!geierfogel') {
                    const commandList = Object.keys(commands).join(" ");
                    const commandText = `Ich reagiere auf folgende Kommandos: ${commandList}`;
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