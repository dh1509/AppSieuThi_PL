import { CollectionConfig } from 'payload';

export const ProductPromotions: CollectionConfig = {
  slug: 'product_promotions',
  admin: {
    useAsTitle: 'id', // Dùng `id` làm tiêu đề trong Admin (có thể thay đổi tùy nhu cầu)
  },
  fields: [
    {
      name: 'product', 
      type: 'relationship',
      relationTo: 'products', 
      required: true, 
    },
    {
      name: 'promotion',
      type: 'relationship',
      relationTo: 'promotions', 
      required: true, 
    },
  ],
};
