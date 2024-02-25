export class Config {
  personClassList: [PersonClass];
  passengerStatusList: [PassengerStatus];
  ship: string;
  seatsCount: number;

  constructor(personClassList: [PersonClass], seatsCount: number,
    passengerStatusList: [PassengerStatus], ship: string) {
      this.personClassList = personClassList;
      this.passengerStatusList = passengerStatusList;
      this.ship = ship;
      this.seatsCount = seatsCount;
  }
}

export class PersonClass {
  id: number;
  class: string;

  constructor(json: Object) {
    this.id = json["id"];
    this.class = json["class"];
  }
}

export class PassengerStatus {
  id: number;
  status: string;

  constructor(json: Object) {
    this.id = json["id"];
    this.status = json["status"];
  }
}