import { ResolveFn } from '@angular/router';
import { Text } from './text';
import { TEXTS_PROMISE } from './text-data';

export const textsResolver: ResolveFn<Text[]> = async () => {
  return Promise.all(Object.values(TEXTS_PROMISE));
};

export const textResolver: ResolveFn<Text> = (route) => {
  const id = route.paramMap.get('id');
  return TEXTS_PROMISE[id!];
};

export const otherTextsResolver: ResolveFn<Text[]> = async (route) => {
  const id = route.paramMap.get('id');
  const texts = await Promise.all(Object.values(TEXTS_PROMISE));
  return texts.filter((text) => text.id !== id);
};
