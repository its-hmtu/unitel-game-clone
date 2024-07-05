export const hidePhoneNumber = (phone) => {
  if (typeof phone !== 'string' || phone.length < 7) return phone;
}