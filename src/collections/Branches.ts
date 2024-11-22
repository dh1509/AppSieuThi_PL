import { CollectionConfig } from 'payload';

export const Branches: CollectionConfig = {
  slug: 'branches',
  timestamps: true,
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
      name: 'name', // Tên chi nhánh
      type: 'text',
      required: true, 
      maxLength: 100, // Giới hạn độ dài tối đa là 100 ký tự
    },
    {
      name: 'address', // Địa chỉ chi nhánh
      type: 'text',
      required: true, 
    },
    {
      name: 'phone', // Số điện thoại chi nhánh
      type: 'number',
      required: true, 
    },
    {
      name: 'manager', // Quản lý chi nhánh
      type: 'relationship',
      relationTo: 'users', // Liên kết đến bảng users
      required: false, 
    },
    {
      name: 'total_products', // Tổng số sản phẩm
      type: 'number',
      required: false, 
      defaultValue: 0, 
    },
  ],
};
