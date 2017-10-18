import { ObjectID } from 'bson';


export class Utilities{

    constructor(){

    }


    generateRandomId(): string{
        const id  = new ObjectID();
        console.log(id.toString());
        return id.toString();
      }

}