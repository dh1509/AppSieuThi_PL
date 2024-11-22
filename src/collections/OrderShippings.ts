import { CollectionConfig } from 'payload';

export const OrderShippings: CollectionConfig = {
  slug: 'order_shippings',
  admin: {
    useAsTitle: 'id', 
  },
  fields: [
    {
      name: 'order', // Liên kết với đơn hàng
      type: 'relationship',
      relationTo: 'orders', 
      required: true, 
    },
    {
      name: 'shipping_address', // Địa chỉ giao hàng
      type: 'text',
      required: true, 
    },
    {
      name: 'shipping_fee', // Phí giao hàng
      type: 'number',
      required: true, 
      defaultValue: 0,
      admin: {
        step: 0.01, // Hỗ trợ số thập phân
      },
    },
    {
      name: 'shipping_status', // Tình trạng giao hàng
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
      ],
      defaultValue: 'pending', 
      required: true, 
    },
  ],
};
