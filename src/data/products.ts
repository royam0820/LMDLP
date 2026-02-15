export type Product = {
    id: string;
    name: string;
    slug?: string;
    image: string;
    age: string;
    description: string;
    isNew?: boolean;
};

export const products: Product[] = [
    {
        id: "1",
        name: "Ours Câlin Géant",
        image: "/images/peluche1.png",
        age: "0+",
        description: "Le compagnon idéal pour les gros câlins. Ultra doux et rassurant.",
        isNew: true,
    },
    {
        id: "2",
        name: "Lapin Douceur",
        image: "/images/peluche2.png",
        age: "0+",
        description: "Un petit lapin beige aux longues oreilles à attraper.",
    },
    {
        id: "3",
        name: "Renard Rusé",
        image: "/images/peluche3.png",
        age: "3+",
        description: "Une peluche pleine de malice pour les aventuriers.",
        isNew: true,
    },
    {
        id: "4",
        name: "Éléphant Rêveur",
        image: "/images/peluche4.png",
        age: "0+",
        description: "Gris et rose, il veille sur le sommeil des tout-petits.",
    },
    {
        id: "5",
        name: "Lionceau Courageux",
        image: "/images/peluche5.png",
        age: "3+",
        description: "Le roi de la savane en version toute douce.",
    },
    {
        id: "6",
        name: "Panda Zen",
        image: "/images/peluche6.png",
        age: "3+",
        description: "Noir et blanc, il apporte le calme dans la chambre.",
    },
    {
        id: "7",
        name: "Koala Mignon",
        image: "/images/peluche7.png",
        age: "3+",
        description: "Toujours accroché, il ne vous lâchera plus.",
    },
    {
        id: "8",
        name: "Licorne Magique",
        image: "/images/peluche8.png",
        age: "3+",
        description: "Paillettes et douceur pour des rêves féériques.",
        isNew: true,
    },
    {
        id: "9",
        name: "Chien Fidèle",
        image: "/images/peluche9.png",
        age: "0+",
        description: "Le meilleur ami, toujours prêt à jouer.",
    },
    {
        id: "10",
        name: "Pingouin Banquise",
        image: "/images/peluche10.png",
        age: "0+",
        description: "Il ne craint pas le froid avec son écharpe.",
    },
    {
        id: "11",
        name: "Souris Ballerine",
        image: "/images/peluche11.png",
        age: "3+",
        description: "Prête pour danser avec son tutu rose.",
    },
];
