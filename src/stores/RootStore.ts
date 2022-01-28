import { YoutubeStore } from '../domain/content/youtube/store/YoutubeStore';
import FirebaseSessionStore from './FirebaseSessionStore';
import { GlobalConfigStore } from './GlobalConfigStore';

export default class RootStore {
  public readonly firebaseSessionStore: FirebaseSessionStore;
  public readonly globalConfigStore: GlobalConfigStore;
  public readonly youtubeStore: YoutubeStore;

  constructor() {
    this.firebaseSessionStore = new FirebaseSessionStore(this);
    this.globalConfigStore = new GlobalConfigStore(this);
    this.youtubeStore = new YoutubeStore();
  }

}
