import {Pet} from '../models/Pet';
import {FirstStoreRepository} from './FirestoreRepository';
// import {firestore} from 'firebase-admin';


// @EntityRepository(Pet)
export class PetRepository extends FirstStoreRepository<Pet> {

    constructor(collectionName: string) {
        super(collectionName);
    }

    /**
     * Find by user_id is used for our data-loader to get all needed pets in one query.
     */
    public findByUserIds(ids: string[]): Promise<Pet[]> {

        return new Promise<Pet[]>((r, a) => {
            console.log('');
        });
        // return undefined;
        /*
        return this.createQueryBuilder()
            .select()
            .where(`pet.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();*/
    }

}
