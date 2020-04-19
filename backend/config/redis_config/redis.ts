import session from 'express-session';
import redis from 'redis';
import redisStore from 'connect-redis';


const client = redis.createClient();
const redisSession = redisStore(session);

const redis_config = {
  secret: 'yjhj0729',
  store: new redisSession({
      host: "127.0.0.1",
      port: 6379,
      client: client,
      prefix : "session:",
      db : 0
  }),
  saveUninitialized: true,
            resave: false,
            cookie: { path: "/",
            maxAge: 1000 * 60 * 30,
            httpOnly: true
            //secure: true 
          }
}

export default redis_config