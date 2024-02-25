import { connection } from '../core/index';
import { SocketResponse, User } from '../models';
import { AccessError, DBError } from '../structs/Errors';
import md5 from 'md5';
import { createJWToken } from '../utils';


export default class SocketController {

  login = async (loginData: ILoginData) :Promise<SocketResponse> => {
    try {
      const sql = 'SELECT * FROM `users` WHERE `login` = ?';
      const [rows] = (await connection(sql, [loginData.login]));

      if (rows.length > 1) {
        const error = new DBError('Duplicate result got', 'DB have multiple users by this credential', false);
        throw error;
      }
      const userObj = rows[0];

      if (userObj === undefined || md5(loginData.password) != userObj.password) {
        return new SocketResponse(false, 401, null, 'Incorrect login or password');
      } else {
        const user = new User(userObj);
      console.log('USER OBJ', user);
      if (user.deletedAt !== null) {
          return new SocketResponse(false, 404, null);
        }
        const token = createJWToken(user);
        
        return new SocketResponse(true, 200, { user, token} );
      
      }
    } catch(err) {
      return new SocketResponse(false, 500, null, 'Error happend');
    }
  }

  getConfig = async() :Promise<SocketResponse> => {
    try {
      const passengerStatusesSQL = 'SELECT * FROM `passenger_status_list`';
      const personClassesSQL = 'SELECT * FROM `person_class_list`';
      const configSQL = 'SELECT * FROM `config`';

      const [passengerStatuses] = await connection(passengerStatusesSQL);
      const [personClasses] = await connection(personClassesSQL);
      const [configData] = await connection(configSQL);

      return new SocketResponse(true, 200, { 
        statuses: passengerStatuses,
        classes: personClasses,
        config: configData
        }
      );
    } catch (err) {
      return new SocketResponse(false, 500, null);
    }
  }
}

export interface ILoginData {
  login: string;
  password: string;
}