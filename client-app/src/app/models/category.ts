export interface ICategory {
  id: string;
  name: string;
  imageId: string;
  imageUrl: string;
}

export interface ICategoryFormValues {
  file: Blob;
  model:CategoryFormValues;
}

export class CategoryFormValues {
  name: string = "";
}
