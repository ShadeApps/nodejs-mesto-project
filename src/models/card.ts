import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

function isValidURL(url: string): boolean {
  const regexWithZone = /^https?:\/\/(?:www\.)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}(?:\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=0-9]*)?#?$/;
  const regexWithoutZone = /^https?:\/\/(?:www\.)?[A-Za-z0-9-]+$/;

  return regexWithZone.test(url) && !regexWithoutZone.test(url);
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isValidURL,
      message: 'Некорректный URL ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
