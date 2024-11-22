import { CollectionConfig } from 'payload';

export const ProductAttributes: CollectionConfig = {
  slug: 'product-attributes',
  timestamps:true,
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',  
      required: true,
      hasMany: false,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,  // Mỗi thuộc tính phải có tên duy nhất trong mỗi danh mục
    },
  ],
};
