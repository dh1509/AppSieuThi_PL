import { CollectionConfig } from 'payload';

export const AttributeValues: CollectionConfig = {
  slug: 'attribute-values',
  timestamps:true,
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',  
      required: true,
      hasMany: false,
    },
    {
      name: 'attribute',
      type: 'relationship',
      relationTo: 'product-attributes',  
      required: true,
      hasMany: false,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
  ],
};
