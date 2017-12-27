import { Container } from 'typedi';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
import { firestore as firestoreClass } from 'firebase-admin';

export function FirebaseCollection(): any {
    return (object: any, propertyName: string, index?: number): any => {
        const eventDispatcher = firestoreClass()
        Container.registerHandler({ object, propertyName, index, value: () => eventDispatcher });
    };
}

export { EventDispatcher as EventDispatcherInterface } from 'event-dispatch';
