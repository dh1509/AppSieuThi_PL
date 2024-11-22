import { CollectionConfig } from 'payload';

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
      name: 'name', // Tên chương trình khuyến mãi
      type: 'text',
      required: true, 
      maxLength: 100, 
    },
    {
      name: 'description', // Mô tả chương trình khuyến mãi
      type: 'textarea',
      required: false, 
    },
    {
      name: 'discount_type', // Loại giảm giá
      type: 'select',
      required: true, // Bắt buộc nhập
      options: [
        { label: 'Percentage', value: 'percentage' }, // Giảm giá theo %
        { label: 'Fixed Amount', value: 'fixed' }, // Giảm giá cố định
      ],
      defaultValue: 'percentage', // Giá trị mặc định
    },
    {
      name: 'discount_value', // Giá trị giảm giá
      type: 'number',
      required: true, // Bắt buộc nhập
      admin: {
        step: 0.01, // Hỗ trợ nhập giá trị thập phân (2 chữ số sau dấu phẩy)
      },
    },
    {
      name: 'start_date', // Ngày bắt đầu
      type: 'date',
      required: false, // Không bắt buộc
    },
    {
      name: 'end_date', // Ngày kết thúc
      type: 'date',
      required: false, // Không bắt buộc
    },
  ],
};
