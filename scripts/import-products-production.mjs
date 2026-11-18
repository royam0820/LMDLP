import { getCliClient } from 'sanity/cli';

const client = getCliClient({
  apiVersion: '2024-01-01',
}).withConfig({
  dataset: 'production',
});

function normalizeAge(rawAge) {
  const lower = (rawAge || '').toLowerCase().trim();
  if (lower.includes('0+') || lower.includes('mois')) return '0-12m';
  if (lower.includes('1 an') || lower.includes('2 an')) return '1-3y';
  if (lower.includes('3 an') || lower.includes('4 an') || lower.includes('5 an')) return '3-6y';
  if (lower.includes('6') || lower.includes('7') || lower.includes('8')) return '6y+';
  return '0-12m';
}

const rows = [
  { id: '5d128cf6-6036-4864-8b09-eebe659f1225', name: 'Crococroc - Djeco', sku: 'DJ01629', price: 21.00, age: '3 ans+', isNew: true, promoNoel: false },
  { id: 'eb807b55-a611-40bc-8240-4464ed2f4534', name: 'Mes premiers véhicules magnétiques - SmartMax', sku: 'SMX226', price: 29.50, age: '1 an+', isNew: true, promoNoel: true },
  { id: 'e75de0dd-6ebe-46c3-a425-421d79c0200a', name: 'Amuseables Coneroi Temaki – Jellycat', sku: 'A4HR', price: 38.00, age: '0+', isNew: false, promoNoel: false },
  { id: '9bd6abcb-bb6a-4413-b311-31537bde1c75', name: 'Ardoise-Magique', sku: 'XL3175A', price: 15.50, age: '2 ans+', isNew: false, promoNoel: false },
  { id: '265cfb3e-9ae2-4519-9b03-c188d0e5c8d7', name: "Bartholomew l'Ourson Marin – Jellycat", sku: 'BARM2FM', price: 69.00, age: '0+', isNew: true, promoNoel: false },
  { id: 'a4731b7e-74fa-48e7-9936-0e35c77979f9', name: 'Berceau à bascule pour poupée – Maileg', sku: '11-5104-01', price: 32.50, age: '3 ans+', isNew: false, promoNoel: false },
  { id: '02d290ad-49a5-4ce4-bb2c-922060b96211', name: 'Cape de Fée Licorne Arc-en-ciel - Souza', sku: '101061', price: 45.00, age: '3 ans+', isNew: true, promoNoel: true },
  { id: '4144f640-d2ba-454f-ab00-5b18db154ccd', name: 'Carotte Câline Souriante - Jellycat', sku: 'A4CARR', price: 45.00, age: '0+', isNew: false, promoNoel: false },
  { id: '06ce7108-17d0-4734-92e2-b4ebe18fa567', name: 'Circuit Pompiers - BRIO World', sku: '33815', price: 57.50, age: '3 ans+', isNew: true, promoNoel: true },
  { id: '2615b29d-c482-4658-8887-1a6bc7ef8dd5', name: 'Coffret Maquillage Papillon – Souza', sku: '107300', price: 16.00, age: '3 ans+', isNew: false, promoNoel: false },
  { id: '6d58ad28-e644-4194-a840-27c6ad566d57', name: 'Crazy Garage – Crazy Motors - Djeco', sku: 'DJ05495', price: 59.80, age: '3 ans+', isNew: true, promoNoel: false },
  { id: '34758be5-7fd6-4ee4-ae96-51e6fb5bb7d9', name: 'Crazy Sudoku – Djeco', sku: 'DJ08488', price: 20.50, age: '8 ans+', isNew: false, promoNoel: false },
  { id: '1f68416c-3708-4e0c-ae5a-9bb5101a8630', name: 'Doudou Grenouille – Moulin Roty', sku: '689014', price: 23.20, age: '0+', isNew: true, promoNoel: false },
  { id: '2a375bae-7904-49dd-9646-df8a5e5ba4ee', name: "Hochet d'éveil Stella le Faon – Lilliputiens", sku: '83368', price: 27.50, age: '3 mois+', isNew: false, promoNoel: false },
  { id: 'ed6c61b7-b226-4474-9065-e99147e5178a', name: 'IQ Quub – SmartGames', sku: 'SG494', price: 15.50, age: '8 ans+', isNew: false, promoNoel: false },
  { id: '8558e1c4-b08b-488c-a2c1-c61b395ecc56', name: 'Imagier Jack le Lion – Lilliputiens', sku: '83694', price: 15.60, age: '6+ mois', isNew: false, promoNoel: false },
  { id: '521611f3-29b0-4ef1-b5df-e9c43c3ed8b0', name: 'Kit Créatif – Broderie Florale Perlée - Djeco', sku: 'GA10058', price: 34.00, age: '8 ans+', isNew: false, promoNoel: false },
  { id: 'db52887a-1dce-4e77-81e7-55ed715f6ad8', name: 'Les Trois Souris Triplées – Maileg', sku: '17-3001-01', price: 46.50, age: '3 ans+', isNew: false, promoNoel: false },
  { id: '2583593e-609a-4481-a4e8-ab586edfde9f', name: 'Mi House – La Maison de Panda – Djeco', sku: 'DJ08032', price: 27.60, age: '8 ans+', isNew: false, promoNoel: true },
  { id: '7c01077f-02ea-4d14-ab16-e090f9530b25', name: 'Ourson Patapouf Bleu – Kaloo', sku: 'K214015', price: 38.50, age: '0+', isNew: true, promoNoel: false },
  { id: 'e2c470c3-302c-443e-b9a8-19a66205fef1', name: 'Poupée Daphné – Kaloo Tendresse', sku: 'K200022', price: 32.00, age: '0+', isNew: true, promoNoel: false },
  { id: 'b722d2ad-cf6a-4dbc-b828-a718d37a2206', name: 'Puzzle Gallery Dreamy Dreams – Djeco', sku: 'DJ07691', price: 19.00, age: '7 ans+', isNew: false, promoNoel: false },
  { id: '0b03a25c-deb0-45ff-9dd1-3c38d896b890', name: 'Parapluie Animaux du Monde – Djeco', sku: 'DD04731', price: 14.50, age: '3 ans+', isNew: false, promoNoel: false },
  { id: 'a007ba45-9c62-4ac9-9153-98ddbc707b53', name: 'Contes à décorer – Peter Pan – Djeco', sku: 'DJ09479', price: 17.50, age: '6 ans+', isNew: false, promoNoel: true },
];

