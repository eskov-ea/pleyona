import jwt, { VerifyErrors } from "jsonwebtoken";
import { User } from "../models";

export default (token: string): Promise<User | null> =>
  new Promise(
    (
      resolve: (decodedData: User) => void,
      reject: (err: VerifyErrors) => void
    ) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET || "UpFJfpWK",
        (err, decodedData) => {
          if (err || !decodedData) {
            console.log(err);
            
            return reject(err as VerifyErrors);
          } 

          resolve(decodedData as User);
        }
      );
    }
  );
