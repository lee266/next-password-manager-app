import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import rootReducer from '../redux/reducers';
import rootSaga from '../redux/sagas';

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = ReduxDispatch<Action> & {
    dispatch: AppDispatch;
  };
  type Store = ReduxStore<RootState, Action> & {
    dispatch: AppDispatch;
  };
}

declare module 'redux' {
  export interface Dispatch extends AppDispatch {}
}

declare module 'react-redux' {
  export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
  export function useStore<S = RootState>(): Store<S>;
}

declare module 'next-redux-wrapper' {
  export type SagaStore = Store & {
    sagaTask: {
      toPromise(): Promise<void>;
    };
  };

  export interface MakeStoreOptions {
    sagaMiddleware?: SagaMiddleware<{}>;
  }
}
