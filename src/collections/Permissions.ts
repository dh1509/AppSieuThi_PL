import type { CollectionConfig } from 'payload'

export const Permissions: CollectionConfig = {
  slug: 'permissions',
  timestamps: true,
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
        name: 'user', // Trường liên kết với bảng users
        type: 'relationship',
        relationTo: 'users', // Liên kết tới collection `users`
        required: true, // Bắt buộc có user
        hasMany: false, // Mỗi permission chỉ có một user
    },
    {
        name: 'role', // Trường role với các giá trị ENUM
        type: 'select',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Manager', value: 'manager' },
          { label: 'Staff', value: 'staff' },
          { label: 'Customer', value: 'customer' },
        ],
        required: true, // Bắt buộc chọn role
    },
    {
        name: 'module', // Tên module
        type: 'text',
        required: true, // Bắt buộc nhập module
    },
    {
        name: 'actions', // Các hành động (JSON)
        type: 'json',
        required: true, // Bắt buộc phải có giá trị
    },
  ],
}
