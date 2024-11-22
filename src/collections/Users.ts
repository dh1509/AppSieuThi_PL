import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  timestamps: true,
  auth: true,
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'number',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'role', // Tên trường
      type: 'select', // Loại dữ liệu là select
      required: true, // Không cho phép null
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Staff', value: 'staff' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'Customer', // Giá trị mặc định
    },
    {
      name: 'is_active', // Tên trường
      type: 'checkbox', // Kiểu dữ liệu boolean
      defaultValue: true, // Giá trị mặc định là TRUE
      label: 'Is Active', // Nhãn hiển thị trong giao diện
    },
  ],
}
