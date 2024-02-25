// export default interface IUser {
//   id: string;
//   firstname: string;
//   lastname: string;
//   login: string;
//   password: string;
//   createdAt: string;
//   deletedAt: string
// }

export default class IUser {
  id: number;
  firstname: string;
  lastname: string;
  login: string;
  createdAt: string;
  deletedAt: string

  constructor(
    json: Object
  ) {
    this.id = json["id"];
    this.firstname = json["firstname"];
    this.lastname = json["lastname"];
    this.login = json["login"];
    this.createdAt = json["created_at"];
    this.deletedAt = json["deleted_at"];
  }
}