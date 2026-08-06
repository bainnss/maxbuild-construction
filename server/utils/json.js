export const jsonOptions = {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = String(ret._id)
    delete ret._id
    delete ret.passwordHash
    return ret
  },
}
