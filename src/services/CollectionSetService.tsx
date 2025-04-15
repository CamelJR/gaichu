import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../config/FirebaseConfig';
import { CollectionCard } from '../types/CollectionCard';
import { CollectionSet } from '../types/CollectionSet';
import { SetAndCard } from "../types/MergedCollection";

export const fetchSets = async (shortName: string): Promise<SetAndCard[]> => {
    const setsReference = collection(database, "sets");
    const setsQuery = query(
        setsReference,
        where('series_short_name', "==" ,shortName)
    );
    const setsSnapshot = await getDocs(setsQuery);
    const sets = setsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as CollectionSet[];

    const cardsSnapshot = await getDocs(collection(database, 'cards'));
    const cards = cardsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as CollectionCard[];
        console.log(cards);
        return mergeWithSetsId(sets, cards);
}

const mergeWithSetsId = (sets: CollectionSet[], cards: CollectionCard[]): SetAndCard[] => {
    return sets.map(setItem => ({
        set: setItem,
        cards: cards.filter(cardItem => cardItem.set_ids[0] == setItem.id)
    }));
};
