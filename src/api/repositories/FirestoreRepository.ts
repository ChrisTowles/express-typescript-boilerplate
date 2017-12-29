import {ObjectLiteral} from 'typeorm';
// import {Pet} from '../models/Pet';
import {Inject, Service} from "typedi";
import * as admin from "firebase-admin";

// import {firestore} from 'firebase-admin';


/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
@Service()
export class FirstStoreRepository<T extends ObjectLiteral> {

    @Inject('db')
    private db: admin.firestore.Firestore;

    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }


    public async find(): Promise<T[]> {
        console.log('this.db', this.db);
        const petSnapShot = await this.db.collection(this.collectionName)
            .get();
        const pets: T[] = [];
        petSnapShot.forEach(doc => {
            const pet = doc.data() as T;
            pet.id = doc.id;
            pets.push(pet);
        });

        return pets;
    }
}
