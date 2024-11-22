import { CollectionConfig } from 'payload';

export const PointsConversionRate: CollectionConfig = {
  slug: 'points_conversion_rate',
  timestamps: true,
  admin: {
    useAsTitle: 'id', 
  },
  fields: [
    {
      name: 'conversion_rate', // Tỷ lệ quy đổi điểm
      type: 'number',
      required: true, 
      admin: {
        step: 0.01, // Hỗ trợ số thập phân
      },
    },
    {
      name: 'updated_by', // Người thay đổi tỷ lệ
      type: 'relationship',
      relationTo: 'users', 
      admin: {
        readOnly: true, 
      },
    },
  ],
};
