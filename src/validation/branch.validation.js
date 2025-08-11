const branchSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "Address must be at least 3 characters long" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(3, { message: "Phone must be at least 3 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  city: z
    .string({ required_error: "City is required" })
    .min(3, { message: "City must be at least 3 characters long" }),
  isActive: z.boolean({ required_error: "Status is required" }),
});

export { branchSchema };
