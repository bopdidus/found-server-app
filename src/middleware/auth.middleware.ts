import  passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { UserService } from '../service/user.service';
import { QueryRunner } from 'typeorm';
import { AppDataSource } from '../database/data-source';

export const passportStrategy = ()=>{

    const JwtStrategy = passportJwt.Strategy;
    const ExtractJwt = passportJwt.ExtractJwt;

const queryRunner: QueryRunner= AppDataSource.createQueryRunner();
  const userService : UserService = new UserService(queryRunner);

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SecretKey || 'test123'
  };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    userService.getUserByID(jwt_payload.sub).then((user)=> {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).catch((err)=>{
        return done(err, false);
    });
}));

}

