import fs from 'fs';

async function exportCsv() {
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vs3o0cqb';
  
  const query = encodeURIComponent('*[_type=="product"] | order(name asc) { _id, name, sku, price, age, isNew }');
  const url = `https://${projectId}.api.sanity.io/v2026-02-06/data/query/${dataset}?query=${query}`;
  
  console.log(`📡 Extraction des produits depuis le dataset "${dataset}"...`);
  const res = await fetch(url);
  const json = await res.json();
  const products = json.result || [];

  // UTF-8 BOM pour ouverture directe et propre dans Excel (caractères accentués préservés)
  const BOM = '\uFEFF';
  const headers = [
    'ID Sanity',
    'Nom du Produit',
    'Référence (SKU/REF)',
    'Prix (€)',
    'Tranche d\'Âge (0-12m / 1-3y / 3-6y / 6y+)',
    'Nouveauté (OUI/NON)'
  ];

  const rows = products.map((p) => {
    const id = p._id;
    const name = (p.name || '').trim().replace(/"/g, '""');
    const sku = (p.sku || '').trim();
    const price = p.price !== null && p.price !== undefined ? p.price : '';
    const age = p.age || '';
    const isNew = p.isNew ? 'OUI' : 'NON';
    return [id, `"${name}"`, `"${sku}"`, price, `"${age}"`, isNew].join(';');
  });

  const csvContent = BOM + [headers.join(';'), ...rows].join('\r\n');
  const filename = `articles_lmdpl_${dataset}.csv`;
  fs.writeFileSync(filename, csvContent, 'utf-8');

  console.log(`✅ ${products.length} articles exportés avec succès dans "${filename}" !`);
}

exportCsv().catch(console.error);
