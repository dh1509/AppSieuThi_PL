import { CollectionConfig } from 'payload';

export const ProductPrices: CollectionConfig = {
  slug: 'product-prices',
  timestamps: true,
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: false,
    },
    {
      name: 'setPriceForAllSizes',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Set giá cho tất cả các size',
          value: 'all_sizes',
        },
        {
          label: 'Set giá cho từng size',
          value: 'individual_sizes',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      max: 9999999.99,
    },
    {
      name: 'attribute_value',
      type: 'relationship',
      relationTo: 'attribute-values',
      hasMany: false,
      admin: {
        condition: (data) => data.setPriceForAllSizes === 'individual_sizes',
      },
    },
  ],
};
