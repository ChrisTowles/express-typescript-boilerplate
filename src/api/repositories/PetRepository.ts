import {Repository} from 'typeorm';
import {Pet} from '../models/Pet';
// import {firestore} from 'firebase-admin';

// @EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {

    /**
     * Find by user_id is used for our data-loader to get all needed pets in one query.
     */
    public findByUserIds(ids: string[]): Promise<Pet[]> {

        return this.createQueryBuilder()
            .select()
            .where(`pet.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
