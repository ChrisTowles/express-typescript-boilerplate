import { Service, Inject } from 'typedi';
// import { OrmRepository } from 'typeorm-typedi-extensions';
// import { PetRepository } from '../repositories/PetRepository';
import { Pet } from '../models/Pet';
// import { events } from '../subscribers/events';
// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
// import { User } from '../models/User';
import * as admin from 'firebase-admin';


@Service()
export class PetService {

    @Inject('db')
    private db: admin.firestore.Firestore;

    constructor(
        // @OrmRepository() private petRepository: PetRepository,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {
    }


    public async find(): Promise<Pet[]> {
        this.log.info('Find all pets');
        const petSnapShot = await this.db.collection('Pets').get();
        const pets: Pet[] = [];
        petSnapShot.forEach(doc => {
            console.log(doc.id, '=>', doc.data().name);
            const pet = doc.data() as Pet;
            pet.id = doc.id;
            pets.push(pet);
        });

        return pets;
        // return this.petRepository.find();
    }
/*
    public findByUser(user: User): Promise<Pet[]> {
        this.log.info('Find all pets of the user', user.toString());
        return this.petRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: string): Promise<Pet | undefined> {
        this.log.info('Find all pets');
        return this.petRepository.findOne({ id });
    }

    public async create(pet: Pet): Promise<Pet> {
        this.log.info('Create a new pet => ', pet.toString());
        const newPet = await this.petRepository.save(pet);
        this.eventDispatcher.dispatch(events.pet.created, newPet);
        return newPet;
    }

    public update(id: string, pet: Pet): Promise<Pet> {
        this.log.info('Update a pet');
        pet.id = id;
        return this.petRepository.save(pet);
    }

    public delete(id: string): Promise<void> {
        this.log.info('Delete a pet');
        return this.petRepository.removeById(id);
    }
*/
}
