export interface CollectionCard {
    id: string;
    name: string;
    number: number;
    parody: string;
    rarity_id: string;
    description: string;
    hp: number;
    image: string;
    set_ids:[string];
    illustrator_ids:[string];
    attacks: [Attack];
}

interface Attack {
    name: string;
    cost_ids: [string];
    effect: string;
    damage: number;
}
