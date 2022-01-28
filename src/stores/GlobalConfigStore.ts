import { action, computed, makeAutoObservable, observable } from 'mobx';
import RootStore from './RootStore';

export type Severity = 'error' | 'warning' | 'info' | 'success';

export type AlertProps = {
  open: boolean,
  duration: number,
  message: string,
  onClose: (e) => void,
  severity: Severity,
  anchorOrigin: {
    horizontal: 'center' | 'left' | 'right',
    vertical: 'bottom'
      | 'top'
  },
};

export class GlobalConfigStore {
  root: RootStore;

  @observable
  open: boolean = true;

  @observable
  drawerWidth: number = 254;

  @observable
  private _alertInfo?: AlertProps = undefined;

  readonly DRAWER_MAX_WIDTH: number = 254;
  readonly DRAWER_MIN_WIDTH: number = 76;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  @action.bound
  toggleMenus() {
    this.open = !this.open;
    this.drawerWidth = this.open ? this.DRAWER_MAX_WIDTH : this.DRAWER_MIN_WIDTH;
  }

  @computed
  public get alertInfo(): AlertProps | undefined {
    return this._alertInfo;
  }

  @action
  clearAlert(): void {
    this._alertInfo = undefined
  }

  @action.bound
  setAlert(message: string, severity: Severity, anchorOrigin = { horizontal: 'center', vertical: 'bottom' }) : void{
    this._alertInfo = {
      open: true,
      duration: 3000,
      message,
      onClose: (e) => { this.clearAlert() },
      severity,
      anchorOrigin,
    } as AlertProps;
  }

}
