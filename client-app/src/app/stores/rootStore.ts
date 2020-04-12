import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure} from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modelStore";
import ProfileStore from "./profileStore";
import CategoryStore from "./categoryStore";

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore:CommonStore;
  modalStore:ModalStore;
  profileStore:ProfileStore;
  categoryStore:CategoryStore;


  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.categoryStore = new CategoryStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
