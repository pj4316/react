import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { action, makeAutoObservable, observable } from 'mobx';
import RootStore from './RootStore';

export default class FirebaseSessionStore {
  root: RootStore;

  @observable
  user?: User | null;

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this);
  }

  @action
  async getIdToken(): Promise<string> {
    return this.user?.getIdToken() ?? '';
  }

  @action
  signIn(email: string, password: string, isRemembered: boolean = false) {
    const auth = getAuth();
    const sessionPersistence = isRemembered ? browserLocalPersistence : browserSessionPersistence;
    setPersistence(auth, sessionPersistence).then(async () => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.setUser(userCredential.user);
      return userCredential;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        alert('등록된 아이디가 아니거나 비밀번호가 틀렸습니다. 아이디 혹은 비밀번호를 재입력 후 다시 로그인을 해주세요.');
      } else if (errorCode === 'auth/invalid-email') {
        alert('아이디가 이메일 형식이 아닙니다. 아이디를 확인후 다시 로그인을 해주세요.');
      } else {
        alert('Login error: (' + errorCode + ')' + errorMessage);
      }
    });
  }

  @action
  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.setUser(null);
    });
  }

  @action.bound
  setUser(user: User | null) {
    this.user = user;
  }
}
