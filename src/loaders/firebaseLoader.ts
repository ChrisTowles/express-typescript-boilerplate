import * as admin from 'firebase-admin';
import {MicroframeworkSettings, MicroframeworkLoader} from 'microframework-w3tec';
import {env} from '../core/env';
import { Container } from 'typedi';


export const firebaseLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    // console.log('process.env.FIREBASE_CREDENTIALS', process.env.FIREBASE_CREDENTIALS);


    // Initialize Cloud Firestore through Firebase
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS as string)),
        databaseURL: env.firebase.databaseURL,
    });
    const db = admin.firestore();

    // HACK - forgive me
    Container.set('db', db);

    db.collection('Pets').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log('XXXXXXXXXXXXXXXXX' + doc.id, '=>', doc.data());
            });
        })
        .catch((err) => {
            console.log('EEEEEEEEEEEEEEEEEEEEEEE Error getting documents', err);
        });


    if (settings) {
        settings.setData('db', db);
    }

};
