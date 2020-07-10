let queries = [
    { param: 'id', field: 'InventoryNo', conditional: 'eq', type: 'number' },
    { param: 'first', field: 'ArtistFirst', conditional: 'matchend' },
    { param: 'last', field: 'ArtistLast', conditional: 'matchend' },
    { param: 'title', field: 'Title', conditional: 'match' },
    { param: 'label', field: 'Label', conditional: 'eq' },
    { param: 'labelno', field: 'LabelNo', conditional: 'match' },
    { param: 'notes', field: 'PressingNotes', conditional: 'match' },
    { param: 'source', field: 'source', conditional: 'eq' },
    { param: 'genre', field: 'Category', conditional: 'eq' },
    { param: 'speed', field: 'Speed', conditional: 'eq' },
    { param: 'grade', field: 'Grade', conditional: 'eq' },
    { param: 'price', field: 'Price', conditional: 'operator' },
    { param: 'quantity', field: 'Quantity', conditional: 'operator' },
    { param: 'backups', field: 'BackupQuantity', conditional: 'operator' },
    { param: 'potential', field: 'PotentialQuantity', conditional: 'operator' },
    { param: 'location', field: 'CatCode', conditional: 'operator' },
];

module.exports = queries;