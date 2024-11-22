import { CollectionConfig } from 'payload';

export const SalesReports: CollectionConfig = {
  slug: 'sales_reports',
  timestamps: true,
  admin: {
    useAsTitle: 'id', 
  },
  fields: [
    {
      name: 'report_type', // Loại báo cáo
      type: 'select',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
      ],
      required: true, 
    },
    {
      name: 'total_revenue', // Tổng doanh thu (tiền)
      type: 'number',
      required: true, 
      admin: {
        step: 0.01, 
      },
    },
    {
      name: 'total_points', // Tổng doanh thu (theo điểm)
      type: 'number',
      required: true, 
      admin: {
        step: 0.01, 
      },
    },
    {
      name: 'total_customers', // Số lượng khách hàng
      type: 'number',
      required: true, 
    },
    {
      name: 'order_id', // Liên kết với đơn hàng 
      type: 'relationship',
      relationTo: 'orders', 
      admin: {
        readOnly: true, 
      },
    },
    {
      name: 'customer_id', // Liên kết với khách hàng 
      type: 'relationship',
      relationTo: 'customers',
      admin: {
        readOnly: true, 
      },
    },
  ],
};
