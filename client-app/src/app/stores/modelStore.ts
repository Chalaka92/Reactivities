import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable size: any;
  @observable errorMessage: any;
  @observable submitting: boolean=false;

  @observable.shallow modal = {
    open: false,
    body: null,
  };

  @observable.shallow modalGeneral = {
    open: false,
    body: null,
    header: null,
    footer: null,
    formName:null,
  };

  @action openModal = (content: any, size: any) => {
    this.modal.open = true;
    this.size = size;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.size = "small";
    this.modal.body = null;
  };

  @action openModalGeneral = (
    header: any,
    content: any,
    footer: any,
    size: any,
    formName:any
  ) => {
    this.modalGeneral.open = true;
    this.size = size;
    this.modalGeneral.header = header;
    this.modalGeneral.body = content;
    this.modalGeneral.footer = footer;
    this.modalGeneral.formName = formName;
  };

  @action closeModalGeneral = () => {
    this.modalGeneral.open = false;
    this.size = "small";
    this.modalGeneral.header = null;
    this.modalGeneral.body = null;
    this.modalGeneral.footer = null;
    this.modalGeneral.formName = null;
    this.errorMessage=null;
  };
}
