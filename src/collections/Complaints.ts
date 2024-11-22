import { CollectionConfig } from 'payload';

export const Complaints: CollectionConfig = {
  slug: 'complaints',
  admin: {
    useAsTitle: 'id', 
  },
  fields: [
    {
      name: 'customer', // Liên kết với khách hàng
      type: 'relationship',
      relationTo: 'customers', 
      required: true, 
    },
    {
      name: 'complaint_type', // Loại khiếu nại
      type: 'select',
      options: [
        { label: 'Order Issue', value: 'order_issue' },
        { label: 'Product Quality', value: 'product_quality' },
        { label: 'Service Quality', value: 'service_quality' },
      ],
      required: true, 
    },
    {
      name: 'complaint_details', // Chi tiết khiếu nại
      type: 'textarea',
      required: true, 
    },
    {
      name: 'status', // Tình trạng khiếu nại
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'pending', 
    },
  ],
};
