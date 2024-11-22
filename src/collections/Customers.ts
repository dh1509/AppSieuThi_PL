import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  timestamps: true,
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
      name: 'full_name',
      type: 'text',
      required: true,
      label: 'Full Name', 
    },
    {
      name: 'dob',
      type: 'date',
      required: true,
      label: 'Date of Birth', // Nhãn hiển thị trong giao diện quản trị
      admin: {
        date: {
          pickerAppearance: 'dayOnly', // Chỉ hiển thị ngày
        },
      },
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
      name: 'points',
      type: 'number',        // Kiểu dữ liệu là số (integer)
      required: true,        // Bắt buộc nhập (nếu cần)
      defaultValue: 0,       // Giá trị mặc định là 0
      label: 'Points',       // Nhãn hiển thị trong giao diện quản trị
    },
    {
      name: 'user', // Trường liên kết với bảng users
      type: 'relationship', // Kiểu relationship
      relationTo: 'users', // Collection mà bạn muốn liên kết (users)
      required: true, // Bắt buộc phải có user
      hasMany: false, // Một customer chỉ có một user
    },
  ],
}
