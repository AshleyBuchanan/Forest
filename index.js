const express        = require('express');
const methodOverride = require('method-override');
const app            = express();
const path           = require('path');
const { v4: uuid }   = require('uuid');
const fs             = require('fs');
const dateFNS        = require('date-fns');



//clocks
function getAge(postTime) {
    const currentDate = new Date();
    return relativeTime = dateFNS.formatDistanceToNow(postTime, { addSuffix: true });
}



//readers
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}



//loaders
const loadTopics = async (topics) => {
    try {
        topics = await readJSONFile('./topics.json');
    } catch (err) {
        console.log('Error reading JSON file:', err);
    }
    return topics;
};
const loadUsers = async (users) => {
    try {
        users = await readJSONFile('./users.json');
    } catch (err) {
        console.log('Error reading JSON file:', err);
    }
    return users;
};
const loadSessions = async (sessions) => {
    try {
        sessions = await readJSONFile('./sessions.json');
    } catch (err) {
        console.log('Error reading JSON file:', err);
    }
    return sessions;
};



//writers
function updateJSDONFile(filePath, obj) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
}



//into memories
let topics   = {};
let users    = {};
let sessions = {};

(async () => {
    topics = await loadTopics(topics);
    console.log('\nLoaded topics:');
    for (let t of topics.Topics){
        if (t.uuid === "") t.uuid = uuid();     //theses are only here to fix missing uuids.
        console.log('-', t.title);
    }
    users = await loadUsers(users);
    console.log('\nLoaded users:');
    for (let u of users.Users){
        if (u.uuid === "") u.uuid = uuid();     //theses are only here to fix missing uuids.
        console.log('-', u.username);
    }
    sessions = await loadSessions(sessions);
    console.log('\nLoaded sessions:');
    for (let s of sessions.Sessions){
        if (s.s_uuid === "") s.s_uuid = uuid();     //theses are only here to fix missing uuids.
        console.log('-', s.s_uuid, s.u_uuid);
    }
})();



//middleware
app.use(methodOverride('__method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'favicon')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//routes
app.get('/topics/signin', (req, res) => {
    res.render('topics/main');
});
app.post('/topics/signin', (req, res) => {
    console.log('signin attempt:', req.body);
    let __username = '';
    //try {
        const {email, password} = req.body;
        let user = users.Users.find( u => u.email === email);
        if (user) {
            if (user.password == password){
                __username = user.username;
                user.loggedOn = true;
                const currentDate   = new Date();
                const formattedDate = dateFNS.format(currentDate, 'yyyy-MM-dd HH:mm');
                user.accessTimes.push(formattedDate);
                updateJSDONFile('./users.json', users);

                const loggedUsername = user.username;
                const loggedUuid = user.uuid;
                const loggedUser = {loggedUsername, loggedUuid}

                const s_uuid = uuid();
                const u_uuid = loggedUuid;
                const session = {s_uuid, u_uuid};
                sessions.Sessions.push(session);
                updateJSDONFile('./sessions.json', sessions)
                res.json(loggedUser);
            }
        }
    // }
    //catch {
        //do nothing
   // }
    if (__username === ''){
        res.json('unvalidated');
    }
});

app.post('/topics/all', (req, res) => {
    console.log('-',req.body);
    const topicTitles = [];
    for(let topic of topics.Topics){
        const title = topic.title;
        const username = topic.username;
        const uuid = topic.uuid;
        topicTitles.push({title, username, uuid});
    }
    res.json(topicTitles);
});

app.post('/topics/single', (req, res) => {
    console.log('-', req.body.uuid);
    let topic = topics.Topics.find( u => u.uuid === req.body.uuid);
    topic.age = getAge(topic.postTime);
    
    res.json(topic);
});


//server listener
app.listen(3000, () => {
    console.log('listening on port 3000');
});