async function run() {
  console.log('🚀 Mise à jour des 24 produits dans le dataset Sanity "production"...');
  for (const row of rows) {
    const normalizedAge = normalizeAge(row.age);
    await client
      .patch(row.id)
      .set({
        name: row.name,
        sku: row.sku,
        price: row.price,
        age: normalizedAge,
        isNew: row.isNew,
      })
      .commit();
    console.log(`✅ [${row.sku}] ${row.name} — ${row.price.toFixed(2)} € — Âge: ${normalizedAge} (${row.age})`);
  }

  // Create or update the Noël seasonal campaign in production with the 5 PROMOTIONS NOEL items
  const noelProductRefs = rows
    .filter((r) => r.promoNoel)
    .map((r, idx) => ({
      _key: `noel-prod-${idx}-${r.sku.toLowerCase()}`,
      _type: 'reference',
      _ref: r.id,
    }));

  const campaignDoc = {
    _id: 'seasonalCampaign-noel',
    _type: 'seasonalCampaign',
    name: 'Noël',
    slug: { _type: 'slug', current: 'noel' },
    title: "🎄 La magie de Noël s'invite chez les Petits Loups !",
    badgeText: '✨ La magie de Noël',
    theme: 'noel',
    description:
      "Cette année, glissez un peu de magie sous le sapin ! 🎁 Découvrez notre sélection de jouets, jeux et trésors soigneusement choisis pour éveiller la curiosité, nourrir l'imagination et faire briller les yeux des petits comme des grands.",
    startDate: '2026-10-22T10:00:00.000Z',
    endDate: '2027-01-15T23:59:00.000Z',
    isActive: true,
    priority: 1,
    products: noelProductRefs,
  };

  await client.createOrReplace(campaignDoc);
  console.log(`🎄 Campagne de Noël créée/mise à jour en production avec ${noelProductRefs.length} articles associés !`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
