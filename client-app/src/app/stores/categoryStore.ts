import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { ICategory, ICategoryFormValues } from "../models/category";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class CategoryStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable category: ICategoryFormValues | null = null;
  @observable categories: ICategory[] = [];
  @observable categoryOptions: any = [];
  @observable addingCategory: boolean = false;

  @action loadCategories = async () => {
    try {
      const categories = await agent.Categories.list();

      const categoryOptions: any = [];

      const dropdownImageStyles = {
        width: "50px",
        height: "25px",
        verticalAlign: "middle",
      };

      categories.forEach((value, key) => {
        const option = {
          key: key,
          text: value.name,
          value: value.id,
          image: { style: dropdownImageStyles, src: value.imageUrl },
        };
        categoryOptions.push(option);
      });

      runInAction(() => {
        this.categories = categories;
        this.categoryOptions = categoryOptions;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action addCategory = async (category: ICategoryFormValues) => {
    this.rootStore.modalStore.submitting = true;
    try {
      this.rootStore.modalStore.errorMessage = null;
      if (category.file) {
        await agent.Categories.create(category);
        toast.success("Category added successfully.");
        runInAction(() => {
          this.loadCategories();
          this.rootStore.modalStore.submitting = false;
          this.rootStore.modalStore.closeModalGeneral();
        });
      } else {
        toast.warn("⚠️ Upload a category image");
        this.rootStore.modalStore.submitting = false;
      }
    } catch (error) {
      runInAction(() => {
        this.rootStore.modalStore.errorMessage = error.data.errors.CategoryName;
        this.rootStore.modalStore.submitting = false;
      });
    }
  };
}
