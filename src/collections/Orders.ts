import { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  timestamps: true,
  admin: {
    useAsTitle: 'id', // Hiển thị `id` làm tiêu đề trong Admin
  },
  fields: [
    {
      name: 'customer', // Liên kết với khách hàng
      type: 'relationship',
      relationTo: 'customers', 
      required: true, 
    },
    {
      name: 'status', // Trạng thái đơn hàng
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending', 
      required: true,
    },
    {
      name: 'total_price', // Tổng giá trị đơn hàng
      type: 'number',
      required: true,
      admin: {
        step: 0.01, // Hỗ trợ số thập phân với 2 chữ số sau dấu phẩy
      },
    },
  ],
};
